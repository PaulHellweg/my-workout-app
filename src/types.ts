export interface Exercise {
  id: string;
  name: string;
  description?: string;
}

export interface ExerciseSet {
  repetitions: number;
  weight: number;
  completed?: boolean;
}

export interface Workout {
  id: string;
  name: string;
  date: string;
  exercises: WorkoutExercise[];
}

export interface CompletedWorkout extends Workout {
  completedAt: string;
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: {
    repetitions: number;
    weight: number;
    completed?: boolean;
  }[];
}

export interface AppData {
  exercises: Exercise[];
  workouts: Workout[];
}
