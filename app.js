const express = require('express');
const app= express();
const bodyParser= require('body-parser');
const port= process.env.PORT|| 4040;
const cors = require('cors');
const mongoose= require('mongoose');
const config = require('./DB');
//const Router= express.Router();
//const jwtmiddleware= require('./jwt');

const signupRouter = require('./route/signup.route');
const loginRouter= require('./route/login.route');
const otpRouter=require('./route/otp.route');
const verifyotpRouter= require('./route/verifyotp.route');
const profileRouter= require('./route/profile.route');
const updateRouter= require('./route/update.route');
const deleteRouter= require('./route/delete.route');
const likedislikeRouter= require('./route/likedislike.route');
const blockreportRouter= require('./route/blockreport.route');
const streakRouter= require('./route/streak.route');
const statusRouter= require('./route/status.route');
const changepassRouter= require('./route/changepass.route');
const forgetpassRouter= require('./route/forgetpass.route');
const messageReqRouter= require('./route/messagereq.route');
const photoUploadRouter= require('./route/photoupload.route');
const searchRouter= require('./route/search.route');
const postcreateRouter= require('./route/postcreate.route');
const languageRouter= require('./route/language.route');
//const logoutRouter= require('./route/logout.route');
const bioRouter=require('./route/bio.route');


app.use(cors());
 //app.use(jwtmiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use('/signup', signupRouter);
app.use('/login',loginRouter);
app.use('/otp',otpRouter);
app.use('/verifyotp',verifyotpRouter);
app.use('/profile',  profileRouter);
app.use('/update',updateRouter);
app.use('/delete',deleteRouter);
app.use('/',likedislikeRouter);
app.use('/',blockreportRouter);
app.use('/streak',streakRouter);
app.use('/status',statusRouter);
app.use('/change-password',changepassRouter);
app.use('/forget-password',forgetpassRouter);
app.use('/', messageReqRouter);
app.use('/',photoUploadRouter);
app.use('/',searchRouter);
app.use('/',postcreateRouter);
app.use('/',languageRouter);
app.use('/bio',bioRouter);
//app.use('/logout',logoutRouter);


mongoose.Promise = global.Promise;
mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Database is connected ' + config.DB);
});

mongoose.connection.on('error', (err) => {
  console.log('Cannot connect to the database ' + err);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;