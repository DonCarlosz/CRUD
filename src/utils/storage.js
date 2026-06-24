const STORAGE_KEY = '@students_data';

export const getStudents = () => {
  const jsonValue = localStorage.getItem(STORAGE_KEY);
  return jsonValue ? JSON.parse(jsonValue) : [];
};

export const saveStudent = (student) => {
  const existing = getStudents();
  if (student.id) {
    const updated = existing.map(s => s.id === student.id ? student : s);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } else {
    student.id = Date.now().toString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([student, ...existing]));
  }
};

export const deleteStudent = (id) => {
  const existing = getStudents();
  const filtered = existing.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};