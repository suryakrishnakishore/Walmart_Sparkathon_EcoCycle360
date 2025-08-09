import React from "react";

function SavingsPop({ open, onClose, co2Saved, userName }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-900/20 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl px-8 py-8 max-w-sm w-full flex flex-col items-center animate-scaleIn">
        <button
          className="absolute top-4 right-4 text-emerald-500 hover:text-blue-500 text-2xl font-bold transition"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="mb-4">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="#10b981" />
            <path
              d="M32 18v28M18 32h28"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M24 40c4 4 12 4 16 0"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-blue-600 mb-1">
          Congratulations{userName ? `, ${userName}` : ""}!
        </h2>
        <p className="text-gray-500 mb-2">You have helped save</p>
        <div className="flex items-end justify-center mb-2">
          <span className="text-4xl font-extrabold text-emerald-500 mr-2">{co2Saved}</span>
          <span className="text-lg font-semibold text-blue-500">kg CO₂</span>
        </div>
        <p className="text-gray-500 text-center">
          Thank you for making a positive impact on the environment!
        </p>
      </div>
      {/* Animation */}
      <style>
        {`
          @keyframes scaleIn {
            0% { transform: scale(0.85); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-scaleIn {
            animation: scaleIn 0.25s cubic-bezier(.4,2,.6,1) both;
          }
        `}
      </style>
    </div>
  );
}

export default SavingsPop;