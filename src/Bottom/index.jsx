import React from 'react';
import { STATUS } from '../hooks/useTimer';

const Bottom = ({ elapsed, total, status, onPlay, onPause, onReset }) => {
  return (
    <div>
      <button disabled={!total} onClick={onReset}>
        Reset
      </button>
      {
        status === STATUS.playing
          ? <button onClick={onPause}>Pause</button>
          : <button disabled={elapsed >= total} onClick={onPlay}>Play</button>
      }
    </div>
  );
};

export default Bottom;