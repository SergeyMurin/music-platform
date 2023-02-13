import React from "react";
import Marquee from "react-fast-marquee";

const MyMarquee = () => {
  return (
    <div style={{ width: "10vw" }}>
      <Marquee gradientWidth={0} speed={15}>
        This is an automatic text marquee. This is an automatic text marquee.
      </Marquee>
    </div>
  );
};

export default MyMarquee;
