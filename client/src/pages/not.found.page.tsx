import React from "react";
import notFoundImage from "../assets/img/not-found.jpg";

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <img
        style={{ objectFit: "cover", width: "100%" }}
        src={notFoundImage}
        alt={"Not found"}
      />
    </>
  );
};
