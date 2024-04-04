const mongoose =require("mongoose");
const subjectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    class_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'classes',
        required:true
    },
    status:{
        type:String,
        enum:['Active','Inactive'],
        default:"Active"
    }  
})
module.exports=mongoose.model("subject",subjectSchema);
