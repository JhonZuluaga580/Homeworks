import GreenZone from './GreenZone';

/**
 * Clase que representa una ciudad
 * Cada ciudad tiene un nombre y un árbol de zonas verdes
 */
class City {
  constructor(id, name) {
    this.id = id;
    this.name = name; // Único dato almacenado (requisito 3)
    this.greenZoneRoot = null; // Raíz del árbol de zonas verdes
  }

  /**
   * Crea y añade una zona verde principal a la ciudad
   * @param {string} name - Nombre de la zona verde
   * @returns {GreenZone} La nueva zona verde creada
   */
  addGreenZone(name) {
    const newZone = new GreenZone(Date.now().toString(), name);
    if (!this.greenZoneRoot) {
      this.greenZoneRoot = newZone;
    }
    return newZone;
  }

  /**
   * Calcula la altura máxima del árbol de zonas verdes
   * @returns {number} Altura máxima (0 si no hay zonas)
   */
  getMaxHeight() {
    return this.greenZoneRoot ? this.greenZoneRoot.getHeight() : 0;
  }

  /**
   * Calcula el total de zonas verdes en la ciudad
   * @returns {number} Total de zonas (0 si no hay zonas)
   */
  getTotalGreenZones() {
    return this.greenZoneRoot ? this.greenZoneRoot.getTotalZones() : 0;
  }

  /**
   * Imprime información de la ciudad en consola
   */
  printInfo() {
    console.log(`\n🏙️ Ciudad: ${this.name}`);
    console.log(`   📊 Total zonas verdes: ${this.getTotalGreenZones()}`);
    console.log(`   📏 Altura máxima: ${this.getMaxHeight()}`);
    if (this.greenZoneRoot) {
      console.log(`   🌳 Árbol de zonas:`);
      this.greenZoneRoot.printTree(2);
    }
  }
}

export default City;