const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Router = express.Router();
const Liked= require('../module/likeid.module');
const Disliked = require('../module/dislikeid.module');
const id= require('../module/signup.module');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route for liking a profile
Router.post('/like', async (req, res) => {

    try {
        const { profileId } = req.body;
        // Save the liked profile to the database
        const likedid = await Liked.create({ profileId });
        res.send({ message: `Liked your profile id ${profileId}` });
    } catch (error) {
        console.error("Error occurred while saving liked profile:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Route for disliking a profile
Router.post('/dislike', async (req, res) => {
    try {
        const { profileId } = req.body;
        // Save the disliked profile to the database
        const dislikedid = await Disliked.create({ profileId });
        res.send({ message: `Disliked your profile id ${profileId}` });
    } catch (error) {
        console.error("Error occurred while saving disliked profile:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = Router;
