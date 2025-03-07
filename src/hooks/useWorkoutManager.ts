import { useState, useEffect } from 'react';
import { Workout, Exercise, AppData } from '../types';
import { loadAppData, saveAppData } from '../dataManager';

export const useWorkoutManager = (exercises: Exercise[]) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  // Lädt Workouts beim Initialisieren
  useEffect(() => {
    (async () => {
      const storedData: AppData | null = await loadAppData();
      if (storedData) {
        setWorkouts(storedData.workouts);
      }
    })();
  }, []);

  // Persistiere Workouts (und verwende die übergebenen Exercises)
  const persistWorkouts = async (newWorkouts: Workout[]) => {
    setWorkouts(newWorkouts);
    await saveAppData({ exercises, workouts: newWorkouts });
  };

  const addWorkout = async (workoutName: string) => {
    if (!workoutName.trim()) return;
    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: workoutName,
      date: new Date().toISOString(),
      exercises: [],
    };
    const updatedWorkouts = [...workouts, newWorkout];
    await persistWorkouts(updatedWorkouts);
  };

  const updateWorkout = async (workoutId: string, newName: string) => {
    const updatedWorkouts = workouts.map((w) =>
      w.id === workoutId ? { ...w, name: newName } : w
    );
    await persistWorkouts(updatedWorkouts);
  };

  const deleteWorkout = async (workoutId: string) => {
    const updatedWorkouts = workouts.filter((w) => w.id !== workoutId);
    await persistWorkouts(updatedWorkouts);
  };

  const addExerciseToWorkout = async (
    workoutId: string,
    workoutExercise: Workout['exercises'][number]
  ) => {
    const updatedWorkouts = workouts.map((w) =>
      w.id === workoutId
        ? { ...w, exercises: [...w.exercises, workoutExercise] }
        : w
    );
    await persistWorkouts(updatedWorkouts);
  };

  return {
    workouts,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    addExerciseToWorkout,
    setWorkouts, // Für direkte State-Anpassungen, falls nötig
  };
};
