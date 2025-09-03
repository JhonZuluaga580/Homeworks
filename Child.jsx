import React from 'react';

export const Button = React.memo(({ numero, increment }) => {
  console.log("Botón renderizado:", numero);

  return (
    <button
      className="btn btn-primary mr-3"
      onClick={() => increment(numero)}
    >
      {numero}
    </button>
  );
});
