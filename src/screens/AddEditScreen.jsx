import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { saveStudent, getStudents } from '../utils/storage';

export default function AddEditScreen() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get student ID from URL

  const [name, setName] = useState('');
  const [matNumber, setMatNumber] = useState('');
  const [dob, setDob] = useState('');
  const [level, setLevel] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [gender, setGender] = useState('Male');

  useEffect(() => {
    if (id) {
      const students = getStudents();
      const s = students.find(item => item.id === id);
      if (s) {
        setName(s.name || '');
        setMatNumber(s.matNumber || '');
        setDob(s.dob || '');
        setLevel(s.level || '');
        setDepartment(s.department || 'Computer Science');
        setGender(s.gender || 'Male');
      }
    }
  }, [id]);

  const handleSave = () => {
    if (!name || !matNumber) {
      alert('Name and Mat Number are required');
      return;
    }
    saveStudent({ id, name, matNumber, dob, level, department, gender });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f0ede8] text-gray-800 flex flex-col font-sans">
      {/* Header */}
      <div className="bg-[#2c2c54] p-4 flex items-center shadow-md">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 text-[#e8d5b7] text-2xl font-bold hover:text-[#dfc5a0] transition-colors cursor-pointer bg-transparent border-0 outline-none select-none"
        >
          ←
        </button>
        <h1 className="text-white font-bold text-sm leading-tight">
          {id ? 'Edit Student' : 'Add New Student'}
        </h1>
      </div>

      <div className="p-6 flex-1 flex flex-col max-w-md mx-auto w-full gap-4 pb-20">
        
        {/* Matriculation Number */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] tracking-wider text-gray-500 font-bold uppercase">MATRICULATION NUMBER</label>
          <input 
            className={`w-full bg-white p-3.5 border-2 rounded-xl text-sm outline-none transition-all placeholder-gray-400 ${
              matNumber ? 'border-solid border-[#2c2c54]' : 'border-dashed border-gray-400 focus:border-[#2c2c54]'
            }`}
            placeholder="FOS/22/23/288152"
            value={matNumber}
            onChange={(e) => setMatNumber(e.target.value)}
          />
        </div>

        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] tracking-wider text-gray-500 font-bold uppercase">FULL NAME</label>
          <input 
            className={`w-full bg-white p-3.5 border-2 rounded-xl text-sm outline-none transition-all placeholder-gray-400 ${
              name ? 'border-solid border-[#2c2c54]' : 'border-dashed border-gray-400 focus:border-[#2c2c54]'
            }`}
            placeholder="Enter student full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] tracking-wider text-gray-500 font-bold uppercase">DATE OF BIRTH</label>
          <input 
            className={`w-full bg-white p-3.5 border-2 rounded-xl text-sm outline-none transition-all placeholder-gray-400 ${
              dob ? 'border-solid border-[#2c2c54]' : 'border-dashed border-gray-400 focus:border-[#2c2c54]'
            }`}
            placeholder="DD / MM / YYYY"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        {/* Level and Department Row */}
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-[10px] tracking-wider text-gray-500 font-bold uppercase">LEVEL</label>
            <input 
              className={`w-full bg-white p-3.5 border-2 rounded-xl text-sm outline-none transition-all placeholder-gray-400 ${
                level ? 'border-solid border-[#2c2c54]' : 'border-dashed border-gray-400 focus:border-[#2c2c54]'
              }`}
              placeholder="e.g. 400L"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-[10px] tracking-wider text-gray-500 font-bold uppercase">DEPARTMENT</label>
            <input 
              className={`w-full bg-white p-3.5 border-2 rounded-xl text-sm outline-none transition-all placeholder-gray-400 ${
                department ? 'border-solid border-[#2c2c54]' : 'border-dashed border-gray-400 focus:border-[#2c2c54]'
              }`}
              placeholder="Computer Sci."
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
        </div>

        {/* Gender Selection */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] tracking-wider text-gray-500 font-bold uppercase">GENDER</label>
          <div className="flex gap-3.5">
            {['Male', 'Female', 'Other'].map(g => (
              <button 
                key={g} 
                onClick={() => setGender(g)}
                className={`flex-1 py-3 text-center border-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  gender === g 
                    ? 'bg-[#2c2c54] border-solid border-[#2c2c54] text-white shadow-sm' 
                    : 'border-dashed border-gray-400 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button 
          onClick={handleSave}
          className="w-full bg-[#2c2c54] text-white p-4 rounded-2xl font-bold hover:bg-[#3b3b75] transition-colors cursor-pointer text-center mt-3 text-sm shadow-md"
        >
          Save Student
        </button>
        
        {/* Cancel Button */}
        <button 
          onClick={() => navigate(-1)}
          className="w-full bg-transparent border-2 border-dashed border-gray-400 text-gray-500 p-4 rounded-2xl font-bold hover:bg-gray-100 transition-colors cursor-pointer text-center text-sm"
        >
          Cancel
        </button>

      </div>
    </div>
  );
}