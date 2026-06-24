import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteStudent } from '../utils/storage';

export default function DetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f0ede8]">
      <div className="bg-[#2c2c54] p-8 text-center text-white">
        <div className="w-20 h-20 bg-[#e8d5b7] rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">👨‍🎓</div>
        <h2 className="text-xl font-bold">Student Profile</h2>
      </div>

      <div className="p-6">
        <div className="bg-white p-4 rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-xs uppercase">Mat Number</p>
          <p className="font-bold text-lg">{id}</p>
        </div>
        
        <button 
          onClick={() => navigate('/')} 
          className="w-full mt-6 border-2 border-dashed border-gray-400 p-4 rounded-xl"
        >
          Back to List
        </button>
      </div>
    </div>
  );
}