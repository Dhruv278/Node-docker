const Post=require("./../models/postModel");
const catchError=require("./../errorhandler/errorHandler");
exports.getAllPost=catchError(async(req,res,next)=>{
   const posts=await Post.find();

   res.status(200).json({
    status:"success",
    results:posts.length,
    data:{
        posts
    }
   })
})

exports.getOnePost=catchError(async(req,res,next)=>{
    const id=req.params.id;
    const post=await Post.findById(id);
 
    res.status(200).json({
     status:"success",
     
     data:{
         post
     }
    })
 })

 exports.createPost=catchError(async(req,res,next)=>{
    
    const post=await Post.create({
        title:req.body.title,
        body:req.body.body
    });
 
    res.status(200).json({
     status:"success",
     
     data:{
         post
     }
    })
 })



 
 exports.updatePost=catchError(async(req,res,next)=>{
    const id=req.params.id;
    const post=await Post.findByIdAndUpdate(id,{
        title:req.body.title,
        body:req.body.body
    },{
        new:true,
        runValidators:true
    });
 
    res.status(200).json({
     status:"success",
     
     data:{
         post
     }
    })
 })
 
 exports.deletePost=catchError(async(req,res,next)=>{
    const id=req.params.idl
    const post=await Post.findByIdAndDelete(id);
 
    res.status(200).json({
     status:"success",
     
     data:{
         post
     }
    })
 })