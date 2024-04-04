const Subject =require("../models/Subject")

module.exports.addSubject=async(req,res,next)=>{
    try{
        
        let newSubject=new Subject(req.body);
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

module.exports.getSubject=async(req,res,next)=>{
    try{

        let list=await Subject.find();
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

module.exports.deleteSubject=async(req,res,next)=>{
    try{
         console.log("req.body Delete= " , req.params.id)
         await Subject.deleteOne({_id:req.params.id})
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

module.exports.updateSubject=async(req,res,next)=>{
    try{
         console.log("req.body = " , req.body)
        // let newproduct=new product(req.body);
        // await newproduct.save();
        let obj = {
            name:req.body.name,
            status:req.body.status,
            class_id:req.body.class_id
        }

        let filter={_id:req.params.id}

        let subjectUpadte = await Subject.findOneAndUpdate(filter, obj, {
      returnOriginal: false,
    });
        console.log("updateSubject",subjectUpadte);
        return res.status(200).json({
            success:true,
            message:"record added successfully",
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

