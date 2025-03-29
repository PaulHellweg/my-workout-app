import React from 'react';
import { Paper, Typography, List } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CompletedWorkout } from '../types';
import WorkoutCard from './WorkoutCard';

interface HistoryViewProps {
  completedWorkouts: CompletedWorkout[];
}

const HistoryView: React.FC<HistoryViewProps> = ({ completedWorkouts }) => {
  const { t } = useTranslation();

  React.useEffect(() => {
    console.log('Completed Workouts:', completedWorkouts);
  }, [completedWorkouts]);

  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h6">{t('history')}</Typography>

      {completedWorkouts.length === 0 ? (
        <Typography variant="body1">{t('no_history')}</Typography>
      ) : (
        <List>
          {completedWorkouts.map((workout, idx) => (
            <WorkoutCard key={idx} workout={workout} />
          ))}
        </List>
      )}
    </Paper>
  );
};

export default HistoryView;
