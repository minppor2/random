import { useState, useEffect } from 'react';
import './App.css';
import StudentManager from './components/StudentManager';
import SlotMachine from './components/SlotMachine';
import SecretMenu from './components/SecretMenu';

function App() {
  // 상태 초기화 시 로컬 스토리지에서 불러오기
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('random-presenter-students');
    return saved ? JSON.parse(saved) : [];
  });

  const [secretQueue, setSecretQueue] = useState(() => {
    const saved = localStorage.getItem('random-presenter-secret-queue');
    return saved ? JSON.parse(saved) : [];
  });

  // 상태가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('random-presenter-students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('random-presenter-secret-queue', JSON.stringify(secretQueue));
  }, [secretQueue]);

  return (
    <div className="app-container">
      <SecretMenu 
        students={students} 
        secretQueue={secretQueue} 
        setSecretQueue={setSecretQueue} 
      />

      <header className="app-header">
        <h1>🎯 랜덤 발표자 뽑기 🎲</h1>
        <p>오늘의 주인공은 과연 누구일까요?</p>
      </header>

      <main className="app-main">
        <section className="slot-section">
          <SlotMachine 
            students={students} 
            secretQueue={secretQueue} 
            setSecretQueue={setSecretQueue} 
          />
        </section>

        <section className="manager-section">
          <StudentManager 
            students={students} 
            setStudents={setStudents} 
          />
        </section>
      </main>
      
      <footer className="app-footer">
        <p>💡 Tip: 발표 인원을 선택하고 뽑기 버튼을 누르세요!</p>
      </footer>
    </div>
  );
}

export default App;
