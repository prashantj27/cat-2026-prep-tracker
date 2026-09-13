import { daysBetween, todayStr, fmtFull } from '../../utils/dates.js'
import { overallProgress, studyStreak } from '../../utils/analytics.js'
import { useStore } from '../../hooks/store.jsx'
import { Bar } from '../ui.jsx'

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { id: 'syllabus', label: 'Syllabus', icon: '📚' },
  { id: 'mocks', label: 'Mocks', icon: '📝' },
  { id: 'planner', label: 'Planner', icon: '🗓️' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
]

export function Sidebar({ tab, setTab, onNav }) {
  const store = useStore()
  const days = Math.max(0, daysBetween(todayStr(), store.settings.examDate))
  const progress = overallProgress(store)
  const streak = studyStreak(store)

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-badge">C</span>
        <div>
          <div className="logo-text">CAT 2026</div>
          <div className="logo-sub">Prep Tracker</div>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Main">
        {NAV_ITEMS.map((n) => (
          <button
            key={n.id}
            className={`nav-item ${tab === n.id ? 'active' : ''}`}
            onClick={() => {
              setTab(n.id)
              onNav && onNav(n.id)
            }}
          >
            <span className="nav-ico">{n.icon}</span>
            {n.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sb-days">{days} days</div>
        <div className="sb-count">to CAT · {fmtFull(store.settings.examDate)}</div>
        <div style={{ marginTop: 10 }}>
          <Bar pct={progress.pct} />
        </div>
        <div className="sb-count" style={{ marginTop: 4 }}>
          Readiness {progress.pct}% · 🔥 {streak} day{streak === 1 ? '' : 's'}
        </div>
      </div>
    </aside>
  )
}