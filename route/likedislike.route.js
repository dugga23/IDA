const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Router = express.Router();
const likedislikecontroler=require('../controler/likedislike');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route for liking a profile
Router.post('/like',likedislikecontroler.likeprofile );

// Route for disliking a profile
Router.post('/dislike', likedislikecontroler.dislikeprofile);

module.exports = Router;
