import JSConfetti from "js-confetti";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { checkWin, initGame, shufflePuzzle } from "../gameLogic";
import { Coordinates, GameTriggers, Puzzle } from "../types";
import { Tile } from "./Tile";

type BoardGameType = {
  size: [number, number];
  onMove: () => void;
  initGameTriggers: (triggerObj: GameTriggers) => void;
}

export const BoardGameStyled = styled.div<{ columns: number }>`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;

  & > .row {
    grid-template-columns: repeat(${props => props.columns}, 1fr);
  }
`;

export const BoardGame: FC<BoardGameType> = ({
  size,
  onMove,
  initGameTriggers
}) => {
  const [puzzle, setPuzzle] = useState<Puzzle>(initGame(3, 3));
  const [emptyCoordinate, setEmptyCoordinates] = useState<Coordinates>([2, 2]);
  const jsConfetti = new JSConfetti();

  useEffect(() => {
    initGameTriggers({
      start: startGame,
      reset: function (): void {
        throw new Error("Function not implemented.");
      },
      setSize: (width: number, height: number) => {
        setPuzzle(initGame(width, height));
      }
    })
  }, []);

  const startGame = () => {
    const { puzzle: newPuzzle, emptyGap: newEmptyGap } = shufflePuzzle(puzzle);
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

  return <BoardGameStyled columns={ puzzle[0].length }>
    {puzzle.map((row, index) => {
      return (
        <div className="row" key={`row-${index}`}>
          {row.map((column, index2) => (
            <Tile
              key={`row${index}column${index2}`}
              value={column}
              onClick={() => handleClick(index, index2)}
            />
          ))}
        </div>
      );
    })}
  </BoardGameStyled>
}