const mongoose=require("mongoose")

const  listSchema=new mongoose.Schema({

title :{type:String, required:true , unique:true },
Type:{ type:String },
genre:{type:String},
// Content:{ type:mongoose.Schema.ObjectId,ref:"movies"},
Content:{ type:Array},
createdAt: { type: Date, default: Date.now }

},{timestamp:true})

module.exports=mongoose.model('list',listSchema)
