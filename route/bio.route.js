const express= require('express');
const Router= express.Router();
const biocontroler= require('../controler/bio');
const bodyParser= require('body-parser');
const app= express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


Router.post('/:username', biocontroler.addbio);
Router.put('/:username', biocontroler.updatebio);
Router.delete('/:username',biocontroler.deletebio);

module.exports=Router;