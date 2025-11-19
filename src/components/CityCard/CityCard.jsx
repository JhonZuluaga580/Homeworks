import React from 'react';
import { MapPin, Trash2 } from 'lucide-react';
import GreenZoneTree from '../GreenZoneTree/GreenZoneTree';
import styles from './CityCard.module.scss';

/**
 * Componente que muestra la información de una ciudad
 */
const CityCard = ({ city, isSelected, onSelect, onDelete, onEditZone }) => {
  return (
    <div
      className={`${styles.cityCard} ${isSelected ? styles.selected : ''}`}
      onClick={onSelect}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <MapPin size={24} className={styles.icon} />
          <h3 className={styles.cityName}>{city.name}</h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(city.id);
          }}
          className={styles.deleteButton}
          title="Eliminar ciudad"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Estadísticas */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.totalZones}`}>
          <div className={styles.statLabel}>Total Zonas</div>
          <div className={styles.statValue}>{city.getTotalGreenZones()}</div>
        </div>
        <div className={`${styles.statCard} ${styles.maxHeight}`}>
          <div className={styles.statLabel}>Altura Máxima</div>
          <div className={styles.statValue}>{city.getMaxHeight()}</div>
        </div>
      </div>

      {/* Árbol de Zonas Verdes */}
      {city.greenZoneRoot && (
        <div className={styles.treeSection}>
          <GreenZoneTree
            zone={city.greenZoneRoot}
            onEdit={onEditZone}
          />
        </div>
      )}

      {/* Botón para añadir zona principal */}
      {!city.greenZoneRoot && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEditZone(null);
          }}
          className={styles.addZoneButton}
        >
          + Añadir Zona Verde Principal
        </button>
      )}
    </div>
  );
};

export default CityCard;