import { useStore } from '../../hooks/store.jsx'
import { todayStr, addDays, monOf, fmtShort, getPhases } from '../../utils/dates.js'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function TimelineView() {
  const store = useStore()
  const today = todayStr()
  const phases = getPhases(store.settings.prepStart, store.settings.examDate)
  const goal = store.settings.dailyGoal || 180

  const weeks = Array.from({ length: 12 }, (_, i) => addDays(monOf(today), -(11 - i) * 7))
  const cells = weeks.map((m) => Array.from({ length: 7 }, (_, i) => addDays(m, i)))

  const level = (min) => {
    if (!min || min <= 0) return ''
    if (min < goal * 0.5) return 'l1'
    if (min < goal) return 'l2'
    return 'l3'
  }

  return (
    <div className="stack">
      {/* Phases */}
      <div className="card">
        <h2 className="card-title">🗺️ Preparation Timeline</h2>
        <p className="card-sub">See where you are & what's coming next</p>
        <div className="timeline">
          {phases.map((p) => {
            const cls = today > p.end ? 'done' : today >= p.start ? 'current' : ''
            return (
              <div className={`phase-card ${cls}`} key={p.id}>
                <div className="pc-name">
                  {cls === 'current' ? '🚩 ' : cls === 'done' ? '✅ ' : '🔜 '}
                  {p.name}
                </div>
                <div className="pc-dates">{fmtShort(p.start)} → {fmtShort(p.end)}</div>
                <div className="pc-desc">{p.desc}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Heatmap */}
      <div className="card">
        <h2 className="card-title">🔥 Study Heatmap — last 12 weeks</h2>
        <p className="card-sub">
          One square per day · darker = closer to your {goal}-min goal · today has a ring
        </p>
        <div className="heatmap" role="img" aria-label="Study heatmap of the last 12 weeks">
          {WEEKDAYS.map((w) => (
            <span className="hm-dow" key={w}>{w}</span>
          ))}
          {cells.map((week, w) =>
            week.map((d, i) => {
              const min = store.studyLogs[d] || 0
              const isToday = d === today
              return (
                <span
                  key={`${w}-${d}`}
                  className={`hm-cell ${level(min)} ${isToday ? 'today' : ''}`}
                  title={`${WEEKDAYS[i]} ${fmtShort(d)} · ${min} min`}
                />
              )
            }),
          )}
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>Less</span>
          {['', 'l1', 'l2', 'l3'].map((lv) => (
            <span key={lv} className={`hm-cell ${lv}`} style={{ width: 16, height: 16, display: 'inline-block' }} />
          ))}
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>More signs</span>
        </div>
      </div>
    </div>
  )
}