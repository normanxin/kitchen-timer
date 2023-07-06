import './App.css';
import Panel from './Panel';
import Progress from './Progress';
import Bottom from './Bottom';
import useTimer from './hooks/useTimer';

function App() {
  const {
    state,
    handleIncrease, 
    handleDecrease, 
    handlePlay, 
    handlePause,
    handleReset,
  } = useTimer();

  return (
    <div className="App">
      <Panel
        {...state}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />
      <Progress value={state.elapsed} max={state.total} />
      <Bottom
        {...state}
        onPlay={handlePlay}
        onPause={handlePause}
        onReset={handleReset}
      />
    </div>
  );
}

export default App;
