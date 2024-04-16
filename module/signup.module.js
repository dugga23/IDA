const mongoose = require("mongoose");
const signup= require('../route/signup.route');
const {Schema}= mongoose;

let user = new Schema({
    _id:{
        type:String
    },
    firstname:{
        type: String
    },
    lastname:{
        type: String
    },
    number:{
        type: Number
    },
    email:{
        type: String
    },
    gender:{
        type: String
    },
    username:{
        type: String
    },
    password:{
        type: String
    },
    bio:{
        type:String
    }
    
},
{
    collection: "signup"
});
module.exports= mongoose.model("signup",user);