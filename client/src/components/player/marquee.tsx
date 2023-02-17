import React from "react";
import Marquee from "react-fast-marquee";

type Props = {
  text: string;
  onClickEvent: () => any;
  activateLength: number;
};
const MyMarquee: React.FC<Props> = ({ text, activateLength, onClickEvent }) => {
  return (
    <>
      {text?.length >= activateLength ? (
        <Marquee gradientWidth={0} speed={4} pauseOnHover={true}>
          <div
            style={{ whiteSpace: "nowrap", width: "200%", cursor: "pointer" }}
            onClick={() => onClickEvent()}
          >
            {text}
          </div>
        </Marquee>
      ) : text ? (
        <div
          className={"fake-link"}
          onClick={() => onClickEvent()}
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
