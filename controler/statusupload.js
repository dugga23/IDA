
const Status = require('../module/status.module');

exports.statusupload= async(req,res)=>{
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
};

exports.statusdelete=async(req,res)=>{
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
};

exports.deleteExpiredStatuses = async () => {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        await Status.deleteMany({ createdAt: { $lt: twentyFourHoursAgo } });
        console.log('Expired statuses deleted');
    } catch (error) {
        console.error('Failed to delete expired statuses:', error);
    }
};
