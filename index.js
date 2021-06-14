'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT || 5000,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'] // an array of origins or 'ignore'           
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {
    
            return 'Hello World!';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();