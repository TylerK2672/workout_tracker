const express = require('express');
const path = require('path');

const app = express();

const SERVER_PORT = process.env.PORT || 3005;

app.get('/', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../landing.html'));
});

app.get('/addExercise', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../pages/addExercise.html'));
});

app.listen(SERVER_PORT, () =>
{
    console.log(`server running on port ${SERVER_PORT}`)
});