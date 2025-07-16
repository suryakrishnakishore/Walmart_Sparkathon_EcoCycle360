import React from "react";

const Stepper = ({ currentStep, steps }) => (
  <div className="w-full px-4 py-6">
    <div className="relative flex items-center justify-between">
      {steps.map((label, index) => (
        <div key={index} className="flex flex-col items-center w-1/4">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold z-10
              ${index + 1 <= currentStep ? "bg-green-500" : "bg-gray-400"}`}
          >
            {index + 1}
          </div>
          <span className="text-xs mt-2 text-center">{label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default Stepper;