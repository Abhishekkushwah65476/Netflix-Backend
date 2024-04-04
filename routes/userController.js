const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt =require("bcrypt")
const jwt =require("jsonwebtoken")

router.post("/register", async(req, res) => {
    try {
        let Checkuser = await User.findOne({ Email: req.body.Email });
        if (Checkuser) return res.status(200).json({ message: 'user already exist' })

        let hashpassword  = req.body.Password
        const salt = await bcrypt.genSalt(5)
        const newHashPassword = await bcrypt.hash(hashpassword,salt)

   
        Checkuser = new User({

            username: req.body.username,
            Email: req.body.Email,
            Password: newHashPassword
        })
        await Checkuser.save()
        res.status(200).send(Checkuser)


    } catch (error) {
        return res.status(500).json({
            message:error.message
        })

    }
})

router.get("/getAllUser",async(req,res)=>{
    try {
        let Data=await User.find()

        if(Data){

            return res.status(200).json({
                success:true,
                message:"record found",
                Data:Data
            })
        }else{
            res.status(404).json({
                success:false,
                message:"no record found",
                Data:[]
            })
        }
        
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
            Data:[]
        })
    }
})

router.put("/updateUser/:id",async(req,res)=>{
    try {

        let obj=req.body
        let filter={_id:req.params.id}

        let subjectUpadte = await User.findOneAndUpdate(filter, obj, {
            returnOriginal: false,
          });
              console.log("updateSubject",subjectUpadte);
              return res.status(200).json({
                  success:true,
                  message:"record added successfully",
                  data:subjectUpadte
              })
        
    } catch (error) {
        
    }
})

router.delete("/deleteUser/:id",async(req,res)=>{
    try {
        // console.log("req.body Delete= " , req.params.id)
        await User.deleteOne({_id:req.params.id})

       return res.status(200).json({
           success:true,
           message:"record deleted successfully",
           data:[]
       })

        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
            data:[]
        })
        
    }
})

router.post("/UserLogin",async(req,res)=>{
    try {
        let UserData = await User.findOne({Email:req.body.Email,password:req.body.Password})
        // console.log("UserData",UserData);
      if(!UserData){
            return res.status(404).json({
                success:false,
                message:"user does not exists",
                Data:[]
            })
        }else{
               
            // console.log(UserData);
            let passwordChecking = await bcrypt.compare(req.body.password,UserData.Password)
            // console.log(UserData.password);
            if(!passwordChecking){
                return res.status(461).json({
                    success:false,
                    message:"password is incorrect",
                })
            }else{
                const token =  jwt.sign({Email:UserData.Email,isAdmin:UserData.isAdmin},process.env.securitykey,{expiresIn:"24hr"})
                obj={
                  Email:UserData.Email,
                  isAdmin:UserData.isAdmin,
                  token:token
                }
    
                return res.status(200).json({
                    success:true,
                    message:"Login Successfully",
                    Data:obj
                })
    
            }
        }


        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
            Data:[]
        })
    }
  
})

module.exports=router

