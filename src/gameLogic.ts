import { Coordinates, Puzzle, PuzzleSize } from './types';

export const initGame = (width: number, height: number): Puzzle => {
  const puzzleMatrix: Puzzle = [];
  const amountOfTiles = width * height;

  for (let i = 0; i < height; i++) {
    puzzleMatrix.push([]);
  }
  for (let i = 0; i < amountOfTiles; i++) {
    puzzleMatrix[Math.floor(i / width)].push(i + 1);
  }

  puzzleMatrix[height - 1][width - 1] = 0;
  return puzzleMatrix;
};

export const shufflePuzzle = (puzzle: Puzzle): { puzzle: Puzzle, emptyGap: Coordinates } => {
  let currentIndex: number = puzzle.length * puzzle[0].length,
    randomIndex: number,
    emptyGap: Coordinates = [0, 0];
  const numberList: number[] = puzzle.flat();

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [numberList[currentIndex], numberList[randomIndex]] = [
      numberList[randomIndex],
      numberList[currentIndex]
    ];
  }

  const newPuzzle: Puzzle = [];
  for (let i = 0; i < puzzle.length; i++) {
    newPuzzle.push([]);
    for (let j = 0; j < puzzle[i].length; j++) {
      const num: number = numberList.pop() as number;
      if(num === 0) {
        emptyGap = [i, j];
      }
      newPuzzle[i].push(num);
    }
  }

  return {
    puzzle: newPuzzle,
    emptyGap
  }
};

export const checkWin = (puzzle: Puzzle) => {
  const puzzleWin = initGame(puzzle.length, puzzle[0].length);
  return puzzleWin.flat().join(',') === puzzle.flat().join(',');
}

export const isInRange = (coordinates: number[], puzzle: Puzzle): boolean => {
  const [x, y] = coordinates;
  const rowLength = puzzle.length;
  const columnLength = puzzle[0].length;

  return (x >= 0 && x < rowLength) && (y >= 0 &&  y < columnLength);
}

export const calculateTilesImgCoordinates = (puzzleSize: PuzzleSize): string[] => {
  const [width, height] = puzzleSize;
  const widthPercentage = 1/(width - 1)*100;
  const heightPercentage = 1/(height - 1)*100;
  const coordinatesArray = ['0']; // Keep 0 for empty gap

  for(let i = 0; i < width; i++) {
    for(let j = 0; j < height; j++) {
      coordinatesArray.push(`${heightPercentage * j}% ${widthPercentage * i}%`);
    }
  }

  return coordinatesArray;
}