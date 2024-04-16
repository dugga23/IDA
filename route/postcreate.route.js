const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const Post = require('../module/postcreate.module');

const app = express();
const Router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).array('images', 5);

// Endpoint to create a new post
Router.post('/posts', upload, async (req, res) => {
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
});


// API endpoint to like a post
Router.post('/posts/:id/like', async (req, res) => {
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
});

// API endpoint to comment on a post
Router.post('/posts/:id/comment', async (req, res) => {
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
});

// API endpoint to share a post
Router.post('/posts/:id/share', async (req, res) => {
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
});
module.exports= Router;