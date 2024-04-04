const Genre=require("../models/Genre")

module.exports.addGenre=async(req,res,next)=>{
    try{
        let genre = await Genre.findOne({name:req.body.name})
        if(genre) return res.status(200).send('Genre already exist')
        
        genre =new Genre(req.body)
        await genre.save()
        res.status(200).send(genre)
       

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
            data:[]
        })
    }
}

module.exports.getGenre=async(req,res,next)=>{
    try{

        let list=await Genre.find();
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

module.exports.deleteGenre=async(req,res,next)=>{
    try{
         console.log("req.body Delete= " , req.params.id)
         await Genre.deleteOne({_id:req.params.id})
      
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

// module.exports.updateVideo=async(req,res,next)=>{
//     try{
        
      
//        let RecieveData=req.body

//         let filter={_id:req.params.id}

//         let subjectUpadte = await Video.findOneAndUpdate(filter, RecieveData, {
//       returnOriginal: false,
//     });
//         console.log("updateSubject",subjectUpadte);
//         return res.status(200).json({
//             success:true,
//             message:"record added successfully",
//             data:subjectUpadte
//         })

//     }catch(err){
//         return res.status(500).json({
//             success:false,
//             message:err.message,
//             data:[]
//         })
//     }
// }

