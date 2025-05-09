import React, { useState } from "react";
import Step1 from "../utility/form_steps/Step1";
import Step2 from "../utility/form_steps/Step2";
import Step3 from "../utility/form_steps/Step3";
import Step4 from "../utility/form_steps/Step4";
import Stepper from "../utility/form_steps/Stepper";

const SellPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    condition: "",
    category: "",
    images: [],
  });

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((current) => current + 1);
  };
  const prevStep = () => {
    setCurrentStep((current) => current - 1);
  };

  const addProduct = (e) => {
    console.log(formData);
    // this function would send data to the backend and add product to the database
  };

  return (
    <>
      <Stepper currentStep={currentStep} />
      {currentStep === 1 && (
        <Step1
          nextStep={nextStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep === 2 && (
        <Step2
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep === 3 && (
        <Step3
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep === 4 && (
        <Step4
          addProduct={addProduct}
          prevStep={prevStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </>
  );
};

export default SellPage;
