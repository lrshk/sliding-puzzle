import { useEffect, useState } from 'react';
import './App.css';
import { GameTriggers, PuzzleSize } from './types';
import { BoardGame } from './components/BoardGame';

function App() {
  const [clickCounts, setClicks] = useState(0);
  const [boardSize, setBoardSize] = useState<PuzzleSize>([3, 3]);
  const [gameTriggers, setGameTriggers] = useState<GameTriggers | undefined>();
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  useEffect(() => {
    const [, rows, columns] = document.location.pathname.split('/');
    setBoardSize([parseInt(rows || '3'), parseInt(columns || '3')]);
  }, []);

  const handleStartGame = () => {
    gameTriggers?.start(boardSize[0], boardSize[1]);
    setGameStarted(true);
  }

  return (
    <div className='container'>
      <div className='wrapper'>
        { 
          gameStarted ? 
          <p className='clicks'>Amount of clicks: { clickCounts }</p> 
        : 
          <button className='start-btn' onClick={handleStartGame}>Start game</button> 
        }
        <BoardGame 
          size={boardSize}
          onMove={() => { setClicks(clickCounts + 1); } }
          initGameTriggers={(triggers) => setGameTriggers(triggers)}   
        />
      </div>
    </div>
  );
}

export default App;
