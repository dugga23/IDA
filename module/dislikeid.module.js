const mongoose= require('mongoose');
const id= require('../route/likedislike.route');

const {Schema}= mongoose;

let dislikedProfile= new Schema({
    profileId: {
        type: String,
        required: true
    },
    dislikedAt: {
        type: Date,
        default: Date.now
    }
},{
    collection:"dislikedprofile"
}
);
module.exports= mongoose.model("dislikedprofile", dislikedProfile);

    
