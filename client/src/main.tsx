import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { SocketContextProvider } from "./context/SocketContext.tsx";
import { PrimeReactProvider } from "primereact/api";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <PrimeReactProvider>
          <App />
        </PrimeReactProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);