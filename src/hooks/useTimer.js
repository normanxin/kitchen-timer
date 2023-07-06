import { useEffect, useMemo, useReducer, useRef } from 'react';

export const STATUS = {
  init: 'INIT',
  playing: 'PLAYING',
  paused: 'PAUSED',
  completed: 'COMPLETED',
};

const ACTION_TYPE = {
  increasement: 'increasement',
  decreasement: 'decreasement',
  play: 'play',
  tick: 'tick',
  completion: 'completion',
  reset: 'reset',
};

const reducer = (state, { type, elapsed }) => {
  switch (type) {
    case ACTION_TYPE.increasement:
      return { ...state, total: state.total + 1000 };
    case ACTION_TYPE.decreasement:
      return { ...state, total: Math.max(state.total - 1000, 0) };
    case ACTION_TYPE.play:
      return { ...state, status: STATUS.playing };
    case ACTION_TYPE.pause:
      return { ...state, status: STATUS.paused };
    case ACTION_TYPE.tick:
      return { ...state, elapsed };
    case ACTION_TYPE.completion:
      return { ...state, status: STATUS.completed };
    case ACTION_TYPE.reset:
      return { status: STATUS.init, elapsed: 0, total: 0 };
  }
};

const useTimer = () => {
  const [state, dispatch] = useReducer(reducer, {
    elapsed: 0,
    total: 0,
    status: STATUS.init,
  });
  const startRef = useRef();
  const lastElapsed = useRef(0);
  const handleIncrease = () => dispatch({ type: ACTION_TYPE.increasement });
  const handleDecrease = () => dispatch({ type: ACTION_TYPE.decreasement });
  const handlePlay = () => dispatch({ type: ACTION_TYPE.play });
  const handlePause = () => dispatch({ type: ACTION_TYPE.pause });
  const handleReset = () => dispatch({ type: ACTION_TYPE.reset });

  useEffect(() => {
    if (state.status !== STATUS.playing) {
      startRef.current = null;
      state.status === STATUS.paused
        && (lastElapsed.current = state.elapsed);

      return;
    };

    if (state.elapsed >= state.total) {
      dispatch({ type: ACTION_TYPE.completion });

      return;
    }

    requestAnimationFrame(timestamp => {
      startRef.current ??= timestamp;

      const elapsed = timestamp - startRef.current;
  
      dispatch({
        type: ACTION_TYPE.tick,
        elapsed: lastElapsed.current + elapsed,
      });
    });
  }, [state]);
  
  return useMemo(() => ({
    state,
    handleIncrease,
    handleDecrease,
    handlePlay,
    handlePause,
    handleReset,
  }), [
    state,
    handleIncrease,
    handleDecrease, 
    handlePlay,
    handlePause,
    handleReset,
  ]);
};

export default useTimer;