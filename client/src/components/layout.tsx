import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Player } from "./player/player";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Search } from "./search/search";

export const Layout: React.FC = () => {
  const { setUser, setToken, setAuth } = useActions();
  const { isAuth } = useTypedSelector((state) => state.user);
  const signOutHandler = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setAuth(false);
  };
  return (
    <div className={"layout"}>
      <header>
        <div className={"logo_panel"}>
          <Link to={""} className={""}>
            TrackTornado
          </Link>
        </div>
        <Search />
        <div className={"user_panel"}>
          {!isAuth && (
            <Link to={"/sign-in"} replace={true}>
              Sign In
            </Link>
          )}
          {isAuth && (
            <Link to={""} onClick={signOutHandler}>
              Sign Out
            </Link>
          )}
        </div>
      </header>
      <div className={"page"}>
        <Outlet />
      </div>
      <Player />
    </div>
  );
};
