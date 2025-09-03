import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Home = () => <h2>Bienvenido a la página principal</h2>;
const Dashboard = () => <h2>¡Estás logueado!</h2>;

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

const Login = () => {
  const { login } = useContext(AuthContext);

  const handleLogin = () => login("Usuario1"); 
  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> {/* Enlace a la página principal */}
        <Link to="/login">Login</Link> {/* Enlace a la página de login */}
        <Link to="/dashboard">Dashboard</Link> {/* Enlace a la página privada */}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
