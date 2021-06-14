module.exports = async function(mongoose,dataTables)
{
    const taskSchema = new mongoose.Schema({
        student_name:{
            type:String,
            required:true
        },
        class_created:{
            type:Date,
            default: new Date().toLocaleString('en-US', {
                timeZone: 'Asia/Calcutta'
            }),
        },
        student_class:{
            type: mongoose.Schema.Types.ObjectId, ref: 'class'
        },
        
    });

    taskSchema.plugin(dataTables);
    //taskSchema.plugin(mongoose_csv);

    return mongoose.model('attendance',taskSchema);
}