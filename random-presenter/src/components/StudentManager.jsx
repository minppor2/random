import { useState } from 'react';
import './StudentManager.css';

export default function StudentManager({ students, setStudents }) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (!inputValue.trim()) return;

    // 쉼표나 줄바꿈, 혹은 공백 여러개로 구분된 문자열을 배열로 변환
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
    <div className="student-manager">
      <h2>🧑‍🎓 학생 명단 관리</h2>
      
      <div className="input-group">
        <textarea
          placeholder="추가할 학생 이름을 입력하세요. 여러 명일 경우 줄바꿈이나 쉼표로 구분하세요."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rows={3}
        />
        <button className="btn-primary" onClick={handleAdd}>추가하기</button>
      </div>

      <div className="list-container">
        <div className="list-header">
          <span>총 인원: {students.length}명</span>
          <button className="btn-danger-text" onClick={handleClear}>전체 삭제</button>
        </div>
        <ul className="student-list">
          {students.length === 0 ? (
            <li className="empty-msg">명단이 비어있습니다.</li>
          ) : (
            students.map((student, idx) => (
              <li key={idx}>
                <span>{student}</span>
                <button className="btn-remove" onClick={() => handleRemove(student)}>✕</button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
