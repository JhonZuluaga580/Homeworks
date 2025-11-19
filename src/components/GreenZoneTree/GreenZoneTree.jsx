import React from 'react';
import { TreePine, Edit2 } from 'lucide-react';
import styles from './GreenZoneTree.module.scss';

/**
 * Componente recursivo que renderiza el árbol de zonas verdes
 * @param {Object} props
 * @param {GreenZone} props.zone - Zona verde a renderizar
 * @param {number} props.level - Nivel de profundidad en el árbol
 * @param {Function} props.onEdit - Callback cuando se edita una zona
 */
const GreenZoneTree = ({ zone, level = 0, onEdit }) => {
  if (!zone) return null;

  return (
    <div className={styles.treeContainer} style={{ marginLeft: `${level * 20}px` }}>
      <div 
        className={`${styles.zoneNode} ${level === 0 ? styles.rootNode : ''}`}
        data-level={level}
      >
        <TreePine size={16} className={styles.icon} />
        <span className={styles.zoneName}>
          {zone.name}
        </span>
        <button
          onClick={() => onEdit(zone)}
          className={styles.editButton}
          title="Añadir subzona"
        >
          <Edit2 size={14} />
          <span>Añadir Subzona</span>
        </button>
      </div>
      
      {/* Renderizado recursivo de los hijos */}
      {zone.children.map(child => (
        <GreenZoneTree
          key={child.id}
          zone={child}
          level={level + 1}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default GreenZoneTree;