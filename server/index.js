require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('Connected failed:', err.message));

const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('Server is running');
})

app.get('/', (req, res) => {
    res.send('Hello, this is my server')
});

app.get('/health', (req, res) => {
    res.json({status: 'ok', time: new Date() });
});