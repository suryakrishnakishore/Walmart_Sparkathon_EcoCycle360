import React from "react";
import { Crown, ArrowUp, User } from "lucide-react";


const users = [
  { id: 1, name: "Alice", ecoScore: 90, co2Savings: 120, image: "avatar1.jpeg" },
  { id: 2, name: "Bob", ecoScore: 85, co2Savings: 110, image: "avatar2.jpeg" },
  { id: 3, name: "Charlie", ecoScore: 82, co2Savings: 100, image: "avatar3.jpeg" },
  { id: 4, name: "Jacob", ecoScore: 73, co2Savings: 85, image: "avatar2.jpeg" },
  { id: 5, name: "Dianne", ecoScore: 68, co2Savings: 80, image: "avatar1.jpeg" },
  { id: 6, name: "You Currently Rank", ecoScore: 34, co2Savings: 60, image: "avatar3.jpeg" },
];

const user = {
  id: 99,
  name: "You",
  ecoScore: 34,
  co2Savings: 60,
  image: "/avatar3.jpeg"
};

const LeaderboardPage = () => {
  const topThree = users.slice(0, 3);
  const others = users.slice(3);

  return (
    <main className="p-6 bg-gradient-to-br from-purple-50 to-white shadow-lg rounded-2xl min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Leaderboard</h1>

      {/* Top 3 Users Section */}
     <div className="flex justify-center items-end gap-6 mb-10">
  {/* 2nd */}
  <div className="flex flex-col items-center">
    <div className="relative w-20 h-20 rounded-full border-4 border-purple-400 overflow-hidden">
      
      <img
        src={topThree[1].image}
        alt="2nd user"
        className="relative w-full h-full object-cover rounded-full opacity-80"
      />
     
      
    </div>
    <span className="bg-purple-400 text-white px-2 py-1 rounded-full text-xs mt-1">2</span>
     <span>{topThree[1].name}</span>
  </div>

  {/* 1st */}
  <div className="flex flex-col items-center -mb-4">
    <div className="relative w-24 h-24 rounded-full border-4 border-green-500 overflow-hidden">
     
      <img
        src={topThree[0].image}
        alt="1st user"
        className="relative w-full h-full object-cover rounded-full opacity-80"
      />
    </div>
    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm mt-1 font-bold">1</span>
     <span>{topThree[0].name}</span>
  </div>

  {/* 3rd */}
  <div className="flex flex-col items-center">
    <div className="relative w-20 h-20 rounded-full border-4 border-yellow-400 overflow-hidden">
    
      <img
        src={topThree[2].image}
        alt="3rd user"
        className="relative w-full h-full object-cover rounded-full opacity-80"
      />
    </div>
    <span className="bg-yellow-400 text-white px-2 py-1 rounded-full text-xs mt-1">3</span>
     <span>{topThree[2].name}</span>
  </div>
</div>


      
      {/* Rank List */}
      <div className="bg-white rounded-2xl shadow-md p-6 max-w-4xl mx-auto">
        
        <div className="grid grid-cols-4 gap-4 text-xs text-gray-400 mb-2">
          <div>Rank</div>
          <div>User</div>
          <div>CO₂ Savings</div>
          <div>Eco Score</div>
        </div>
        {/* Your Rank at the Top */}
{user && (
  <div className="mb-4">
   
    <div className="grid grid-cols-4 gap-4 items-center py-3 px-3 rounded-lg bg-gradient-to-r from-green-100 to-teal-100 to-white-100  font-semibold shadow-md">
      <div className="text-center">#{user.id}</div>
      <div className="flex items-center gap-2">
        <img
          src={user.image}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover  border-white"
        />
        <span>{user.name}</span>
      </div>
      <div>{user.co2Savings} kg</div>
      <div>{user.ecoScore}</div>
    </div>
  </div>
)}

        <div className="divide-y text-sm">
          {users.map((user, index) => (
            <div key={user.id} className="grid grid-cols-4 gap-4 items-center py-3">
              <div className="text-center font-semibold text-gray-600">#{index + 1}</div>
              <div className="flex items-center gap-2">
                
               <img
        src={user.image}
        alt=" user"
        className="relative w-8 h-8 object-cover rounded-full opacity-80"
      />

                <span>{user.name}</span>
              </div>
              <div className="text-green-600 font-medium">{user.co2Savings} kg</div>
              <div className="text-purple-600 font-bold">{user.ecoScore}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default LeaderboardPage;
