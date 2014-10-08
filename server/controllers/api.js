// This is the api controller used for requests for data / access from the client app.

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

            db.posts.find().sort({id: 'desc'}).limit(10).then(function(posts) {

                reply(posts);
            });
        }
    },

    post: {
        handler: function(request, reply){

            var db = request.server.plugins['dogwater'];

            if (request.auth.isAuthenticated) {

                var user = request.auth.credentials.user;

                console.log('posting as', user);

                var Posts = db.posts;

                Posts.create({

                    username: user.firstName + ' ' + user.lastName,
                    text: request.payload.post 

                }, function(err, post){

                    if(err){

                        return reply({err: err});

                    }else{

                        return reply({success: true, post: post});
                    }
                });

            }else{

                return reply({err: 'You need to be logged in to post.'})
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
    }

}