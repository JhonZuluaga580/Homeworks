import React from 'react';
import { Login } from './Login';
import { useSelector, useDispatch } from 'react-redux';
import Crud from './Crud';
import Chat from './Chat';
import { logout } from './store/slices/pokemon/authSlice';


function App() {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  return (
      <div>
        {uid ? (
        <>
          <Crud />  
          <Chat /> 
          <button onClick={() => dispatch(logout())}>Logout</button>
        </>
      ) : (
        <Login />
      )}
      </div>
  );
}

export default App;