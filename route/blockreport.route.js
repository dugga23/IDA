const express= require('express');
const bodyParser= require('body-parser');
const app= express();
const Router= express.Router();
const blocked= require('../module/block.module');
const reported= require('../module/report.module')
const id= require('./signup.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Router.post('/block', async (req, res) => {

    try {
        const { profileId } = req.body;
        // Save the liked profile to the database
        const block = await blocked.create({ profileId });
        res.send({ message: `blocked profile ${profileId}` });
    } catch (error) {
        console.error("Error occurred while saving blocked profile:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Route for disliking a profile
Router.post('/report', async (req, res) => {
    try {
        const { profileId } = req.body;
        // Save the disliked profile to the database
        const report = await reported.create({ profileId });
        res.send({ message: `reported profile ${profileId}` });
    } catch (error) {
        console.error("Error occurred while saving reported profile:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = Router;
