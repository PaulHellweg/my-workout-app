import { useState, useEffect } from 'react';
import { Exercise, AppData, Workout, CompletedWorkout } from '../types';
import { loadAppData, saveAppData } from '../dataManager';

export const useExerciseManager = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [existingWorkouts, setExistingWorkouts] = useState<Workout[]>([]);
  const [completedWorkouts, setCompletedWorkouts] = useState<
    CompletedWorkout[]
  >([]);

  useEffect(() => {
    (async () => {
      const storedData: AppData | null = await loadAppData();
      if (storedData) {
        setExercises(storedData.exercises);
        setExistingWorkouts(storedData.workouts);
        setCompletedWorkouts(storedData.completedWorkouts);
      }
    })();
  }, []);

  const persistExercises = async (newExercises: Exercise[]) => {
    setExercises(newExercises);
    await saveAppData({
      exercises: newExercises,
      workouts: existingWorkouts,
      completedWorkouts: completedWorkouts,
    });
  };

  const addExercise = async (exerciseName: string) => {
    if (!exerciseName.trim()) return;
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: exerciseName,
      description: '',
    };
    const updatedExercises = [...exercises, newExercise];
    await persistExercises(updatedExercises);
  };
  const updateExercise = async (exerciseId: string, newName: string) => {
    const updatedExercises = exercises.map((e) =>
      e.id === exerciseId ? { ...e, name: newName } : e
    );
    await persistExercises(updatedExercises);
  };

  const deleteExercise = async (exerciseId: string) => {
    const updatedExercises = exercises.filter((e) => e.id !== exerciseId);
    await persistExercises(updatedExercises);
  };

  return {
    exercises,
    addExercise,
    updateExercise,
    deleteExercise,
    setExercises,
  };
};
