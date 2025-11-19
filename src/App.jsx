import React, { useState } from 'react';
import CityNetwork from './models/CityNetwork';
import GreenZone from './models/GreenZone';
import AddCityForm from './components/AddCityForm/AddCityForm';
import CityCard from './components/CityCard/CityCard';
import GreenZoneModal from './components/GreenZoneModal/GreenZoneModal';
import styles from './App.module.scss';

function App() {
  // Instancia única del grafo de ciudades
  const [network] = useState(() => new CityNetwork());
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [editingZone, setEditingZone] = useState(null);

  /**
   * Agrega una nueva ciudad a la red
   */
  const handleAddCity = (name) => {
    network.addCity(name);
    setCities(network.getAllCities());
    console.log(`✅ Ciudad "${name}" agregada`);
  };

  /**
   * Elimina una ciudad de la red
   */
  const handleDeleteCity = (cityId) => {
    const city = network.getCity(cityId);
    const cityName = city.name;
    network.deleteCity(cityId);
    setCities(network.getAllCities());
    
    if (selectedCity?.id === cityId) {
      setSelectedCity(null);
    }
    
    console.log(`🗑️ Ciudad "${cityName}" eliminada`);
  };

  /**
   * Selecciona una ciudad
   */
  const handleSelectCity = (city) => {
    setSelectedCity(city);
    console.log(`📍 Ciudad seleccionada: ${city.name}`);
  };

  /**
   * Abre el modal para editar/añadir zona verde
   */
  const handleEditZone = (zone) => {
    setEditingZone(zone);
  };

  /**
   * Añade una zona verde o subzona
   */
  const handleAddGreenZone = (zoneName) => {
    if (!selectedCity) return;
    
    const city = network.getCity(selectedCity.id);
    
    if (editingZone) {
      // Añadir como subzona
      const parentZone = city.greenZoneRoot.findZone(editingZone.id);
      if (parentZone) {
        const newZone = new GreenZone(Date.now().toString(), zoneName);
        parentZone.addChild(newZone);
        console.log(`🌱 Subzona "${zoneName}" añadida a "${editingZone.name}"`);
      }
    } else {
      // Añadir zona raíz
      city.addGreenZone(zoneName);
      console.log(`🌳 Zona principal "${zoneName}" añadida a ${city.name}`);
    }
    
    // Actualizar el estado
    setSelectedCity(network.getCity(selectedCity.id));
    setCities(network.getAllCities());
    setEditingZone(null);
    
    // Imprimir información actualizada
    city.printInfo();
  };

  /**
   * Cierra el modal
   */
  const handleCloseModal = () => {
    setEditingZone(null);
    setSelectedCity(null);
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.mainTitle}>
            🌳 Red de Ciudades con Zonas Verdes
          </h1>
          <p className={styles.subtitle}>
            Gestiona ciudades y sus áreas verdes jerárquicas
          </p>
        </header>

        {/* Formulario para añadir ciudades */}
        <AddCityForm onAddCity={handleAddCity} />

        {/* Grid de ciudades */}
        <div className={styles.citiesGrid}>
          {cities.length === 0 ? (
            <div className={styles.emptyState}>
              <p>📍 No hay ciudades en la red</p>
              <p>Agrega tu primera ciudad arriba</p>
            </div>
          ) : (
            cities.map(city => (
              <CityCard
                key={city.id}
                city={city}
                isSelected={selectedCity?.id === city.id}
                onSelect={() => handleSelectCity(city)}
                onDelete={handleDeleteCity}
                onEditZone={handleEditZone}
              />
            ))
          )}
        </div>

        {/* Modal para añadir zonas verdes */}
        {selectedCity && (editingZone !== null || !selectedCity.greenZoneRoot) && (
          <GreenZoneModal
            city={selectedCity}
            editingZone={editingZone}
            onAdd={handleAddGreenZone}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}

export default App;