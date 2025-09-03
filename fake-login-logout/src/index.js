import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./AuthContext"; // Importa el provider

ReactDOM.render(
  <AuthProvider> {/* Envuelve toda la aplicación */}
    <App />
  </AuthProvider>,
  document.getElementById("root")
);

