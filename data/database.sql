create table exercises (
  exercise_id serial primary key,
  exercise_name varchar(50),
  main_muscles varchar(100),
  secondary_muscles varchar(100)
);

create table workouts (
  workout_id serial primary key,
  exercise_name varchar(50),
  weight dec,
  reps dec,
  set_num int,
  day date,
  foreign key (exercise_name) references exercises(exercise_name)
);

insert into exercises (exercise_name, main_muscles, secondary_muscles) 
values ('Bench Press', 'Chest, Triceps', 'Shoulders, Back'),
('Squat', 'Quads, Hamstrings, Glutes', 'Calves, Low Back'),
('Deadlift', 'Upper Back, Lats', 'Hamstrings, Low Back')

insert into workouts (exercise_name, weight, reps, set_num, day)
values ('Bench Press', 135, 12, 1, 2012-12-12),
('Squat', 195, 6, 1, 2012-12-12),
('Squat', 225, 2, 2, 2012-12-12),
('Deadlift', 255, 3, 1, 2015-3-19)