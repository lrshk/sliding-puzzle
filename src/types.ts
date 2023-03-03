export type Puzzle = number[][];
export type PuzzleSize = [rows: number, columns: number];
export type Coordinates = [row: number, column: number];
export type KeyboardCode = 'ArrowTop' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft';
export type GameState = 'init' | 'playing' | 'win' | 'retry';
export type GameTriggers = {
  start: (rows: number, columns: number) => void;
  reset: () => void;
  setSize: (width: number, height: number) => void;
}