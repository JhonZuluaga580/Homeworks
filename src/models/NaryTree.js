import NaryNode from './NaryNode';

class NaryTree {
  constructor(rootTitle, rootLink = '#', rootComponent = null) {
    this.root = new NaryNode(rootTitle, rootLink, rootComponent);
  }

  // Método para imprimir el árbol con DFS
  printDFS() {
    console.log('=== DFS Traversal ===');
    this.root.traverseDFS((node, level) => {
      const indent = '  '.repeat(level);
      console.log(`${indent}${node.title} (${node.link})`);
    });
  }

  // Método para imprimir el árbol con BFS
  printBFS() {
    console.log('=== BFS Traversal ===');
    this.root.traverseBFS((node, level) => {
      console.log(`Level ${level}: ${node.title} (${node.link})`);
    });
  }

  getRoot() {
    return this.root;
  }
}

export default NaryTree;