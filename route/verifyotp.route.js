const express = require("express");
const Router= express.Router();
const bodyParser= require('body-parser');
const otpModel = require('../module/otp.module');
const app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// verify otp api
app.use('/verifyotp',Router);
Router.post('/',async (req,res)=>{
  const{otp}= req.body;
  console.log("request otp:",otp);
  try{
    //console.log("shruti");
    const o= await otpModel.findOne({otp});
    console.log( "databse otp:",o);
    if(!o){
return res.status(401).json({message:' otp is not correct'});
    }
    const verifyotp =  o.otp === otp;
    console.log(o.otp);
  console.log("verificaton result:", verifyotp);
    if(verifyotp){
      res.json({message:'verify otp successful'});
    }
  }
  catch(error){
    console.log('error qureying mongodDB:',error);
    res.status(500).json({message:'internal server error'});
  }

});
module.exports= Router;