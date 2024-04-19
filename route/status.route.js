const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const Router = express.Router();
const app = express();
const statuscontroler= require('../controler/statusupload');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/status', Router);
Router.post('/', statuscontroler.statusupload);
Router.delete('/', statuscontroler.statusdelete);
cron.schedule('0 0 * * *', statuscontroler.deleteExpiredStatuses);
module.exports=Router;

