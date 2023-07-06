import React from 'react';

import { STATUS } from '../hooks/useTimer'

const Panel = ({ elapsed, total, status, onIncrease, onDecrease }) => {
  const timeInSec = Math.max(Math.floor((total - elapsed) / 1000), 0);
  const mm = (Math.floor(timeInSec / 60)).toString().padStart(2, 0);
  const ss = (Math.floor(timeInSec) % 60).toString().padStart(2, 0);

  return (
    <div>
      <span>{mm}:{ss}</span>
      <div>
        <button
          disabled={status === STATUS.playing}
          onClick={onIncrease}
        >
          Up
        </button>
        <button
          disabled={status === STATUS.playing || !timeInSec}
          onClick={onDecrease}
        >
          Down
        </button>
      </div>
      {status === STATUS.completed && <div>You rock!</div>}
    </div>
  );
}

export default Panel