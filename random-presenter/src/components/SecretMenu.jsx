import { useState, useEffect } from 'react';
import './SecretMenu.css';

export default function SecretMenu({ students, secretQueue, setSecretQueue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [newTarget, setNewTarget] = useState('');

  // 단축키 이벤트 리스너 (Ctrl + Shift + S)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 숨겨진 영역 다중 클릭 처리 (5번 클릭 시 열림)
  const handleHiddenClick = () => {
    setClickCount((prev) => {
      if (prev + 1 >= 5) {
        setIsOpen(true);
        return 0;
      }
      return prev + 1;
    });

    // 1초 뒤에 클릭 카운트 리셋 (빠른 연속 클릭만 허용)
    setTimeout(() => setClickCount(0), 1000);
  };

  const handleAddQueue = () => {
    if (!newTarget.trim()) return;
    if (!students.includes(newTarget.trim())) {
      alert('현재 등록된 학생 명단에 없는 이름입니다.');
      return;
    }
    setSecretQueue([...secretQueue, newTarget.trim()]);
    setNewTarget('');
  };

  const handleRemoveQueue = (idx) => {
    setSecretQueue(secretQueue.filter((_, i) => i !== idx));
  };

  return (
    <>
      <div className="hidden-trigger" onClick={handleHiddenClick} title=" "></div>

      {isOpen && (
        <div className="secret-modal-overlay">
          <div className="secret-modal">
            <button className="btn-close" onClick={() => setIsOpen(false)}>✕</button>
            <h3>🕵️ 교사용 비밀 설정</h3>
            <p className="desc">
              다음 추출 시 당첨될 학생의 순서를 지정합니다. 
              지정된 학생은 화면에 무작위로 돌아가는 것처럼 보이지만 결과적으로는 아래 순서대로 당첨됩니다.
            </p>

            <div className="secret-input-group">
              <select 
                value={newTarget} 
                onChange={(e) => setNewTarget(e.target.value)}
              >
                <option value="">학생 선택...</option>
                {students.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button className="btn-secret" onClick={handleAddQueue}>큐에 추가</button>
            </div>

            <div className="queue-container">
              <h4>현재 당첨 대기열 (순서대로)</h4>
              {secretQueue.length === 0 ? (
                <p className="empty-queue">대기열이 비어있습니다. (정상 랜덤 추출 됨)</p>
              ) : (
                <ol className="queue-list">
                  {secretQueue.map((target, idx) => (
                    <li key={idx}>
                      {target}
                      <button className="btn-remove-queue" onClick={() => handleRemoveQueue(idx)}>취소</button>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
