/**
 * Clase que representa una zona verde en un árbol N-ario
 * Cada zona puede tener múltiples subzonas (hijos)
 */
class GreenZone {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.children = []; // Array de subzonas (árbol N-ario)
  }

  /**
   * Añade una subzona como hijo de esta zona
   * @param {GreenZone} childZone - La subzona a añadir
   */
  addChild(childZone) {
    this.children.push(childZone);
  }

  /**
   * Calcula la altura máxima del árbol desde esta zona
   * Usa recursión para encontrar la rama más profunda
   * @returns {number} Altura del árbol
   */
  getHeight() {
    if (this.children.length === 0) return 1; // Hoja = altura 1
    return 1 + Math.max(...this.children.map(child => child.getHeight()));
  }

  /**
   * Cuenta el total de zonas (esta zona + todas las subzonas)
   * Usa recursión para recorrer todo el árbol
   * @returns {number} Total de zonas verdes
   */
  getTotalZones() {
    let count = 1; // Cuenta esta zona
    for (const child of this.children) {
      count += child.getTotalZones(); // Suma zonas de los hijos
    }
    return count;
  }

  /**
   * Busca una zona por ID usando DFS (Depth-First Search)
   * @param {string} id - ID de la zona a buscar
   * @returns {GreenZone|null} La zona encontrada o null
   */
  findZone(id) {
    if (this.id === id) return this;
    for (const child of this.children) {
      const found = child.findZone(id);
      if (found) return found;
    }
    return null;
  }

  /**
   * Imprime el árbol en consola (para debugging)
   * @param {number} level - Nivel de indentación
   */
  printTree(level = 0) {
    console.log('  '.repeat(level) + `🌳 ${this.name}`);
    this.children.forEach(child => child.printTree(level + 1));
  }
}

export default GreenZone;