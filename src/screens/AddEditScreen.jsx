import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { saveStudent } from '../utils/storage';

export default function AddEditScreen() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get student ID from URL
  
  // In a real app, fetch this student from storage using the ID
  const [name, setName] = useState('');
  const [matNumber, setMatNumber] = useState('');

  const handleSave = () => {
    if (!name || !matNumber) return alert('Required fields missing');
    saveStudent({ id, name, matNumber });
    navigate('/');
  };

  return (
    <div className="p-6 bg-[#f0ede8] min-h-screen">
      <h1 className="text-xl font-bold mb-6 text-[#2c2c54]">
        {id ? 'Edit Student' : 'Add New Student'}
      </h1>
      
      <div className="mb-4">
        <label className="text-[10px] uppercase tracking-widest text-gray-500">Full Name</label>
        <input 
          className="w-full p-4 border-2 border-dashed border-gray-400 rounded-lg outline-none focus:border-[#2c2c54]"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <button 
        onClick={handleSave}
        className="w-full bg-[#2c2c54] text-white p-4 rounded-xl font-bold"
      >
        Save Student
      </button>
    </div>
  );
}