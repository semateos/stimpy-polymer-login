// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.

var config = require('../config');

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
    }


}