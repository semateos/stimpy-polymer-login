/**
* Dependencies.
*/
var path = require('path'),
rootPath = path.normalize(__dirname + '/../..');

console.log('node env', process.env.NODE_ENV);

var config = {
    root: rootPath,
    host: '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 3000,
    api: '',
    hapi: {
        options: {
            cors: true
        }
    },
    views: {
        path: rootPath + '/server/views',
        engines: {
            html: require('swig')
        }
    }
}

switch(process.env.NODE_ENV){

    case 'development':

        config.api = 'http://localhost:3000'
        break;
        
    case 'production':
    case 'cordova':

        config.api = 'http://quiet-mesa-6846.herokuapp.com'
        break;

}

config.env = process.env.NODE_ENV;

// Defaults that you can access when you require this config.
module.exports = config;