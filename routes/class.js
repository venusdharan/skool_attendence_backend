const { ObjectId } = require('mongodb');
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

    server.route({
        method: 'GET',
        path: '/api/class/{id}',
        handler: async function (request, h) {
            var data = await models.class.findById(request.params.id)
            return data;
        }
    });

    server.route({
        method: 'POST',
        path: '/api/attend/{id}/name/{name}',
        handler: async function (request, h) {
            try{
            var attend_try = await models.attendance.find({
                student_class:ObjectId(request.params.id),
                student_name:request.params.name
            })
            if(attend_try.length == 0){
                var new_attend = await new  models.attendance({
                    student_class:ObjectId(request.params.id),
                    student_name:request.params.name
                }).save()
                console.log(new_attend)
                return true
            }else{
               

                return true
    
            }
                return false
            }catch{
                return false
            }
            
        }
    });

    server.route({
        method: 'GET',
        path: '/api/class/attend/{id}',
        handler: async function (request, h) {
            var res = {};
            var data = await models.class.findById(request.params.id);
            res.data = data;
            var attend = await models.attendance.find({student_class:ObjectId(request.params.id)}).exec();
            res.attend = attend;

            return res;

            
        }
    });

    server.route({
        method: "GET",
        path: "/api/class/datatable/",
        handler: async (request, h) => {
            //console.log(request.auth.credentials.token)
            //try{
               // var team = request.params.team;
               // var date = request.params.date;
                //var date_js = new Date(date);
                //console.log(team)
                //console.log(date)
                const options = {
                    limit:request.query.items_perpage || 10,
                    page:request.query.page || 1,
                    sort: {   class_created: -1 },
                };
                var query = {
                   // $or:[ {'task_status':"CT"},{'task_status':"CL"} ],
                };
                //query.task_team = new ObjectID(team);
                    //task_created_by:new ObjectID(request.auth.credentials.token),
               
                if(request.query.search){
                   //var pickup = await models.task_pick_up.find({'order_id': {$regex: request.query.search, $options: 'i'}}).select('_id');
                   //var delivery = await models.task_delivery.find({'order_id': {$regex: request.query.search, $options: 'i'}}).select('_id');
                   //console.log(pickup)
                   //console.log(delivery)
                   
                    query.project_number = {
                        $regex:request.query.search,
                        $options: 'i'
                    }
                    /*
                    query = {
                        $or:[ 
                        {'task_info_start':{ $in:pickup}}, 
                        {'task_info_stop':{ $in:delivery}} 
                        ]
                    };
                    */
                }
                /*
                if(request.query.vehicle){
                    query.vehicle_type = request.query.vehicle
                }*/

               var res = await models.class.paginate(query,options);
                //console.log(res);
                return {
                    status:true,
                    data:res
                }
            /*}catch(er){
                return{
                    status:false,
                    data:null
                }
            }*/
            
            //return await models.task.find({});
        }
    });


}