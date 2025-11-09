import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import { createMenuTree } from './data/menuTree';
import Home from './pages/Home';
import './App.css';

function App() {
  const [menuTree, setMenuTree] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    const tree = createMenuTree();
    setMenuTree(tree);
    // Página inicial
    setCurrentPage({ component: Home, title: 'Home' });
  }, []);

  const handlePageChange = (node) => {
    setCurrentPage({
      component: node.component,
      title: node.title,
      link: node.link
    });
  };

  if (!menuTree) {
    return <div>Loading...</div>;
  }

  const PageComponent = currentPage?.component || Home;

  return (
    <div className="app-container">
      <Sidebar menuTree={menuTree} onSelectPage={handlePageChange} />
      
      <main className="main-content">
        <div className="page-header">
          <h1>{currentPage?.title || 'Home'}</h1>
          <p className="breadcrumb">{currentPage?.link || '/'}</p>
        </div>
        
        <div className="page-wrapper">
          <PageComponent />
        </div>
      </main>
    </div>
  );
}

export default App;