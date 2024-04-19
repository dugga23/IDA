const express= require('express');
const bodyParser= require('body-parser');
const streakcontroler= require('../controler/streak');

const app= express();
const Router= express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Router.get('/:userId', streakcontroler.getstreak);

Router.post('/:userId',streakcontroler.createstreak);
Router.delete ('/:userId',streakcontroler.deletestreak);
module.exports= Router;
