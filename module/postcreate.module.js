const mongoose = require('mongoose');
const post = require('../route/postcreate.route');
const { Schema } = mongoose;
// Define the schema for the Photo model
let postupload = new Schema({
    
   
    images: [String],

    caption:
    {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: { type: Number, default: 0 },
    comments: [String],
    shares: { type: Number, default: 0 }
}, {
    collection: 'postupload'
});

module.exports = mongoose.model('postupload', postupload);
