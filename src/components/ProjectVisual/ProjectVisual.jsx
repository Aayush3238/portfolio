import './ProjectVisual.css';

const CAPTION = {
  repo: 'Interface sketch — repository map',
  coach: 'Interface sketch — progress dashboard',
  marketplace: 'Interface sketch — listing and chat',
  media: 'Interface sketch — delivery dashboard',
  csv: 'Interface sketch — mapping preview',
};

function Frame({ variant, children }) {
  return (
    <div className="pv" data-variant={variant}>
      <div className="pv-bar">
        <span className="pv-dot" />
        <span className="pv-dot" />
        <span className="pv-dot" />
        <span className="pv-bar-label">{CAPTION[variant]}</span>
      </div>
      <div className="pv-body">{children}</div>
    </div>
  );
}

export default function ProjectVisual({ variant = 'repo' }) {
  if (variant === 'coach') {
    return (
      <Frame variant="coach">
        <div className="pv-coach">
          <div className="pv-side">
            <span className="pv-line w70" />
            <span className="pv-line w50" />
            <span className="pv-line w60" />
            <span className="pv-line w40" />
          </div>
          <div className="pv-main">
            <div className="pv-stat-row">
              <span className="pv-stat" />
              <span className="pv-stat" />
              <span className="pv-stat pv-stat-accent" />
            </div>
            <div className="pv-bars">
              {[38, 62, 48, 80, 55, 92, 70].map((h, i) => (
                <span key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="pv-chat">
              <span className="pv-line w60" />
              <span className="pv-line w80 pv-line-accent" />
              <span className="pv-line w50" />
            </div>
          </div>
        </div>
      </Frame>
    );
  }

  if (variant === 'marketplace') {
    return (
      <Frame variant="marketplace">
        <div className="pv-market">
          <div className="pv-tile">
            <span className="pv-photo" />
            <span className="pv-line w70" />
            <span className="pv-line w40" />
          </div>
          <div className="pv-tile">
            <span className="pv-photo pv-photo-alt" />
            <span className="pv-line w60" />
            <span className="pv-line w35" />
          </div>
          <div className="pv-chatcard">
            <span className="pv-bubble" />
            <span className="pv-bubble pv-bubble-right" />
            <span className="pv-bubble" />
          </div>
        </div>
      </Frame>
    );
  }

  if (variant === 'media') {
    return (
      <Frame variant="media">
        <div className="pv-media">
          <div className="pv-grid-thumbs">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className={i === 2 ? 'is-accent' : ''} />
            ))}
          </div>
          <div className="pv-transforms">
            <span className="pv-chip">webp</span>
            <span className="pv-chip">2400w</span>
            <span className="pv-chip pv-chip-accent">cached</span>
            <span className="pv-chip">srcset</span>
          </div>
          <div className="pv-meter">
            <span style={{ width: '72%' }} />
          </div>
        </div>
      </Frame>
    );
  }

  if (variant === 'csv') {
    return (
      <Frame variant="csv">
        <div className="pv-csv">
          <div className="pv-table">
            <span className="pv-th" />
            <span className="pv-th pv-th-accent" />
            <span className="pv-th" />
            {Array.from({ length: 6 }).map((_, i) => (
              <span className={`pv-td ${i === 3 ? 'is-skip' : ''}`} key={i} />
            ))}
          </div>
          <div className="pv-batch">
            <span className="pv-batch-row" />
            <span className="pv-batch-row is-run" />
            <span className="pv-batch-row" />
          </div>
        </div>
      </Frame>
    );
  }

  return (
    <Frame variant="repo">
      <div className="pv-repo">
        <div className="pv-tree">
          <span className="pv-line w60" />
          <span className="pv-line w45 pv-indent" />
          <span className="pv-line w55 pv-indent pv-line-accent" />
          <span className="pv-line w40 pv-indent" />
          <span className="pv-line w50" />
          <span className="pv-line w35 pv-indent" />
        </div>
        <div className="pv-ctx">
          <span className="pv-ctx-label">context</span>
          <span className="pv-line w80" />
          <span className="pv-line w70" />
          <span className="pv-line w75 pv-line-accent" />
          <span className="pv-line w55" />
        </div>
      </div>
    </Frame>
  );
}
