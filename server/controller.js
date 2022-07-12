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
    },

    postExercise: (req, res) =>
    {
        let { exercise_name, primary_muscles, secondary_muscles } = req.body
        sequelize.query(`
            INSERT INTO exercises(exercise_name, main_muscles, secondary_muscles)
            VALUES ('${exercise_name}', '${primary_muscles}', '${secondary_muscles}')
        `)
    },

    deleteExercise: (req, res) =>
    {
        sequelize.query(`
            DELETE FROM exercises WHERE exercise_id = ${req.params.id}
        `).then(dbRes => res.status(200).send(dbRes[0]))
    },

    getWorkoutById: (req, res) =>
    {
        sequelize.query(`
            SELECT * FROM workouts WHERE workout_id = ${req.params.id}
        `).then(dbRes => res.status(200).send(dbRes[0]))
    },

    updateWorkout: (req, res) =>
    {
        sequelize.query(`
            UPDATE workouts
            SET exercise_name = '${req.body.exercise_name}', weight = ${req.body.weight}, reps = ${req.body.reps}, set_num = ${req.body.set_num}, day = '${req.body.date}'
            WHERE workout_id = ${req.body.id}
        `).then(dbRes => res.status(200).send(dbRes[0]))
    }
}