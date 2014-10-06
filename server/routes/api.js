//controller for default routes
var controller = require('../controllers/api');

module.exports = [
    {
        method: 'GET',
        path: '/api/favorite/{id}/{bool}',
        config: controller.favorite
    },
    {
        method: 'GET',
        path: '/api/posts',
        config: controller.posts
    },
    {
        method: ['GET', 'POST'],
        path: '/api/user',
        config: controller.user
    },
    {
        method: ['GET', 'POST'],
        path: '/api/login',
        config: controller.login
    },
    {
        method: ['GET', 'POST'],
        path: '/api/logout',
        config: controller.logout
    },
]