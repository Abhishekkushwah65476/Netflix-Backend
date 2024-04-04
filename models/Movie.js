const mongoose= require("mongoose")

const movieSchema = new mongoose.Schema({


    // ComingSoon:{ type:Boolean, default:false},
    // title:{ type:String,required:true, unique:true},
    // Year:{ type:String},
    // Rated:{ type:String},
    // Released:{ type:String},
    // Runtime:{ type:String},
    // Genre:{ type:String},
    // Director:{ type:String},
    // Writer:{ type:String},
    // Actor:{ type:String},
    // Plot:{ type:String},
    // Poster:{ type:String},
    // Trailer:{ type:String,default:''},
    // Language:{ type:String},
    // Country:{ type:String},
    // Award:{ type:String},
    // Poster:{ type:String},
    // Metascore:{ type:String},
    // Type:{ type:String},
    // TotalSeason:{ type:String,default:''},
    // Image:{ type:Array}
    title:{ type:String,required:true,unique:true},
    description:{type:String},
    img:{type:String},
    imgTitle:{type:String},
    imgSm:{type:String},
    trailer:{type:String},
    video:{type:String},
    year:{type:String},
    limit:{type:String},
    genre:{type:String},
    isSeries:{type:Boolean,default:false}

    
},{timestamp:true})
    
    
module.exports=mongoose.model('Movie',movieSchema)
    
    