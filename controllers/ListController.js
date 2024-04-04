const { default: mongoose } = require("mongoose")
const List =require("../models/List")

//AddList
module.exports.addList=async(req,res,next)=>{
    try{
        
        let ContentType = JSON.parse(req.body.Content)

        console.log("ContentType",ContentType)
        req.body.Content = ContentType

        const ListData = new List(req.body)
        await ListData.save()
        return res.status(200).json({
            success:true,
            message:"record added successfully",
            data:ListData
        })
      
        
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
            data:[]
        })
    }
}

//DeleteList
module.exports.deleteList = async(req, res, next)=>{
    if(req.user.isAdmin){
        try{
            const ListData = await List.findByIdAndDelete(req.params.id)
            return res.status(200).json({
                success:true,
                message:"List deleted successfully",
                data:ListData
            })
        }catch(err){
            return res.status(500).json({
                success:false,
                message:err.message,
                data:[]
            })
        }

    }else{
        res.status(404).json("You are not allowed")
    }
}
//getList

module.exports.getList = async(req, res, next)=>{
    const typeQuery = req.query.Type;
    const genraQuery = req.query.genra;
    // console.log(req.query.type, req.query.genra)
    let list=[]
    console.log(list)
    try {
        if(typeQuery){
            if(genraQuery){
                list = await List.aggregate([
                    {$match:{type:typeQuery, genre:genraQuery}},
                    {$sample:{size:10}}])
            }else{
                list = await List.aggregate([
                    {$sample:{size:10}},
                    {$match:{type:typeQuery}}

                ])
            }
        }else{
            list = await List.aggregate([{$sample:{size:10}}])
        }
        return res.status(200).json({
            success:true,
            message:"record Founded successfully",
            data:list
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
            data:[]
        })
    }
  
}

//Update List
module.exports.updateList=async(req,res,next)=>{
    try{
       
        console.log("hi",req.params.id)

        let obj = {
            name:req.body.title,
            status:req.body.Type,
            genre:req.body.genre,
            Content:JSON.parse(req.body.Content)
        }

        let filter={_id:new mongoose.Types.ObjectId(req.params.id.trim())}

        let subjectUpadte = await List.findOneAndUpdate(filter, obj, {
      returnOriginal: false,
    });
        console.log("updateSubject",subjectUpadte);
        return res.status(200).json({
            success:true,
            message:"record Updated successfully",
            data:subjectUpadte
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
            data:[]
        })
    }
}
