import { useState } from 'react';
import './SystemMap.css';

const NODES = [
  { id: 'repo', x: 14, y: 26, w: 138, h: 68, index: '01', label: 'Repository', sub: 'files · history' },
  { id: 'map', x: 174, y: 26, w: 138, h: 68, index: '02', label: 'Map', sub: 'structure graph' },
  { id: 'ctx', x: 334, y: 26, w: 138, h: 68, index: '03', label: 'Context', sub: 'task slice' },
  { id: 'agent', x: 334, y: 206, w: 138, h: 68, index: '04', label: 'Agent', sub: 'proposed change' },
  { id: 'review', x: 174, y: 206, w: 138, h: 68, index: '05', label: 'Review', sub: 'conventions' },
];

const LINKS = [
  { id: 'l1', from: 'repo', to: 'map', d: 'M152 60 H174' },
  { id: 'l2', from: 'map', to: 'ctx', d: 'M312 60 H334' },
  { id: 'l3', from: 'ctx', to: 'agent', d: 'M403 94 V206' },
  { id: 'l4', from: 'agent', to: 'review', d: 'M334 240 H312' },
  { id: 'l5', from: 'review', to: 'map', d: 'M243 206 V112 C243 96 232 94 214 94', loop: true },
];

export default function SystemMap() {
  const [active, setActive] = useState(null);

  const isLit = (link) => active && (link.from === active || link.to === active);

  return (
    <figure className="sysmap" aria-label="Conceptual architecture schematic">
      <figcaption className="sysmap-head">
        <span className="sysmap-title">SYS.MAP / DEVPILOT</span>
        <span className="sysmap-chip">Concept schematic</span>
      </figcaption>

      <div className="sysmap-canvas">
        <svg viewBox="0 0 486 300" role="img" aria-label="Repository to review workflow diagram">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" />
            </marker>
            <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M24 0 H0 V24" fill="none" stroke="rgba(12,12,13,0.07)" strokeWidth="1" />
            </pattern>
          </defs>

          <rect width="486" height="300" fill="url(#grid)" />

          <g className="sysmap-links">
            {LINKS.map((link, i) => (
              <g
                key={link.id}
                className={`sysmap-link-group ${isLit(link) ? 'is-lit' : ''}`}
                style={{ animationDelay: `${0.5 + i * 0.18}s` }}
              >
                <path
                  className={`sysmap-link ${link.loop ? 'sysmap-link-loop' : ''}`}
                  d={link.d}
                  fill="none"
                  pathLength="1"
                  markerEnd={link.loop ? undefined : 'url(#arrow)'}
                />
                <path className="sysmap-pulse" d={link.d} fill="none" pathLength="1" />
              </g>
            ))}
          </g>

          <g className="sysmap-nodes">
            {NODES.map((node, i) => (
              <g
                key={node.id}
                className={`sysmap-node ${active === node.id ? 'is-active' : ''}`}
                tabIndex={0}
                role="button"
                aria-label={`${node.label}: ${node.sub}`}
                onMouseEnter={() => setActive(node.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(node.id)}
                onBlur={() => setActive(null)}
                style={{ animationDelay: `${0.15 + i * 0.09}s` }}
              >
                <rect
                  x={node.x + 4}
                  y={node.y + 4}
                  width={node.w}
                  height={node.h}
                  className="sysmap-node-shadow"
                />
                <rect x={node.x} y={node.y} width={node.w} height={node.h} className="sysmap-node-box" />
                <text x={node.x + 12} y={node.y + 20} className="sysmap-node-index">
                  {node.index}
                </text>
                <text x={node.x + 12} y={node.y + 43} className="sysmap-node-label">
                  {node.label}
                </text>
                <text x={node.x + 12} y={node.y + 59} className="sysmap-node-sub">
                  {node.sub}
                </text>
              </g>
            ))}
          </g>

          <text x="14" y="288" className="sysmap-note">
            design target — not a running system
          </text>
          <text x="472" y="288" textAnchor="end" className="sysmap-note">
            rev. 01 / concept
          </text>
        </svg>
      </div>

      <div className="sysmap-foot">
        <span>DevPilot is in development</span>
        <span>Select a stage to trace it</span>
      </div>
    </figure>
  );
}
