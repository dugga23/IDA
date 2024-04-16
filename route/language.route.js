const express= require ('express');
const bodyParser= require('body-parser');
const app= express();
const Router= express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let language='english';

Router.get('/toggle-language',(req,res)=>{
    language= language==='english'?'hindi':'english';
    res.json({message:`language changed to ${language}`});
});

Router.get('/current-language',(req,res)=>{
    res.json({language});
});

module.exports=Router;
