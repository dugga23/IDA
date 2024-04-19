const express= require ('express');
const bodyParser= require('body-parser');
const app= express();
const Router= express.Router();
const languagecontroler= require('../controler/language');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Router.get('/change-language',languagecontroler.changelanguage);

Router.get('/current-language',languagecontroler.getlanguage);

module.exports=Router;
