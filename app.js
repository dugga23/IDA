const express = require('express');
const app= express();
const bodyParser= require('body-parser');
const port= process.env.PORT|| 4040;
const cors = require('cors');
const mongoose= require('mongoose');
const config = require('./DB');


const signupRouter = require('./route/signup.route');
const loginRouter= require('./route/login.route');
const otpRouter=require('./route/otp.route');
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
const logoutRouter= require('./route/logout.route');
const bioRouter=require('./route/bio.route');
const jwtmiddleware = require('./middleware/jwtmiddleware');


app.use(cors());
 //app.use(jwtmiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use('/signup', signupRouter);
app.use('/login',loginRouter);
app.use('/',otpRouter);
app.use('/profile',jwtmiddleware,  profileRouter);
app.use('/update',jwtmiddleware, updateRouter);
app.use('/delete',jwtmiddleware,deleteRouter);
app.use('/',jwtmiddleware,likedislikeRouter);
app.use('/',jwtmiddleware,blockreportRouter);
app.use('/streak',jwtmiddleware,streakRouter);
app.use('/status',jwtmiddleware,statusRouter);
app.use('/change-password',jwtmiddleware,changepassRouter);
app.use('/forget-password',jwtmiddleware,forgetpassRouter);
app.use('/',jwtmiddleware, messageReqRouter);
app.use('/',jwtmiddleware,photoUploadRouter);
app.use('/',jwtmiddleware,searchRouter);
app.use('/',jwtmiddleware,postcreateRouter);
app.use('/',jwtmiddleware,languageRouter);
app.use('/bio',jwtmiddleware,bioRouter);
app.use('/logout',logoutRouter);


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