class NaryNode {
  constructor(title, link = '#', component = null) {
    this.title = title;
    this.link = link;
    this.component = component;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }

  hasChildren() {
    return this.children.length > 0;
  }

  // DFS (Depth-First Search) - Recorrido en profundidad
  traverseDFS(callback, level = 0) {
    callback(this, level);
    this.children.forEach(child => {
      child.traverseDFS(callback, level + 1);
    });
  }

  // BFS (Breadth-First Search) - Recorrido por niveles
  traverseBFS(callback) {
    const queue = [{ node: this, level: 0 }];
    
    while (queue.length > 0) {
      const { node, level } = queue.shift();
      callback(node, level);
      
      node.children.forEach(child => {
        queue.push({ node: child, level: level + 1 });
      });
    }
  }
}

export default NaryNode;