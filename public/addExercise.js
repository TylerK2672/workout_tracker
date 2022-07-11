//grouped checkboxes
const pBoxes = document.querySelectorAll('[name="main_muscles"]');
const sBoxes = document.querySelectorAll('[name="secondary_muscles"')

//other variables
const addExerciseForm = document.getElementById('addExerciseForm');
const exercise_name = document.getElementById('exercise_name');
const table = document.getElementById('exercisesTable')

function getExercises()
{
    table.innerHTML = '<thead><th>Exercise</th><th>Main Muscles</th><th>Secondary Muscles</th></thead>';
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
            const editBtn = document.createElement('input');
            const deleteBtn = document.createElement('input');

            //add classname
            exercise_name.classList.add('exercises');
            main_muscles.classList.add('exercises');
            secondary_muscles.classList.add('exercises');

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
            editBtn.addEventListener('click', editExercise);
            deleteBtn.addEventListener('click', () => 
            {
                deleteExercise(`${exercise['exercise_id']}`)
            }
            );

            //append
            row.appendChild(exercise_name);
            row.appendChild(main_muscles);
            row.appendChild(secondary_muscles);
            row.appendChild(editBtn);
            row.appendChild(deleteBtn);
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
    }
    else if(checkIfChecked() === false)
    {
        alert('You must select at least one main muscle worked in the exercise')
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

function editExercise()
{
    alert('edited');
}

getExercises();
addExerciseForm.addEventListener('submit', addExercise);