const mongoose = require('mongoose');
const uploadphoto= require('../route/photoupload.route');
const {Schema}= mongoose;
// Define the schema for the Photo model
let photoupload = new Schema({
  url: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},{
    collection:'photoupload'
});

module.exports=mongoose.model('photoupload', photoupload);
