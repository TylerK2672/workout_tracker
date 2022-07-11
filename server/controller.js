const Sequelize = require('sequelize');

let { CONNECTION_STRING } = process.env
let exercises = require('../data/exercises.json');

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = 
{
    getExercises: (req, res) =>
    {
        sequelize.query(`
            SELECT * FROM exercises
        `).then(dbRes => res.status(200).send(dbRes[0]))
    },

    getWorkouts: (req, res) =>
    {
        sequelize.query(`
            SELECT * FROM workouts
        `).then(dbRes => res.status(200).send(dbRes[0]))
    },

    postWorkout: (req, res) =>
    {
        let { exercise_name, weight, reps, set_num, date } = req.body
        sequelize.query(`
            INSERT INTO workouts(exercise_name, weight, reps, set_num, day)
            VALUES ('${exercise_name}','${weight}','${reps}', '${set_num}', '${date}')
        `).then(dbRes => res.status(200).send(dbRes[0]))
    },

    deleteWorkout: (req, res) =>
    {
        sequelize.query(`
            DELETE FROM workouts WHERE workout_id = ${req.params.id}
        `).then(dbRes => res.status(200).send(dbRes[0]))
    }
}