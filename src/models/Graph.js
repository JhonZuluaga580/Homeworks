import GraphNode from './GraphNode';

class Graph {
  constructor() {
    this.nodes = new Map(); // Mapa de nodos: id -> GraphNode
    this.adjacencyList = new Map(); // Lista de adyacencia: id -> Set de ids conectados
  }

  // Agregar un nodo al grafo
  addNode(id, type, data) {
    if (!this.nodes.has(id)) {
      const node = new GraphNode(id, type, data);
      this.nodes.set(id, node);
      this.adjacencyList.set(id, new Set());
      return node;
    }
    return this.nodes.get(id);
  }

  // Agregar una arista entre dos nodos (no dirigida)
  addEdge(nodeId1, nodeId2) {
    if (this.nodes.has(nodeId1) && this.nodes.has(nodeId2)) {
      this.adjacencyList.get(nodeId1).add(nodeId2);
      this.adjacencyList.get(nodeId2).add(nodeId1);
      return true;
    }
    return false;
  }

  // Buscar un nodo por ID
  getNode(id) {
    return this.nodes.get(id);
  }

  // Obtener todos los nodos de un tipo específico
  getNodesByType(type) {
    const result = [];
    this.nodes.forEach(node => {
      if (node.type === type) {
        result.push(node);
      }
    });
    return result;
  }

  // Obtener las conexiones de un nodo
  getConnections(nodeId) {
    if (this.adjacencyList.has(nodeId)) {
      return Array.from(this.adjacencyList.get(nodeId));
    }
    return [];
  }

  // Obtener todas las personas que viven en una ciudad específica
  getPeopleInCity(cityId) {
    const people = [];
    const connections = this.getConnections(cityId);
    
    connections.forEach(connectionId => {
      const node = this.getNode(connectionId);
      if (node && node.type === 'person') {
        people.push(node);
      }
    });
    
    return people;
  }

  // Obtener la ciudad donde vive una persona
  getCityOfPerson(personId) {
    const connections = this.getConnections(personId);
    
    for (const connectionId of connections) {
      const node = this.getNode(connectionId);
      if (node && node.type === 'city') {
        return node;
      }
    }
    
    return null;
  }

  // Imprimir el grafo completo
  printGraph() {
    console.log('=== GRAFO COMPLETO ===');
    console.log('\nNodos:');
    this.nodes.forEach((node, id) => {
      console.log(`- ${id} (${node.type}):`, node.data);
    });
    
    console.log('\nLista de Adyacencia:');
    this.adjacencyList.forEach((connections, nodeId) => {
      const node = this.nodes.get(nodeId);
      console.log(`${nodeId} (${node.type}):`, Array.from(connections));
    });
  }

  // Imprimir personas por ciudad
  printPeopleByCity() {
    console.log('\n=== PERSONAS POR CIUDAD ===');
    const cities = this.getNodesByType('city');
    
    cities.forEach(city => {
      const people = this.getPeopleInCity(city.id);
      console.log(`\n${city.data.name}:`);
      
      if (people.length === 0) {
        console.log('  No hay personas registradas');
      } else {
        people.forEach(person => {
          console.log(`  - ${person.data.name}, ${person.data.age} años`);
        });
      }
    });
  }

// Reemplazar el método toD3GraphFormat existente con este:
toD3GraphFormat() {
  const nodes = [];
  const links = [];
  const processedEdges = new Set();

  // Convertir nodos
  this.nodes.forEach((node, id) => {
    nodes.push({
      id: id,
      name: node.type === 'person' 
        ? `${node.data.name}\n${node.data.age} años` 
        : node.data.name,
      type: node.type
    });
  });

  // Convertir aristas (evitar duplicados)
  this.adjacencyList.forEach((connections, sourceId) => {
    connections.forEach(targetId => {
      const edgeKey1 = `${sourceId}-${targetId}`;
      const edgeKey2 = `${targetId}-${sourceId}`;
      
      if (!processedEdges.has(edgeKey1) && !processedEdges.has(edgeKey2)) {
        links.push({
          source: sourceId,
          target: targetId
        });
        processedEdges.add(edgeKey1);
      }
    });
  });

  return { nodes, links };
}
}

export default Graph;