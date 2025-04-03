import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { CompletedWorkout } from '../types';
import { t } from 'i18next';

interface WorkoutStatsChartProps {
  workout: CompletedWorkout;
}

const WorkoutStatsChart: React.FC<WorkoutStatsChartProps> = ({ workout }) => {
  const chartData = workout.exercises.map((exercise) => {
    const totalWeight = exercise.sets.reduce((sum, set) => sum + set.weight, 0);
    const totalReps = exercise.sets.reduce(
      (sum, set) => sum + set.repetitions,
      0
    );
    const totalSets = exercise.sets.length;

    return {
      name: exercise.name,
      weight: totalWeight,
      reps: totalReps,
      sets: totalSets,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="weight" fill="#8884d8" name={t('total_weight')} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WorkoutStatsChart;
