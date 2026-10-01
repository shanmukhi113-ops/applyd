require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Connection failed:', err.message));

const express = require('express');
const app = express();

app.use(express.json());

const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello, this is my server');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

app.listen(process.env.PORT, () => {
  console.log('Server is running');
});