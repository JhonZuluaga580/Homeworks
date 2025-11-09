import Graph from '../models/Graph';

export const createFriendsAndCitiesGraph = () => {
  const graph = new Graph();

  // ===== AGREGAR CIUDADES =====
  graph.addNode('city_cali', 'city', { name: 'Cali' });
  graph.addNode('city_bogota', 'city', { name: 'Bogotá' });
  graph.addNode('city_medellin', 'city', { name: 'Medellín' });
  graph.addNode('city_cartagena', 'city', { name: 'Cartagena' });

  // ===== AGREGAR PERSONAS =====
  // Personas en Cali
  graph.addNode('person_juan', 'person', { name: 'Juan Pérez', age: 25 });
  graph.addNode('person_maria', 'person', { name: 'María García', age: 30 });
  graph.addNode('person_carlos', 'person', { name: 'Carlos López', age: 28 });

  // Personas en Bogotá
  graph.addNode('person_ana', 'person', { name: 'Ana Martínez', age: 27 });
  graph.addNode('person_luis', 'person', { name: 'Luis Rodríguez', age: 32 });
  graph.addNode('person_sofia', 'person', { name: 'Sofía Torres', age: 24 });

  // Personas en Medellín
  graph.addNode('person_david', 'person', { name: 'David Hernández', age: 29 });
  graph.addNode('person_laura', 'person', { name: 'Laura Gómez', age: 26 });

  // Personas en Cartagena
  graph.addNode('person_miguel', 'person', { name: 'Miguel Díaz', age: 31 });
  graph.addNode('person_valentina', 'person', { name: 'Valentina Ruiz', age: 23 });

  // ===== CONECTAR PERSONAS CON CIUDADES (vive en) =====
  graph.addEdge('person_juan', 'city_cali');
  graph.addEdge('person_maria', 'city_cali');
  graph.addEdge('person_carlos', 'city_cali');

  graph.addEdge('person_ana', 'city_bogota');
  graph.addEdge('person_luis', 'city_bogota');
  graph.addEdge('person_sofia', 'city_bogota');

  graph.addEdge('person_david', 'city_medellin');
  graph.addEdge('person_laura', 'city_medellin');

  graph.addEdge('person_miguel', 'city_cartagena');
  graph.addEdge('person_valentina', 'city_cartagena');

  // ===== CONECTAR AMISTADES (persona - persona) =====
  // Amistades en la misma ciudad
  graph.addEdge('person_juan', 'person_maria');
  graph.addEdge('person_maria', 'person_carlos');
  
  graph.addEdge('person_ana', 'person_luis');
  graph.addEdge('person_luis', 'person_sofia');
  
  graph.addEdge('person_david', 'person_laura');
  
  graph.addEdge('person_miguel', 'person_valentina');

  // Amistades entre ciudades
  graph.addEdge('person_juan', 'person_ana'); // Cali - Bogotá
  graph.addEdge('person_carlos', 'person_david'); // Cali - Medellín
  graph.addEdge('person_sofia', 'person_laura'); // Bogotá - Medellín
  graph.addEdge('person_maria', 'person_miguel'); // Cali - Cartagena

  // Imprimir información en consola
  console.log('\n🌐 GRAFO DE AMIGOS Y CIUDADES CREADO\n');
  graph.printGraph();
  graph.printPeopleByCity();

  return graph;
};