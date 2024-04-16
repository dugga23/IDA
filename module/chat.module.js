const mongoose = require('mongoose');

const {Schema}=mongoose;

const chat= new Schema({
    text:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{
    collection:"chat"
});
module.exports=mongoose.model("chat",chat);