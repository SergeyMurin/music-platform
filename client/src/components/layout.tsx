import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Player } from "./player/player";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Search } from "./search/search";
import "../pages/pages.css";
import { ClientConfig } from "../client.config";

enum DisplayedText {
  LOGO = "TrackTornado",
  SIGN_IN = "Sign In",
  SIGN_OUT = "Sign Out",
}

export const Layout: React.FC = () => {
  const { isAuth, user } = useTypedSelector((state) => state.user);
  const signOutHandler = () => {
    localStorage.removeItem(ClientConfig.local.id);
    localStorage.removeItem(ClientConfig.local.token);
    window.location.replace(window.location.origin);
  };
  return (
    <div className={"layout"}>
      <header>
        <div className={"logo_panel"}>
          <Link to={""} className={""}>
            {DisplayedText.LOGO}
          </Link>
        </div>
        <Search />
        <div className={"user_panel"}>
          {!isAuth && (
            <Link to={ClientConfig.client_routes.auth.sign_in} replace={true}>
              {DisplayedText.SIGN_IN}
            </Link>
          )}
          {isAuth && user && (
            <>
              <Link
                to={`${ClientConfig.client_routes.profile.index}/${user.id}`}
                className={"profile_link"}
              >
                {user.username}
              </Link>
              <Link to={""} onClick={signOutHandler}>
                {DisplayedText.SIGN_OUT}
              </Link>
            </>
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
