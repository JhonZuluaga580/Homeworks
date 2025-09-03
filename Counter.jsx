import React, { useState, useCallback } from 'react';
import { Button } from './Button';

export const Counter = () => {
  const list = [2, 4, 6, 8, 10];
  const [valor, setValor] = useState(0);

  // useCallback evita que la función cambie en cada render
  const increment = useCallback((num) => {
    setValor((prev) => prev + num);
  }, []);

  return (
    <div>
      <h1>Contador</h1>
      <p>Total: {valor}</p>
      <hr />

      {list.map((n, idx) => (
        <Button
          key={idx}
          numero={n}
          increment={increment}
        />
      ))}
    </div>
  );
};
