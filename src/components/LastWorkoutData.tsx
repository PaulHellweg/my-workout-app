import React, { useMemo } from 'react';
import { Paper, Typography } from '@mui/material';
import { CompletedWorkout } from '../types';

interface LastWorkoutDataProps {
  completedWorkouts: CompletedWorkout[];
}

const LastWorkoutData: React.FC<LastWorkoutDataProps> = ({
  completedWorkouts,
}) => {
  const lastWorkout = useMemo(() => {
    if (completedWorkouts.length === 0) return null;
    // Sortiere nach dem Abschlussdatum und nimm das zuletzt abgeschlossene Workout
    const sorted = [...completedWorkouts].sort(
      (a, b) =>
        new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()
    );
    return sorted[sorted.length - 1];
  }, [completedWorkouts]);

  if (!lastWorkout) {
    return (
      <Typography variant="body1">Kein letztes Workout gefunden.</Typography>
    );
  }

  return (
    <Paper style={{ padding: 16, marginBottom: 16 }}>
      <Typography variant="h6">Letztes Workout</Typography>
      <Typography variant="body1">Name: {lastWorkout.name}</Typography>
      <Typography variant="body1">
        Abgeschlossen am: {new Date(lastWorkout.completedAt).toLocaleString()}
      </Typography>
    </Paper>
  );
};

export default LastWorkoutData;
