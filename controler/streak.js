const streak= require('../module/streak.module');

exports.getstreak= async(req,res)=>{
    try{
        const userId= req.params.userId;
        const streakData= await streak.findOne({userId});
        res.json(streakData);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
};

exports.createstreak= async(req,res)=>{
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
};

exports.deletestreak= async(req,res)=>{
    try{
        const userId= req.params.userId;
        const streakData= await streak.findOneAndDelete({userId});
        res.json(streakData);
    }catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
};