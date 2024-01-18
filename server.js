// Install necessary npm packages: express, mongoose, body-parser
// Create a file (e.g., server.js) for your server-side code

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; // Choose a port number

mongoose.connect('mongodb://localhost:27017/gpaDatabase', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const gpaSchema = new mongoose.Schema({
    name: String,
    unweightedGPA: String,
    weightedGPA: String,
});

const GPA = mongoose.model('GPA', gpaSchema);

app.use(bodyParser.json());

app.post('/saveData', (req, res) => {
    const newData = req.body;

    const gpaEntry = new GPA(newData);

    gpaEntry.save((err) => {
        if (err) {
            console.error('Error saving data:', err);
            res.status(500).json({ error: 'Error saving data to MongoDB' });
        } else {
            console.log('Data saved to MongoDB');
            res.json({ success: true });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
