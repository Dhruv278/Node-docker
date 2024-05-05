const User=require('./../models/userModel');
const catchError=require("./../errorhandler/errorHandler");
const bcrypt=require("bcryptjs")

exports.signUp=catchError(async(req,res,next)=>{
    const {username,password}=req.body;
    const hashPassword=await bcrypt.hash(password,12);
    const newUser=await User.create({
        username,
        password:hashPassword
    });
    req.session.user=newUser
    res.status(200).json({
        status:"success",
        data:{
            user:newUser
        }
    })
})

exports.login=catchError(async(req,res,next)=>{
    const {username,password}=req.body;

    const result=await User.aggregate([
        {
            $match:{
                username:username
            }
        }
    ])
    const user=result[0];
    if(!user)return next(new Error("No data found"));
    
    const validate=await  bcrypt.compare(password,user.password);
    if(!validate){
        
        return res.status(400).json({
            status:"error",
            message:"invalid credential"
        })
    }
    
    req.session.user=user
    return res.status(200).json({
        status:"success",
        message:"Login successful",
        user
    })
})