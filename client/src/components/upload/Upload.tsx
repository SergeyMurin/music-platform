import React from "react";
import { useNavigate } from "react-router-dom";

export const Upload: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ paddingTop: "10rem" }}>
      <button
        onClick={() => {
          navigate("track");
        }}
        className={"button"}
      >
        Upload Soundtrack
      </button>

      <button
        onClick={() => {
          navigate("album");
        }}
        disabled={true}
        className={"button"}
      >
        Upload Album
      </button>
    </div>
  );
};
