import React, { useState } from 'react';
import Tree from 'react-d3-tree';
import BinaryTree from '../models/BinaryTree';
import './BinaryTreeVisualizer.css';

const BinaryTreeVisualizer = () => {
  const [tree] = useState(() => {
    const bt = new BinaryTree();
    // Insertar una serie de números
    const numbers = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 65];
    numbers.forEach(num => bt.insert(num));
    
    // Imprimir recorridos en consola
    console.log('=== RECORRIDOS DEL ÁRBOL ===');
    console.log('PreOrder (N-L-R):', bt.preOrder());
    console.log('InOrder (L-N-R):', bt.inOrder());
    console.log('PostOrder (L-R-N):', bt.postOrder());
    
    // Probar búsqueda
    console.log('\n=== BÚSQUEDA DE VALORES ===');
    console.log('¿Está el 40?', bt.search(40));
    console.log('¿Está el 100?', bt.search(100));
    console.log('¿Está el 10?', bt.search(10));
    
    return bt;
  });

  const [treeData] = useState(() => tree.toD3Format());
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = () => {
    const value = parseInt(searchValue);
    if (!isNaN(value)) {
      const found = tree.search(value);
      setSearchResult({ value, found });
    }
  };

  return (
    <div className="tree-container">
      <div className="controls">
        <h1>Binary Tree Visualizer</h1>
        
        <div className="search-section">
          <h3>Buscar Valor</h3>
          <input
            type="number"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Ingresa un número"
          />
          <button onClick={handleSearch}>Buscar</button>
          
          {searchResult && (
            <p className={searchResult.found ? 'found' : 'not-found'}>
              El valor {searchResult.value} 
              {searchResult.found ? ' SÍ está' : ' NO está'} en el árbol
            </p>
          )}
        </div>

        <div className="info-section">
          <h3>Información del Árbol</h3>
          <p><strong>Números insertados:</strong> 50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 65</p>
          <p><strong>Recorridos:</strong> (ver consola del navegador)</p>
          <ul>
            <li>PreOrder: Nodo → Izquierda → Derecha</li>
            <li>InOrder: Izquierda → Nodo → Derecha</li>
            <li>PostOrder: Izquierda → Derecha → Nodo</li>
          </ul>
        </div>
      </div>

      <div className="tree-visualization">
        <Tree
          data={treeData}
          orientation="vertical"
          pathFunc="step"
          translate={{ x: 400, y: 50 }}
          nodeSize={{ x: 100, y: 100 }}
          separation={{ siblings: 1, nonSiblings: 1.5 }}
        />
      </div>
    </div>
  );
};

export default BinaryTreeVisualizer;