const signup= require('../module/signup.module');

exports.searchprofile= async(req,res)=>{
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
}