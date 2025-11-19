import City from './City';

/**
 * Clase que representa un grafo de ciudades interconectadas
 * Usa Map para ciudades y Set para conexiones (grafo no dirigido)
 */
class CityNetwork {
  constructor() {
    this.cities = new Map(); // Map<id, City>
    this.connections = new Map(); // Map<id, Set<id>> - Lista de adyacencia
  }

  /**
   * Añade una nueva ciudad al grafo
   * @param {string} name - Nombre de la ciudad
   * @returns {City} La ciudad creada
   */
  addCity(name) {
    const id = Date.now().toString() + Math.random(); // ID único
    const city = new City(id, name);
    this.cities.set(id, city);
    this.connections.set(id, new Set()); // Inicializa conexiones vacías
    return city;
  }

  /**
   * Elimina una ciudad del grafo
   * También limpia todas las conexiones relacionadas
   * @param {string} id - ID de la ciudad a eliminar
   */
  deleteCity(id) {
    this.cities.delete(id);
    this.connections.delete(id);
    
    // Eliminar conexiones que apuntan a esta ciudad
    for (const [cityId, connections] of this.connections) {
      connections.delete(id);
    }
  }

  /**
   * Conecta dos ciudades en el grafo (arista bidireccional)
   * @param {string} cityId1 - ID de la primera ciudad
   * @param {string} cityId2 - ID de la segunda ciudad
   */
  connectCities(cityId1, cityId2) {
    if (this.cities.has(cityId1) && this.cities.has(cityId2)) {
      this.connections.get(cityId1).add(cityId2);
      this.connections.get(cityId2).add(cityId1); // Bidireccional
    }
  }

  /**
   * Desconecta dos ciudades del grafo
   * @param {string} cityId1 - ID de la primera ciudad
   * @param {string} cityId2 - ID de la segunda ciudad
   */
  disconnectCities(cityId1, cityId2) {
    if (this.connections.has(cityId1)) {
      this.connections.get(cityId1).delete(cityId2);
    }
    if (this.connections.has(cityId2)) {
      this.connections.get(cityId2).delete(cityId1);
    }
  }

  /**
   * Obtiene una ciudad por su ID
   * @param {string} id - ID de la ciudad
   * @returns {City|undefined} La ciudad o undefined
   */
  getCity(id) {
    return this.cities.get(id);
  }

  /**
   * Obtiene todas las ciudades como array
   * @returns {Array<City>} Array de ciudades
   */
  getAllCities() {
    return Array.from(this.cities.values());
  }

  /**
   * Obtiene los IDs de ciudades conectadas a una ciudad dada
   * @param {string} cityId - ID de la ciudad
   * @returns {Array<string>} Array de IDs de ciudades conectadas
   */
  getConnections(cityId) {
    return Array.from(this.connections.get(cityId) || []);
  }

  /**
   * Imprime toda la red de ciudades en consola
   */
  printNetwork() {
    console.log('\n🗺️ RED DE CIUDADES:');
    console.log('='.repeat(50));
    this.cities.forEach(city => {
      city.printInfo();
      const connections = this.getConnections(city.id);
      if (connections.length > 0) {
        console.log('   🔗 Conectada con:');
        connections.forEach(connId => {
          const connCity = this.getCity(connId);
          console.log(`      → ${connCity.name}`);
        });
      }
    });
  }
}

export default CityNetwork;