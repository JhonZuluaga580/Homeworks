import { db } from '../firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const saveState = async (uid, state) => {
  const userRef = doc(db, 'users', uid); // Cambia a 'parcial_02' si lo prefieres
  try {
    await setDoc(userRef, {
      posts: state.posts.posts.toArray() || [],
      notifications: state.notifications.notifications.toArray() || [],
      dms: state.dms.dms.toArray() || [],
    }, { merge: true });
    console.log('State saved for UID:', uid);
  } catch (error) {
    console.error('Save error:', error.message);
  }
};

export const loadState = async (uid) => {
  const userRef = doc(db, 'users', uid); // Igual aquí
  try {
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      console.log('Data loaded:', docSnap.data());
      return docSnap.data();
    }
    console.log('No document exists for UID:', uid);
    return null;
  } catch (error) {
    console.error('Load error:', error.message);
    return null;
  }
};