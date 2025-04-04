import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  CssBaseline,
  Container,
  Box,
  Button,
  Switch,
  ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ExerciseList from './features/ExerciseList/ExerciseList';
import WorkoutList from './features/WorkoutList/WorkoutList';
import CurrentWorkoutView from './features/CurrentWorkout/CurrentWorkoutView';
import HistoryView from './features/HistoryView/HistoryView';
import HomeView from './features/HomeView';
import { useExerciseManager } from './hooks/useExerciseManager';
import { useWorkoutManager } from './hooks/useWorkoutManager';
import { useCurrentWorkout } from './hooks/useCurrentWorkout';
import { AppData, CompletedWorkout, Workout } from './types';
import { loadAppData } from './dataManager';
import { useFinishedWorkouts } from './hooks/useFinishedWorkouts';
import { t } from 'i18next';
import './i18n'; // Import your i18n configuration
import i18n from './i18n';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedView, setSelectedView] = useState<
    'home' | 'exercises' | 'workouts' | 'current' | 'history'
  >('home');

  const [appData, setAppData] = useState<AppData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadAppData();
      setAppData(data);
    };
    fetchData();
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const { exercises, addExercise, updateExercise, deleteExercise } =
    useExerciseManager();

  const {
    workouts,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    addExerciseToWorkout,
    deleteExerciseFromWorkout,
  } = useWorkoutManager(exercises);

  const {
    currentWorkout,
    toggleSetCompletion,
    finishWorkout,
    startWorkout,
    updateSet,
    addSets,
    deleteSet,
  } = useCurrentWorkout();

  const { completedWorkouts } = useFinishedWorkouts();

  const lastWorkoutDate = completedWorkouts.length
    ? completedWorkouts[completedWorkouts.length - 1].completedAt
    : undefined;

  const handleMenuItemClick = (
    view: 'home' | 'exercises' | 'workouts' | 'current' | 'history'
  ) => {
    setSelectedView(view);
    setDrawerOpen(false);
  };

  const handleStartWorkout = (workout: Workout) => {
    startWorkout(workout);
    setSelectedView('current');
  };
  const handleFinishCurrentWorkout = () => {
    if (!currentWorkout) return;
    const finishedWorkout: CompletedWorkout = {
      ...currentWorkout,
      completedAt: new Date().toISOString(),
    };
    const updatedAppData = {
      exercises,
      workouts,
      completedWorkouts: [...completedWorkouts, finishedWorkout],
    };
    setAppData(updatedAppData);
    finishWorkout();
    setSelectedView('history');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {t('welcome')}
          </Typography>
          <Switch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            color="default"
          />
          <Button color="inherit" onClick={() => i18n.changeLanguage('en')}>
            EN
          </Button>
          <Button color="inherit" onClick={() => i18n.changeLanguage('de')}>
            DE
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem>
              <ListItemText primary={t('menu') || 'Menu'} />
            </ListItem>
            <ListItemButton onClick={() => handleMenuItemClick('home')}>
              <ListItemText primary={t('home') || 'Home'} />
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuItemClick('exercises')}>
              <ListItemText primary={t('exercises') || 'Exercises'} />
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuItemClick('workouts')}>
              <ListItemText primary={t('workouts') || 'Workouts'} />
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuItemClick('current')}>
              <ListItemText
                primary={t('current_workout') || 'Current Workout'}
              />
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuItemClick('history')}>
              <ListItemText primary={t('history') || 'History'} />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Container maxWidth="md" style={{ padding: '20px' }}>
        {selectedView === 'home' && (
          <HomeView
            totalExercises={exercises.length}
            totalWorkouts={workouts.length}
            lastWorkoutDate={lastWorkoutDate}
            appData={
              appData || { exercises: [], workouts: [], completedWorkouts: [] }
            }
            setAppData={setAppData}
          />
        )}
        {selectedView === 'exercises' && (
          <ExerciseList
            exercises={exercises}
            addExercise={addExercise}
            updateExercise={updateExercise}
            deleteExercise={deleteExercise}
          />
        )}
        {selectedView === 'workouts' && (
          <WorkoutList
            workouts={workouts}
            addWorkout={addWorkout}
            updateWorkout={updateWorkout}
            deleteWorkout={deleteWorkout}
            startWorkout={handleStartWorkout}
            addExerciseToWorkout={addExerciseToWorkout}
            globalExercises={exercises}
            deleteExerciseFromWorkout={deleteExerciseFromWorkout}
          />
        )}
        {selectedView === 'current' && (
          <CurrentWorkoutView
            currentWorkout={currentWorkout}
            toggleSetCompletion={toggleSetCompletion}
            finishWorkout={handleFinishCurrentWorkout}
            updateSet={updateSet}
            addSets={addSets}
            deleteSet={deleteSet}
          />
        )}

        {selectedView === 'history' && (
          <HistoryView completedWorkouts={completedWorkouts} />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
