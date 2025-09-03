// src/components/Dashboard.js
import React, { useContext } from "react";
import { AuthContext } from "../AuthContext"; 
const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h2>¡Bienvenido, {user}!</h2> {/* Muestra el nombre del usuario logueado */}
      <button onClick={logout}>Cerrar sesión</button> {/* Botón para cerrar sesión */}
    </div>
  );
};

export default Dashboard;
