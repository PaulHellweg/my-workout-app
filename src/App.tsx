import React, { useState } from 'react';
import { Exercise, Workout, WorkoutExercise } from './types';

const initialExercises: Exercise[] = [
  { id: '1', name: 'Bankdrücken', description: 'Brustübung' },
  { id: '2', name: 'Kniebeugen', description: 'Beinübung' }
];

const App: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [workoutName, setWorkoutName] = useState('');
  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const [repetitions, setRepetitions] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [exerciseName, setExerciseName] = useState('')
  const [exerciseDescription, setExerciseDescription] = useState('')

  const addWorkout = () => {
    if (!workoutName) return;
    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: workoutName,
      date: new Date().toISOString(),
      exercises: []
    };
    setWorkouts([...workouts, newWorkout]);
    setWorkoutName('');
  };

  const addExercise = (exercise: Exercise) => {
    let newExercises = exercises

  }

  const addExerciseToWorkout = (workoutId: string) => {
    if (!selectedExerciseId) return;
    const updatedWorkouts = workouts.map(workout => {
      if (workout.id === workoutId) {
        const newWorkoutExercise: WorkoutExercise = {
          exerciseId: selectedExerciseId,
          sets: [{ repetitions, weight }]
        };
        return { ...workout, exercises: [...workout.exercises, newWorkoutExercise] };
      }
      return workout;
    });
    setWorkouts(updatedWorkouts);
    setSelectedExerciseId('');
    setRepetitions(0);
    setWeight(0);
  };

  return (
    <div style={{ padding: '20px' }}> 
      <h1>My Workout App</h1>
      <section>
        <h2>Workout erstellen</h2>
        <input 
          type="text" 
          placeholder="Workout Name" 
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
        />
        <button onClick={addWorkout}>Workout hinzufügen</button>
      </section>
      <section>
        <h2>
          Exercise erstellen
        </h2>
        <input type="text"
          placeholder='Exercise name'
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)} />
           <button onClick={addWorkout}>Exercise hinzufügen</button>
      </section>
      <section>
        <h2>Workouts</h2>
        {workouts.map((workout) => (
          <div key={workout.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{workout.name}</h3>
            <p>{new Date(workout.date).toLocaleString()}</p>
            <div>
              <h4>Übung hinzufügen</h4>
              <select 
                value={selectedExerciseId} 
                onChange={(e) => setSelectedExerciseId(e.target.value)}
              >
                <option value="">Übung auswählen</option>
                {exercises.map((exercise) => (
                  <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                ))}
              </select>
              <input 
                type="number" 
                placeholder="Wiederholungen" 
                value={repetitions}
                onChange={(e) => setRepetitions(parseInt(e.target.value))}
              />
              <input 
                type="number" 
                placeholder="Gewicht" 
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
              />
              <button onClick={() => addExerciseToWorkout(workout.id)}>Übung hinzufügen</button>
            </div>
            <div>
              <h4>Übungen im Workout:</h4>
              <ul>
                {workout.exercises.map((we, index) => {
                  const exercise = exercises.find(e => e.id === we.exerciseId);
                  return (
                    <li key={index}>
                      {exercise ? exercise.name : 'Unbekannte Übung'} - 
                      {we.sets.map((set, i) => (
                        <span key={i}> Set {i + 1}: {set.repetitions} Wiederholungen bei {set.weight}kg; </span>
                      ))}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default App;
