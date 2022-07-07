const exerciseSelect = document.getElementById('exercise');

function getExercises() 
{
    axios.get('/exercises')
    .then(res => 
    {
        res.data.forEach(exercise => 
        {
            const option = document.createElement('option');
            option.setAttribute('value', exercise['exercise_name']);
            option.textContent = exercise.exercise_name;
            exerciseSelect.appendChild(option);
        })
    })
}

function getWorkouts()
{
    axios.get('/workouts')
    .then(res =>
    {
        const table = document.getElementById('workoutsTable')
        res.data.forEach(workouts =>
        {
            const row = document.createElement('tr');
            //create td's
            const exercise_name = document.createElement('td');
            const weight = document.createElement('td');
            const reps = document.createElement('td');
            const set_num = document.createElement('td');
            const day = document.createElement('td');

            //add classname
            exercise_name.classList.add('workouts');
            weight.classList.add('workouts');
            reps.classList.add('workouts');
            set_num.classList.add('workouts');
            day.classList.add('workouts');

            //set text content
            exercise_name.textContent = workouts.exercise_name;
            weight.textContent = workouts.weight;
            reps.textContent = workouts.reps;
            set_num.textContent = workouts.set_num;
            day.textContent = workouts.day;

            //append onto row
            row.appendChild(exercise_name);
            row.appendChild(weight);
            row.appendChild(reps);
            row.appendChild(set_num);
            row.appendChild(day);
            table.appendChild(row);
        })
    })
}

getExercises();
getWorkouts();