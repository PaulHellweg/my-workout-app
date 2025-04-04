import { useState, useEffect } from 'react';
import { Workout, Exercise, AppData, CompletedWorkout } from '../types';
import { loadAppData, saveAppData } from '../dataManager';

export const useWorkoutManager = (exercises: Exercise[]) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [completedWorkouts, setCompletedWorkouts] = useState<
    CompletedWorkout[]
  >([]);

  useEffect(() => {
    (async () => {
      const storedData: AppData | null = await loadAppData();
      if (storedData) {
        setWorkouts(storedData.workouts);
        setCompletedWorkouts(storedData.completedWorkouts);
      }
    })();
  }, []);

  const persistWorkouts = async (newWorkouts: Workout[]) => {
    setWorkouts(newWorkouts);
    await saveAppData({
      exercises,
      workouts: newWorkouts,
      completedWorkouts: completedWorkouts,
    });
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
    workoutId: string | null,
    workoutExercise: Exercise,
    sets: number | null,
    reps: number | null,
    weight: number | null
  ) => {
    const updatedWorkouts = workouts.map((w) =>
      w.id === workoutId
        ? {
            ...w,
            exercises: [
              ...w.exercises,
              {
                exerciseId: workoutExercise.id,
                name: workoutExercise.name,
                sets: Array.from({ length: sets ?? 0 }, () => ({
                  repetitions: reps ?? 0,
                  weight: weight ?? 0,
                  completed: false,
                })),
              },
            ],
          }
        : w
    );
    await persistWorkouts(updatedWorkouts);
  };

  const deleteExerciseFromWorkout = async (
    workoutId: string,
    exerciseId: string
  ) => {
    const updatedWorkouts = workouts.map((w) =>
      w.id === workoutId
        ? {
            ...w,
            exercises: w.exercises.filter((e) => e.exerciseId !== exerciseId),
          }
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
    setWorkouts,
    deleteExerciseFromWorkout,
  };
};
