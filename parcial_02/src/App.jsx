import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { setUser, logout } from './redux/slices/authSlice';
import { setPosts } from './redux/slices/postsSlice';
import { setNotifications } from './redux/slices/notificationsSlice';
import { setDms } from './redux/slices/dmsSlice';
import { loadState, saveState } from './utils/persistence';
import { store } from './redux/store';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      console.log('Auth state changed, currentUser:', currentUser);
      if (currentUser) {
        dispatch(setUser({ uid: currentUser.uid, email: currentUser.email }));
        try {
          const savedState = await loadState(currentUser.uid);
          console.log('Loaded state:', savedState);
          if (savedState) {
            dispatch(setPosts(savedState.posts || []));
            dispatch(setNotifications(savedState.notifications || []));
            dispatch(setDms(savedState.dms || []));
          } else {
            console.log('No saved state, initializing empty');
            dispatch(setPosts([]));
            dispatch(setNotifications([]));
            dispatch(setDms([]));
          }
        } catch (error) {
          console.error('Error loading state:', error);
          dispatch(setPosts([]));
          dispatch(setNotifications([]));
          dispatch(setDms([]));
        }
      } else {
        dispatch(logout());
      }
    });
    return unsubscribeAuth;
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      console.log('User logged in, UID:', user.uid);
      let timeoutId;
      const handleSave = () => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const currentState = store.getState();
          console.log('Saving state:', currentState);
          saveState(user.uid, currentState).catch((error) => {
            console.error('Error saving state:', error);
          });
        }, 1000);
      };

      const unsubscribeStore = store.subscribe(() => {
        console.log('Store changed, triggering save');
        handleSave();
      });
      handleSave(); // Save initial state
      return () => {
        if (timeoutId) clearTimeout(timeoutId);
        unsubscribeStore();
      };
    }
  }, [user]);

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;