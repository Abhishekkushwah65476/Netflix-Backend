const Video=require("../models/Video")


module.exports.addVideo=async(req,res,next)=>{
    try{
        console.log(req.body);
        let newSubject= Video(req.body);
        await newSubject.save();
        return res.status(200).json({
            success:true,
            message:"record added successfully",
            data:newSubject
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
            data:[]
        })
    }
}

module.exports.GetVideo=async(req,res,next)=>{
    try{

        let list=await Video.find();
        if(list){
            return res.status(200).json({
                success:true,
                message:"record found",
                list:list
            })
        }
        else{
            return res.status(404).json({
                success:true,
                message:"no record found",
                data:[]
            })
        }

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"internal server error",
            data:[]
        })
    }
}

module.exports.deleteVideo=async(req,res,next)=>{
    try{
         console.log("req.body Delete= " , req.params.id)
         await Video.deleteOne({_id:req.params.id})
        // let newproduct=new product(req.body);
        // await newproduct.save();
        return res.status(200).json({
            success:true,
            message:"record deleted successfully",
            data:[]
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
            data:[]
        })
    }
}

module.exports.updateVideo=async(req,res,next)=>{
    try{
        
      
       let RecieveData=req.body

        let filter={_id:req.params.id}

        let subjectUpadte = await Video.findOneAndUpdate(filter, RecieveData, {
      returnOriginal: false,
    });
        console.log("updateSubject",subjectUpadte);
        return res.status(200).json({
            success:true,
            message:"record added successfully",
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

