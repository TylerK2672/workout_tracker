const exerciseSelect = document.getElementById('exercise');
const commitBtn = document.getElementById('commitBtn');
const exerciseForm = document.getElementById('workoutForm');
const exercise = document.getElementById('exercise');
const weight = document.getElementById('weight');
const reps = document.getElementById('reps');
const set_num = document.getElementById('set_num');
const table = document.getElementById('workoutsTable');

function sortExercises()
{

}

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
    table.innerHTML = '<thead><th>Exercise</th><th>Weight</th><th>Reps</th><th>Set #</th><th>Date</th>';
    axios.get('/workouts')
    .then(res =>
    {
        res.data.forEach(workouts =>
        {
            const row = document.createElement('tr');
            //create td's
            const exercise_name = document.createElement('td');
            const weight = document.createElement('td');
            const reps = document.createElement('td');
            const set_num = document.createElement('td');
            const day = document.createElement('td');
            const editTd = document.createElement('td');
            const deleteTd = document.createElement('td');
            const editBtn = document.createElement('input');
            const deleteBtn = document.createElement('input');

            //add classname
            exercise_name.classList.add('workouts');
            weight.classList.add('workouts');
            reps.classList.add('workouts');
            set_num.classList.add('workouts');
            day.classList.add('workouts');
            editTd.classList.add('workouts');
            deleteTd.classList.add('workouts');

            //set buttons
            editBtn.type = 'button';
            deleteBtn.type = 'button';
            editBtn.value = 'edit';
            deleteBtn.value = 'delete';

            //set text content
            exercise_name.textContent = workouts.exercise_name;
            weight.textContent = workouts.weight;
            reps.textContent = workouts.reps;
            set_num.textContent = workouts.set_num;
            day.textContent = workouts.day;

            //append buttons to edit/delete
            editTd.appendChild(editBtn);
            deleteTd.appendChild(deleteBtn);

            //add functionality to buttons
            editBtn.addEventListener('click', editWorkout);
            deleteBtn.addEventListener('click', deleteWorkout(`${workouts['workout_id']}`));

            //append onto row
            row.appendChild(exercise_name);
            row.appendChild(weight);
            row.appendChild(reps);
            row.appendChild(set_num);
            row.appendChild(day);
            row.appendChild(editBtn);
            row.appendChild(deleteBtn);
            table.appendChild(row);
        })
    })
}

function submitWorkout(e)
{
    e.preventDefault();

    if(exercise.value === 'none')
    {
        alert('Please choose an exercise.\nIf the exercise you want is not listed, you can add it by clicking the "add a workout" button.');
        return
    }
    else if(weight.value < 0 || weight.value.length === 0)
    {
        alert('Please enter a weight');
        return
    }
    else if(reps.value < 0 || reps.value.length === 0)
    {
        alert('Please enter a rep amount');
    }
    else if(set_num.value < 0 || set_num.value.length === 0)
    {
        alert('Please enter a set number');
    }

    const d = new Date();
    d.toISOString().split('T')[0]+' '+d.toTimeString().split(' ')[0];
    let body = {
        exercise_name: exercise.value, 
        weight: weight.value, 
        reps: reps.value,
        set_num: set_num.value,
        date: d
    }

    axios.post('/workouts', body)
    .then(() => {
        exercise.value = 'none';
        weight.value = '';
        reps.value = '';
        set_num.value = '';
        getWorkouts();
    })
}

function deleteWorkout(workout_id)
{
    axios.delete(`/workouts/${workout_id}`).then(() => getWorkouts())
}

function editWorkout()
{
    alert('edited');
}

// sortWorkouts();
getExercises();
getWorkouts();
exerciseForm.addEventListener('submit', submitWorkout)