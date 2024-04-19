const express= require('express');
const app= express();
const bodyParser= require('body-parser');
const Router=express.Router();
const logoutcontroler= require('../controler/login')
//const jwtmiddleware= require('../jwt');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/logout',Router);
Router.post('/:userId',logoutcontroler.logout);

module.exports=Router;


