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