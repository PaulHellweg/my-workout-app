import React, { useState, useMemo, useEffect } from 'react';
import {
  Paper,
  Typography,
  List,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Grid,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { CompletedWorkout } from '../../types';
import WorkoutCard from './components/WorkoutCard';
import { t } from 'i18next';
import WorkoutTrendChart from './components/WorkoutTrendChart';
import { DatePicker } from '@mui/x-date-pickers';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface HistoryViewProps {
  completedWorkouts: CompletedWorkout[];
}

const HistoryView: React.FC<HistoryViewProps> = ({ completedWorkouts }) => {
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const filteredWorkouts = useMemo(() => {
    if (!completedWorkouts) return [];
    return completedWorkouts.filter((workout) => {
      if (!workout?.completedAt) return false;
      const completedDate = new Date(workout.completedAt);

      let startCheck = true;
      if (startDate) {
        const filterStartDate = new Date(startDate);
        filterStartDate.setHours(0, 0, 0, 0);
        startCheck = completedDate >= filterStartDate;
      }

      let endCheck = true;
      if (endDate) {
        const filterEndDate = new Date(endDate);
        filterEndDate.setHours(23, 59, 59, 999);
        endCheck = completedDate <= filterEndDate;
      }

      return startCheck && endCheck;
    });
  }, [completedWorkouts, startDate, endDate]);

  const uniqueExerciseNames = useMemo(() => {
    const names = new Set<string>();
    filteredWorkouts?.forEach((workout) => {
      workout?.exercises?.forEach((exercise) => {
        if (exercise?.name) {
          names.add(exercise.name);
        }
      });
    });
    return Array.from(names).sort();
  }, [filteredWorkouts]);

  useEffect(() => {
    setSelectedExercises([]);
  }, [startDate, endDate]);

  const handleExerciseChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedExercises(typeof value === 'string' ? value.split(',') : value);
  };

  const exerciseNamesToShow =
    selectedExercises.length === 0 ? uniqueExerciseNames : selectedExercises;

  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h6" gutterBottom>
        {t('history')}
      </Typography>

      <Box
        sx={{
          marginBottom: 3,
          paddingBottom: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="subtitle1" gutterBottom>
          {t('filters') || 'Filters'}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label={t('start_date') || 'Start Date'}
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  size: 'small',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label={t('end_date') || 'End Date'}
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              minDate={startDate || undefined} // Prevent end date being before start date
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  size: 'small',
                },
              }}
            />
          </Grid>

          {/* Exercise Selector - only if exercises exist in filtered results */}
          {uniqueExerciseNames.length > 0 && (
            <Grid item xs={12}>
              {' '}
              {/* Takes full width */}
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="exercise-multi-select-label">
                  {t('filter_by_exercise_optional') ||
                    'Filter by Exercise (Optional)'}
                </InputLabel>
                <Select
                  labelId="exercise-multi-select-label"
                  id="exercise-multi-select"
                  multiple
                  value={selectedExercises}
                  onChange={handleExerciseChange}
                  input={
                    <OutlinedInput
                      label={
                        t('filter_by_exercise_optional') ||
                        'Filter by Exercise (Optional)'
                      }
                    />
                  }
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {uniqueExerciseNames.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox
                        checked={selectedExercises.indexOf(name) > -1}
                      />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>
      </Box>
      {/* --- End Filter Controls --- */}

      {/* Chart Rendering - uses filteredWorkouts */}
      {exerciseNamesToShow.length > 0 ? (
        <WorkoutTrendChart
          selectedExerciseNames={exerciseNamesToShow}
          workouts={filteredWorkouts} // Pass filtered workouts to chart
        />
      ) : (
        // Show message if filtering resulted in no exercises to plot
        filteredWorkouts.length > 0 &&
        uniqueExerciseNames.length === 0 && (
          <Typography variant="body1" sx={{ textAlign: 'center', marginY: 4 }}>
            {t('no_exercises_found_in_filtered_workouts') ||
              'No exercises found in the selected date range.'}
          </Typography>
        )
      )}

      <Typography variant="h6" style={{ marginTop: '30px' }}>
        {t('filtered_workout_list') || 'Filtered Workout List'}
      </Typography>
      {/* Workout List - uses filteredWorkouts */}
      {filteredWorkouts.length === 0 ? (
        <Typography variant="body1">
          {t('no_history_for_filters') ||
            'No workouts match the selected filters.'}
        </Typography>
      ) : (
        <List>
          {filteredWorkouts.map(
            (
              workout,
              idx // Use filteredWorkouts
            ) => (
              <WorkoutCard
                key={workout.id || workout.completedAt || idx}
                workout={workout}
              />
            )
          )}
        </List>
      )}
    </Paper>
  );
};

export default HistoryView;
