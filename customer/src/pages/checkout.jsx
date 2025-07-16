import React, { useState } from "react";
import ConfirmDetails from "./confirmdetails";
import AddressForm from "./addressform";
import PaymentMethod from "./paymentmethod";
import ConfirmOrder from "./confirmorder";
import Stepper from "./stepper";

const steps = ["Confirm Details", "Address", "Payment Method", "Confirm Order"];

const StepContent = ({ step }) => {
  switch (step) {
    case 0: return <ConfirmDetails />;
    case 1: return <AddressForm />;
    case 2: return <PaymentMethod />;
    case 3: return <ConfirmOrder />;
    default: return null;
  }
};

const CheckOut = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="bg-gradient-to-r from-green-50 via-blue-50 to-teal-50 h-full">
      <div className="max-w-3xl mx-auto py-28 bg-white p-6 rounded-lg shadow-md">
        <Stepper currentStep={currentStep} steps={steps} />
        <StepContent step={currentStep} />
        <div className="mt-6 flex justify-between">
          <button
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(currentStep - 1)}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
          >
            Back
          </button>
          {currentStep < steps.length - 1 && (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
