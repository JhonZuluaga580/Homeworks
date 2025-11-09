class GraphNode {
  constructor(id, type, data) {
    this.id = id; // Identificador único
    this.type = type; // 'person' o 'city'
    this.data = data; // Información específica del nodo
  }
}

export default GraphNode;