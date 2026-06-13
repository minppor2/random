import { useState } from 'react';
import './StudentManager.css';

export default function StudentManager({ students, setStudents }) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (!inputValue.trim()) return;

    const newStudents = inputValue
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !students.includes(s));

    if (newStudents.length > 0) {
      setStudents([...students, ...newStudents]);
    }
    setInputValue('');
  };

  const handleRemove = (studentToRemove) => {
    setStudents(students.filter((s) => s !== studentToRemove));
  };

  const handleClear = () => {
    if (confirm('모든 명단을 초기화하시겠습니까?')) {
      setStudents([]);
    }
  };

  return (
    <div className="md-card manager-card">
      <div className="card-header">
        <span className="material-symbols-rounded">group_add</span>
        <h2>학생 명단 관리</h2>
      </div>
      
      <div className="md-text-field-area">
        <label>학생 이름 추가 (쉼표/줄바꿈 구분)</label>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rows={3}
        />
      </div>
      <div className="add-action-bar">
        <button className="btn-tonal" onClick={handleAdd}>
          <span className="material-symbols-rounded">add</span>
          추가하기
        </button>
      </div>

      <div className="list-container">
        <div className="list-header">
          <span className="list-count">
            <span className="material-symbols-rounded">groups</span>
            총 인원: {students.length}명
          </span>
          {students.length > 0 && (
            <button className="btn-icon-danger" onClick={handleClear} title="전체 삭제">
              <span className="material-symbols-rounded">delete_sweep</span>
            </button>
          )}
        </div>
        
        <ul className="md-list">
          {students.length === 0 ? (
            <li className="md-list-item empty-state">
              <span className="material-symbols-rounded">inbox</span>
              명단이 비어있습니다.
            </li>
          ) : (
            students.map((student, idx) => (
              <li key={idx} className="md-list-item">
                <span className="material-symbols-rounded item-icon">person</span>
                <span className="item-text">{student}</span>
                <button className="btn-icon-danger item-action" onClick={() => handleRemove(student)}>
                  <span className="material-symbols-rounded">close</span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
