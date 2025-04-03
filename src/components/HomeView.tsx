import React from 'react';
import { Box, Paper, Typography, Button, Input } from '@mui/material';
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
        }
      } catch (error) {
        console.error('Import failed:', error);
      }
    }
  };

  const handleClearData = async () => {
    try {
      await clearAppData();
      setAppData({ exercises: [], workouts: [], completedWorkouts: [] }); // Reset the appData state
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
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleExport}>
          {t('export_data') || 'Export Data'}
        </Button>
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
        <Button
          variant="contained"
          color="error"
          onClick={handleClearData}
          style={{ marginLeft: '10px' }}
        >
          {t('clear_data') || 'Clear Data'}
        </Button>
      </Box>
    </Box>
  );
};

export default HomeView;
