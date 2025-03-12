import { useState } from 'react';
import { Workout } from '../types';

export const useCurrentWorkout = () => {
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);

  const startWorkout = (workout: Workout) => {
    setCurrentWorkout(workout);
  };

  const toggleSetCompletion = (exerciseIndex: number, setIndex: number) => {
    if (!currentWorkout) return;
    const updatedWorkout = { ...currentWorkout };
    const exercise = updatedWorkout.exercises[exerciseIndex];
    exercise.sets[setIndex].completed = !exercise.sets[setIndex].completed;
    setCurrentWorkout(updatedWorkout);
  };

  const updateSet = (
    exerciseIndex: number,
    setIndex: number,
    field: 'repetitions' | 'weight',
    value: number
  ) => {
    if (!currentWorkout) return;
    const updatedWorkout = { ...currentWorkout };
    updatedWorkout.exercises[exerciseIndex].sets[setIndex] = {
      ...updatedWorkout.exercises[exerciseIndex].sets[setIndex],
      [field]: value,
    };
    setCurrentWorkout(updatedWorkout);
  };

  const addSets = (exerciseIndex: number, numberOfSets: number) => {
    if (!currentWorkout) return;
    const updatedWorkout = { ...currentWorkout };
    const newSets = Array.from({ length: numberOfSets }, () => ({
      repetitions: 0,
      weight: 0,
      completed: false,
    }));
    updatedWorkout.exercises[exerciseIndex].sets = [
      ...updatedWorkout.exercises[exerciseIndex].sets,
      ...newSets,
    ];
    setCurrentWorkout(updatedWorkout);
  };

  const deleteSet = (exerciseIndex: number, setIndex: number) => {
    if (!currentWorkout) return;
    const updatedWorkout = { ...currentWorkout };
    updatedWorkout.exercises[exerciseIndex].sets.splice(setIndex, 1);
    setCurrentWorkout(updatedWorkout);
  };

  const finishWorkout = () => {
    setCurrentWorkout(null);
  };

  return {
    currentWorkout,
    startWorkout,
    toggleSetCompletion,
    updateSet,
    addSets,
    finishWorkout,
    deleteSet,
  };
};
