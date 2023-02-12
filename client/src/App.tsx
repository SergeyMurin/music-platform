import React, { useEffect } from "react";
import "./App.css";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

import { AppRoutes } from "./routes/app.routes";
import { useActions } from "./hooks/useActions";
import { useTypedSelector } from "./hooks/useTypedSelector";

function App() {
  const { isAuth } = useTypedSelector((state) => state.user);
  const { fetchUser, setToken } = useActions();

  useEffect(() => {
    const id: string | null = localStorage.getItem("id");
    const token: string | null = localStorage.getItem("token");

    if (id && token) {
      fetchUser(id);
      setToken(token);
    }
  }, []);
  return (
    <div className="App">
      <AppRoutes />
      {isAuth && <div>authorized</div>}
    </div>
  );
}

export default App;
