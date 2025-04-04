import React from 'react';
import { Box, Paper, Typography, Button, Input, Grid } from '@mui/material';
import { t } from 'i18next';
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

const HomeView: React.FC<HomeViewProps> = ({
  totalExercises,
  totalWorkouts,
  lastWorkoutDate,
  appData,
  setAppData,
}) => {
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
    try {
      await clearAppData();
      setAppData({ exercises: [], workouts: [], completedWorkouts: [] });
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary" onClick={handleExport}>
            {t('export_data') || 'Export Data'}
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            type="file"
            inputProps={{ accept: '.json' }}
            onChange={handleImport}
            id="import-file"
            style={{ display: 'none' }}
          />
          <label htmlFor="import-file">
            <Button variant="contained" color="secondary" component="span">
              {t('import_data') || 'Import Data'}
            </Button>
          </label>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeView;
