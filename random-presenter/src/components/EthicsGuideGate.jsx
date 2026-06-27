import React from 'react';
import './EthicsGuideGate.css';

const guides = [
  {
    icon: 'emoji_objects',
    color: '#fbbc05',
    title: '가이드 1 : 활용 목적',
    subtitle: '생성형 AI의 활용 이유와 범위를 스스로 설명할 수 있어야 해요.',
    desc: '생성형 AI를 활용하는 이유가 탐구를 위한 것인지 스스로 질문해봐요. 선생님이 허락하신 범위 내에서 학습 목표 달성을 위한 보조 도구로 활용하세요.'
  },
  {
    icon: 'menu_book',
    color: '#ea4335',
    title: '가이드 2 : 주도적 학습',
    subtitle: '생성형 AI를 사용하기 전, 내가 아는 것을 정리하고 질문을 설계해요.',
    desc: '내가 모르는 것이 무엇인지 먼저 파악하고, 이를 배우기 위해 구체적이고 주도적인 질문(프롬프트)을 만들어보세요.'
  },
  {
    icon: 'fact_check',
    color: '#34a853',
    title: '가이드 3 : 비판적 검증',
    subtitle: '생성형 AI의 답변 속 오류나 편향된 시각을 직접 찾아보고 비교해요.',
    desc: '생성형 AI는 거짓말(할루시네이션)을 할 수 있어요. 공식 자료를 통해 교차 검증하고 비판적으로 바라보는 습관을 가져요.'
  },
  {
    icon: 'psychology',
    color: '#4285f4',
    title: '가이드 4 : 사고의 확장',
    subtitle: '단순한 질문을 넘어 좋은 질문을 설계하며 생각의 범위를 넓혀요.',
    desc: '정답만 요구하지 말고 "왜 그럴까?", "다른 방법은 없을까?" 와 같이 질문을 확장하며 토론 파트너로 활용해요.'
  },
  {
    icon: 'shield_person',
    color: '#8e24aa',
    title: '가이드 5 : 안전과 관계',
    subtitle: '개인정보를 스스로 지키고, 생성형 AI와 정서적 거리를 유지해요.',
    desc: '개인정보를 함부로 입력하지 마세요. 속상한 일은 AI보다 가족, 선생님, 친구들과 마음을 나누는 것이 좋아요.'
  },
  {
    icon: 'gavel',
    color: '#ff6d00',
    title: '가이드 6 : 투명성·윤리',
    subtitle: '생성형 AI를 활용한 부분과 내 생각을 명확하게 구분해서 밝혀요.',
    desc: 'AI의 도움을 받았다면 출처를 투명하게 밝혀요. AI의 답변을 내가 쓴 것처럼 제출하는 것은 표절(부정행위)입니다.'
  }
];

export default function EthicsGuideGate({ onAgree }) {
  return (
    <div className="ethics-gate-container">
      <div className="ethics-gate-content">
        <header className="ethics-header">
          <span className="material-symbols-rounded ethics-icon">verified_user</span>
          <h1 className="ethics-title">생성형 AI 윤리 핵심가이드</h1>
          <p className="ethics-subtitle">본 활동을 시작하기 전에 아래 가이드를 꼭 읽어주세요.</p>
        </header>

        <div className="guides-grid">
          {guides.map((guide, idx) => (
            <div className="guide-card" key={idx} style={{ '--theme-color': guide.color }}>
              <div className="guide-icon-wrapper">
                <span className="material-symbols-rounded guide-icon">{guide.icon}</span>
              </div>
              <div className="guide-text">
                <h2 className="guide-title">{guide.title}</h2>
                <h3 className="guide-summary">{guide.subtitle}</h3>
                <p className="guide-desc">{guide.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="ethics-footer">
          <button className="btn-primary agree-button" onClick={onAgree}>
            <span className="material-symbols-rounded">check_circle</span>
            나는 윤리 핵심가이드를 빠짐없이 읽고 이를 실천하겠습니다.
          </button>
        </div>
      </div>
    </div>
  );
}
