const mongoose = require ('mongoose');
const id= require('../route/status.route');
const {Schema}= mongoose;
let status = new Schema({
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default:Date.now,
    }
    
},{
    collection:'Status'
});

module.exports = mongoose.model('Status', status);