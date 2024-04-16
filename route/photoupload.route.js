// photoUploadRoute.js
const express = require('express');
const Router = express.Router();
const photo= require('../module/photoupload.module');
const multer = require('multer');
const fs = require('fs'); 

const uploadDirectory = 'uploads/';

// Check if the directory exists, if not, create it
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Define storage for uploaded photos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory); // specify the directory where uploaded photos will be stored
  },
  filename: function (req, file, cb) {
    // specify how uploaded files should be named
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Initialize multer with storage options
const upload = multer({ storage: storage });

// POST route for uploading a single photo
Router.post('/upload', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Assuming you have a Photo model with a 'url' field to store the file path
    const newPhoto = new photo({ url: req.file.filename });
    await newPhoto.save();

    res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = Router;