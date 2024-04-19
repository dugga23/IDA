const messagereq=require('../module/messagereq.module');
let messageRequests= [];
exports.messagaereq= async(req,res)=>{
    const {sender,recipient,message}=req.body;
    if(!sender|| !recipient || !message){
        return res.status(400).json({error:'sender, recipient and message are require'});
    }
    const newRequest = {sender, recipient, message};
    messageRequests.push(newRequest);
    return res.status(201).json(newRequest);
};
exports.getmessagereq=async(req,res)=>{
    return res.json(messageRequests);
};