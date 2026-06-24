import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudents } from '../utils/storage';

export default function StatsScreen() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, males: 0, females: 0, levels: {} });

  useEffect(() => {
    const data = getStudents();
    
    let males = 0, females = 0;
    let levels = { '100L': 0, '200L': 0, '300L': 0, '400L': 0 };

    data.forEach(s => {
      if (s.gender === 'Male') males++;
      if (s.gender === 'Female') females++;
      
      // Match the first digit to categorize into levels
      if (s.level?.startsWith('1')) levels['100L']++;
      else if (s.level?.startsWith('2')) levels['200L']++;
      else if (s.level?.startsWith('3')) levels['300L']++;
      else if (s.level?.startsWith('4')) levels['400L']++;
    });

    setStats({ total: data.length, males, females, levels });
  }, []);

  return (
    <div className="min-h-screen bg-[#f0ede8] text-gray-800 flex flex-col font-sans">
      {/* Topbar */}
      <div className="bg-[#2c2c54] p-4 flex items-center shadow-md">
        <div className="w-9 h-9 bg-[#e8d5b7] rounded-lg flex items-center justify-center mr-3 text-lg select-none">📊</div>
        <div>
          <h1 className="text-white font-bold text-sm leading-tight">Department Analytics</h1>
          <p className="text-[#aaa] text-[11px]">Overview & Statistics</p>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col max-w-md mx-auto w-full gap-4 pb-24">
        {/* Hero Stat */}
        <div className="bg-[#2c2c54] rounded-2xl p-6 flex flex-col items-center shadow-md">
          <span className="text-[#e8d5b7] text-[10px] tracking-widest mb-1.5 uppercase font-bold">TOTAL REGISTERED</span>
          <h2 className="text-white text-5xl font-black">{stats.total}</h2>
          <span className="text-[#aaa] text-xs mt-1.5 font-medium">Active Students</span>
        </div>

        {/* Gender Split */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] tracking-wider text-gray-500 font-bold uppercase mt-2">GENDER DISTRIBUTION</span>
          <div className="flex gap-4">
            <div className="flex-1 bg-white border-2 border-dashed border-gray-300 rounded-2xl p-4 flex flex-col items-center shadow-sm">
              <span className="text-2xl mb-1 text-gray-600 select-none">♂</span>
              <span className="font-extrabold text-xl text-gray-800">{stats.males}</span>
              <span className="text-xs text-gray-400 mt-1 font-medium">Male</span>
            </div>
            <div className="flex-1 bg-white border-2 border-dashed border-gray-300 rounded-2xl p-4 flex flex-col items-center shadow-sm">
              <span className="text-2xl mb-1 text-gray-600 select-none">♀</span>
              <span className="font-extrabold text-xl text-gray-800">{stats.females}</span>
              <span className="text-xs text-gray-400 mt-1 font-medium">Female</span>
            </div>
          </div>
        </div>

        {/* Level Split */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] tracking-wider text-gray-500 font-bold uppercase mt-2">ACADEMIC LEVELS</span>
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-4 flex flex-col gap-4 shadow-sm">
            {Object.entries(stats.levels).map(([level, count]) => (
              <div key={level} className="flex items-center gap-3">
                <span className="w-10 text-xs text-gray-600 font-bold">{level}</span>
                <div className="flex-1 h-2 bg-[#f0ede8] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#2c2c54] rounded-full transition-all duration-500" 
                    style={{ width: stats.total > 0 ? `${(count / stats.total) * 100}%` : '0%' }}
                  />
                </div>
                <span className="w-6 text-right text-xs text-gray-800 font-bold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-dashed border-gray-300 py-3 flex justify-around items-center shadow-lg z-40">
        <button 
          onClick={() => navigate('/')}
          className="flex flex-col items-center gap-1 cursor-pointer bg-transparent border-0 select-none"
        >
          <span className="text-lg">🏠</span>
          <span className="text-[10px] text-gray-400 hover:text-gray-600 font-medium">Home</span>
        </button>
        <button 
          onClick={() => navigate('/add')}
          className="flex flex-col items-center gap-1 cursor-pointer bg-transparent border-0 select-none"
        >
          <span className="text-lg">➕</span>
          <span className="text-[10px] text-gray-400 hover:text-gray-600 font-medium">Add</span>
        </button>
        <div className="flex flex-col items-center gap-1 cursor-pointer select-none">
          <span className="text-lg">📊</span>
          <span className="text-[10px] text-[#2c2c54] font-bold">Stats</span>
        </div>
      </div>
    </div>
  );
}