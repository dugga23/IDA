const mongoose= require('mongoose');
const id= require('../route/messagereq.route');

const {Schema}= mongoose;

let message= new Schema({
    profileId:{
        type:String,
        required: true
    },
    sender:{
        type: String
    },
    recipient:{
        type: String
    },
    message:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default:Date.now,
    }
},{
    collection:'messageReq'
});
module.exports=mongoose.model('messageReq',message);