const blocked= require('../module/block.module');
const reported= require('../module/report.module')


exports.blockprofile= async(req,res)=>{
    try {
        const { profileId } = req.body;
        // Save the liked profile to the database
        const block = await blocked.create({ profileId });
        res.send({ message: `blocked profile ${profileId}` });
    } catch (error) {
        console.error("Error occurred while saving blocked profile:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

exports.reportprofile= async(req,res)=>{
    try {
        const { profileId } = req.body;
        // Save the disliked profile to the database
        const report = await reported.create({ profileId });
        res.send({ message: `reported profile ${profileId}` });
    } catch (error) {
        console.error("Error occurred while saving reported profile:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}