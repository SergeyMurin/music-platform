import React from "react";
import Marquee from "react-fast-marquee";

type Props = {
  text: string;

  activateLength: number;
};
const MyMarquee: React.FC<Props> = ({ text, activateLength }) => {
  return (
    <>
      {text?.length >= activateLength ? (
        <Marquee gradientWidth={0} speed={4} pauseOnHover={true}>
          <div
            style={{ whiteSpace: "nowrap", width: "200%", cursor: "pointer" }}
          >
            {text}
          </div>
        </Marquee>
      ) : text ? (
        <div
          className={"fake-link"}
          style={{ whiteSpace: "nowrap", width: "100%" }}
        >
          {text}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MyMarquee;
