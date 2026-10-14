import { useEffect, useState } from 'react';
import { personalInfo } from '../../data/portfolioData';
import Reveal from '../Reveal/Reveal';
import './Activity.css';

const GH_API = `https://github-contributions-api.jogruber.de/v4/${personalInfo.githubUsername}`;
const LC_API = `https://leetcode-sub-endpoint.vercel.app/leetcode/${personalInfo.leetcodeUsername}`;

const WEEKS = 53;
const MS_DAY = 86_400_000;

const pad = (n) => String(n).padStart(2, '0');
const isoOf = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

function startOfWeek(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

function buildWeeks(cellOf, endDate) {
  const last = startOfWeek(endDate);
  const cursor = new Date(last);
  cursor.setDate(cursor.getDate() - (WEEKS - 1) * 7);

  const weeks = [];
  while (cursor <= last) {
    const week = [];
    for (let i = 0; i < 7; i += 1) {
      const date = isoOf(cursor);
      week.push({ date, ...cellOf(date) });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

function monthLabels(weeks) {
  const labels = [];
  let lastCol = -99;
  weeks.forEach((week, col) => {
    const firstOfMonth = week.find((cell) => Number(cell.date.slice(8, 10)) === 1);
    if (firstOfMonth && col - lastCol >= 3) {
      lastCol = col;
      labels.push({
        col,
        name: new Date(`${firstOfMonth.date}T00:00:00`).toLocaleString('en-US', {
          month: 'short',
        }),
      });
    }
  });
  return labels;
}

function lcLevel(count) {
  if (!count) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function Heatmap({ weeks, tone, label, caption, stats, username, href, error, loading }) {
  const grid = weeks || buildWeeks(() => ({ count: 0, level: 0 }), new Date());
  const labels = monthLabels(grid);
  const firstOfMonthCols = new Set(labels.map((l) => l.col));

  return (
    <article className={`act-card act-${tone}`}>
      <header className="act-head">
        <div className="act-id">
          <span className="act-dot" aria-hidden="true" />
          <h3 className="act-title">{label}</h3>
          <a className="mono act-user" href={href} target="_blank" rel="noopener noreferrer">
            @{username} <span aria-hidden="true">↗</span>
          </a>
        </div>
        {!loading && !error && stats && (
          <p className="mono act-stats">
            <span>
              <b>{stats.primary.value}</b> {stats.primary.label}
            </span>
            <span className="act-stats-sep" aria-hidden="true">
              ·
            </span>
            <span>
              <b>{stats.secondary.value}</b> {stats.secondary.label}
            </span>
          </p>
        )}
      </header>

      {error ? (
        <p className="mono act-error">
          Live data is unavailable right now — open the profile above to see it directly.
        </p>
      ) : (
        <div className="act-scroll">
          <div
            className={`act-grid-wrap ${loading ? 'is-loading' : ''}`}
            role="img"
            aria-label={caption}
          >
            <div className="act-months" aria-hidden="true">
              <span />
              <div className="act-month-row">
                {grid.map((_, col) => (
                  <span
                    key={col}
                    style={{ gridColumnStart: col + 1 }}
                    className={firstOfMonthCols.has(col) ? '' : 'is-blank'}
                  >
                    {labels.find((l) => l.col === col)?.name || ''}
                  </span>
                ))}
              </div>
            </div>

            <div className="act-body">
              <div className="act-days" aria-hidden="true">
                <span />
                <span>Mon</span>
                <span />
                <span>Wed</span>
                <span />
                <span>Fri</span>
                <span />
              </div>

              <div className="act-weeks">
                {weeks.map((week, col) => (
                  <div key={col} className="act-week">
                    {week.map((cell) => (
                      <span
                        key={cell.date}
                        className="act-cell"
                        data-level={loading ? 0 : cell.level}
                        title={
                          loading
                            ? undefined
                            : `${cell.count} on ${cell.date}`
                        }
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && (
        <footer className="act-foot">
          <span className="mono act-foot-note">{caption}</span>
          <span className="act-legend mono" aria-hidden="true">
            Less
            {[0, 1, 2, 3, 4].map((l) => (
              <span key={l} className="act-cell act-cell-static" data-level={l} />
            ))}
            More
          </span>
        </footer>
      )}
    </article>
  );
}

export default function Activity() {
  const [gh, setGh] = useState({ loading: true });
  const [lc, setLc] = useState({ loading: true });

  useEffect(() => {
    const today = new Date();
    let alive = true;

    const load = async () => {
      const [ghRes, lcRes] = await Promise.allSettled([
        fetch(GH_API).then((r) => {
          if (!r.ok) throw new Error(String(r.status));
          return r.json();
        }),
        fetch(LC_API).then((r) => {
          if (!r.ok) throw new Error(String(r.status));
          return r.json();
        }),
      ]);
      if (!alive) return;

      if (ghRes.status === 'fulfilled') {
        const byDate = new Map();
        (ghRes.value.contributions || []).forEach((c) =>
          byDate.set(c.date, { count: c.count, level: c.level })
        );
        let total = 0;
        let active = 0;
        const weeks = buildWeeks((key) => {
          const hit = byDate.get(key) || { count: 0, level: 0 };
          total += hit.count;
          if (hit.count > 0) active += 1;
          return hit;
        }, today);
        setGh({
          loading: false,
          weeks,
          stats: {
            primary: { value: total.toLocaleString('en-US'), label: 'contributions' },
            secondary: { value: active, label: 'active days' },
          },
          caption: `GitHub contribution graph for ${personalInfo.githubUsername}, last 12 months`,
        });
      } else {
        setGh({ loading: false, error: true });
      }

      if (lcRes.status === 'fulfilled') {
        const byDate = new Map(Object.entries(lcRes.value).map(([k, v]) => [k, Number(v) || 0]));
        let active = 0;
        let peak = 0;
        const weeks = buildWeeks((key) => {
          const count = byDate.get(key) || 0;
          if (count > 0) {
            active += 1;
            if (count > peak) peak = count;
          }
          return { count, level: lcLevel(count) };
        }, today);
        setLc({
          loading: false,
          weeks,
          stats: {
            primary: { value: active, label: 'active days' },
            secondary: { value: peak, label: 'peak in a day' },
          },
          caption: `LeetCode practice activity for ${personalInfo.leetcodeUsername}, last 12 months`,
        });
      } else {
        setLc({ loading: false, error: true });
      }
    };

    load();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section id="activity" className="section activity">
      <div className="container">
        <header className="section-head activity-head">
          <Reveal>
            <span className="section-index activity-index">
              <b>05</b> Activity
            </span>
            <h2 className="section-title activity-title">
              Consistency, <em>plotted.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="section-note activity-note">
              Live contribution and practice history, read straight from each platform. No
              screenshots, no hand-picked weeks — the last twelve months as they happened.
            </p>
          </Reveal>
        </header>

        <div className="activity-stack">
          <Reveal>
            <Heatmap tone="gh" label="GitHub" username={personalInfo.githubUsername} href={personalInfo.github} {...gh} />
          </Reveal>
          <Reveal delay={0.1}>
            <Heatmap tone="lc" label="LeetCode" username={personalInfo.leetcodeUsername} href={personalInfo.leetcode} {...lc} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
