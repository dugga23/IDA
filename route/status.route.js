const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const Status = require('../module/status.module');
const Router = express.Router();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/status', Router);
Router.post('/', async (req, res) => {
    try {
        const { message } = req.body;
        const newStatus = new Status({
            message,
            
        });
        await newStatus.save();
        res.status(201).json(newStatus);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'server error' });
    }
});
Router.delete('/', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required for deletion' });
        }

        await Status.deleteOne({ message });
        res.status(200).json({ message: `Status with message '${message}' deleted` });
    } catch (error) {
        console.error('Failed to delete status:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
cron.schedule('0 0 * * *', async () => {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        await Status.deleteMany({ createdAt: { $lt: twentyFourHoursAgo } });
        console.log('expired statuses deleted');
    } catch (error) {
        console.error('failed to delete expired statuses:', error);
    }
});
module.exports=Router;

