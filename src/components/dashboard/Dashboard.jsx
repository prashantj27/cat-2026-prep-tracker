import { useState } from 'react'
import { useStore } from '../../hooks/store.jsx'
import { Ring, Bar, EmptyState } from '../ui.jsx'
import {
  daysBetween,
  todayStr,
  fmtFull,
  fmtShort,
  monOf,
  addDays,
  getPhases,
  currentPhaseOf,
  weekday,
} from '../../utils/dates.js'
import {
  overallProgress,
  dayItems,
  itemsDone,
  weekItems,
  weeklyMinutes,
  studyStreak,
  totalMinutes,
  mockStats,
  trickOfDay,
} from '../../utils/analytics.js'
import { ALL_SUBTOPICS } from '../../data/syllabus.js'

const QUICK_MIN = [15, 30, 60]

export default function Dashboard({ setTab }) {
  const store = useStore()
  const today = todayStr()
  const exam = store.settings.examDate
  const daysLeft = Math.max(0, daysBetween(today, exam))
  const phases = getPhases(store.settings.prepStart, exam)
  const phase = currentPhaseOf(phases)

  const progress = overallProgress(store)
  const streak = studyStreak(store)
  const myDay = dayItems(store, today)
  const doneToday = itemsDone(myDay)
  const minutesToday = store.studyLogs[today] || 0
  const goal = store.settings.dailyGoal || 180
  const goalPct = Math.round((minutesToday / goal) * 100)

  const monday = monOf(today)
  const myWeek = weekItems(store, monday)
  const doneWeek = itemsDone(myWeek)
  const weekPct = myWeek.length ? Math.round((doneWeek / myWeek.length) * 100) : 0
  const weekMin = weeklyMinutes(store, monday)

  const stats = mockStats(store.mocks)
  const trick = trickOfDay(ALL_SUBTOPICS)
  const totalDays = Math.max(1, daysBetween(store.settings.prepStart, exam))
  const elapsed = Math.max(0, daysBetween(store.settings.prepStart, today))
  const timePct = Math.round((Math.min(elapsed, totalDays) / totalDays) * 100)

  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    const t = newTask.trim()
    if (!t) return
    store.addDayItem(today, t, 'General')
    setNewTask('')
  }

  return (
    <div className="stack">
      {/* Countdown hero */}
      <div className="hero">
        <div className="hero-days">{daysLeft}</div>
        <div>
          <p className="hero-title">days to CAT 2026</p>
          <p className="hero-sub">
            Exam on {fmtFull(exam)} · You're in the <b>{phase.name}</b> phase
          </p>
          <div className="hero-bar">
            <p className="hero-bar-label">Preparation journey {timePct}% complete</p>
            <Bar pct={timePct} color="#ffffff" />
          </div>
        </div>
        <div className="hero-phase">
          <span className="phase-chip">
            {phase.id === 'foundation' ? '🌱' : phase.id === 'practice' ? '✏️' : phase.id === 'mocks' ? '🔥' : '🎯'} {phase.name}
          </span>
          <p style={{ margin: '6px 0 0', fontSize: 12, opacity: 0.85 }}>
            {fmtShort(phase.start)} → {fmtShort(phase.end)}
          </p>
        </div>
      </div>
<div className="grid-2">
        {/* Today */}
        <div className="card">
          <h2 className="card-title">✨ Today — {weekday(today)}</h2>
          <p className="card-sub">{doneToday} of {myDay.length} tasks done · {minutesToday} min studied of {goal} min goal</p>
          <div className="todo-add">
            <input
              className="input"
              placeholder="Add a task for today…"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
            <button className="btn btn-sm" onClick={addTask}>Add</button>
          </div>
          <div className="todo-list" style={{ marginTop: 10 }}>
            {myDay.length === 0 && (
              <EmptyState icon="📝" title="Nothing planned yet" hint="Add your first task above, or plan a full week in the Planner tab." />
            )}
            {myDay.map((item) => (
              <div key={item.id} className={`todo-item ${item.done ? 'done' : ''}`}>
                <button className="todo-check" aria-label="Toggle task" onClick={() => store.toggleDayItem(today, item.id)}>
                  ✓
                </button>
                <span className="todo-text">{item.text}</span>
                {item.section && <span className="todo-tag">{item.section}</span>}
                <button className="todo-del" aria-label="Delete task" onClick={() => store.removeDayItem(today, item.id)}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Study time */}
        <div className="card">
          <h2 className="card-title">⏱️ Study Time Today</h2>
          <p className="card-sub">Quick-log sessions — streaks update automatically</p>
          <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            <Ring pct={goalPct} size={96} stroke={9} color="var(--green)">
              {minutesToday}
            </Ring>
            <div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                {Math.floor(minutesToday / 60)}h {minutesToday % 60}m of {Math.floor(goal / 60)}h{goal % 60 ? ` ${goal % 60}m` : ''} goal
              </div>
              <div style={{ marginTop: 8, fontSize: 13 }}>
                🔥 <b>{streak}</b> day streak · <b>{Math.round(totalMinutes(store) / 60)}</b> hr total
              </div>
              <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                {QUICK_MIN.map((m) => (
                  <button key={m} className="btn btn-soft btn-sm" onClick={() => store.addStudyMin(m)}>
                    +{m}m
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* This week ring */}
        <div className="card">
          <h2 className="card-title">📅 This Week</h2>
          <p className="card-sub">{fmtShort(monday)} → {fmtShort(addDays(monday, 6))} · {weekMin} min logged</p>
          <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            <Ring pct={weekPct} size={96} stroke={9}>
              {weekPct}%
            </Ring>
            <div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                {doneWeek} of {myWeek.length} weekly targets done
              </div>
              <button className="btn btn-soft btn-sm" style={{ marginTop: 10 }} onClick={() => setTab('planner')}>
                Open planner →
              </button>
            </div>
          </div>
        </div>

        {/* Readiness */}
        <div className="card">
          <h2 className="card-title">🧭 Syllabus Readiness</h2>
          <p className="card-sub">Weighted across all subtopics you've practiced</p>
          <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            <Ring pct={progress.pct} size={96} stroke={9}>
              {progress.pct}%
            </Ring>
            <div className="section-bar" style={{ flex: 1 }}>
              {progress.sections.map((p) => (
                <div className="sb-row" key={p.section.id}>
                  <span className="sb-name" style={{ color: 'var(--ink)' }}>{p.section.icon} {p.section.name}</span>
                  <Bar pct={p.pct} color={p.section.color} />
                  <span className="sb-pct">{p.pct}%</span>
                </div>
              ))}
            </div>
          </div>
          <button className="btn btn-soft btn-sm" style={{ marginTop: 10 }} onClick={() => setTab('syllabus')}>
            Update syllabus →
          </button>
        </div>
      </div>
{/* Latest mock + trick of the day */}
      <div className="grid-2">
        <div className="card">
          <h2 className="card-title">📝 Latest Mock</h2>
          {stats ? (
            <>
              <div className="grid-4">
                <div className="metric">
                  <p className="m-label">Total</p>
                  <p className="m-value">{stats.latest.total}</p>
                  <p className={`m-delta ${stats.delta === null ? 'flat' : stats.delta >= 0 ? 'up' : 'down'}`}>
                    {stats.delta === null ? '' : stats.delta >= 0 ? `▲ ${stats.delta} vs last` : `▼ ${-stats.delta} vs last`}
                  </p>
                </div>
                <div className="metric">
                  <p className="m-label">Percentile</p>
                  <p className="m-value">{stats.latest.percentile != null ? stats.latest.percentile : '—'}</p>
                </div>
                <div className="metric">
                  <p className="m-label">Best total</p>
                  <p className="m-value">{stats.best}</p>
                </div>
                <div className="metric">
                  <p className="m-label">Avg total</p>
                  <p className="m-value">{stats.avg}</p>
                </div>
              </div>
              <button className="btn btn-soft btn-sm" style={{ marginTop: 6 }} onClick={() => setTab('mocks')}>
                View trend & analyse →
              </button>
            </>
          ) : (
            <EmptyState icon="📊" title="No mocks logged yet" hint="Mocks are the best CAT simulator — log your first one and watch patterns emerge.">
              <button className="btn btn-sm" onClick={() => setTab('mocks')}>
                Log your first mock
              </button>
            </EmptyState>
          )}
        </div>

        <div className="card">
          <h2 className="card-title">💡 Today's Trick</h2>
          {trick && (
            <div className="trick">
              <div className="trick-title">✨ {trick.t}</div>
              <div className="trick-text">{trick.d}</div>
            </div>
          )}
          <p className="card-sub" style={{ marginTop: 8 }}>
            From <b>{trick ? trick.sub : ''}</b> · 100+ tricks inside the Syllabus tab
          </p>
        </div>
      </div>
    </div>
  )
}