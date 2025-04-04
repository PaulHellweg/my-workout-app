import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { CompletedWorkout } from '../../../types';
import { t } from 'i18next';

interface WorkoutTrendChartProps {
  workouts: CompletedWorkout[] | undefined | null;
  selectedExerciseNames: string[];
}

const COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7300',
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#a569bd',
  '#f1948a',
];

const getColor = (name: string, allNames: string[]) => {
  const index = allNames.indexOf(name);
  if (index === -1) return '#cccccc';
  return COLORS[index % COLORS.length];
};

const WorkoutTrendChart: React.FC<WorkoutTrendChartProps> = ({
  workouts,
  selectedExerciseNames,
}) => {
  if (!workouts || workouts.length === 0) {
    return null;
  }

  const validWorkouts = workouts.filter(
    (w) => w && w.completedAt && w.exercises
  );
  const sortedWorkouts = validWorkouts.sort(
    (a, b) =>
      new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()
  );

  const allExerciseNamesSet = new Set<string>();
  sortedWorkouts.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      if (exercise && exercise.name) {
        allExerciseNamesSet.add(exercise.name);
      }
    });
  });
  const allUniqueExerciseNames = Array.from(allExerciseNamesSet).sort();

  if (!selectedExerciseNames || selectedExerciseNames.length === 0) {
    console.warn(
      'WorkoutTrendChart received an empty list of exercises to display.'
    );
    return (
      <p>{t('no_exercises_selected_or_found') || 'No exercises to display.'}</p>
    );
  }

  const chartData = sortedWorkouts.map((workout) => {
    const dataPoint: { [key: string]: string | number | null } = {
      xAxisKey: new Date(workout.completedAt).toLocaleDateString(),
      ...Object.fromEntries(allUniqueExerciseNames.map((name) => [name, null])),
    };

    workout.exercises.forEach((exercise) => {
      if (
        exercise &&
        exercise.name &&
        dataPoint.hasOwnProperty(exercise.name)
      ) {
        const totalWeight = (exercise.sets || []).reduce(
          (sum, set) => sum + (set?.weight || 0),
          0
        );
        dataPoint[exercise.name] = totalWeight;
      }
    });
    return dataPoint;
  });

  if (chartData.length === 0) {
    return <p>{t('no_valid_workout_data_found')}</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="xAxisKey" angle={-45} textAnchor="end" height={60} />
        <YAxis
          label={{
            value: t('total_weight') || 'Total Weight',
            angle: -90,
            position: 'insideLeft',
          }}
        />
        <Tooltip />
        <Legend />

        {selectedExerciseNames.map((name) => (
          <Line
            key={name}
            type="monotone"
            dataKey={name}
            stroke={getColor(name, allUniqueExerciseNames)}
            strokeWidth={2}
            activeDot={{ r: 6 }}
            connectNulls
            name={name}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WorkoutTrendChart;
