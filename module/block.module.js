const mongoose= require('mongoose');
const id= require('../route/blockreport.route');

const {Schema}= mongoose;

let block= new Schema({
    profileId: {
        type: String,
        required: true
    },
    blockAt: {
        type: Date,
        default: Date.now
    }
},{
    collection:"blocked_user"
}
);
module.exports= mongoose.model("blocked_user", block);

    
