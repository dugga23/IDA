const express= require('express');
const bodyParser= require('body-parser');
const app= express();
const Router= express.Router();
const blockreportcontroler= require('../controler/blockreport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Router.post('/block',blockreportcontroler.blockprofile);

// Route for disliking a profile
Router.post('/report', blockreportcontroler.reportprofile);

module.exports = Router;
