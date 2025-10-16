import { useState, useEffect } from 'react';
import useCollection from './hooks/useCollection';

const ItemManager = () => {
  const { add, getAll, update, remove, results: items, isPending, error } = useCollection('items');
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  useEffect(() => {
    getAll();
  }, [getAll]);

  const handleCreate = async () => {
    if (!title.trim()) return;
    await add({ name: title });
    setTitle('');
    getAll();
  };

  const beginEdit = (id, currentName) => {
    setEditingId(id);
    setEditingTitle(currentName);
  };

  const handleSave = async (id) => {
    if (!editingTitle.trim()) return;
    await update(id, { name: editingTitle });
    setEditingId(null);
    setEditingTitle('');
    getAll();
  };

  const handleRemove = async (id) => {
    await remove(id);
    getAll();
  };

  return (
    <div>
      <h1>Gestor de items (Firestore)</h1>

      {error && <p>Error: {error}</p>}
      {isPending && <p>Cargando...</p>}

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nuevo item"
      />
      <button onClick={handleCreate} disabled={isPending}>Agregar</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {editingId === item.id ? (
              <>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <button onClick={() => handleSave(item.id)}>Guardar</button>
                <button onClick={() => setEditingId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                {item.name}
                <button onClick={() => beginEdit(item.id, item.name)}>Editar</button>
                <button onClick={() => handleRemove(item.id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemManager;
