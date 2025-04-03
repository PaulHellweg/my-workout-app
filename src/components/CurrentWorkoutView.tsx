import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Checkbox,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { Workout } from '../types';
import { t } from 'i18next';

interface CurrentWorkoutViewProps {
  currentWorkout: Workout | null;
  toggleSetCompletion: (exerciseIndex: number, setIndex: number) => void;
  updateSet: (
    exerciseIndex: number,
    setIndex: number,
    field: 'repetitions' | 'weight',
    value: number
  ) => void;
  addSets: (exerciseIndex: number, numberOfSets: number) => void;
  finishWorkout: () => void;
  deleteSet: (exerciseIndex: number, setIndex: number) => void;
}

const CurrentWorkoutView: React.FC<CurrentWorkoutViewProps> = ({
  currentWorkout,
  toggleSetCompletion,
  updateSet,
  addSets,
  finishWorkout,
  deleteSet,
}) => {
  const [setsToAdd, setSetsToAdd] = React.useState<{ [key: number]: number }>(
    {}
  );

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
      {currentWorkout.exercises.map((exercise, exIdx) => (
        <Box key={exIdx} marginTop={2}>
          <Typography variant="subtitle1">
            {t('exercise')} {exIdx + 1}: {exercise.name}
          </Typography>
          {exercise.sets.map((set, setIdx) => (
            <Box
              key={setIdx}
              display="flex"
              alignItems="center"
              marginBottom={1}
            >
              <Checkbox
                checked={set.completed || false}
                onChange={() => toggleSetCompletion(exIdx, setIdx)}
              />
              <TextField
                label={t('repetitions') || 'Wiederholungen'}
                type="number"
                value={set.repetitions}
                size="small"
                onChange={(e) =>
                  updateSet(
                    exIdx,
                    setIdx,
                    'repetitions',
                    Number(e.target.value)
                  )
                }
                style={{ marginRight: '8px', width: '120px' }}
              />
              <TextField
                label={t('weight') || 'Gewicht (kg)'}
                type="number"
                value={set.weight}
                size="small"
                onChange={(e) =>
                  updateSet(exIdx, setIdx, 'weight', Number(e.target.value))
                }
                style={{ marginRight: '8px', width: '120px' }}
              />
              <Typography variant="body2">
                {t('set') || 'Set'} {setIdx + 1}
              </Typography>
              <IconButton
                onClick={() => deleteSet(exIdx, setIdx)}
                size="small"
                style={{ marginLeft: '8px' }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Box display="flex" alignItems="center" marginTop={1}>
            <TextField
              label={t('number_of_sets') || 'Anzahl der Sets'}
              type="number"
              value={setsToAdd[exIdx] ?? 1}
              size="small"
              onChange={(e) =>
                setSetsToAdd((prev) => ({
                  ...prev,
                  [exIdx]: Number(e.target.value),
                }))
              }
              style={{ marginRight: '8px', width: '120px' }}
            />
            <Button
              variant="outlined"
              onClick={() => addSets(exIdx, setsToAdd[exIdx] ?? 1)}
            >
              {t('add_sets') || 'Sets hinzufügen'}
            </Button>
          </Box>
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
