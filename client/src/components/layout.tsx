import React from "react";
import { Outlet } from "react-router-dom";
import { Player } from "./player/player";

export const Layout: React.FC = () => {
  return (
    <div className={"layout"}>
      <div className={"page"}>
        header nevbar
        <Outlet />
      </div>
      <Player />
    </div>
  );
};
