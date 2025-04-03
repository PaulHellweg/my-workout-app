import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { t } from 'i18next';

interface HomeViewProps {
  totalExercises: number;
  totalWorkouts: number;
  lastWorkoutDate?: string;
}

const HomeView: React.FC<HomeViewProps> = ({
  totalExercises,
  totalWorkouts,
  lastWorkoutDate,
}) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t('home_title') || 'Home'}
      </Typography>
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>
          {t('summary') || 'Übersicht'}
        </Typography>
        <Typography variant="body1">
          {t('total_exercises') || 'Gesamtanzahl an Übungen'}: {totalExercises}
        </Typography>
        <Typography variant="body1">
          {t('total_workouts') || 'Gesamtanzahl an Workouts'}: {totalWorkouts}
        </Typography>
        {lastWorkoutDate && (
          <Typography variant="body1">
            {t('last_workout') || 'Letztes Workout'}:{' '}
            {new Date(lastWorkoutDate).toLocaleDateString()}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default HomeView;
