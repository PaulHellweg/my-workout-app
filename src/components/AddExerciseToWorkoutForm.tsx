import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';
import { Exercise } from '../types';
import { t } from 'i18next';

interface AddExerciseToWorkoutFormProps {
  exercises: Exercise[];
  onAdd: (
    selectedExerciseId: string,
    repetitions: number,
    weight: number
  ) => void;
}

const AddExerciseToWorkoutForm: React.FC<AddExerciseToWorkoutFormProps> = ({
  exercises,
  onAdd,
}) => {
  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const [repetitions, setRepetitions] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);

  const handleSubmit = () => {
    if (!selectedExerciseId) return;
    onAdd(selectedExerciseId, repetitions, weight);
    setSelectedExerciseId('');
    setRepetitions(0);
    setWeight(0);
  };

  return (
    <Box>
      <FormControl fullWidth margin="normal">
        <InputLabel>{t('select_exercise') || 'Übung auswählen'}</InputLabel>
        <Select
          value={selectedExerciseId}
          onChange={(e) => setSelectedExerciseId(e.target.value)}
          label={t('select_exercise') || 'Übung auswählen'}
          size="small"
        >
          <MenuItem value="">
            <em>{t('select_exercise') || 'Übung auswählen'}</em>
          </MenuItem>
          {exercises.map((exercise) => (
            <MenuItem key={exercise.id} value={exercise.id}>
              {exercise.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label={t('repetitions') || 'Wiederholungen'}
        type="number"
        value={repetitions}
        onChange={(e) => setRepetitions(parseInt(e.target.value) || 0)}
        fullWidth
        margin="normal"
        size="small"
      />
      <TextField
        label={t('weight') || 'Gewicht'}
        type="number"
        value={weight}
        onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
        fullWidth
        margin="normal"
        size="small"
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
        size="small"
      >
        {t('add_exercise_to_workout_button') || 'Übung hinzufügen'}
      </Button>
    </Box>
  );
};

export default AddExerciseToWorkoutForm;
