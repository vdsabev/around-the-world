import { useEffect, useState } from 'react';

export const usePromise = (fn, initialState) => {
  const [state, setState] = useState(initialState);
  useEffect(() => {
    let subscribed = true;
    fn().then((data) => {
      if (subscribed) {
        setState(data);
      }
    });

    return () => {
      subscribed = false;
    };
  }, [fn]);

  return state;
};
