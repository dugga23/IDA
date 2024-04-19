let language='english';
exports.changelanguage= async(req,res)=>{
    language= language==='english'?'hindi':'english';
    res.json({message:`language changed to ${language}`});
};
exports.getlanguage=async(req,res)=>{
    res.json({language});
}