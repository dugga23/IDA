const photo= require('../module/photoupload.module');

//const middleware= require('../middleware/upload');

exports.photoupload= async(req,res)=>{
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
}