import React from "react";
import PerformanceCard from "./PerformanceCard";
import RankingList from "./RankingList";

const Leaderboard = () => {
  return (
    <main className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      
      <div className="p-2">
        <PerformanceCard />
      </div>
      <div className="p-2"> <RankingList /></div>

    </main>
  );
};

export default Leaderboard;
