const mongoose=require('mongoose');
const  {DB_CONN}=process.env;
exports.connect=async()=>{
    try{
        await mongoose.connect(DB_CONN);
        console.log("db connected successfully");

    }catch(err){
        console.log(err);
    }
}

