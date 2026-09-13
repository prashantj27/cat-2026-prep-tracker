import { useState } from 'react'
import { useStore } from '../../hooks/store.jsx'
import { EmptyState, Toast } from '../ui.jsx'
import { todayStr, addDays, fmtLong } from '../../utils/dates.js'
import { dayItems, itemsDone } from '../../utils/analytics.js'

const SECTIONS = ['General', 'VARC', 'DILR', 'QA', 'Mocks']

export default function DayPlanner() {
  const store = useStore()
  const [date, setDate] = useState(todayStr())
  const [text, setText] = useState('')
  const [section, setSection] = useState('General')
  const [minutesEdit, setMinutesEdit] = useState('')
  const [toast, setToast] = useState(null)

  const items = dayItems(store, date)
  const done = itemsDone(items)
  const minutes = store.studyLogs[date] || 0

  const add = () => {
    const t = text.trim()
    if (!t) return
    store.addDayItem(date, t, section)
    setText('')
  }

  const carryOver = () => {
    let carried = 0
    const today = todayStr()
    // find unfinished tasks on any day strictly before `date`
    for (const [d, list] of Object.entries(store.dayPlans || {})) {
      if (d >= date || d > today) continue
      for (const i of list) {
        if (!i.done) {
          store.addDayItem(date, i.text, i.section)
          carried++
        }
      }
    }
    setToast(carried > 0 ? `✅ Carried ${carried} unfinished ${carried === 1 ? 'task' : 'tasks'} over` : '👍 Nothing unfinished to carry over')
  }
  const carryOverHelper = carryOver

  const saveMinutes = () => {
    const v = Math.max(0, Number(minutesEdit) || 0)
    store.setStudyMinFor(date, v)
    setMinutesEdit('')
    setToast(`⏱️ ${v} min logged for this day`)
  }

  return (
    <div className="stack">
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="icon-btn" onClick={() => setDate(addDays(date, -1))}>◀</button>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 800 }}>{fmtLong(date)}</div>
            <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>
              {done} of {items.length} done · {minutes} min studied
            </div>
          </div>
          <button className="icon-btn" onClick={() => setDate(addDays(date, 1))}>▶</button>
          {date !== todayStr() && (
            <button className="btn btn-ghost btn-sm" onClick={() => setDate(todayStr())}>Today</button>
          )}
        </div>
        {date === todayStr() && <p className="card-sub" style={{ marginTop: 6 }}>🌟 This is today — tasks you check off here also reflect on your Dashboard.</p>}
      </div>

      <div className="card">
        <h2 className="card-title">Tasks for {fmtLong(date)}</h2>
        <div className="todo-add">
          <input
            className="input"
            placeholder="What will you work on?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
          />
          <select className="select" value={section} onChange={(e) => setSection(e.target.value)}>
            {SECTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button className="btn btn-sm" onClick={add}>Add</button>
        </div>

        <div className="todo-list" style={{ marginTop: 12 }}>
          {items.length === 0 && (
            <EmptyState icon="📝" title="No tasks for this day" hint="Add one above, or carry over tasks you left unfinished from earlier days." />
          )}
          {items.map((i) => (
            <div key={i.id} className={`todo-item ${i.done ? 'done' : ''}`}>
              <button className="todo-check" onClick={() => store.toggleDayItem(date, i.id)} aria-label="Toggle">✓</button>
              <span className="todo-text">{i.text}</span>
              {i.section && i.section !== 'General' && <span className="todo-tag">{i.section}</span>}
              <button className="todo-del" onClick={() => store.removeDayItem(date, i.id)} aria-label="Delete">✕</button>
            </div>
          ))}
        </div>

        <button className="btn btn-ghost btn-sm" style={{ marginTop: 12 }} onClick={carryOverHelper}>
          🔁 Carry over unfinished tasks
        </button>
      </div>

      <div className="card">
        <h2 className="card-title">⏱️ Study minutes for this day</h2>
        <div className="add-inline">
          <input
            className="input"
            type="number"
            min="0"
            placeholder={`Current: ${minutes} min`}
            value={minutesEdit}
            onChange={(e) => setMinutesEdit(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && saveMinutes()}
          />
          <button className="btn btn-sm" onClick={saveMinutes}>Save</button>
        </div>
      </div>

      <Toast message={toast} onDone={() => setToast(null)} />
    </div>
  )
}