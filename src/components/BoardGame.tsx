import JSConfetti from "js-confetti";
import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { calculateTilesImgCoordinates, checkWin, initGame, shufflePuzzle } from "../gameLogic";
import { Coordinates, GameTriggers, Puzzle, PuzzleSize } from "../types";
import { Tile } from "./Tile";

type BoardGameType = {
  size: PuzzleSize;
  onMove: () => void;
  initGameTriggers: (triggerObj: GameTriggers) => void;
}

export const BoardGameStyled = styled.div<{ columns: number, bgSize: number }>`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;

  & > .row {
    grid-template-columns: repeat(${props => props.columns}, 1fr);

    & > .column {
      background-size: ${props => `${props.bgSize}px ${props.bgSize}px`};
      background-image: url("/cats.webp");

    }
  }
`;

export const BoardGame: FC<BoardGameType> = ({
  onMove,
  initGameTriggers
}) => {
  const DEFAULT_SIZE: PuzzleSize = [3, 3];
  const [puzzle, setPuzzle] = useState<Puzzle>(initGame(DEFAULT_SIZE[0], DEFAULT_SIZE[1]));
  const [emptyCoordinate, setEmptyCoordinates] = useState<Coordinates>([DEFAULT_SIZE[0]-1, DEFAULT_SIZE[0]-1]);
  const jsConfetti = new JSConfetti();
  const [size, setSize] = useState(0);
  const [coordinates, setCoordinates] = useState<string[]>(calculateTilesImgCoordinates(DEFAULT_SIZE));
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    setSize(elementRef.current?.clientWidth);
  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      setSize(elementRef.current?.clientWidth || 0);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  useEffect(() => {
    initGameTriggers({
      start: startGame,
      reset: function (): void {
        initGame(puzzle.length, puzzle[0].length);
      },
      setSize: (width: number, height: number) => {
        setPuzzle(initGame(width, height));
      }
    })
  }, []);
  
  useEffect(() => {
    setCoordinates(calculateTilesImgCoordinates([puzzle.length, puzzle[0].length]));
  }, [puzzle])

  const startGame = (rows: number, columns: number) => {
    const { puzzle: newPuzzle, emptyGap: newEmptyGap } = shufflePuzzle(initGame(rows, columns));
    setPuzzle(newPuzzle);
    setEmptyCoordinates(newEmptyGap);
  }

  const handleClick = (row: number, column: number) => {
    const rowDelta = Math.abs(emptyCoordinate[0] - row);
    const columnDelta = Math.abs(emptyCoordinate[1] - column);
    const newPuzzle = puzzle.slice();

    if (
      (rowDelta === 1 && columnDelta === 0) ||
      (rowDelta === 0 && columnDelta === 1)
    ) {
      newPuzzle[emptyCoordinate[0]][emptyCoordinate[1]] = puzzle[row][column];
      newPuzzle[row][column] = 0;
      setPuzzle(newPuzzle);
      setEmptyCoordinates([row, column]);
      onMove();
    }

    if(checkWin(newPuzzle)) {
      jsConfetti.addConfetti({
        confettiRadius: 6,
        confettiNumber: 1000
      });
    }
  };

  return <BoardGameStyled columns={ puzzle[0].length } bgSize={size} ref={elementRef}>
    {puzzle.map((row, index) => {
      return (
        <div className="row" key={`row-${index}`}>
          {row.map((column, index2) => (
            <Tile
              key={`row${index}column${index2}`}
              value={column}
              onClick={() => handleClick(index, index2)}
              imageCoordinates={coordinates[column]}
            />
          ))}
        </div>
      );
    })}
  </BoardGameStyled>
}