import React, { useEffect } from "react";
import "./App.css";
import { AppRoutes } from "./routes/app.routes";
import { useActions } from "./hooks/useActions";
import { ClientConfig } from "./client.config";

function App() {
  const {
    fetchUser,
    setToken,
    fetchUserFavorites,
    fetchUserSubscribers,
    fetchUserSubscriptions,
    fetchTags,
    fetchGenres,
  } = useActions();

  useEffect(() => {
    const id: string | null = localStorage.getItem(ClientConfig.local.id);
    const token: string | null = localStorage.getItem(ClientConfig.local.token);

    if (id && token) {
      fetchUser(id);
      setToken(token);
      fetchUserFavorites(id);
      fetchUserSubscribers(id);
      fetchUserSubscriptions(id);
      fetchTags();
      fetchGenres();
    }
  });
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
