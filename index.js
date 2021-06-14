'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const init = async () => {

    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);

    await mongoose.connect("mongodb+srv://admin:admin@cluster0.evips.mongodb.net/attendence?retryWrites=true&w=majority", {useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify:false});
    /**
     * get the mongodb connection and db instance
     */
    const db = mongoose.connection;
    /**
     * get info, check if we are connected to mongoDB
     */
    db.on('error', function(){
        console.log('db error exiting');
        process.exit()
    });
    db.once('open', function() {
        console.log("DB Connected")
    });

    const server = Hapi.server({
        port: process.env.PORT || 5000,
        host: 'localhost', //'0.0.0.0'
        routes: {
            cors: {
                origin: ['*'] // an array of origins or 'ignore'           
            }
        }
    });

    const modelPath = "./models/"
    var models = {
        class : await require(modelPath+'class')(mongoose,mongoosePaginate),
        attendance : await require(modelPath+'attendance')(mongoose,mongoosePaginate),
    };

    require('./routes/class')(server,models);

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