const mongoose= require('mongoose');
const id= require('../route/streak.route');
const {Schema}= mongoose;

let Streakat = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    streak: {
        type: Number,
        default: 0,
    }
},{
    collection: "streak"
}
);
module.exports= mongoose.model("streak",Streakat);