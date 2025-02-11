import React from "react";
import GradientImg from "../assets/gradient.png";

const Gradient = () => {
  return (
    <>
      {/* Profile Page Banner */}
      <div className="w-full h-[13vh] md:h-[18vh]">
        <img
          className="w-full h-full object-cover object-center"
          src={GradientImg}
          alt="background image"
        />
      </div>
    </>
  );
};

export default Gradient;
