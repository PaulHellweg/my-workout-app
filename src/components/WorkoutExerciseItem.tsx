import React from 'react';
import { Grid, ListItem, ListItemText, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface WorkoutExerciseItemProps {
  name: string;
  sets: number;
}

const WorkoutExerciseItem: React.FC<WorkoutExerciseItemProps> = ({
  name,
  sets,
}) => {
  const { t } = useTranslation();

  return (
    <Grid xs={4} sm={3} md={2} item>
      <ListItem dense disableGutters>
        <ListItemText
          primary={
            <Typography variant="body2" fontWeight={500}>
              {name}
            </Typography>
          }
          secondary={
            <Typography variant="caption" color="text.secondary">
              {sets} {t('sets')}
            </Typography>
          }
        />
      </ListItem>
    </Grid>
  );
};

export default WorkoutExerciseItem;
