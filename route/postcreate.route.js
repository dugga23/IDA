const express = require('express');

const bodyParser = require('body-parser');
const postcontroler= require('../controler/postcreate');

const app = express();
const Router = express.Router();
const middleware= require('../middleware/upload');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint to create a new post
Router.post('/posts', middleware, postcontroler.postcreate );
// API endpoint to like a post
Router.post('/posts/:id/like', postcontroler.postlike);
// API endpoint to comment on a post
Router.post('/posts/:id/comment', postcontroler.postcommand);
// API endpoint to share a post
Router.post('/posts/:id/share', postcontroler.postshare);
module.exports= Router;