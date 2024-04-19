// photoUploadRoute.js
const express = require('express');
const Router = express.Router();
const middleware= require('../middleware/upload');
const photocontroler= require('../controler/photoupload');

// POST route for uploading a single photo
Router.post('/upload', middleware, photocontroler.photoupload);
module.exports = Router;