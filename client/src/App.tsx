import React, { useEffect } from "react";
import "./App.css";
import { AppRoutes } from "./routes/app.routes";
import { useActions } from "./hooks/useActions";
import { useTypedSelector } from "./hooks/useTypedSelector";
import MyMarquee from "./components/player/marquee";
import { fetchPopularTracks } from "./store/action.creators/track.actions";

function App() {
  const { isAuth } = useTypedSelector((state) => state.user);
  const {
    fetchUser,
    setToken,
    fetchTags,
    fetchUserFavorites,
    fetchUserSubscribers,
    fetchUserSubscriptions,
    fetchGenres,
    fetchTracks,
  } = useActions();

  useEffect(() => {
    const id: string | null = localStorage.getItem("id");
    const token: string | null = localStorage.getItem("token");

    if (id && token) {
      fetchUser(id);
      setToken(token);
      fetchUserFavorites(id, token);
      fetchUserSubscribers(id);
      fetchUserSubscriptions(id);
      fetchTags();
      fetchGenres();
      fetchUserFavorites(id, token);
    }
  }, []);
  return (
    <div className="App">
      <AppRoutes />
      <MyMarquee />
    </div>
  );
}

export default App;
