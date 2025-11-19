import React, { useState, useEffect } from 'react';
import styles from './GreenZoneModal.module.scss';

/**
 * Modal para añadir o editar zonas verdes
 */
const GreenZoneModal = ({ city, editingZone, onAdd, onClose }) => {
  const [zoneName, setZoneName] = useState('');

  useEffect(() => {
    setZoneName('');
  }, [editingZone]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!zoneName.trim()) return;
    onAdd(zoneName);
    setZoneName('');
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <h3 className={styles.title}>
          {editingZone
            ? `🌱 Añadir Subzona a "${editingZone.name}"`
            : `🌳 Añadir Zona Verde Principal a ${city.name}`}
        </h3>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={zoneName}
            onChange={(e) => setZoneName(e.target.value)}
            placeholder="Nombre de la zona verde..."
            className={styles.input}
            autoFocus
          />
          
          <div className={styles.buttons}>
            <button type="submit" className={styles.addButton}>
              Añadir
            </button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GreenZoneModal;