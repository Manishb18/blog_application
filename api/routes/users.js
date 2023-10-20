const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Post = require('../models/Posts')

//update
router.put('/:id', async (req, res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            console.log(req.body);
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set : req.body,
            }, {new : true});

            res.status(200).json("User updated successfully");
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(401).json("You can only update your account!!!");
    }
});
//delete
router.delete('/:id',async (req, res)=>{
    if(req.body.userId === req.params.id){
        const user = await User.findById(req.params.id)
        if(!user){
            res.status(401).json("User not found");
        }
        else{
            try{
                // await Post.deleteMany({username : user.username});
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted...");
                }
            catch(err){
                res.status(500).json(err);
            }
        }
        
    }
    else{
        res.status(401).json("You can only delete your account!!!");
    }
});

//Get User
router.get("/:id", async (req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            res.status(400).json("User not found");
        }
        else{
            const {password, ...others} = user._doc;
            res.status(200).json(others);
        }
    }
    catch(err){
        res.status(401).json(err);
    }
})
module.exports = router;