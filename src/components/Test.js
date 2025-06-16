import { useState } from 'react';

function Test(props) {
  const [count, setCount] = useState(0);
  return (
    <>
      <p>
        You clicked
        {count}
      </p>
      <button onClick={() => setCount(count + 1 + props)}>
        Click
      </button>
    </>
  );
}
