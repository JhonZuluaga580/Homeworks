import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction } from '../redux/slices/authSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const Header = () => {
  const dispatch = useDispatch();
  const notifCount = useSelector(state => state.notifications.notifications.size());
  const notifications = useSelector(state => state.notifications.notifications.toArray());
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logoutAction());
  };

  const toggleNotifications = () => {
    console.log('Toggling notifications, current state:', showNotifications);
    setShowNotifications(!showNotifications);
  };

  return (
    <header className="header">
      <h1>UAO Social</h1>
      <span>Notifications: {notifCount}</span>
      <button onClick={toggleNotifications}>View Notifications</button>
      <button onClick={handleLogout}>Logout</button>
      {showNotifications && (
        <div className="notification-panel">
          {console.log('Rendering notifications:', notifications)}
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notif, i) => (
                <li key={i}>{notif}</li>
              ))}
            </ul>
          ) : (
            <p>No notifications yet.</p>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;