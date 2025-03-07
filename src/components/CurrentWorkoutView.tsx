import React from 'react';
import { Box, Typography, Paper, Checkbox, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Workout } from '../types';

interface CurrentWorkoutViewProps {
  currentWorkout: Workout | null;
  toggleSetCompletion: (exerciseIndex: number, setIndex: number) => void;
  finishWorkout: () => void;
}

const CurrentWorkoutView: React.FC<CurrentWorkoutViewProps> = ({
  currentWorkout,
  toggleSetCompletion,
  finishWorkout,
}) => {
  const { t } = useTranslation();

  if (!currentWorkout) {
    return (
      <Paper style={{ padding: '20px' }}>
        <Typography variant="body1">
          {t('no_current_workout') || 'Kein aktuelles Workout gestartet.'}
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h6">
        {t('current_workout') || 'Current Workout'}: {currentWorkout.name}
      </Typography>
      {currentWorkout.exercises.map((we, exIdx) => (
        <Box key={exIdx} marginTop={2}>
          <Typography variant="subtitle1">
            {t('exercise')} {exIdx + 1}
          </Typography>
          {we.sets.map((set, setIdx) => (
            <Box key={setIdx} display="flex" alignItems="center">
              <Checkbox
                checked={set.completed || false}
                onChange={() => toggleSetCompletion(exIdx, setIdx)}
              />
              <Typography variant="body2">
                {t('set') || 'Set'} {setIdx + 1}: {set.repetitions}{' '}
                {t('repetitions_at') || 'Wiederholungen bei'} {set.weight}kg
              </Typography>
            </Box>
          ))}
        </Box>
      ))}
      <Box marginTop={2}>
        <Button variant="contained" color="secondary" onClick={finishWorkout}>
          {t('finish_workout') || 'Workout beenden'}
        </Button>
      </Box>
    </Paper>
  );
};

export default CurrentWorkoutView;
