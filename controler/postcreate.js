const Post = require('../module/postcreate.module');
//const middleware= require('../middleware/upload');

exports.postcreate= async(req,res)=>{
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files were uploaded' });
        }
        
        const { caption } = req.body;
        const images = req.files.map(file => file.path);
        
        const post = new Post({ images, caption });
        await post.save();

        return res.json({ message: 'Post created successfully', postId: post._id });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.postlike= async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.likes++;
        await post.save();
        return res.status(200).json({ message: 'Post liked successfully', post });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.postcommand= async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const { comment } = req.body;
        post.comments.push(comment);
        await post.save();
        return res.status(200).json({ message: 'Comment added successfully', post });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.postshare= async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.shares++;
        await post.save();
        return res.status(200).json({ message: 'Post shared successfully', post });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
