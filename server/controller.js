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
    getWorkouts: (req, res) =>
    {
        sequelize.query(`
            SELECT * FROM exercises
        `).then(dbRes => res.status(200).send(dbRes[0]))
    },

    getExercises: (req, res) =>
    {
        sequelize.query(`
            SELECT * FROM workouts
        `).then(dbRes => res.status(200).send(dbRes[0]))
    }
}