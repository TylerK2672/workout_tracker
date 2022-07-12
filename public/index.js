const exerciseSelect = document.getElementById('exercise');
const commitBtn = document.getElementById('commitBtn');
const workoutForm = document.getElementById('workoutForm');
const exercise = document.getElementById('exercise');
const weight = document.getElementById('weight');
const reps = document.getElementById('reps');
const set_num = document.getElementById('set_num');
const table = document.getElementById('workoutsTable');
const editTable = document.getElementById('editTable');
const postEditBtnDiv = document.getElementById('postEditBtnDiv');
const postEditBtn = document.createElement('input');
postEditBtn.type = "button";
postEditBtn.value = "Post Changes"

function sortExercises()
{

}

function getExercises(select) 
{
    axios.get('/exercises')
    .then(res => 
    {
        res.data.forEach(exercise => 
        {
            const option = document.createElement('option');
            option.setAttribute('value', exercise['exercise_name']);
            option.textContent = exercise.exercise_name;
            select.appendChild(option);
        })
    })
}

function getWorkouts()
{
    table.innerHTML = '';
    table.innerHTML = '<thead align="center"><th>Exercise</th><th>Weight</th><th>Reps</th><th>Set #</th><th>Date</th><th>Edit</th><th>Delete</th></thead>';
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

            //align center
            exercise_name.style.textAlign = "center";
            weight.style.textAlign = "center";
            reps.style.textAlign = "center";
            set_num.style.textAlign = "center";
            day.style.textAlign = "center";
            editTd.style.textAlign = "center";
            deleteTd.style.textAlign = "center";

            //buttons
            const editBtn = document.createElement('input');
            const deleteBtn = document.createElement('input');
            editTd.appendChild(editBtn);
            deleteTd.appendChild(deleteBtn);

            //add classname
            exercise_name.classList.add('workouts');
            weight.classList.add('workouts');
            reps.classList.add('workouts');
            set_num.classList.add('workouts');
            day.classList.add('workouts');

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

            //add classes
            editBtn.className = 'btn'
            deleteBtn.className = 'btn'

            //add functionality to buttons
            editBtn.addEventListener('click', () => editWorkout(`${workouts['workout_id']}`));
            deleteBtn.addEventListener('click', () => deleteWorkout(`${workouts['workout_id']}`));

            //append onto row
            row.appendChild(exercise_name);
            row.appendChild(weight);
            row.appendChild(reps);
            row.appendChild(set_num);
            row.appendChild(day);
            row.appendChild(editTd);
            row.appendChild(deleteTd);
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
    let body = 
    {
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

function editWorkout(workout_id)
{
    editTable.innerHTML = '<thead><th >Exercise</th><th>Weight</th><th>Reps</th><th>Set #</th><th>Date</th></thead>';
    axios.get(`/workouts/${workout_id}`)
    .then(res =>
    {
        //showing what you're editing
        // res.data.forEach(workout =>
        // {
        //     const row = document.createElement('tr');
        //     //create td's
        //     const exercise_name = document.createElement('td');
        //     const weight = document.createElement('td');
        //     const reps = document.createElement('td');
        //     const set_num = document.createElement('td');
        //     const day = document.createElement('td');

        //     //add classname
        //     exercise_name.classList.add('workouts');
        //     weight.classList.add('workouts');
        //     reps.classList.add('workouts');
        //     set_num.classList.add('workouts');
        //     day.classList.add('workouts');

        //     //set text content
        //     exercise_name.textContent = workout.exercise_name;
        //     weight.textContent = workout.weight;
        //     reps.textContent = workout.reps;
        //     set_num.textContent = workout.set_num;
        //     day.textContent = workout.day;

        //     //append onto row
        //     row.appendChild(exercise_name);
        //     row.appendChild(weight);
        //     row.appendChild(reps);
        //     row.appendChild(set_num);
        //     row.appendChild(day);

        //     editTable.appendChild(row);
        // })

        //editing tables
        res.data.forEach(workout =>
        {
            //create variables
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

            //create inputs
            const input_exercise_name = document.createElement('select');
            const curr_exercise = document.createElement('option');
            curr_exercise.textContent = workout.exercise_name;
            curr_exercise.value = workout.exercise_name;
            input_exercise_name.appendChild(curr_exercise);
            const input_weight = document.createElement('input');
            input_weight.type = 'number';
            input_weight.value = workout.weight;
            const input_reps = document.createElement('input');
            input_reps.type = 'number';
            input_reps.value = workout.reps
            const input_set_num = document.createElement('input');
            input_set_num.type = 'number';
            input_set_num.value = workout.set_num
            const input_day = document.createElement('input');
            input_day.type = 'date';
            input_day.value = workout.day

            //append to td's
            exercise_name.appendChild(input_exercise_name);
            weight.appendChild(input_weight);
            reps.appendChild(input_reps);
            set_num.appendChild(input_set_num);
            day.appendChild(input_day);

            //add id's
            input_exercise_name.setAttribute('id', 'editedName');
            input_weight.setAttribute('id', 'editedWeight');
            input_reps.setAttribute('id', 'editedReps');
            input_set_num.setAttribute('id', 'editedSetNum');
            input_day.setAttribute('id', 'editedDay');


            //append onto row
            row.appendChild(exercise_name);
            row.appendChild(weight);
            row.appendChild(reps);
            row.appendChild(set_num);
            row.appendChild(day);

            editTable.appendChild(row);

            postEditBtnDiv.appendChild(postEditBtn)
            postEditBtn.addEventListener('click', () => updateWorkout(`${workout['workout_id']}`));
            getExercises(input_exercise_name);
        })
    })
}

function updateWorkout(workout_id)
{
    let body = 
    {
        id: workout_id,
        exercise_name: document.getElementById('editedName').value,
        weight: document.getElementById('editedWeight').value, 
        reps: document.getElementById('editedReps').value,
        set_num: document.getElementById('editedSetNum').value,
        date: document.getElementById('editedDay').value
    }
    axios.put('/workouts', body)
    .then(res =>
    {
        editTable.innerHTML = '';
        postEditBtnDiv.innerHTML = '';
    })
    location.reload();
}

// sortWorkouts();
getExercises(exerciseSelect);
getWorkouts();
workoutForm.addEventListener('submit', submitWorkout);