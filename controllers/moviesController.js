const Movie = require("../models/Movie")

//Add Movie
module.exports.addMovie=async(req,res)=>{
    // console.log(req.user)
    if(req.user.isAdmin){
        req.body.img=process.env.IMAGE_PATH+req.files.img[0]?.filename
        req.body.imgSm=process.env.IMAGE_PATH+req.files.imgSm[0]?.filename
        req.body.trailer=process.env.IMAGE_PATH+req.files.trailer[0]?.filename
        req.body.video=process.env.IMAGE_PATH+req.files.video[0]?.filename
        // console.log("imgage",req.files);
        const newMovie = new Movie(req.body)
    try {
        
       const savedMovie = await newMovie.save()
       return res.status(200).json({
          success:true,
          message:"Movie saved successfully",
          Data:savedMovie
       })
        
    } catch (error) {
        return res.status(500).json({
            succes:false,
            message:error.message,
            Data:[]
        })
        
    }
  }else{
    return res.status(404).send('you are not allowed')
  }

}

//Update Movie
module.exports.updateMovie=async(req,res,next)=>{
    // console.log(req.user)    
  if(req.user.isAdmin){

      try{
          let obj = {
            title:req.body.title,
            description:req.body.description,
            img:req.files.img.filename,
            imgTitle:req.files.imgTitle.filename,
            imgSm:req.files.imgSm.filename,
            trailer:req.files.trailer.filename,
            video:req.files.video.filename,
            year:req.body.year,
            limit:req.body.limit,
            genre:req.body.genre,
          }
          console.log(obj);
  
          let filter={_id:req.params.id}
  
          let subjectUpadte = await Movie.findOneAndUpdate(filter, obj, {
        returnOriginal: false,
      });
          console.log("updateSubject",subjectUpadte);
          return res.status(200).json({
              success:true,
              message:"record updated successfully",
              data:subjectUpadte
          })
  
      }catch(err){
          return res.status(500).json({
              success:false,
              message:err.message,
              data:[]
          })
      }
  }else{
    return res.status(404).send('you are not allowed')
  }
}

//Delete Movie
module.exports.deleteMovie=async(req,res,next)=>{
    // console.log(req.user)
  if(req.user.isAdmin){

      try{
          let filter={_id:req.params.id}
  
          let subjectDelete = await Movie.findOneAndDelete(filter, {
        returnOriginal: false,
      });
        //   console.log("deleteSubject",subjectDelete);
          return res.status(200).json({
              success:true,
              message:"record deleted successfully",
              data:subjectDelete
          })
  
      }catch(err){
          return res.status(500).json({
              success:false,
              message:err.message,
              data:[]
          })
      }
  }else{
    return res.status(404).send('you are not allowed')
  }
}

//Get Movie
module.exports.getOneMovie=async(req,res,next)=>{
        try{
            const filter = req.params.id
            // console.log(filter)
            let movie =await Movie.find({_id:filter});

            return res.status(200).json({
                success:true,
                message:"record Get successfully",
                data:movie
            })
    
        }catch(err){
            return res.status(500).json({
                success:false,
                message:err.message,
                data:[]
            })
        }
  
  }

//Get Random
module.exports.getRandomMovie=async(req,res,next)=>{
   const type = req.query.type;
   let movies
    try{
        if(type === 'series'){
           movies = await Movie.aggregate([
             
                {$match:{isSeries:true},},
                   { $sample: {size:1}}
             ]);
        }else{
            movies = await Movie.aggregate([
                {
                    $match:{isSeries:false},  },
                  {  $sample: {size:1}}
              
             ])
        }
        return res.status(200).json({
            success:true,
            message:"record Founded successfully",
            data:movies
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
            data:[]
        })
    }

}

//All Movies 
module.exports.getAllMovies=async(req,res,next)=>{
    // console.log(req.body)
    try {
        const Data= await Movie.find()
        if(Data){
            return res.status(200).json({Message:"Record found successfully",Data:Data})
        }else{
            return res.status(404).json({message:"record not found"})
        }
        
    } catch (error) {
        return res.status(500).json({
            succes:true,
            message:"internal server error",
            Data:[]
        }) 
    }
 }