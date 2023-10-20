const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Post = require('../models/Posts')

//Create Post
router.post('/',async (req, res)=>{
    console.log("creating a post...")
   const newPost = new Post(req.body);
   try{
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
   }
   catch(err){
    res.status(500).json(err);
   }
});

//update Post
router.put('/:id',async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){    
            try{
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,{
                    $set : req.body,
                }, 
                {new : true});

                res.status(200).json(updatedPost);
            }
            catch(err){
                res.status(400).json(err);
            }
        }
        else{
            res.status(401).json("You can only update your posts!!!");
        }
    }
    catch(err){

    }
})
//Delet post
router.delete('/:id',async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){    
            try{
                await Post.findByIdAndDelete(req.params.id);
                res.status(200).json("post has been deleted");
            }
            catch(err){
                res.status(400).json(err);
            }
        }
        else{
            res.status(401).json("You can only delete your posts!!!");
        }
    }
    catch(err){
    }
});

//Get post
router.get("/:id", async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }
    catch(err){
        res.status(400).json(err);
    }
});

//Get all posts
router.get("/", async (req, res)=>{
    const username = req.query.user;
    const catname = req.query.cat;

    try{
        let posts;
        if(username){
            posts = await Post.find({username : username});
        }
        else if(catname){
            posts = await Post.find({categories  : 
                {
                    $in : [catname]
                }
            })
        }
        else{
            posts = await Post.find()
        }
        res.status(200).json(posts)
    }
    catch(err){
        res.status(400).json(err);
    }
});

module.exports = router;