import React, { useState } from "react";
import QueueForm from "./QueueForm";
import QueueList from "./QueueList";

const initialQueue = [
  { name: "Juan", amount: 100 },
  { name: "Maria", amount: 200 },
  { name: "Pedro", amount: 150 },
];

function App() {
  const [queue, setQueue] = useState(initialQueue);

  const addPerson = (person) => {
    setQueue([...queue, { ...person, amount: Number(person.amount) }]);
  };

  return (
    <div>
      <h1>Cola del Cajero Automático</h1>
      <QueueForm addPerson={addPerson} />
      <hr />
      <QueueList queue={queue} />
    </div>
  );
}

export default App;