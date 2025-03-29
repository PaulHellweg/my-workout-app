import React, { use, useEffect } from 'react';

import { AppData, CompletedWorkout } from '../types';
import { loadAppData } from '../dataManager';

export const useFinishedWorkouts = () => {
  const [completedWorkouts, setCompletedWorkouts] = React.useState<
    CompletedWorkout[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedData: AppData | null = await loadAppData();
      if (storedData) {
        setCompletedWorkouts(storedData.completedWorkouts);
      }
    };
    fetchData();
  }, []);

  return {
    completedWorkouts,
  };
};
