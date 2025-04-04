import React, { useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Input,
  Grid,
  styled,
  Badge,
} from '@mui/material';
import { t } from 'i18next';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { format, startOfDay, parseISO } from 'date-fns';

import {
  clearAppData,
  exportAppData,
  importAppData,
  saveAppData,
} from '../dataManager';
import { AppData } from '../types';

interface HomeViewProps {
  totalExercises: number;
  totalWorkouts: number;
  lastWorkoutDate?: string;
  appData: AppData;
  setAppData: React.Dispatch<React.SetStateAction<AppData | null>>;
}

const StyledPickersDay = styled(PickersDay)(
  ({ theme }) => ({})
) as React.ComponentType<PickersDayProps<Date> & { highlighted?: boolean }>;

interface CustomDayProps extends PickersDayProps<Date> {
  highlightedDays?: Set<string>;
}

function CustomDay(props: CustomDayProps) {
  const {
    day,
    outsideCurrentMonth,
    highlightedDays = new Set(),
    ...other
  } = props;

  const dayString = format(day, 'yyyy-MM-dd');
  const isHighlighted = !outsideCurrentMonth && highlightedDays.has(dayString);

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isHighlighted ? ' W ' : undefined}
      color={isHighlighted ? 'secondary' : undefined}
      sx={{
        '& .MuiBadge-badge': {
          fontSize: '0.6rem',
          height: '15px',
          minWidth: '15px',
          lineHeight: '15px',
          padding: '0 3px',
        },
      }}
    >
      <StyledPickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        sx={isHighlighted ? { border: '1px solid green' } : {}}
      />
    </Badge>
  );
}

const HomeView: React.FC<HomeViewProps> = ({
  totalExercises,
  totalWorkouts,
  lastWorkoutDate,
  appData,
  setAppData,
}) => {
  const highlightedDays = useMemo(() => {
    if (!appData?.completedWorkouts) return new Set<string>();
    const dates = appData.completedWorkouts.map((workout) => {
      try {
        const dateObj = startOfDay(parseISO(workout.date));
        return format(dateObj, 'yyyy-MM-dd');
      } catch (e) {
        console.error('Error parsing date:', workout.date, e);
        return null;
      }
    });
    return new Set(dates.filter((d): d is string => d !== null));
  }, [appData?.completedWorkouts]);

  const handleExport = () => {
    if (appData) {
      exportAppData(appData);
    } else {
      console.warn('No data to export.');
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const importedData = await importAppData(file);
        if (importedData) {
          saveAppData(importedData);
          setAppData(importedData);
        }
      } catch (error) {
        console.error('Import failed:', error);
      }
    }
  };

  const handleClearData = async () => {
    if (
      window.confirm(
        t('confirm_clear_data') ||
          'Are you sure you want to clear all data? This cannot be undone.'
      )
    ) {
      try {
        await clearAppData();
        setAppData({ exercises: [], workouts: [], completedWorkouts: [] });
      } catch (error) {
        console.error('Error clearing data:', error);
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          {t('home_title') || 'Home'}
        </Typography>
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6" gutterBottom>
            {t('summary') || 'Übersicht'}
          </Typography>
          <Typography variant="body1">
            {t('total_exercises') || 'Gesamtanzahl an Übungen'}:{' '}
            {totalExercises}
          </Typography>
          <Typography variant="body1">
            {t('total_workouts') || 'Gesamtanzahl an Workouts'}: {totalWorkouts}
          </Typography>
          {lastWorkoutDate && (
            <Typography variant="body1">
              {t('last_workout') || 'Letztes Workout'}:{' '}
              {(() => {
                try {
                  return new Date(lastWorkoutDate).toLocaleDateString();
                } catch {
                  return 'Invalid Date';
                }
              })()}
            </Typography>
          )}
        </Paper>
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            {t('workout_calendar') || 'Workout Calendar'}
          </Typography>
          <DateCalendar
            readOnly
            slots={{
              day: CustomDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
              } as any,
            }}
          />
        </Paper>
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6" gutterBottom>
            {t('data_management') || 'Data Management'}
          </Typography>
          <Grid container spacing={2} alignItems="center">
            {' '}
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleExport}
                disabled={
                  !appData ||
                  (appData.exercises.length === 0 &&
                    appData.workouts.length === 0 &&
                    appData.completedWorkouts.length === 0)
                }
              >
                {t('export_data') || 'Export Data'}
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Input
                type="file"
                inputProps={{ accept: '.json' }}
                onChange={handleImport}
                id="import-file"
                style={{ display: 'none' }}
              />
              <label htmlFor="import-file" style={{ width: '100%' }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  component="span"
                >
                  {t('import_data') || 'Import Data'}
                </Button>
              </label>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

export default HomeView;
