import { useState, useEffect } from 'react';
import './SecretMenu.css';

export default function SecretMenu({ students, secretQueue, setSecretQueue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [newTarget, setNewTarget] = useState('');

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

  const handleHiddenClick = () => {
    setClickCount((prev) => {
      if (prev + 1 >= 5) {
        setIsOpen(true);
        return 0;
      }
      return prev + 1;
    });
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
        <div className="md-dialog-scrim">
          <div className="md-dialog">
            <div className="dialog-header">
              <span className="material-symbols-rounded header-icon-dialog">admin_panel_settings</span>
              <h3>교사용 비밀 설정</h3>
              <button className="btn-icon-danger btn-close-dialog" onClick={() => setIsOpen(false)}>
                <span className="material-symbols-rounded">close</span>
              </button>
            </div>
            
            <div className="dialog-content">
              <p className="desc">
                다음 추출 시 당첨될 학생의 순서를 지정합니다. 
                화면엔 무작위로 보이지만 결과적으로 아래 순서대로 당첨됩니다.
              </p>

              <div className="dialog-actions-row">
                <div className="md-text-field flex-fill">
                  <label>학생 선택</label>
                  <select 
                    value={newTarget} 
                    onChange={(e) => setNewTarget(e.target.value)}
                  >
                    <option value="">명단에서 선택...</option>
                    {students.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <button className="btn-tonal" onClick={handleAddQueue}>
                  <span className="material-symbols-rounded">playlist_add</span>
                  추가
                </button>
              </div>

              <div className="queue-container">
                <h4>
                  <span className="material-symbols-rounded">format_list_numbered</span>
                  당첨 대기열
                </h4>
                
                {secretQueue.length === 0 ? (
                  <div className="empty-queue">
                    <span className="material-symbols-rounded">check_circle</span>
                    <p>현재 대기열이 없습니다.<br/>정상적인 랜덤 추출이 진행됩니다.</p>
                  </div>
                ) : (
                  <ul className="md-list queue-list">
                    {secretQueue.map((target, idx) => (
                      <li key={idx} className="md-list-item queue-item">
                        <span className="item-text">{idx + 1}. {target}</span>
                        <button className="btn-icon-danger item-action" onClick={() => handleRemoveQueue(idx)}>
                          <span className="material-symbols-rounded">delete</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
