import { useState } from 'react'
import { useStore } from '../../hooks/store.jsx'
import { Ring, EmptyState } from '../ui.jsx'
import { monOf, todayStr, addDays, fmtShort, weekday, weekdays } from '../../utils/dates.js'
import { weekItems, itemsDone } from '../../utils/analytics.js'

const GROUPS = ['VARC', 'DILR', 'QA', '🎯 Mocks & Other']

export default function WeekPlanner() {
  const store = useStore()
  const [monday, setMonday] = useState(monOf(todayStr()))
  const [input, setInput] = useState({})
  const seed = (g) => input[g] || ''

  const items = weekItems(store, monday)
  const done = itemsDone(items)
  const pct = items.length ? Math.round((done / items.length) * 100) : 0

  const go = (delta) => setMonday(addDays(monday, delta * 7))

  const add = (group) => {
    const text = seed(group).trim()
    if (!text) return
    store.addWeekItem(monday, text, group.replace('🎯 ', ''))
    setInput({ ...input, [group]: '' })
  }

  return (
    <div className="stack">
      <div className="card">
        <div className="week-nav" style={{ padding: '0 4px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="icon-btn" onClick={() => go(-1)}>◀</button>
          <span className="week-range">{fmtShort(monday)} – {fmtShort(addDays(monday, 6))}</span>
          <button className="icon-btn" onClick={() => go(1)}>▶</button>
          {(monday !== monOf(todayStr())) && (
            <button className="btn btn-ghost btn-sm" onClick={() => setMonday(monOf(todayStr()))}>This week</button>
          )}
        </div>

        <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginTop: 14 }}>
          <Ring pct={pct} size={84} stroke={8}>
            {pct}%
          </Ring>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 700 }}>{done} of {items.length} targets done</div>
            <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>Weekly target completion carries your momentum.</div>
          </div>
        </div>

        <div className="week-days" style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
          {Array.from({ length: 7 }, (_, i) => addDays(monday, i)).map((d, i) => {
            const ll = store.studyLogs[d] || 0
            const hoy = d === todayStr()
            return (
              <span
                key={d}
                className={`chip ${hoy ? 'done' : ''}`}
                title={`${weekday(d)}, ${fmtShort(d)} · ${ll} min studied`}
              >
                {weekdays()[i]} {fmtShort(d).split(' ')[0]}
              </span>
            )
          })}
        </div>
      </div>

      <div className="week-grid">
        {GROUPS.map((g) => {
          const list = items.filter((i) => i.section === g.replace('🎯 ', ''))
          return (
            <div className="week-col" key={g}>
              <div className="wc-head">
                <span className="wc-dot" style={{ background: g.startsWith('🎯') ? 'var(--accent)' : 'var(--varc)' }} />
                <span className="wc-title">{g}</span>
              </div>
              <div className="todo-list" style={{ marginTop: 8 }}>
                {list.length === 0 && (
                  <p style={{ fontSize: 12, color: 'var(--faint)' }}>No targets yet — add below 👇</p>
                )}
                {list.map((i) => (
                  <div key={i.id} className={`todo-item ${i.done ? 'done' : ''}`}>
                    <button className="todo-check" onClick={() => store.toggleWeekItem(monday, i.id)} aria-label="Toggle">✓</button>
                    <span className="todo-text">{i.text}</span>
                    <button className="todo-del" onClick={() => store.removeWeekItem(monday, i.id)} aria-label="Delete">✕</button>
                  </div>
                ))}
              </div>
              <div className="add-inline" style={{ marginTop: 8 }}>
                <input
                  className="input"
                  placeholder={`Add ${g.replace('🎯 ', '')} target…`}
                  value={seed(g)}
                  onChange={(e) => setInput({ ...input, [g]: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && add(g)}
                />
                <button className="btn btn-sm" onClick={() => add(g)}>Add</button>
              </div>
            </div>
          )
        })}
      </div>

      {items.length === 0 && (
        <EmptyState icon="🎯" title="Plan your week" hint="Set 3–6 smart targets: e.g. 'Finish Number System', '2 RC passages daily', 'Mock + analysis on Sunday'." />
      )}
    </div>
  )
}