import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './LeetCodeCalendar.css';

const LEETCODE_GRAPHQL = 'https://leetcode.com/graphql';

const QUERY = `
query userProfileCalendar($username: String!, $year: Int) {
  matchedUser(username: $username) {
    submissionCalendar
    streak
    totalActiveDays
  }
}
`;

const LEVELS = [
  'var(--lc-level-0)',
  'var(--lc-level-1)',
  'var(--lc-level-2)',
  'var(--lc-level-3)',
  'var(--lc-level-4)',
];

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getWeeksForYear(calendarData, year) {
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  const dayOfWeek = startDate.getDay();
  const weeks = [];
  let currentWeek = new Array(7).fill(null);

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dayIndex = d.getDay();
    const timestamp = Math.floor(d.getTime() / 1000);
    const dateKey = Math.floor(new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() / 1000);
    const count = calendarData[dateKey] || 0;

    currentWeek[dayIndex] = {
      date: new Date(d),
      count,
      dateStr: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    if (dayIndex === 6 || d.getTime() === endDate.getTime()) {
      weeks.push([...currentWeek]);
      currentWeek = new Array(7).fill(null);
    }
  }

  return weeks;
}

function getMaxCount(weeks) {
  let max = 0;
  for (const week of weeks) {
    for (const day of week) {
      if (day && day.count > max) max = day.count;
    }
  }
  return max;
}

function getLevel(count, maxCount) {
  if (count === 0) return 0;
  if (maxCount === 0) return 0;
  const ratio = count / maxCount;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

function getMonthLabels(weeks) {
  const labels = [];
  let lastMonth = -1;

  for (let i = 0; i < weeks.length; i++) {
    const firstDay = weeks[i].find((d) => d !== null);
    if (firstDay) {
      const month = firstDay.date.getMonth();
      if (month !== lastMonth) {
        labels.push({ index: i, label: MONTH_LABELS[month] });
        lastMonth = month;
      }
    }
  }
  return labels;
}

export default function LeetCodeCalendar({ username }) {
  const [weeks, setWeeks] = useState([]);
  const [totalActiveDays, setTotalActiveDays] = useState(0);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tooltip, setTooltip] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    const currentYear = new Date().getFullYear();

    async function fetchCalendar() {
      try {
        const res = await fetch(LEETCODE_GRAPHQL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: QUERY,
            variables: { username, year: currentYear },
          }),
        });

        const json = await res.json();
        const user = json?.data?.matchedUser;

        if (!user || !user.submissionCalendar) {
          setError(true);
          setLoading(false);
          return;
        }

        const calendarData = JSON.parse(user.submissionCalendar);
        const calendarEntries = {};
        for (const [key, val] of Object.entries(calendarData)) {
          calendarEntries[Number(key)] = val;
        }

        setWeeks(getWeeksForYear(calendarEntries, currentYear));
        setTotalActiveDays(user.totalActiveDays || 0);
        setStreak(user.streak || 0);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCalendar();
  }, [username]);

  const maxCount = getMaxCount(weeks);
  const monthLabels = getMonthLabels(weeks);
  const totalSubmissions = weeks.reduce(
    (acc, week) => acc + week.reduce((a, day) => a + (day?.count || 0), 0),
    0,
  );

  const handleMouseEnter = (day, rect) => {
    if (!day) return;
    setTooltip({
      text: `${day.count} submission${day.count !== 1 ? 's' : ''} on ${day.dateStr}`,
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
  };

  const handleMouseLeave = () => setTooltip(null);

  if (loading) {
    return (
      <div className="lc-calendar-container" ref={ref}>
        <div className="lc-calendar-loading">
          <div className="lc-loading-shimmer" />
          <p>Loading LeetCode activity...</p>
        </div>
      </div>
    );
  }

  if (error || weeks.length === 0) {
    return (
      <div className="lc-calendar-container" ref={ref}>
        <div className="lc-calendar-fallback">
          <p>Could not load LeetCode calendar data.</p>
          <a href={`https://leetcode.com/u/${username}/`} target="_blank" rel="noopener noreferrer">
            View on LeetCode
          </a>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="lc-calendar-container"
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="lc-calendar-header">
        <div className="lc-calendar-stats">
          <span className="lc-stat">
            <span className="lc-stat-number">{totalSubmissions}</span> submissions in the last year
          </span>
          <span className="lc-stat-dot" />
          <span className="lc-stat">
            <span className="lc-stat-number">{totalActiveDays}</span> active days
          </span>
          <span className="lc-stat-dot" />
          <span className="lc-stat">
            <span className="lc-stat-number">{streak}</span> day streak
          </span>
        </div>
      </div>

      <div className="lc-calendar-scroll">
        <div className="lc-calendar-grid">
          <div className="lc-month-labels">
            {monthLabels.map((m, i) => (
              <span key={i} className="lc-month-label" style={{ gridColumn: m.index + 2 }}>
                {m.label}
              </span>
            ))}
          </div>

          <div className="lc-calendar-body">
            <div className="lc-day-labels">
              {DAY_LABELS.map((d, i) => (
                <span key={i} className="lc-day-label">
                  {i % 2 === 1 ? d.charAt(0) : ''}
                </span>
              ))}
            </div>

            <div className="lc-weeks">
              {weeks.map((week, wi) => (
                <div key={wi} className="lc-week">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className="lc-day"
                      style={{
                        backgroundColor: day ? LEVELS[getLevel(day.count, maxCount)] : 'transparent',
                      }}
                      onMouseEnter={(e) => handleMouseEnter(day, e.currentTarget.getBoundingClientRect())}
                      onMouseLeave={handleMouseLeave}
                      tabIndex={day ? 0 : -1}
                      role={day ? 'gridcell' : undefined}
                      aria-label={day ? `${day.count} submissions on ${day.dateStr}` : undefined}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lc-calendar-legend">
        <span className="lc-legend-label">Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className="lc-legend-block"
            style={{ backgroundColor: LEVELS[level] }}
          />
        ))}
        <span className="lc-legend-label">More</span>
      </div>

      {tooltip && (
        <div
          className="lc-tooltip"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)',
          }}
        >
          {tooltip.text}
        </div>
      )}
    </motion.div>
  );
}
