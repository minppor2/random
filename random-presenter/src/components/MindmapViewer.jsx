import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import './MindmapViewer.css';

export default function MindmapViewer() {
  const mermaidRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      mindmap: {
        padding: 16
      }
    });

    const renderMindmap = async () => {
      if (mermaidRef.current) {
        try {
          const mindmapDefinition = `
mindmap
  root((Obsidian Hub))
    [[Community]]
      Plugins
      Themes
      Snippets
    [[Workflows]]
      Zettelkasten
      PARA Method
      Daily Notes
    [[Publishing]]
      Digital Garden
      Obsidian Publish
      Quartz
    [[Knowledge Base]]
      Documentation
      Guides
      Showcases
          `;
          
          mermaidRef.current.innerHTML = mindmapDefinition;
          await mermaid.run({
            nodes: [mermaidRef.current]
          });
        } catch (error) {
          console.error("Mermaid rendering failed:", error);
        }
      }
    };

    renderMindmap();
  }, []);

  return (
    <div className="md-card mindmap-card">
      <div className="card-header">
        <span className="material-symbols-rounded">account_tree</span>
        <h2>Obsidian Hub 마인드맵</h2>
      </div>
      <div className="mindmap-container">
        <div ref={mermaidRef} className="mermaid"></div>
      </div>
    </div>
  );
}
