//grouped checkboxes
const pBoxes = document.querySelectorAll('[name="main_muscles"]');
const sBoxes = document.querySelectorAll('[name="secondary_muscles"')

//other variables
const addExerciseForm = document.getElementById('addExerciseForm');
const exercise_name = document.getElementById('exercise_name');
const table = document.getElementById('exercisesTable');
const editTable = document.getElementById('editTable');
const postEditBtnDiv = document.getElementById('postEditBtnDiv');
const postEditBtn = document.createElement('input');
postEditBtn.type = "button";
postEditBtn.value = "Post Changes"

function getExercises()
{
    table.innerHTML = '<thead align="center"><th>Exercise</th><th>Main Muscles</th><th>Secondary Muscles</th><th>Edit</th><th>Delete</th></thead>';
    axios.get('/exercises')
    .then(res =>
    {
        res.data.forEach(exercise =>
        {
            const row = document.createElement('tr');
            //create td's
            const exercise_name = document.createElement('td');
            const main_muscles = document.createElement('td');
            const secondary_muscles = document.createElement('td');
            const editTd = document.createElement('td');
            const deleteTd = document.createElement('td');

            //text align
            exercise_name.style.textAlign = "center";
            main_muscles.style.textAlign = "center";
            secondary_muscles.style.textAlign = "center";
            editTd.style.textAlign = "center";
            deleteTd.style.textAlign = "center";

            //buttons
            const editBtn = document.createElement('input');
            const deleteBtn = document.createElement('input');
            editTd.appendChild(editBtn);
            deleteTd.appendChild(deleteBtn);

            //set buttons
            editBtn.type = 'button';
            deleteBtn.type = 'button';
            editBtn.value = 'edit';
            deleteBtn.value = 'delete';

            //text content
            exercise_name.textContent = exercise.exercise_name;
            main_muscles.textContent = exercise.main_muscles;
            secondary_muscles.textContent = exercise.secondary_muscles;

            //add functionality to buttons
            editBtn.addEventListener('click', () => editExercise(`${exercise['exercise_id']}`));
            deleteBtn.addEventListener('click', () => deleteExercise(`${exercise['exercise_id']}`)
            );

            //add classes
            editBtn.className = 'btn'
            deleteBtn.className = 'btn'

            //append
            row.appendChild(exercise_name);
            row.appendChild(main_muscles);
            row.appendChild(secondary_muscles);
            row.appendChild(editTd);
            row.appendChild(deleteTd);
            table.appendChild(row);
        })
    })
}

function checkIfChecked()
{
    let checked = false;
    for(let i = 0; i < pBoxes.length; i++)
    {
        if(pBoxes[i].checked === true)
        {
            checked = true;
            break;
        }
    }
    return checked;
}

function addExercise(e)
{
    e.preventDefault();

    if(exercise_name.value.length === 0)
    {
        alert('Please enter a workout name')
        return
    }
    else if(checkIfChecked() === false)
    {
        alert('You must select at least one main muscle worked in the exercise')
        return
    }

    let primary_muscles = '';
    let first = true
    for(let i = 0; i < pBoxes.length; i++)
    {
        if(pBoxes[i].checked && first === true)
        {
            primary_muscles += pBoxes[i].value
            first = false;
        }
        else if(pBoxes[i].checked)
        {
            primary_muscles += `, ${pBoxes[i].value}`
        }
    }

    let secondary_muscles = '';
    first = true
    for(let i = 0; i < sBoxes.length; i++)
    {
        if(sBoxes[i].checked && first === true)
        {
            secondary_muscles += sBoxes[i].value
            first = false;
        }
        else if(sBoxes[i].checked)
        {
            secondary_muscles += `, ${sBoxes[i].value}`
        }
    }

    let body = 
    {
        exercise_name: exercise_name.value,
        primary_muscles: primary_muscles,
        secondary_muscles: secondary_muscles
    }

    axios.post('/exercises', body)
    .then(getExercises());
}

function deleteExercise(exercise_id)
{
    console.log(exercise_id);
    axios.delete(`/exercises/${exercise_id}`).then(() => getExercises())
}

function editExercise(exercise_id)
{
    console.log(`edited ${exercise_id}`)
    editTable.innerHTML = '<thead><th>Exercise</th><th>Main Muscles</th><th>Secondary Muscles</th></thead>';
    axios.get(`/exercises/${exercise_id}`)
    .then(res =>
    {
        //editing tables
        res.data.forEach(exercise =>
        {
            //create variables
            const row = document.createElement('tr');

            //create td's
            const exercise_name = document.createElement('td');
            const main_muscles = document.createElement('td');
            const secondary_muscles = document.createElement('td');

            //add classname
            exercise_name.classList.add('exercises');
            main_muscles.classList.add('exercises');
            secondary_muscles.classList.add('exercises');

            //create inputs
            const input_exercise_name = document.createElement('input');
            input_exercise_name.value = exercise.exercise_name
            const input_main_muscles = document.createElement('input');
            input_main_muscles.value = exercise.main_muscles;
            const input_secondary_muscles = document.createElement('input');
            input_secondary_muscles.value = exercise.secondary_muscles

            //append to td's
            exercise_name.appendChild(input_exercise_name);
            main_muscles.appendChild(input_main_muscles);
            secondary_muscles.appendChild(input_secondary_muscles);

            //add id's
            input_exercise_name.setAttribute('id', 'editedName');
            input_main_muscles.setAttribute('id', 'editedMainMuscles');
            input_secondary_muscles.setAttribute('id', 'editedSecondaryMuscles');


            //append onto row
            row.appendChild(exercise_name);
            row.appendChild(main_muscles);
            row.appendChild(secondary_muscles);

            editTable.appendChild(row);

            postEditBtnDiv.appendChild(postEditBtn)
            postEditBtn.className = "btn btn-secondary"
            postEditBtn.addEventListener('click', () => updateExercise(`${exercise['exercise_id']}`));
            getExercises(input_exercise_name);
        })
    })
}

function updateExercise(exercise_id)
{
    let body = 
    {
        id: exercise_id,
        exercise_name: document.getElementById('editedName').value,
        main_muscles: document.getElementById('editedMainMuscles').value, 
        secondary_muscles: document.getElementById('editedSecondaryMuscles').value,
    }
    axios.put('/exercises', body)
    .then(res =>
    {
        editTable.innerHTML = '';
        postEditBtnDiv.innerHTML = '';
    })
    location.reload();
}

getExercises();
addExerciseForm.addEventListener('submit', addExercise);