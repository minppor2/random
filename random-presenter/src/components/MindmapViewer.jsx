import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import './MindmapViewer.css';

const mindmapDefinition = `mindmap
  root((우리반 학생들))
    (1모둠)
      김철수
      이영희
      박지민
    (2모둠)
      최동수
      정민수
      송혜교
    (3모둠)
      강하늘
      윤보라
      유재석`;

export default function MindmapViewer() {
  const mermaidRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'inherit'
    });

    const renderMap = async () => {
      if (mermaidRef.current) {
        try {
          // Strict Mode에서 동일한 ID로 두 번 렌더링을 시도해서 생기는 충돌 방지
          const uniqueId = 'mermaid-svg-' + Math.random().toString(36).substr(2, 9);
          const { svg } = await mermaid.render(uniqueId, mindmapDefinition);
          
          // 컴포넌트가 아직 마운트되어 있는지 확인 후 삽입
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = svg;
          }
        } catch (error) {
          console.error("Mermaid render error:", error);
        }
      }
    };
    
    renderMap();
  }, []);

  return (
    <div className="md-card mindmap-card">
      <div className="card-header">
        <span className="material-symbols-rounded">account_tree</span>
        <h2>학생 그룹 마인드맵</h2>
      </div>
      <div className="mindmap-container">
        <div ref={mermaidRef}></div>
      </div>
    </div>
  );
}
