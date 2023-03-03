import JSConfetti from 'js-confetti';
import { FC, SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { calculateTilesImgCoordinates, checkWin, initGame, shufflePuzzle } from '../gameLogic';
import { Coordinates, GameTriggers, Puzzle, PuzzleSize } from '../types';
import { Tile } from './Tile';

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
      background-image: url('/cats.webp');
    }
  }
`;

export const BoardGame: FC<BoardGameType> = ({
  size: [rows, columns],
  onMove,
  initGameTriggers
}) => {
  const [puzzle, setPuzzle] = useState<Puzzle>(initGame(rows, columns));
  const [emptyCoordinate, setEmptyCoordinates] = useState<Coordinates>([rows-1, columns-1]);
  const [renderedSize, setRenderedSize] = useState(0);
  const [imageCoordinates, setImageCoordinates] = useState<string[]>(calculateTilesImgCoordinates([rows, columns]));
  const [canPlay, setCanPlay] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const jsConfetti = new JSConfetti();

  useEffect(() => {
    setRenderedSize(elementRef.current?.clientWidth as SetStateAction<number>);
  }, []);

  useEffect(() => {
    setPuzzle(initGame(rows, columns));
    setEmptyCoordinates([rows-1, columns-1]);
    setImageCoordinates(calculateTilesImgCoordinates([rows, columns]));
  }, [rows, columns])

  useEffect(() => {
    const handleWindowResize = () => {
      setRenderedSize(elementRef.current?.clientWidth || 0);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

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
    setImageCoordinates(calculateTilesImgCoordinates([puzzle.length, puzzle[0].length]));
  }, [puzzle])

  const startGame = (rows: number, columns: number) => {
    const { puzzle: newPuzzle, emptyGap: newEmptyGap } = shufflePuzzle(initGame(rows, columns));
    setPuzzle(newPuzzle);
    setEmptyCoordinates(newEmptyGap);
    setCanPlay(true);
  }

  const handleClick = (row: number, column: number) => {
    if(!canPlay) {
      return;
    }

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

  return <BoardGameStyled columns={ puzzle[0].length } bgSize={renderedSize} ref={elementRef}>
    {
      puzzle.map((row, rowIndex) => {
        return (
          <div className='row' key={`row-${rowIndex}`}>
            {
              row.map((tileValue, columnIndex) => (
                <Tile
                  key={`row${rowIndex}-column${columnIndex}`}
                  value={tileValue}
                  onClick={() => handleClick(rowIndex, columnIndex)}
                  imageCoordinates={imageCoordinates[tileValue]}
                  disabled={!canPlay}
                />
              ))
            }
          </div>
        );
      })
    }
  </BoardGameStyled>
}