const steps = ["Details", "Category", "Images", "Confirm"];
import React from "react";

const Stepper = ({ currentStep }) => {
  return (
    <div className=" relative flex items-center justify-center h-[120px] w-full px[5%] pt-16 md:pt-[70px] pb-14">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <React.Fragment key={step}>
            {/* Step */}
            <div className="flex flex-col items-center gap-[3px] md:gap-[5px] z-10">
              <div
                className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full text-xs bg-lightPrimary text-white
                  ${isCompleted ? " text-white !bg-primary" : ""}
                  ${
                    isActive
                      ? "!bg-primary_bg !text-jett_black border-4 border-primary shadow-md"
                      : ""
                  }
                `}
              >
                {stepNumber}
              </div>

              <div
                className={`text-xs md:text-sm ${
                  isActive ? "text-primary font-semibold" : "text-neutral-light"
                } ${isCompleted ? "!text-primary " : ""}`}
              >
                {step}
              </div>
            </div>

            {/* Connector Line — don't show after last step */}
            {index !== steps.length - 1 && (
              <div className="w-[100px] md:w-40 mb-[25px] z-0 -mx-8 h-[3px] bg-hov_primary "></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
