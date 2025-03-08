import React, { useState } from 'react';
import { Exercise } from '../types';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface ExerciseListProps {
  exercises: Exercise[];
  addExercise: (name: string) => Promise<void>;
  updateExercise: (exerciseId: string, newName: string) => Promise<void>;
  deleteExercise: (exerciseId: string) => Promise<void>;
}

const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  addExercise,
  updateExercise,
  deleteExercise,
}) => {
  const { t } = useTranslation();
  const [newExerciseName, setNewExerciseName] = useState('');
  const [editingExerciseId, setEditingExerciseId] = useState<string | null>(
    null
  );
  const [editedExerciseName, setEditedExerciseName] = useState('');

  const handleAddExercise = async () => {
    if (newExerciseName.trim() === '') return;
    await addExercise(newExerciseName);
    setNewExerciseName('');
  };

  const handleSaveEdit = async (exerciseId: string) => {
    await updateExercise(exerciseId, editedExerciseName);
    setEditingExerciseId(null);
    setEditedExerciseName('');
  };

  return (
    <Box>
      <Typography variant="h6">{t('exercises') || 'Exercises'}</Typography>
      <Box display="flex" alignItems="center" marginBottom={2}>
        <TextField
          label={t('exercise_name') || 'Exercise Name'}
          value={newExerciseName}
          onChange={(e) => setNewExerciseName(e.target.value)}
          fullWidth
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddExercise}
          style={{ marginLeft: 8 }}
          size="small"
        >
          {t('add_exercise') || 'Exercise hinzufügen'}
        </Button>
      </Box>
      {exercises.map((exercise) => (
        <Box
          key={exercise.id}
          display="flex"
          alignItems="center"
          marginBottom={1}
        >
          {editingExerciseId === exercise.id ? (
            <>
              <TextField
                value={editedExerciseName}
                onChange={(e) => setEditedExerciseName(e.target.value)}
                margin="dense"
                size="small"
              />
              <IconButton
                onClick={() => handleSaveEdit(exercise.id)}
                size="small"
              >
                <Save />
              </IconButton>
              <IconButton
                onClick={() => setEditingExerciseId(null)}
                size="small"
              >
                <Cancel />
              </IconButton>
            </>
          ) : (
            <>
              <Typography variant="body1" style={{ flexGrow: 1 }}>
                {exercise.name}
              </Typography>
              <IconButton
                onClick={() => {
                  setEditingExerciseId(exercise.id);
                  setEditedExerciseName(exercise.name);
                }}
                size="small"
              >
                <Edit />
              </IconButton>
              <IconButton
                onClick={() => deleteExercise(exercise.id)}
                size="small"
              >
                <Delete />
              </IconButton>
            </>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ExerciseList;
