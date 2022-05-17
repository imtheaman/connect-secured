import { useEffect } from 'react';

const useTimer = (
  effect: Function,
  depsArray?: any[],
  timeout: number = 1000
) => {
  useEffect(() => {
    const timer = setTimeout(effect, timeout);
    return () => clearTimeout(timer);
  }, depsArray);
};

export default useTimer;
