const express = require('express');
const bodyParser= require('body-parser');
const changepasswordcontroler= require('../controler/changepassword');

const Router= express.Router();
const app = express();
//app.use(jwtmiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


Router.put('/:userId',changepasswordcontroler.changepassword);
module.exports=Router;