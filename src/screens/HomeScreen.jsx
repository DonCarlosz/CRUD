import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudents, deleteStudent } from '../utils/storage';

export default function HomeScreen() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [activeLevel, setActiveLevel] = useState('All');
  
  // Custom Modal States
  const [isModalVisible, setModalVisible] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const filterTabs = ['All', '100 Level', '200 Level', '300 Level', '400 Level'];

  useEffect(() => {
    setStudents(getStudents());
  }, []);

  // Triggers the modal instead of system alert
  const promptDelete = (student) => {
    setStudentToDelete(student);
    setModalVisible(true);
  };

  // Executes the actual deletion
  const confirmDelete = () => {
    if (studentToDelete) {
      deleteStudent(studentToDelete.id);
      setStudents(getStudents());
    }
    setModalVisible(false);
    setStudentToDelete(null);
  };

  const filteredStudents = students.filter(s => {
    const nameStr = s.name ? String(s.name) : '';
    const matStr = s.matNumber ? String(s.matNumber) : '';
    const levelStr = s.level ? String(s.level) : '';

    const matchesSearch = nameStr.toLowerCase().includes(search.toLowerCase()) || 
                          matStr.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = activeLevel === 'All' || (levelStr && levelStr.startsWith(activeLevel.charAt(0)));
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-[#f0ede8] pb-24 text-gray-800 flex flex-col font-sans">
      {/* Topbar */}
      <div className="bg-[#2c2c54] p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#e8d5b7] rounded-lg flex items-center justify-center text-lg select-none">🎓</div>
          <div>
            <h1 className="text-white font-bold text-sm leading-tight">Student Records</h1>
            <p className="text-[#aaa] text-[11px]">Delta State University</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/add')} 
          className="bg-[#e8d5b7] px-4 py-2 rounded-full text-[#2c2c54] font-bold text-xs hover:bg-[#dfc5a0] transition-colors cursor-pointer"
        >
          + Add
        </button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="bg-white border-2 border-dashed border-gray-400 rounded-xl p-2.5 flex items-center shadow-sm">
          <span className="text-sm select-none">🔍</span>
          <input 
            className="flex-1 ml-2 outline-none text-xs text-gray-700 bg-transparent placeholder-gray-400" 
            placeholder="Search by name or mat number..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="px-4 mb-3">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filterTabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveLevel(tab)}
              className={`border-2 border-dashed rounded-full px-4 py-1.5 text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeLevel === tab 
                  ? 'bg-[#2c2c54] border-[#2c2c54] text-white shadow-sm' 
                  : 'border-gray-400 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Section Label */}
      <div className="px-4 text-[10px] text-gray-500 font-bold tracking-wider mb-2 uppercase">
        {filteredStudents.length} STUDENTS FOUND
      </div>

      {/* List */}
      <div className="flex-1 px-4 pb-20">
        {filteredStudents.map(item => (
          <div 
            key={item.id} 
            onClick={() => navigate(`/detail/${item.id}`)}
            className="bg-white mb-3 rounded-2xl border-2 border-dashed border-gray-300 p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-gray-50/55 transition-all shadow-sm"
          >
            <div className="w-11 h-11 rounded-full bg-[#e8d5b7] border-2 border-dashed border-gray-400 flex items-center justify-center shrink-0 text-xl select-none">👨‍🎓</div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm text-gray-800 truncate">{item.name}</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">{item.matNumber}</p>
              
              <div className="flex flex-wrap gap-1.5 mt-2">
                {item.level && (
                  <span className="bg-[#f0ede8] border border-dashed border-gray-400 rounded px-2 py-0.5 text-[9px] text-gray-600 font-medium">
                    {item.level}
                  </span>
                )}
                {item.gender && (
                  <span className="bg-[#f0ede8] border border-dashed border-gray-400 rounded px-2 py-0.5 text-[9px] text-gray-600 font-medium">
                    {item.gender}
                  </span>
                )}
                {item.department && (
                  <span className="bg-[#f0ede8] border border-dashed border-gray-400 rounded px-2 py-0.5 text-[9px] text-gray-600 font-medium">
                    {item.department}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => navigate(`/edit/${item.id}`)} 
                className="bg-[#2c2c54] text-white px-3 py-1.5 rounded-lg text-[10px] text-center font-bold cursor-pointer hover:bg-[#3b3b75] transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={() => promptDelete(item)} 
                className="bg-white border-2 border-dashed border-red-600 text-red-600 px-3 py-1.5 rounded-lg text-[10px] text-center font-bold cursor-pointer hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-dashed border-gray-300 py-3 flex justify-around items-center shadow-lg z-40">
        <div className="flex flex-col items-center gap-1 cursor-pointer select-none">
          <span className="text-lg">🏠</span>
          <span className="text-[10px] text-[#2c2c54] font-bold">Home</span>
        </div>
        <button 
          onClick={() => navigate('/add')}
          className="flex flex-col items-center gap-1 cursor-pointer bg-transparent border-0 select-none"
        >
          <span className="text-lg">➕</span>
          <span className="text-[10px] text-gray-400 hover:text-gray-600 font-medium">Add</span>
        </button>
        <button 
          onClick={() => navigate('/stats')}
          className="flex flex-col items-center gap-1 cursor-pointer bg-transparent border-0 select-none"
        >
          <span className="text-lg">📊</span>
          <span className="text-[10px] text-gray-400 hover:text-gray-600 font-medium">Stats</span>
        </button>
      </div>

      {/* Custom Delete Confirmation Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50 animate-fade-in">
          <div className="bg-[#f0ede8] w-full max-w-sm rounded-2xl border-2 border-dashed border-[#2c2c54] p-6 flex flex-col items-center text-center shadow-2xl">
            <span className="text-4xl mb-3 select-none">⚠️</span>
            <h3 className="text-lg font-bold text-[#2c2c54] mb-2">Delete Record?</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Are you sure you want to remove <span className="font-bold text-gray-800">{studentToDelete?.name}</span>? This action cannot be undone.
            </p>
            
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setModalVisible(false)} 
                className="flex-1 py-3 border-2 border-dashed border-gray-400 rounded-xl text-center font-bold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete} 
                className="flex-1 py-3 bg-[#c0392b] text-white rounded-xl text-center font-bold hover:bg-[#a93224] transition-colors cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}