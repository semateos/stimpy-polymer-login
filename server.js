// This is the server version to be run standalone

// Dependencies
var Hapi = require('hapi');

// Server Config
var config = require('./server/config');

// Create a server with a host, port, and options
var server = Hapi.createServer(config.host, config.port, config.hapi.options);

server.pack.register([
    
	{
        plugin: require("good"),
        options: {
            subscribers: {
                console: ['ops', 'request', 'log', 'error']
//                './tmp/logs/': ['ops', 'request', 'log', 'error']
            }
        }
    },
	{ 
		plugin: require("./index") 
	}

    ], function(err) {
	
	if (err) throw err;
	server.start(function() {
	    console.log("Hapi server started @ " + server.info.uri.replace('0.0.0.0', 'localhost'));
	});
    }
    
);
