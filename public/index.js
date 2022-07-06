const exerciseSelect = document.getElementById('exercise');

function getExercises() {
    axios.get('http://localhost:3005/exercises')
        .then(res => {
            res.data.forEach(exercise => {
                const option = document.createElement('option')
                option.setAttribute('value', exercise['exercise_name'])
                option.textContent = exercise.exercise_name
                exerciseSelect.appendChild(option)
            })
        })
}

getExercises();