const express= require('express');
const bodyParser= require('body-parser');
const streak= require('../module/streak.module');
const app= express();
const Router= express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Router.get('/:userId',async (req,res)=>{
    try{
        const userId= req.params.userId;
        const streakData= await streak.findOne({userId});
        res.json(streakData);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
});

Router.post('/:userId',async (req,res)=>{
try{
    const userId= req.params.userId;
    let streakData= await streak.findOne({userId});

    if(!streakData){
        streakData= new streak({userId});
    }
    streakData.streak +=1;
    await streakData.save();
    res.json(streakData);
}catch(err){
    console.error(err.message);
    res.status(500).send('server error');
}
});
Router.delete ('/:userId',async(req,res)=>{
    try{
        const userId= req.params.userId;
        const streakData= await streak.findOneAndDelete({userId});
        res.json(streakData);
    }catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
});
module.exports= Router;
