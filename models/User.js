const mongoose= require("mongoose")

const userSchema= new mongoose.Schema({
 
    username:{type:String,  required:true},
    Email:{ type:String , required:true },
    Password:{ type:String , required:true },
    ProfilePicture:{ type:String , default:'' },
    isAdmin:{type:Boolean, default:false },
    
    } ,{timestamp: true})
    
    module.exports=mongoose.model('user',userSchema)
    