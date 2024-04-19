const Liked= require('../module/likeid.module');
const Disliked = require('../module/dislikeid.module');
const id= require('../module/signup.module');

exports.likeprofile= async(req,res)=>{
    
    try {
        const { profileId } = req.body;
        // Save the liked profile to the database
        const likedid = await Liked.create({ profileId });
        res.send({ message: `Liked your profile id ${profileId}` });
    } catch (error) {
        console.error("Error occurred while saving liked profile:", error);
        res.status(500).send({ message: "Internal Server Error" });
}
};

exports.dislikeprofile= async(req,res)=>{
    try {
        const { profileId } = req.body;
        // Save the disliked profile to the database
        const dislikedid = await Disliked.create({ profileId });
        res.send({ message: `Disliked your profile id ${profileId}` });
    } catch (error) {
        console.error("Error occurred while saving disliked profile:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};