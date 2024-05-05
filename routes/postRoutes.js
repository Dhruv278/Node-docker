const express=require("express");
const { getAllPost, createPost, getOnePost, updatePost, deletePost } = require("../controllers/postController");
const protect = require("../middlerwares/authMiddleware");

const router=express.Router();


router.route("/").get(getAllPost).post(protect,createPost);
router.route("/:id").get(getOnePost).patch(protect,updatePost).delete(protect,deletePost)


module.exports=router