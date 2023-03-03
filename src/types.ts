export type Puzzle = number[][];
export type PuzzleSize = [number, number];
export type Coordinates = [number, number];
export type KeyboardCode = 'ArrowTop' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft';
export type GameState = 'init' | 'playing' | 'win' | 'retry';
export type GameTriggers = {
  start: (rows: number, columns: number) => void;
  reset: () => void;
  setSize: (width: number, height: number) => void;
}