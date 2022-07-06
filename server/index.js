require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const SERVER_PORT = process.env.PORT || 3005;
const { getWorkouts } = require('./controller.js')

app.use(express.json());
app.use(cors());

app.get('/', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../public/landing.html'));
});

app.get('/js', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../public/index.js'));
})

app.get('/addExercise', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../public/addExercise.html'));
});

app.get('/exercises', getWorkouts)

app.listen(SERVER_PORT, () =>
{
    console.log(`server running on port ${SERVER_PORT}`);
});