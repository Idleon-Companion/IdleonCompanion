export type Task = {
  lastCompleted: number; // Unix timestamp of last completion
  text: string; // Text to display for task
  tags: string[]; // Tags for filtering/sorting
  reset: number; // Milliseconds to reset task
  sync: boolean; // Handles time based on in-game clock
};
