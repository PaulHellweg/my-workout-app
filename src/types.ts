export interface Exercise {
    id: string;
    name: string;
    description?: string;
  }
  
  export interface ExerciseSet {
    repetitions: number;
    weight: number;
  }
  
  export interface WorkoutExercise {
    exerciseId: string;
    sets: ExerciseSet[];
  }
  
  export interface Workout {
    id: string;
    name: string;
    date: string;
    exercises: WorkoutExercise[];
  }
  