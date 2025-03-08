import React, { useState } from 'react';
import { Workout, WorkoutExercise, Exercise } from '../types';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
} from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import AddExerciseToWorkoutForm from './AddExerciseToWorkoutForm';

interface WorkoutListProps {
  workouts: Workout[];
  addWorkout: (workoutName: string) => Promise<void>;
  updateWorkout: (workoutId: string, newName: string) => Promise<void>;
  deleteWorkout: (workoutId: string) => Promise<void>;
  startWorkout: (workout: Workout) => void;
  addExerciseToWorkout: (
    workoutId: string,
    workoutExercise: WorkoutExercise
  ) => Promise<void>;
  globalExercises: Exercise[];
}

const WorkoutList: React.FC<WorkoutListProps> = ({
  workouts,
  addWorkout,
  updateWorkout,
  deleteWorkout,
  startWorkout,
  addExerciseToWorkout,
  globalExercises,
}) => {
  const { t } = useTranslation();
  const [newWorkoutName, setNewWorkoutName] = useState('');
  const [editingWorkoutId, setEditingWorkoutId] = useState<string | null>(null);
  const [editedWorkoutName, setEditedWorkoutName] = useState('');

  const handleAddWorkout = async () => {
    if (newWorkoutName.trim() === '') return;
    await addWorkout(newWorkoutName);
    setNewWorkoutName('');
  };

  const handleSaveEdit = async (workoutId: string) => {
    await updateWorkout(workoutId, editedWorkoutName);
    setEditingWorkoutId(null);
    setEditedWorkoutName('');
  };

  return (
    <Box>
      <Typography variant="h6">{t('workouts') || 'Workouts'}</Typography>
      <Box display="flex" alignItems="center" marginBottom={2}>
        <TextField
          label={t('workout_name_placeholder') || 'Workout Name'}
          value={newWorkoutName}
          onChange={(e) => setNewWorkoutName(e.target.value)}
          size="small"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddWorkout}
          style={{ marginLeft: 8 }}
          size="small"
        >
          {t('add_workout') || 'Workout hinzufügen'}
        </Button>
      </Box>
      {workouts.map((workout) => (
        <Paper
          key={workout.id}
          style={{ padding: '10px', marginBottom: '10px' }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {editingWorkoutId === workout.id ? (
              <>
                <TextField
                  value={editedWorkoutName}
                  onChange={(e) => setEditedWorkoutName(e.target.value)}
                  margin="dense"
                  size="small"
                />
                <IconButton
                  onClick={() => handleSaveEdit(workout.id)}
                  size="small"
                >
                  <Save />
                </IconButton>
                <IconButton
                  onClick={() => setEditingWorkoutId(null)}
                  size="small"
                >
                  <Cancel />
                </IconButton>
              </>
            ) : (
              <>
                <Typography variant="h6">{workout.name}</Typography>
                <Box>
                  <Button
                    onClick={() => startWorkout(workout)}
                    variant="outlined"
                    size="small"
                  >
                    {t('start_workout') || 'Workout starten'}
                  </Button>
                  <IconButton
                    onClick={() => {
                      setEditingWorkoutId(workout.id);
                      setEditedWorkoutName(workout.name);
                    }}
                    size="small"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteWorkout(workout.id)}
                    size="small"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </>
            )}
          </Box>
          <Typography variant="body2">
            {new Date(workout.date).toLocaleString()}
          </Typography>
          <Box marginTop={2}>
            <AddExerciseToWorkoutForm
              exercises={globalExercises}
              onAdd={(selectedExerciseId, reps, weight) => {
                const newWorkoutExercise = {
                  exerciseId: selectedExerciseId,
                  sets: [{ repetitions: reps, weight: weight }],
                };
                return addExerciseToWorkout(workout.id, newWorkoutExercise);
              }}
            />
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default WorkoutList;
