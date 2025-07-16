import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Leaf, Coins } from "lucide-react";

const PerformanceCard = () => {
  const score = 830;
  const label = "Excellent";
  const percentage = (score / 1000) * 100;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Your Performance</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        {/* Score Gauge */}
        <div className="w-32 h-32 mx-auto md:mx-0">
          <CircularProgressbarWithChildren
            value={percentage}
            strokeWidth={10}
            styles={buildStyles({
              pathColor: "#10b981",
              trailColor: "#e5e7eb",
              strokeLinecap: "round",
            })}
          >
            <div className="flex flex-col items-center mt-2">
              <div className="text-green-600 text-2xl font-bold">{score}</div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          </CircularProgressbarWithChildren>
        </div>

        {/* City Peer Stats */}
        <div className="flex flex-col gap-2 text-sm">
          <p className="text-gray-600">Your City Peers</p>
          <p className="font-medium">
            645 <span className="text-yellow-500">Fair</span>
          </p>
          <p className="text-gray-400">Percentile: 85</p>
        </div>

        {/* National Average Stats */}
        <div className="flex flex-col gap-2 text-sm">
          <p className="text-gray-600">National Average</p>
          <p className="font-medium">
            780 <span className="text-yellow-500">Fair</span>
          </p>
          <p className="text-gray-400">Percentile: 74</p>
        </div>

        {/* CO2 and EcoCoins */}
        <div className="flex flex-col gap-3 text-sm text-center md:text-left">
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <Leaf className="w-4 h-4" />
            CO₂ Saved: <span className="font-bold text-gray-700">124.5 kg</span>
          </div>
          <div className="flex items-center gap-2 text-purple-600 font-medium">
            <Coins className="w-4 h-4" />
            EcoCoins: <span className="font-bold text-gray-700">47</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCard;
