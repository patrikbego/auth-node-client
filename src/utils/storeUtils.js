import { useState } from 'react';

const { useEffect } = require('react');
// https://dev.to/selbekk/persisting-your-react-state-in-9-lines-of-code-9go
// https://jasonwatmore.com/post/2020/06/17/nodejs-mongodb-api-jwt-authentication-with-refresh-tokens
export default function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key)) || defaultValue,
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}
