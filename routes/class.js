module.exports = async function(server,models){

    server.route({
        method: 'POST',
        path: '/api/class',
        handler: async function (request, h) {
            var project_data =  request.payload;
            project_data['class_created'] = new Date().toLocaleString('en-US', {
                timeZone: 'Asia/Calcutta'
            });
            return new models.class(project_data).save();
        }
    });

    
}