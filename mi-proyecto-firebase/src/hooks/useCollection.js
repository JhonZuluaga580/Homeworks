// src/hooks/useCollection.js
import { useState, useCallback } from 'react';
import { db } from '../firebase/config';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';

const useCollection = (table) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const getAll = useCallback(
    async (condition) => {
      setError(null);
      setResults([]);
      let q;
      if (condition && condition.length === 3) {
        q = query(collection(db, table), where(condition[0], condition[1], condition[2]));
      } else {
        q = query(collection(db, table));
      }

      try {
        const resDoc = await getDocs(q);
        const list = [];
        resDoc.forEach((d) => list.push({ ...d.data(), id: d.id }));
        setResults(list);
      } catch (err) {
        setError(err?.message || 'Error obteniendo documentos');
      }
    },
    [table]
  );

  const add = useCallback(
    async (newDoc) => {
      setIsPending(true);
      setError(null);
      try {
        const resDoc = await addDoc(collection(db, table), newDoc);
        setIsPending(false);
        return resDoc;
      } catch (err) {
        setError(err?.message || 'Error al crear documento');
        setIsPending(false);
        return null;
      }
    },
    [table]
  );

  const update = useCallback(
    async (id, updates) => {
      setIsPending(true);
      setError(null);
      try {
        await updateDoc(doc(db, table, id), updates);
        setIsPending(false);
        return true;
      } catch (err) {
        setError(err?.message || 'Error al actualizar documento');
        setIsPending(false);
        return false;
      }
    },
    [table]
  );

  const remove = useCallback(
    async (id) => {
      setIsPending(true);
      setError(null);
      try {
        await deleteDoc(doc(db, table, id));
        setIsPending(false);
        return true;
      } catch (err) {
        setError(err?.message || 'Error al eliminar documento');
        setIsPending(false);
        return false;
      }
    },
    [table]
  );

  return { error, isPending, results, add, getAll, update, remove };
};

export default useCollection;
