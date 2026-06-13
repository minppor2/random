import { useState, useEffect } from 'react';
import './App.css';
import StudentManager from './components/StudentManager';
import SlotMachine from './components/SlotMachine';
import SecretMenu from './components/SecretMenu';
import MindmapViewer from './components/MindmapViewer';

function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('random-presenter-students');
    return saved ? JSON.parse(saved) : [];
  });

  const [secretQueue, setSecretQueue] = useState(() => {
    const saved = localStorage.getItem('random-presenter-secret-queue');
    return saved ? JSON.parse(saved) : [];
  });

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
        <span className="material-symbols-rounded header-icon">casino</span>
        <h1 className="logo">랜덤 발표자 뽑기</h1>
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

        <section className="mindmap-section">
          <MindmapViewer />
        </section>
      </main>
    </div>
  );
}

export default App;
