import { useState, useEffect } from 'react';
import './App.css';
import StudentManager from './components/StudentManager';
import SlotMachine from './components/SlotMachine';
import SecretMenu from './components/SecretMenu';
import EthicsGuideGate from './components/EthicsGuideGate';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';

function App() {
  const [isGuideAgreed, setIsGuideAgreed] = useState(false);
  const [legalModalType, setLegalModalType] = useState(null);

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

  if (!isGuideAgreed) {
    return <EthicsGuideGate onAgree={() => setIsGuideAgreed(true)} />;
  }

  return (
    <div className="app-container">
      <SecretMenu 
        students={students} 
        secretQueue={secretQueue} 
        setSecretQueue={setSecretQueue} 
      />

      <header className="app-header">
        <div className="header-title-container">
          <span className="material-symbols-rounded header-icon">casino</span>
          <h1 className="logo">랜덤 발표자 뽑기</h1>
        </div>
        <button className="btn-tonal" onClick={() => setIsGuideAgreed(false)}>
          <span className="material-symbols-rounded" style={{fontSize: '20px'}}>gpp_good</span>
          윤리가이드 다시보기
        </button>
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

      <Footer onOpenLegal={setLegalModalType} />
      
      <LegalModal 
        isOpen={!!legalModalType} 
        type={legalModalType} 
        onClose={() => setLegalModalType(null)} 
      />
    </div>
  );
}

export default App;
