import React from 'react';
import './Footer.css';

export default function Footer({ onOpenLegal }) {
  return (
    <footer className="app-footer">
      <div className="footer-links">
        <button className="footer-link" onClick={() => onOpenLegal('terms')}>
          이용약관
        </button>
        <span className="footer-divider">|</span>
        <button className="footer-link bold" onClick={() => onOpenLegal('privacy')}>
          개인정보처리방침
        </button>
      </div>
      <div className="footer-info">
        <span>개인정보보호책임자: 이서영 교사 (창일중학교)</span>
      </div>
      <div className="footer-copyright">
        © 2026 랜덤 발표자 뽑기. All rights reserved.
      </div>
    </footer>
  );
}
