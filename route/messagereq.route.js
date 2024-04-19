const express = require("express");
const Router= express.Router();
const bodyParser= require('body-parser');
const app = express();
const messagerequestcontroler= require('../controler/messagerequest');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



Router.post('/message-request',messagerequestcontroler.messagaereq);
Router.get('/message-request',messagerequestcontroler.getmessagereq);
module.exports=Router;