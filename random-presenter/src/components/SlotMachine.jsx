import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './SlotMachine.css';

export default function SlotMachine({ students, secretQueue, setSecretQueue }) {
  const [extractCount, setExtractCount] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [results, setResults] = useState([]);
  const [displayNames, setDisplayNames] = useState([]);
  
  const spinIntervals = useRef([]);

  useEffect(() => {
    return () => {
      spinIntervals.current.forEach(clearInterval);
    };
  }, []);

  const handleSpin = () => {
    if (students.length === 0) {
      alert('학생 명단을 먼저 추가해주세요!');
      return;
    }
    if (extractCount > students.length) {
      alert('추출 인원이 전체 학생 수보다 많습니다.');
      return;
    }

    setIsSpinning(true);
    setResults([]);
    setDisplayNames(Array(extractCount).fill('?'));

    const finalWinners = [];
    const availableStudents = [...students];
    let currentSecretQueue = [...secretQueue];

    for (let i = 0; i < extractCount; i++) {
      if (currentSecretQueue.length > 0) {
        const secretWinner = currentSecretQueue.shift();
        if (availableStudents.includes(secretWinner)) {
          finalWinners.push(secretWinner);
          const idx = availableStudents.indexOf(secretWinner);
          availableStudents.splice(idx, 1);
        } else {
          const randomIndex = Math.floor(Math.random() * availableStudents.length);
          finalWinners.push(availableStudents[randomIndex]);
          availableStudents.splice(randomIndex, 1);
        }
      } else {
        const randomIndex = Math.floor(Math.random() * availableStudents.length);
        finalWinners.push(availableStudents[randomIndex]);
        availableStudents.splice(randomIndex, 1);
      }
    }

    setSecretQueue(currentSecretQueue);

    const duration = 3000;
    spinIntervals.current.forEach(clearInterval);
    spinIntervals.current = [];

    for (let i = 0; i < extractCount; i++) {
      const intervalId = setInterval(() => {
        setDisplayNames(prev => {
          const newNames = [...prev];
          newNames[i] = students[Math.floor(Math.random() * students.length)];
          return newNames;
        });
      }, 50 + (i * 20));
      
      spinIntervals.current.push(intervalId);
    }

    setTimeout(() => {
      spinIntervals.current.forEach(clearInterval);
      setDisplayNames(finalWinners);
      setResults(finalWinners);
      setIsSpinning(false);
      fireConfetti();
    }, duration);
  };

  const fireConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  return (
    <div className="md-card slot-machine-card">
      <div className="slots">
        {displayNames.length > 0 ? (
          displayNames.map((name, idx) => (
            <div key={idx} className={`slot-item ${results.length > 0 ? 'winner' : 'spinning'}`}>
              <span className="slot-text">{name}</span>
            </div>
          ))
        ) : (
          <div className="slot-item empty-slot">
            <span className="material-symbols-rounded">person_search</span>
            <span className="slot-text">대기 중</span>
          </div>
        )}
      </div>

      <div className="slot-controls">
        <div className="md-text-field">
          <label>추출 인원</label>
          <input 
            type="number" 
            min="1" 
            max={Math.max(1, students.length)} 
            value={extractCount} 
            onChange={(e) => setExtractCount(parseInt(e.target.value) || 1)}
            disabled={isSpinning}
          />
        </div>
        <button 
          className="btn-primary" 
          onClick={handleSpin} 
          disabled={isSpinning || students.length === 0}
        >
          <span className="material-symbols-rounded">play_arrow</span>
          {isSpinning ? '추출 중...' : '뽑기 시작'}
        </button>
      </div>
    </div>
  );
}
