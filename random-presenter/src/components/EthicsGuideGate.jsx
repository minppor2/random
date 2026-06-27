import React from 'react';
import './EthicsGuideGate.css';

const guides = [
  {
    icon: 'target',
    title: '가이드 1. 활용 목적',
    desc: '탐구를 위한 보조 도구인지 점검하고, 허락된 범위 내에서 활용해요.'
  },
  {
    icon: 'edit_note',
    title: '가이드 2. 주도적 학습',
    desc: '질문하기 전 내가 아는 것을 먼저 정리하고 구체적인 프롬프트를 설계해요.'
  },
  {
    icon: 'find_in_page',
    title: '가이드 3. 비판적 검증',
    desc: 'AI의 답변을 맹신하지 않고 오류나 편향이 없는지 공식 자료로 교차 검증해요.'
  },
  {
    icon: 'lightbulb',
    title: '가이드 4. 사고의 확장',
    desc: '정답만 요구하기보다 "왜 그럴까?" 질문하며 토론 파트너로 활용해요.'
  },
  {
    icon: 'lock',
    title: '가이드 5. 안전과 관계',
    desc: '개인정보 입력을 주의하고, 속상한 일은 주변 사람들과 마음을 나누어요.'
  },
  {
    icon: 'verified',
    title: '가이드 6. 투명성·윤리',
    desc: 'AI의 도움을 받았다면 출처를 밝히고, 내가 쓴 것처럼 제출하지 않아요.'
  }
];

export default function EthicsGuideGate({ onAgree }) {
  return (
    <div className="ethics-gate-container">
      <div className="ethics-gate-content">
        <header className="ethics-header">
          <div className="header-icon-wrapper">
            <span className="material-symbols-rounded">gpp_good</span>
          </div>
          <h1 className="ethics-title">생성형 AI 윤리 가이드</h1>
          <p className="ethics-subtitle">건강한 디지털 학습을 위해 꼭 확인해 주세요</p>
        </header>

        <div className="guides-list">
          {guides.map((guide, idx) => (
            <div className="guide-row" key={idx}>
              <div className="guide-icon-circle">
                <span className="material-symbols-rounded">{guide.icon}</span>
              </div>
              <div className="guide-text">
                <h2 className="guide-title">{guide.title}</h2>
                <p className="guide-desc">{guide.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="ethics-footer">
          <button className="btn-agree" onClick={onAgree}>
            가이드라인을 이해했으며, 이를 실천하겠습니다
          </button>
        </div>
      </div>
    </div>
  );
}
