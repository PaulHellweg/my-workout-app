import React from 'react';
import {
  Paper,
  Grid,
  ListItem,
  ListItemText,
  Typography,
  Stack,
} from '@mui/material';
import { CompletedWorkout } from '../../../types';
import WorkoutExerciseItem from './WorkoutExerciseItem';
import { t } from 'i18next';

interface WorkoutCardProps {
  workout: CompletedWorkout;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const getTotalSets = () =>
    workout.exercises.reduce((acc, ex) => acc + ex.sets.length, 0);

  const getTotalReps = () =>
    workout.exercises.reduce(
      (acc, ex) => acc + ex.sets.reduce((sAcc, s) => sAcc + s.repetitions, 0),
      0
    );

  const getTotalWeight = () =>
    workout.exercises.reduce(
      (acc, ex) => acc + ex.sets.reduce((sAcc, s) => sAcc + s.weight, 0),
      0
    );

  return (
    <Paper
      style={{
        padding: '12px',
        marginBottom: '12px',
        borderRadius: '6px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Grid container spacing={1}>
        <Grid xs={12}>
          <ListItem dense disableGutters>
            <ListItemText
              primary={
                <Typography variant="subtitle1" fontWeight={600}>
                  {workout.name || t('workout_name', { name: workout.name })}
                </Typography>
              }
              secondary={
                <Typography variant="caption" color="text.secondary">
                  {formatDate(workout.date)}
                </Typography>
              }
            />
          </ListItem>
        </Grid>

        {workout.exercises.map((exercise, idx) => (
          <WorkoutExerciseItem
            key={idx}
            name={exercise.name}
            sets={exercise.sets.length}
          />
        ))}

        <Grid xs={12}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-start"
            alignItems="center"
            px={2}
            mt={1}
          >
            <Typography variant="caption">
              {t('total_exercises')}:<strong>{workout.exercises.length}</strong>
            </Typography>
            <Typography variant="caption">
              {t('total_sets')}: <strong>{getTotalSets()}</strong>
            </Typography>
            <Typography variant="caption">
              {t('total_reps')}: <strong>{getTotalReps()}</strong>
            </Typography>
            <Typography variant="caption">
              {t('total_weight')}: <strong>{getTotalWeight()}</strong>
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WorkoutCard;
