// This is the api controller used for requests for data / access from the client app.
// 
var Boom = require('boom');
var Wreck = require('wreck');
var Querystring = require('querystring');

var config = require('../config');

// OAuth authorization
var oauthCredentials = {
    clientId: "b808a07b-9a1c-4fef-94b9-2a5c065da0d6",
    clientSecret: "altered-secret",
    tokenEndpoint: "http://user-service.weedbunny.us/oauth/token",
    userEndpoint: "http://user-service.weedbunny.us/user"
}

var parsePayload = function(payload) {
    if (payload[0] === '{') {
        try {
            return JSON.parse(payload);
        }
        catch (err) {
            return err;
        }
    }
    return Querystring.parse(payload);
};

var loginUser = function(username, password, cb) {
    
    var query = {
        grant_type: 'password',
        username: username,
        password: password
    };

    var requestOptions = {
        payload: Querystring.stringify(query),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer(oauthCredentials.clientId + ':' + oauthCredentials.clientSecret, 'utf8')).toString('base64')
        }
    };
    
    Wreck.post(oauthCredentials.tokenEndpoint, requestOptions, function (err, res, payload) {

        if (err ||
            res.statusCode !== 200) {

            return cb(Boom.internal('Failed obtaining access token', err || payload));
        }

        payload = parsePayload(payload);
        if (payload instanceof Error) {
            return cb(Boom.internal('Received invalid payload from access token endpoint', payload));
        }

        var credentials = {
            provider: 'Yarn User Service',
            token: payload.access_token,
            refreshToken: payload.refresh_token,
        };
        
        // Obtain user profile

        var getUser = function (uri, getCb) {

            var getOptions = {
                headers: {
                    Authorization: 'Bearer ' + payload.access_token
                }
            };

            Wreck.get(uri, getOptions, function (err, res, response) {

                if (err ||
                    res.statusCode !== 200) {

                    return cb(Boom.internal('Failed obtaining user profile', err || response));
                }

                response = parsePayload(response);
                if (response instanceof Error) {
                    return cb(Boom.internal('Received invalid payload from user profile', response));
                }

                return getCb(response);
            });
        };

        getUser(oauthCredentials.userEndpoint, function(userInfo) {
            credentials.user = userInfo;
            cb(null, credentials);
        });
        
    });    
}


module.exports = {
    
    favorite: {
        handler: function(request, reply){
                
            var params = request.params;

            var db = request.server.plugins['dogwater'];
            
            db.posts.findOne(params.id).then(function(post) {

                post.favorite = params.bool;
                
                post.save();

                reply(post);
            });
        }
    },
    
    posts: {
        handler: function(request, reply){

            var db = request.server.plugins['dogwater'];

            db.posts.find().limit(10).then(function(posts) {

                reply(posts);
            });
        }
    },


    user: {

        handler: function (request, reply) {

            if (request.auth.isAuthenticated) {
                return reply({loggedIn: true, user: request.auth.credentials.user});
            }

            return reply({loggedIn: false});
        },
        auth: {
            mode: 'try',
            strategy: 'session'
        },
        plugins: {
            'hapi-auth-cookie': {
                redirectTo: false
            }
        }
    },

    login: {
        handler: function (request, reply) {

            if (request.auth.isAuthenticated) {
                return reply({loggedIn: true, user: request.auth.credentials.user});
            }
            
            var message = '';
            var account = null;

            if (request.method === 'post') {

                if (!request.payload.username ||
                    !request.payload.password) {

                    message = 'Missing username or password.';
                }
                else {
                    
                    loginUser(request.payload.username, request.payload.password, function(err, creds) {
                        
                        if (err) {
                            return reply({err: 'Login failed.'});
                        }
                        
                        // This line below is specific to hapi-auth-cookie
                        request.auth.session.set(creds);
                        
                        return reply({loggedIn: true, user: creds.user});
                    });
                }
                
            }
            
            if (request.method === 'get') {

                return reply({err: 'Login requests must be posted.'});
            }

        },
        auth: {
            mode: 'try',
            strategy: 'session'
        },
        plugins: {
            'hapi-auth-cookie': {
                redirectTo: false
            }
        }
    },

    logout: {
        handler: function (request, reply) {

            request.auth.session.clear();

            return reply({loggedIn: false});
        },
        auth: {
            mode: 'try',
            strategy: 'session'
        },
        plugins: {
            'hapi-auth-cookie': {
                redirectTo: false
            }
        }
    }



}