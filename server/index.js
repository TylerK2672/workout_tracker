require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const SERVER_PORT = process.env.PORT || 3005;
const { getExercises, getWorkouts, postWorkout } = require('./controller.js')

app.use(express.json());
app.use(cors());

app.get('/', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../public/landing.html'));
});

app.get('/js', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../public/index.js'));
});

app.get('/addExercise', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../public/addExercise.html'));
});

//exercises
app.get('/exercises', getExercises);

//workouts
app.get('/workouts', getWorkouts);
app.post('/workouts', postWorkout);

app.listen(SERVER_PORT, () =>
{
    console.log(`server running on port ${SERVER_PORT}`);
});