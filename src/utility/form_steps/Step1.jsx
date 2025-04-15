import React from "react";

const Step1 = ({ nextStep }) => {
  return <div onClick={() => nextStep()}>Step1</div>;
};

export default Step1;
