let signup= require('../module/signup.module');

exports.addbio=async(req,res)=>{
    const {username}= req.params;
    const {bio}=req.body;
    try{
    const existingUser= await signup.findOne({$or:[{username}]});
    if(!existingUser){
return res.status(400).json({message:'user not exists'});
    }
    if(!bio){
        return res.status(400).json({message:'bio is require'});
    }
existingUser.bio= bio;
await existingUser.save();
res.json({message:'bio added successfully'});

}catch(err){
    console.error('error saving user bio to database:',err);
    res.status(500).json({message:'error saving user bio to database',error:err});
}
};

exports.updatebio= async(req,res)=>{
    const username = req.params.username;
    const { bio } = req.body;
    //console.log('Received PUT request for username:', username, 'with bio:', bio);
    if (!bio) {
        return res.status(400).json({ error: 'bio is required' });
    }
    try {
        const user = await signup.findOne({ username });
        if (!user) {
            console.log('User not found with username:', username);
            return res.status(404).json({ error: 'user not found' });
        }
        console.log('Found user:', user);
        await signup.updateOne({ username }, { $set: { bio } });
      //  console.log('User bio updated successfully:', bio);
        res.status(200).json({ message: 'bio updated successfully' });
    } catch (err) {
        console.error('Error updating user bio in the database:', err);
        res.status(500).json({ error: 'Error updating user bio in the database', details: err });
    }
};

exports.deletebio= async(req,res)=>{
    const { username } = req.params;
    try {
        const existingUser = await signup.findOne({ username });
        if (!existingUser) {
            return res.status(404).json({ message: 'user not found' });
        }
        existingUser.bio = undefined; // Remove the bio field
        await existingUser.save(); // Save the updated document
        res.json({ message: 'bio deleted successfully' });
    } catch (error) {
        console.error('error deleting bio:', error);
        res.status(500).json({ message: 'error deleting bio', error });
    }
};
