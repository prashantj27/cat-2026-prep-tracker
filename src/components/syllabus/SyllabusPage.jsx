import { useState } from 'react'
import { SECTIONS, STATUS } from '../../data/syllabus.js'
import { useStore } from '../../hooks/store.jsx'
import { Bar, EmptyState } from '../ui.jsx'
import SubtopicRow from './SubtopicRow.jsx'

const NO_FILTER = -1

export default function SyllabusPage() {
  const store = useStore()
  const [sectionId, setSectionId] = useState(() => localStorage.getItem('cat-tracker-section') || SECTIONS[0].id)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState(NO_FILTER)
  const [expanded, setExpanded] = useState(new Set())

  const section = SECTIONS.find((s) => s.id === sectionId) || SECTIONS[0]

  const setSection = (id) => {
    setSectionId(id)
    try {
      localStorage.setItem('cat-tracker-section', id)
    } catch {
      /* ignore */
    }
  }

  const q = search.trim().toLowerCase()
  const matches = (sub) => sub.name.toLowerCase().includes(q) && (filter === NO_FILTER || (store.subtopics[sub.id] || {}).status === filter)

  const toggleTopic = (tid) => {
    const next = new Set(expanded)
    if (next.has(tid)) next.delete(tid)
    else next.add(tid)
    setExpanded(next)
  }

  const expandAll = (open) => {
    const next = new Set()
    if (open) section.topics.forEach((t) => next.add(t.id))
    setExpanded(next)
  }

  // Topic stats
  const topicRec = (topic) => {
    let total = 0
    let mastered = 0
    for (const sub of topic.subtopics) {
      total++
      if ((store.subtopics[sub.id] || {}).status === 3) mastered++
    }
    return { total, mastered }
  }

  const isFiltering = q.length > 0 || filter !== NO_FILTER

  return (
    <div className="stack">
      {/* Section switcher */}
      <div className="section-switch" style={{ '--sec-color': section.color, '--sec-soft': section.soft }}>
        {SECTIONS.map((s) => {
          let total = 0
          let mastered = 0
          for (const t of s.topics) for (const sub of t.subtopics) {
            total++
            if ((store.subtopics[sub.id] || {}).status === 3) mastered++
          }
          const pct = total ? Math.round((mastered / total) * 100) : 0
          return (
            <button
              key={s.id}
              className={`sw ${s.id === section.id ? 'active' : ''}`}
              style={{ '--sec-color': s.color, '--sec-soft': s.soft }}
              onClick={() => setSection(s.id)}
              title={s.full}
            >
              <span style={{ display: 'flex', gap: 8, width: '100%' }}>
                <span className="sw-ico">{s.icon}</span>
                <span className="sw-name">{s.name}</span>
                <span className="chip" style={{ marginLeft: 'auto' }}>{pct}%</span>
              </span>
              <span className="sw-line">{s.full}</span>
              <span className="sw-line">{s.weight} · {mastered}/{total} mastered</span>
            </button>
          )
        })}
      </div>

      {/* Controls */}
      <div className="card flush" style={{ padding: '12px 16px' }}>
        <div className="syll-controls">
          <input
            className="input"
            placeholder="🔍 Search subtopics…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="filter-chips">
            <button className={`fc ${filter === NO_FILTER ? 'active' : ''}`} onClick={() => setFilter(NO_FILTER)}>
              All
            </button>
            {STATUS.map((st) => (
              <button key={st.id} className={`fc ${filter === st.id ? 'active' : ''}`} onClick={() => setFilter(st.id)}>
                {st.icon} {st.label}
              </button>
            ))}
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => expandAll(true)}>
            Expand all
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => expandAll(false)}>
            Collapse all
          </button>
        </div>
      </div>

      {/* Topics */}
      <div className="stack" style={{ gap: 12 }}>
        {section.topics.map((topic) => {
          const visible = topic.subtopics.filter(matches)
          const { total, mastered } = topicRec(topic)
          const isOpen = expanded.has(topic.id)
          return (
            <div className="topic" key={topic.id}>
              <button className="topic-head" onClick={() => toggleTopic(topic.id)}>
                <span className={`chev ${isOpen ? 'open' : ''}`}>▸</span>
                <span className="th-name">{topic.name}</span>
                <span className="th-count">{mastered}/{total} mastered</span>
                <span className="th-bar">
                  <Bar pct={total ? (mastered / total) * 100 : 0} color={section.color} />
                </span>
              </button>
              <div className={`topic-body ${isOpen || isFiltering ? 'open' : ''}`}>
                {visible.length === 0 && (
                  <EmptyState icon="🔍" title="No subtopics match" hint="Try clearing the search or changing the filter." />
                )}
                {visible.map((sub) => (
                  <div key={sub.id} style={{ paddingBottom: 8 }}>
                    <SubtopicRow sub={sub} section={section} startOpen={isFiltering && q && sub.name.toLowerCase().includes(q)} />
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}