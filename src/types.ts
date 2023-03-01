export type Puzzle = number[][];
export type Coordinates = [number, number];
export type KeyboardCode = 'ArrowTop' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft';
export type GameState = 'init' | 'playing' | 'win' | 'retry';
export type GameTriggers = {
  start: () => void;
  reset: () => void;
  setSize: (width: number, height: number) => void;
}