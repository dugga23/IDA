const mongoose = require('mongoose');
const id= require('../route/likedislike.route');
const {Schema}= mongoose;


// Define schema for liked profile
let likedProfile = new Schema({
    profileId: {
        type: String,
        required: true
    },
    likedAt: {
        type: Date,
        default: Date.now
    }
},{
    collection:"likedprofile"
}
);
module.exports= mongoose.model("likedprofile", likedProfile);

