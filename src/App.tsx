import React, { useState } from 'react';
import './App.css';
import { Puzzle } from './types';
import { initGame, shufflePuzzle, checkWin } from './gameLogic';
import { Tile } from './components/Tile';

function App() {
  const [puzzle, setPuzzle] = useState<Puzzle>(initGame(3, 3));
  const [emptyCoordinate, setEmptyCoordinates] = useState([2, 2]);
  const [clickCounts, setClicks] = useState(0);

  const handleClick = (row: number, column: number) => {
    setClicks(clickCounts + 1);

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
    }

    if(checkWin(newPuzzle)) {
      console.log('youve won!!');
    }
  };

  const startGame = () => {
    setClicks(0);
    const { puzzle: newPuzzle, emptyGap: newEmptyGap } = shufflePuzzle(puzzle);
    setPuzzle(newPuzzle);
    setEmptyCoordinates(newEmptyGap);
  }

  return (
    <div>
      <button onClick={startGame}>Shuffle</button>
      <p>Amount of clicks: { clickCounts }</p>
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
    </div>
  );
}

export default App;
