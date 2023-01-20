import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";


export const getPost = async (req, res)=>{
    try {
        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage)

    } catch (error) {
        res.status(404).json({message: error.message})
    }
};

export const createPost = async (req, res)=>{
    const post = req.body;
    const newPost = new PostMessage(post);

    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
};  


export const updatePost = async (req, res) => {

    try {  
        const { id: _id } = req.params;
        const post = req.body
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that');

        const updatedPost = await PostMessage.findByIdAndUpdate(_id,{ ...post, _id }, {new: true} );
        res.json(updatedPost)
        
    } catch (error) {
        res.status(409).json({message: error.message})
    }

}


export const deletePost = async (req, res) => {

    try {  
        const { id: _id } = req.params; //rename as _id instead id 
        const post = req.body
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that');

       await PostMessage.findByIdAndRemove(_id);
        res.json({message: 'Post deleted successfully'})
        
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const likePost = async (req, res) => {

    try {  
        const { id: _id } = req.params; //rename as _id instead id 
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that');

        const post =  await PostMessage.findById(_id);
        const updatedPost = await PostMessage.findByIdAndUpdate(_id,{ likeCount: post.likeCount + 1 }, {new: true} );
        res.json({updatePost})
        
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

