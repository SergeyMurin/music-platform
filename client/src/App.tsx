import React from "react";
import "./App.css";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { useStore } from "./hooks/useStore";
import { AppRoutes } from "./routes/app.routes";

function App() {
  const { authData } = useStore();

  const setAuthData = useStore((state: any) => state.setAuthData);
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
