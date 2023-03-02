import { useState } from 'react';
import './App.css';
import { GameTriggers, PuzzleSize } from './types';
import { BoardGame } from './components/BoardGame';

function App() {
  
  const [clickCounts, setClicks] = useState(0);
  const [boardSize, setBoardSize] = useState<PuzzleSize>([3, 3]);
  const [gameTriggers, setGameTriggers] = useState<GameTriggers | undefined>();

  return (
    <div className='container'>
      <div className='wrapper'>
        <div className='game-panel'>
          <p>
            Set your board size
            <input type="number" value={boardSize[0]} onChange={(e) => setBoardSize([parseInt(e.target.value), boardSize[1]])} /> x 
            <input type="number" value={boardSize[1]} onChange={(e) => setBoardSize([boardSize[0], parseInt(e.target.value)])} />
            <button onClick={() => gameTriggers?.setSize(boardSize[0], boardSize[1]) }>Apply</button>
          </p>
          <button onClick={gameTriggers?.start}>Shuffle</button>
          <p>Amount of clicks: { clickCounts }</p>
        </div>
        <BoardGame size={boardSize}
          onMove={() => { setClicks(clickCounts + 1); } }
          initGameTriggers={(triggers) => setGameTriggers(triggers)}   
        />
      </div>
    </div>
  );
}

export default App;
