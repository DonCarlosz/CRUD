import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteStudent, getStudents } from '../utils/storage';

export default function DetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const students = getStudents();
    const s = students.find(item => item.id === id);
    if (s) {
      setStudent(s);
    }
  }, [id]);

  const confirmDelete = () => {
    if (student) {
      deleteStudent(student.id);
    }
    setModalVisible(false);
    navigate('/');
  };

  if (!student) {
    return (
      <div className="min-h-screen bg-[#f0ede8] flex items-center justify-center p-6 text-gray-600 font-sans">
        <div className="text-center">
          <p className="text-lg font-bold">Student Record Not Found</p>
          <button 
            onClick={() => navigate('/')} 
            className="mt-4 border-2 border-dashed border-gray-400 px-6 py-2 rounded-xl font-bold cursor-pointer"
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }



  return (
    <div className="h-screen overflow-hidden bg-[#f0ede8] text-gray-800 flex flex-col font-sans">
      {/* Hero Section */}
      <div className="bg-[#2c2c54] p-6 flex flex-col items-center shadow-md relative shrink-0">
        <div className="w-full flex justify-between items-center mb-4">
          <button 
            onClick={() => navigate(-1)} 
            className="text-[#e8d5b7] text-2xl font-bold hover:text-[#dfc5a0] transition-colors cursor-pointer bg-transparent border-0 outline-none select-none"
          >
            ←
          </button>
          <span className="text-[#aaa] text-[11px] tracking-widest font-bold">STUDENT PROFILE</span>
          <div className="w-6" /> {/* Spacer */}
        </div>

        <div className="w-20 h-20 rounded-full bg-[#e8d5b7] border-2 border-dashed border-gray-400 flex items-center justify-center mb-3 text-3xl select-none">
          👨‍🎓
        </div>
        <h2 className="text-white text-xl font-bold mb-1 text-center truncate w-full px-4">{student.name}</h2>
        <p className="text-[#aaa] text-xs mb-3 truncate w-full text-center px-4">{student.matNumber}</p>
        <div className="bg-[#e8d5b7] rounded-full px-4 py-1.5 text-xs text-[#2c2c54] font-extrabold select-none">
          {student.level || 'N/A'} · {student.department}
        </div>
      </div>

      {/* Profile Detail Fields */}
      <div className="p-6 flex-1 overflow-y-auto max-w-md mx-auto w-full flex flex-col gap-3 pb-28">
        <DetailRow label="Full Name" value={student.name} />
        <DetailRow label="Mat Number" value={student.matNumber} />
        <DetailRow label="Date of Birth" value={student.dob || 'Not provided'} />
        <DetailRow label="Level" value={student.level || 'Not provided'} />
        <DetailRow label="Gender" value={student.gender} />
        <DetailRow label="Department" value={student.department} />

        {/* Action Buttons */}
        <div className="flex gap-4 mt-4">
          <button 
            onClick={() => navigate(`/edit/${student.id}`)}
            className="flex-1 bg-[#2c2c54] text-white p-4 rounded-xl font-bold hover:bg-[#3b3b75] transition-colors cursor-pointer text-center text-sm shadow-md"
          >
            ✏️ Edit
          </button>
          <button 
            onClick={() => setModalVisible(true)}
            className="flex-1 bg-white border-2 border-dashed border-red-600 text-red-600 p-4 rounded-xl font-bold hover:bg-red-50 transition-colors cursor-pointer text-center text-sm"
          >
            🗑 Delete
          </button>
        </div>
      </div>

      {/* Custom Delete Confirmation Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50 animate-fade-in">
          <div className="bg-[#f0ede8] w-full max-w-sm rounded-2xl border-2 border-dashed border-[#2c2c54] p-6 flex flex-col items-center text-center shadow-2xl">
            <span className="text-4xl mb-3 select-none">⚠️</span>
            <h3 className="text-lg font-bold text-[#2c2c54] mb-2">Delete Record?</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Are you sure you want to remove <span className="font-bold text-gray-800">{student.name}</span>? This action cannot be undone.
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

const DetailRow = ({ label, value }) => (
  <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-4 flex justify-between items-center shadow-sm">
    <span className="text-xs text-gray-400 font-medium">{label}</span>
    <span className="text-sm text-gray-800 font-bold text-right ml-4 flex-1 truncate">{value}</span>
  </div>
);