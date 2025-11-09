import { useState, useEffect } from 'react';
import GraphVisualizer from './components/GraphVisualizer';
import CityPeopleList from './components/CityPeopleList';
import { createFriendsAndCitiesGraph } from './data/friendsAndCitiesGraph';
import styles from './App.module.scss';
import './styles/global.scss';

function App() {
  const [graph, setGraph] = useState(null);

  useEffect(() => {
    const friendsGraph = createFriendsAndCitiesGraph();
    setGraph(friendsGraph);
  }, []);

  if (!graph) {
    return (
      <div className={styles.loading}>
        Cargando grafo...
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h1>🌐 Grafo de Amigos y Ciudades</h1>
        <p>Visualización interactiva de relaciones sociales y geográficas</p>
      </header>

      <main className={styles.appContent}>
        <CityPeopleList graph={graph} />
        <GraphVisualizer graph={graph} />
      </main>
    </div>
  );
}

export default App;