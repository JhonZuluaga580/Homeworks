import { useState, useEffect } from 'react';
import GraphVisualizer from './components/GraphVisualizer';
import CityPeopleList from './components/CityPeopleList';
import { createFriendsAndCitiesGraph } from './data/friendsAndCitiesGraph';
import './App.css';

function App() {
  const [graph, setGraph] = useState(null);

  useEffect(() => {
    const friendsGraph = createFriendsAndCitiesGraph();
    setGraph(friendsGraph);
  }, []);

  if (!graph) {
    return (
      <div className="loading">
        <h2>Cargando grafo...</h2>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌐 Grafo de Amigos y Ciudades</h1>
        <p>Visualización de relaciones entre personas y ciudades</p>
      </header>

      <main className="app-content">
        <CityPeopleList graph={graph} />
        <GraphVisualizer graph={graph} />
      </main>
    </div>
  );
}

export default App;