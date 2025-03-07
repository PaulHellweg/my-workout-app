import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Workout } from '../types';

export interface CompletedWorkout extends Workout {
  completedAt: string;
}

interface HistoryViewProps {
  completedWorkouts: CompletedWorkout[];
}

const HistoryView: React.FC<HistoryViewProps> = ({ completedWorkouts }) => {
  const { t } = useTranslation();

  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h6">{t('history') || 'History'}</Typography>
      {completedWorkouts.length === 0 ? (
        <Typography variant="body1">
          {t('no_history') || 'Keine abgeschlossenen Workouts.'}
        </Typography>
      ) : (
        <List>
          {completedWorkouts.map((cw, idx) => (
            <ListItem key={idx}>
              <ListItemText
                primary={`${cw.name} (${new Date(cw.completedAt).toLocaleString()})`}
                secondary={`${cw.exercises.length} ${t('exercises')}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default HistoryView;
