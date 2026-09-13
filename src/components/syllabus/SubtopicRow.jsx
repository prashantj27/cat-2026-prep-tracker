import { useState } from 'react'
import { STATUS } from '../../data/syllabus.js'
import { useStore } from '../../hooks/store.jsx'

// One subtopic row: name, status picker, expandable body with confidence + tricks + notes
export default function SubtopicRow({ sub, section, startOpen }) {
  const store = useStore()
  const rec = store.subtopics[sub.id] || {}
  const status = rec.status || 0
  const [open, setOpen] = useState(!!startOpen)

  return (
    <div className="subtopic" style={{ '--sec-color': section.color, '--sec-soft': section.soft }}>
      <button className="subtopic-head" onClick={() => setOpen(!open)}>
        <span className="sub-name">{sub.name}</span>
        <span className="sub-status">{STATUS[status].icon} {STATUS[status].label}</span>
        <span className="chev">{open ? '▾' : '▸'}</span>
      </button>

      <div className={`subtopic-body ${open ? 'open' : ''}`}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>Status</span>
          <div className="status-picker" role="group" aria-label="Status">
            {STATUS.map((s) => (
              <button
                key={s.id}
                className={`sp ${status === s.id ? 'active' : ''}`}
                title={s.label}
                aria-label={s.label}
                onClick={() => store.setSubtopic(sub.id, { status: s.id })}
              >
                {s.icon}
              </button>
            ))}
          </div>

          <span style={{ fontSize: 12, color: 'var(--muted)' }}>Confidence</span>
          <div className="conf-dots" role="group" aria-label="Confidence">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                className={`cd ${(rec.confidence || 0) === n ? 'active' : ''}`}
                title={`Confidence ${n}/5`}
                onClick={() => store.setSubtopic(sub.id, { confidence: n })}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {sub.tricks && sub.tricks.length > 0 && (
          <div className="trick-list" style={{ marginTop: 12 }}>
            {sub.tricks.map((tr, i) => (
              <div className="trick" key={i}>
                <div className="trick-title">⚡ {tr.t}</div>
                <div className="trick-text">{tr.d}</div>
              </div>
            ))}
          </div>
        )}

        <div className="sub-notes" style={{ marginTop: 12 }}>
          <textarea
            className="textarea"
            placeholder="Personal notes for this subtopic…"
            value={rec.notes || ''}
            onChange={(e) => store.setSubtopic(sub.id, { notes: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}