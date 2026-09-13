import { useState } from 'react'
import WeekPlanner from './WeekPlanner.jsx'
import DayPlanner from './DayPlanner.jsx'
import TimelineView from './TimelineView.jsx'

const TABS = [
  { id: 'week', label: '🗓️ This Week' },
  { id: 'day', label: '📌 Day Plan' },
  { id: 'timeline', label: '🧭 Timeline & Heatmap' },
]

export default function PlannerPage() {
  const [tab, setTab] = useState(() => localStorage.getItem('cat-tracker-planner-tab') || 'week')

  const pick = (id) => {
    setTab(id)
    try {
      localStorage.setItem('cat-tracker-planner-tab', id)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="stack">
      <div className="tabs">
        {TABS.map((t) => (
          <button key={t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => pick(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'week' && <WeekPlanner />}
      {tab === 'day' && <DayPlanner />}
      {tab === 'timeline' && <TimelineView />}
    </div>
  )
}