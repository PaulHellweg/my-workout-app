import { useState } from 'react';
import { Workout, WorkoutExercise } from '../types';

interface CurrentWorkout extends Workout {
  exercises: {
    exerciseId: string;
    sets: (WorkoutExercise['sets'][number] & { completed?: boolean })[];
  }[];
}

export const useCurrentWorkout = () => {
  const [currentWorkout, setCurrentWorkout] = useState<CurrentWorkout | null>(
    null
  );

  const startWorkout = (workout: Workout) => {
    const workoutCopy: CurrentWorkout = {
      ...workout,
      exercises: workout.exercises.map((we) => ({
        ...we,
        sets: we.sets.map((set) => ({ ...set, completed: false })),
      })),
    };
    setCurrentWorkout(workoutCopy);
  };

  const toggleSetCompletion = (exerciseIndex: number, setIndex: number) => {
    if (!currentWorkout) return;
    const updatedWorkout = { ...currentWorkout };
    const exercise = updatedWorkout.exercises[exerciseIndex];
    if (exercise) {
      exercise.sets = exercise.sets.map((set, idx) =>
        idx === setIndex ? { ...set, completed: !set.completed } : set
      );
      setCurrentWorkout(updatedWorkout);
    }
  };

  const finishWorkout = () => {
    setCurrentWorkout(null);
  };

  return {
    currentWorkout,
    startWorkout,
    toggleSetCompletion,
    finishWorkout,
    setCurrentWorkout,
  };
};
