const mongoose= require("mongoose");
const otp= require('../route/otp.route');
const {Schema}= mongoose;

let o= new Schema({
    number:{
        type:Number

    },
    email:{
        type:String
    },
    otp:{
        type:String
    }},
 {
    collection:"otp"
   
});
module.exports=mongoose.model("otp",o);