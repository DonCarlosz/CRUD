import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getStudents, deleteStudent } from '../utils/storage';

export default function HomeScreen() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [activeLevel, setActiveLevel] = useState('All');
  const [modal, setModal] = useState({ visible: false, student: null });

  const filterTabs = ['All', '100 Level', '200 Level', '300 Level', '400 Level'];

  useEffect(() => {
    setStudents(getStudents());
  }, []);

  const confirmDelete = () => {
    deleteStudent(modal.student.id);
    setStudents(getStudents());
    setModal({ visible: false, student: null });
  };

  const filtered = students.filter(s => {
    const matchesSearch = s.name?.toLowerCase().includes(search.toLowerCase()) || 
                          s.matNumber?.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = activeLevel === 'All' || (s.level && s.level.startsWith(activeLevel.charAt(0)));
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-[#f0ede8] pb-24">
      {/* Topbar */}
      <div className="bg-[#2c2c54] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#e8d5b7] rounded-lg flex items-center justify-center">🎓</div>
          <div>
            <h1 className="text-white font-bold">Student Records</h1>
            <p className="text-[#aaa] text-[10px]">Delta State University</p>
          </div>
        </div>
        <button onClick={() => navigate('/add')} className="bg-[#e8d5b7] px-4 py-2 rounded-full text-[#2c2c54] font-bold text-xs">
          + Add
        </button>
      </div>

      {/* Search & Tabs */}
      <div className="p-4">
        <div className="bg-white border-2 border-dashed border-gray-400 rounded-lg p-3 flex items-center">
          <span>🔍</span>
          <input 
            className="flex-1 ml-2 outline-none text-sm" 
            placeholder="Search..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <div className="px-4">
        {filtered.map(item => (
          <div key={item.id} className="bg-white mb-3 p-4 rounded-xl border-2 border-dashed border-gray-300 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#e8d5b7] flex items-center justify-center">👨‍🎓</div>
            <div className="flex-1">
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-[10px] text-gray-500">{item.matNumber}</p>
            </div>
            <div className="flex flex-col gap-1">
              <button onClick={() => navigate(`/edit/${item.id}`)} className="bg-[#2c2c54] text-white px-3 py-1 rounded text-[10px]">Edit</button>
              <button onClick={() => setModal({ visible: true, student: item })} className="border border-red-600 text-red-600 px-3 py-1 rounded text-[10px]">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      {modal.visible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6">
          <div className="bg-[#f0ede8] p-6 rounded-2xl border-2 border-[#2c2c54] border-dashed text-center">
            <h3 className="font-bold text-[#2c2c54] mb-4">Delete {modal.student.name}?</h3>
            <div className="flex gap-4">
              <button onClick={() => setModal({ visible: false, student: null })} className="flex-1 border-2 border-dashed border-gray-400 p-3 rounded-lg">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 bg-red-600 text-white p-3 rounded-lg">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}