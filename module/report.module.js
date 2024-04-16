const mongoose= require('mongoose');
const id= require('../route/blockreport.route');

const {Schema}= mongoose;

let report= new Schema({
    profileId: {
        type: String,
        required: true
    },
    reportAt: {
        type: Date,
        default: Date.now
    }
},{
    collection:"reported_user"
}
);
module.exports= mongoose.model("reported_user", report);

    
