import React from "react";

const Step2 = ({ nextStep, prevStep }) => {
  return (
    <>
      <div onClick={() => nextStep()}>Step2</div>;
      <div onClick={() => prevStep()}>prev</div>;
    </>
  );
};

export default Step2;
