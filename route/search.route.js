const express = require('express');
const bodyParser= require('body-parser');
const Router= express.Router();
const signup= require('../module/signup.module');
const app= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Router.get('/search', async(req,res)=>{
    try{
        const query= req.query.q;
        const user= await signup.find({
            $or:[
                {username:{$regex:query, $options:'i'}},
                {firstname:{$regex:query,$options:'i'}},
                {lastname:{$regex:query,$options:'i'}}
            ]
        },{_id:0,firstname:1, lastname:1, gender:1,username:1}).exec();
        res.json(user);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
module.exports=Router;