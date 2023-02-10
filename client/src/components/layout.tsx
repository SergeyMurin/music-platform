import React from "react";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
  return (
    <div className={"laylout"}>
      <div className={"page"}>
        header nevbar
        <Outlet />
      </div>
    </div>
  );
};
