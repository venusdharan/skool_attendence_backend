module.exports = async function(mongoose,dataTables)
{
    const taskSchema = new mongoose.Schema({
        class_name:{
            type:String,
            required:true
        },
        class_url:{
            type:String,
            required:true
        },
        class_created:{
            type:Date,
            default:new Date().toLocaleString('en-US', {
                timeZone: 'Asia/Calcutta'
            }),
        },
        class_teacher:{
            type:String,
            required:true
        },
        class_date:{
            type:Date,
        },
        
    });

    taskSchema.plugin(dataTables);
    //taskSchema.plugin(mongoose_csv);

    return mongoose.model('class',taskSchema);
}