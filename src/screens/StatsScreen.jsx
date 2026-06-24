import React, { useState, useEffect } from 'react';
import { getStudents } from '../utils/storage';
import { Link, useNavigate } from 'react-router-dom';

export default function StatsScreen() {
  const [stats, setStats] = useState({ total: 0, males: 0, females: 0, levels: {} });

  useEffect(() => {
    const data = getStudents();
    let males = 0, females = 0;
    let levels = { '100L': 0, '200L': 0, '300L': 0, '400L': 0 };

    data.forEach(s => {
      if (s.gender === 'Male') males++;
      if (s.gender === 'Female') females++;
      if (s.level?.startsWith('1')) levels['100L']++;
      else if (s.level?.startsWith('2')) levels['200L']++;
      else if (s.level?.startsWith('3')) levels['300L']++;
      else if (s.level?.startsWith('4')) levels['400L']++;
    });
    setStats({ total: data.length, males, females, levels });
  }, []);

  return (
    <div className="flex-1 bg-[#f0ede8] min-h-screen p-4">
      {/* Topbar */}
      <div className="bg-[#2c2c54] p-4 rounded-xl flex items-center mb-6">
        <div className="w-9 h-9 bg-[#e8d5b7] rounded-lg flex items-center justify-center mr-3">📊</div>
        <div>
          <h1 className="text-white font-bold">Department Analytics</h1>
          <p className="text-gray-400 text-xs">Overview & Statistics</p>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-[#2c2c54] rounded-2xl p-6 flex flex-col items-center mb-6">
        <p className="text-[#e8d5b7] text-[10px] tracking-widest mb-2">TOTAL REGISTERED</p>
        <h2 className="text-white text-5xl font-bold">{stats.total}</h2>
      </div>

      {/* Gender Distribution */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center">
          <span className="text-2xl mb-1">♂</span>
          <span className="font-bold text-xl">{stats.males}</span>
          <span className="text-xs text-gray-500">Male</span>
        </div>
        <div className="flex-1 bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center">
          <span className="text-2xl mb-1">♀</span>
          <span className="font-bold text-xl">{stats.females}</span>
          <span className="text-xs text-gray-500">Female</span>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-dashed border-gray-300 p-4 flex justify-around">
        <Link to="/" className="flex flex-col items-center text-gray-400">🏠<span className="text-[10px]">Home</span></Link>
        <Link to="/add" className="flex flex-col items-center text-gray-400">➕<span className="text-[10px]">Add</span></Link>
        <div className="flex flex-col items-center text-[#2c2c54] font-bold">📊<span className="text-[10px]">Stats</span></div>
      </div>
    </div>
  );
}