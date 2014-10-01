// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.

var config = require('../config');

module.exports = {
    
    add: {
        handler: function(request, reply){
            
            // Grab the DB from dogwater
            var db = request.server.plugins['dogwater'];
            
            // Look for Stimpy in the cats model, placed there as a fixture
            // add a click to Stimpy
            db.cats.findOne(1).then(function(cat) {

                cat.clicks++;
                
                cat.save();

                reply({clicks: cat.clicks});
            });
            
        }
    },
    
    count: {
        handler: function(request, reply){

            // Grab the DB from dogwater
            var db = request.server.plugins['dogwater'];
            
            // Look for Stimpy in the cats model, placed there as a fixture
            db.cats.findOne(1)
            .then(function(cat) {
            
                // Reply with the number of clicks on Stimpy
                reply({clicks: cat.clicks});
                
            });
        }
    },

    posts: {
        handler: function(request, reply){

            var posts = [
              {
                "uid": 1,
                "text" : "Have you heard about the Web Components revolution?",
                "username" : "Eric",
                "avatar" : config.api + "/images/avatar-01.svg",
                "favorite": false
              },
              {
                "uid": 2,
                "text" : "Loving this Polymer thing.",
                "username" : "Rob",
                "avatar" : config.api + "/images/avatar-02.svg",
                "favorite": false
              },
                {
                "uid": 3,
                "text" : "So last year...",
                "username" : "Dimitri",
                "avatar" : config.api + "/images/avatar-03.svg",
                "favorite": false
              },
              {
                "uid": 4,
                "text" : "Pretty sure I came up with that first.",
                "username" : "Ada",
                "avatar" : config.api + "/images/avatar-07.svg",
                "favorite": false
              },
              {
                "uid": 5,
                "text" : "Yo, I heard you like components, so I put a component in your component.",
                "username" : "Grace",
                "avatar" : config.api + "/images/avatar-08.svg",
                "favorite": false
              },
              {
                "uid": 6,
                "text" : "Centralize, centrailize.",
                "username" : "John",
                "avatar" : config.api + "/images/avatar-04.svg",
                "favorite": false
              },
              {
                "uid": 7,
                "text" : "Has anyone seen my cat?",
                "username" : "Zelda",
                "avatar" : config.api + "/images/avatar-06.svg",
                "favorite": false
              },
              {
                "uid": 8,
                "text" : "Decentralize!",
                "username" : "Norbert",
                "avatar" : config.api + "/images/avatar-05.svg",
                "favorite": false
              }
            ];

            reply(posts);
        }
    }


}