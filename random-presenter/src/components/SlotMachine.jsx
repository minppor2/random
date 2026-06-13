import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './SlotMachine.css';

export default function SlotMachine({ students, secretQueue, setSecretQueue }) {
  const [extractCount, setExtractCount] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [results, setResults] = useState([]);
  const [displayNames, setDisplayNames] = useState([]);
  
  const spinIntervals = useRef([]);

  // cleanup intervals on unmount
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

    // 결정된 당첨자 계산
    const finalWinners = [];
    const availableStudents = [...students];
    let currentSecretQueue = [...secretQueue];

    for (let i = 0; i < extractCount; i++) {
      if (currentSecretQueue.length > 0) {
        // 비밀 큐에서 먼저 가져오기
        const secretWinner = currentSecretQueue.shift();
        if (availableStudents.includes(secretWinner)) {
          finalWinners.push(secretWinner);
          // available에서 제거
          const idx = availableStudents.indexOf(secretWinner);
          availableStudents.splice(idx, 1);
        } else {
          // 비밀 큐에 있는 이름이 명단에 없으면 무작위 추출로 대체
          const randomIndex = Math.floor(Math.random() * availableStudents.length);
          finalWinners.push(availableStudents[randomIndex]);
          availableStudents.splice(randomIndex, 1);
        }
      } else {
        // 비밀 큐가 비어있으면 무작위 추출
        const randomIndex = Math.floor(Math.random() * availableStudents.length);
        finalWinners.push(availableStudents[randomIndex]);
        availableStudents.splice(randomIndex, 1);
      }
    }

    // 상태 업데이트 (비밀 큐 소진 적용)
    setSecretQueue(currentSecretQueue);

    // 슬롯머신 애니메이션 효과
    const duration = 3000; // 3초간 회전
    
    // 각 슬롯마다 애니메이션 간격을 다르게 주어 리얼함 부여
    spinIntervals.current.forEach(clearInterval);
    spinIntervals.current = [];

    for (let i = 0; i < extractCount; i++) {
      const intervalId = setInterval(() => {
        setDisplayNames(prev => {
          const newNames = [...prev];
          newNames[i] = students[Math.floor(Math.random() * students.length)];
          return newNames;
        });
      }, 50 + (i * 20)); // 슬롯마다 속도 약간 다르게
      
      spinIntervals.current.push(intervalId);
    }

    // 멈추기
    setTimeout(() => {
      spinIntervals.current.forEach(clearInterval);
      setDisplayNames(finalWinners);
      setResults(finalWinners);
      setIsSpinning(false);
      
      // 당첨 효과
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
    <div className="slot-machine-container">
      <div className="controls">
        <label>
          추출 인원:
          <input 
            type="number" 
            min="1" 
            max={Math.max(1, students.length)} 
            value={extractCount} 
            onChange={(e) => setExtractCount(parseInt(e.target.value) || 1)}
            disabled={isSpinning}
          />
        </label>
        <button 
          className="btn-spin" 
          onClick={handleSpin} 
          disabled={isSpinning || students.length === 0}
        >
          {isSpinning ? '추출 중...' : '발표자 뽑기! 🎲'}
        </button>
      </div>

      <div className="slots">
        {displayNames.length > 0 ? (
          displayNames.map((name, idx) => (
            <div key={idx} className={`slot ${results.length > 0 ? 'winner' : 'spinning'}`}>
              <span className="slot-text">{name}</span>
            </div>
          ))
        ) : (
          <div className="slot empty-slot">
            <span className="slot-text">대기 중</span>
          </div>
        )}
      </div>
    </div>
  );
}
