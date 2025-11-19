import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import styles from './AddCityForm.module.scss';

/**
 * Formulario para agregar nuevas ciudades
 */
const AddCityForm = ({ onAddCity }) => {
  const [cityName, setCityName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cityName.trim()) return;
    onAddCity(cityName);
    setCityName('');
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>➕ Agregar Nueva Ciudad</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Nombre de la ciudad..."
          className={styles.input}
          autoFocus
        />
        <button type="submit" className={styles.submitButton}>
          <Plus size={20} />
          <span>Agregar Ciudad</span>
        </button>
      </form>
    </div>
  );
};

export default AddCityForm;