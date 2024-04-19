const express = require('express');
const bodyParser= require('body-parser');
const Router= express.Router();
const app= express();
const searchcontroler= require('../controler/search');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Router.get('/search',searchcontroler.searchprofile);
module.exports=Router;