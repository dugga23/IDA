const express = require("express");
const Router= express.Router();
const bodyParser= require('body-parser');
const app = express();
const messagereq=require('../module/messagereq.module');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let messageRequests= [];

Router.post('/message-request',(req,res)=>{
    const {sender,recipient,message}=req.body;
if(!sender|| !recipient || !message){
    return res.status(400).json({error:'sender, recipient and message are require'});
}
const newRequest = {sender, recipient, message};
messageRequests.push(newRequest);
return res.status(201).json(newRequest);
});
Router.get('/message-request',(req,res)=>{
    return res.json(messageRequests);
});
module.exports=Router;