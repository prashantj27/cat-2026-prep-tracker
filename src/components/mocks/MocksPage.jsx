import { useState } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { useStore } from '../../hooks/store.jsx'
import { Modal, EmptyState, Toast } from '../ui.jsx'
import { fmtShort, todayStr, fmtFull } from '../../utils/dates.js'
import { mockStats, mockTotal } from '../../utils/analytics.js'
import { SECTIONS } from '../../data/syllabus.js'

const SERIES_SUGGESTIONS = ['AIMCAT', 'SIMCAT', 'CAT Official', 'TIME', 'IMS', 'BYJU\'s', 'Other']

export default function MocksPage() {
  const store = useStore()
  const [formOpen, setFormOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [mode, setMode] = useState('Total')
  const [form, setForm] = useState({})
  const [toast, setToast] = useState('')

  const stats = mockStats(store.mocks)
  const rows = stats ? stats.sorted.map((m) => ({
    name: fmtShort(m.date),
    VARC: m.varc || 0,
    DILR: m.dilr || 0,
    QA: m.qa || 0,
    total: m.total,
    percentile: m.percentile,
  })) : []
  const sec = (id) => SECTIONS.find((s) => s.id === id)
  const COLORS = { VARC: '#7c5bea', DILR: '#0e86d0', QA: '#0f9d72', total: '#4f46e5', percentile: '#10b981' }

  const openNew = () => {
    setEditId(null)
    setForm({ date: todayStr(), series: 'AIMCAT', varc: '', dilr: '', qa: '', percentile: '', takeaways: '' })
    setFormOpen(true)
  }

  const openEdit = (m) => {
    setEditId(m.id)
    setForm(m)
    setFormOpen(true)
  }

  const save = () => {
    const series = (form.series || '').trim()
    if (!series) return setToast('⚠️ Please enter the mock series name')
    const v = Number(form.varc) || 0
    const d = Number(form.dilr) || 0
    const q = Number(form.qa) || 0
    const record = {
      date: form.date,
      series,
      varc: Math.max(0, v),
      dilr: Math.max(0, d),
      qa: Math.max(0, q),
      total: v + d + q,
      percentile: form.percentile === '' || form.percentile == null ? null : Number(form.percentile),
      takeaways: (form.takeaways || '').trim(),
    }
    if (editId) store.updateMock(editId, record)
    else store.addMock(record)
    setFormOpen(false)
    setToast(editId ? '✅ Mock updated' : '✅ Mock logged')
  }

  const remove = (m) => {
    if (typeof window.confirm === 'function' ? window.confirm(`Delete mock "${m.series}" from ${fmtFull(m.date)}?`) : true) {
      store.deleteMock(m.id)
      setToast('🗑️ Mock deleted')
    }
  }

  const renderLines = () => {
    if (mode === 'Total') {
      return <Line type="monotone" dataKey="total" name="Total" stroke={COLORS.total} strokeWidth={3} dot />
    }
    if (mode === 'Sections') {
      return (
        <>
          <Line type="monotone" dataKey="VARC" name={sec('VARC').name} stroke={COLORS.VARC} strokeWidth={2.4} dot />
          <Line type="monotone" dataKey="DILR" name={sec('DILR').name} stroke={COLORS.DILR} strokeWidth={2.4} dot />
          <Line type="monotone" dataKey="QA" name={sec('QA').name} stroke={COLORS.QA} strokeWidth={2.4} dot />
        </>
      )
    }
    return <Line type="monotone" dataKey="percentile" name="Percentile" stroke={COLORS.percentile} strokeWidth={2.4} dot />
  }

  return (
    <div className="stack">
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
        <div className="segmented">
          {['Total', 'Sections', 'Percentile'].map((m) => (
            <button key={m} className={mode === m ? 'active' : ''} onClick={() => setMode(m)}>
              {m}
            </button>
          ))}
        </div>
        <button className="btn" onClick={openNew}>➕ Log Mock</button>
      </div>

      <div className="card">
        <h2 className="card-title">Snapshot</h2>
        {stats ? (
          <div className="grid-4">
            <div className="metric">
              <p className="m-label">Mocks taken</p>
              <p className="m-value">{stats.count}</p>
              <p className="m-delta flat">Keep 1–2 per week</p>
            </div>
            <div className="metric">
              <p className="m-label">Best total</p>
              <p className="m-value">{stats.best}</p>
              <p className="m-delta flat">Best %ile {stats.bestPercentile ?? '—'}</p>
            </div>
            <div className="metric">
              <p className="m-label">Average total</p>
              <p className="m-value">{stats.avg}</p>
            </div>
            <div className="metric">
              <p className="m-label">Latest total</p>
              <p className="m-value">{stats.latest.total}</p>
              <p className={`m-delta ${stats.delta === null ? 'flat' : stats.delta >= 0 ? 'up' : 'down'}`}>
                {stats.delta === null ? '' : stats.delta >= 0 ? `▲ ${stats.delta} vs previous` : `▼ ${-stats.delta} vs previous`}
              </p>
            </div>
          </div>
        ) : (
          <EmptyState icon="📊" title="No mocks yet" hint="Log SIMCAT / AIMCAT / official mocks. QA 20+, DILR 15+, VARC 18+ on a CAT-tough mock are great signs.">
            <button className="btn btn-sm" onClick={openNew}>Log your first mock</button>
          </EmptyState>
        )}
      </div>

{ stats && stats.count > 0 && (
        <div className="card chart-card">
          <h2 className="card-title">Trend — {mode}</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={rows} margin={{ top: 8, right: 18, bottom: 6, left: 4 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e6e9f4" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} interval="preserveStartEnd" />
              <YAxis />
              <Tooltip />
              <Legend iconType="plain-line" />
              {renderLines()}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Mock list */}
      <div className="card">
        <h2 className="card-title">All mocks ({stats ? stats.count : 0})</h2>
        {stats && stats.sorted.map((m) => (
          <div className="mock-row" key={m.id}>
            <span className="chip" style={{ minWidth: 64 }}>{fmtShort(m.date)}</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="mr-name">{m.series}</span>
              <span className="mr-date">{fmtFull(m.date)}</span>
            </div>
            <div className="mr-scores">
              <span>V {m.varc || 0}</span>
              <span>D {m.dilr || 0}</span>
              <span>Q {m.qa || 0}</span>
              {m.percentile != null && <span className="chip done">%ile {m.percentile}</span>}
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ fontSize: 20, fontWeight: 800 }}>{m.total}</span>
              <button className="icon-btn" title="Edit" onClick={() => openEdit(m)}>✏️</button>
              <button className="icon-btn" title="Delete" onClick={() => remove(m)}>🗑️</button>
            </div>
            {m.takeaways && (
              <div className="card-sub" style={{ gridColumn: '1 / -1', fontSize: 12.5, color: 'var(--muted)', marginTop: 4 }}>
                💭 {m.takeaways}
              </div>
            )}
          </div>
        ))}
        {!stats && <EmptyState icon="🗂️" title="No mocks logged yet" />}
      </div>
<Modal open={formOpen} onClose={() => setFormOpen(false)} title={editId ? 'Edit mock' : 'Log a mock'}>
        <div className="modal-body">
          <div className="form-row">
            <div className="field">
              <label htmlFor="mf-date">Date</label>
              <input id="mf-date" type="date" className="input" value={form.date || ''} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="mf-series">Series</label>
              <input id="mf-series" list="series-list" className="input" value={form.series || ''} onChange={(e) => setForm({ ...form, series: e.target.value })} placeholder="e.g. SIMCAT 1" />
              <datalist id="series-list">
                {SERIES_SUGGESTIONS.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="mf-varc">VARC score</label>
              <input id="mf-varc" type="number" min="0" className="input" value={form.varc} onChange={(e) => setForm({ ...form, varc: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="mf-dilr">DILR score</label>
              <input id="mf-dilr" type="number" min="0" className="input" value={form.dilr} onChange={(e) => setForm({ ...form, dilr: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="mf-qa">QA score</label>
              <input id="mf-qa" type="number" min="0" className="input" value={form.qa} onChange={(e) => setForm({ ...form, qa: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="mf-perc">Percentile (optional)</label>
              <input id="mf-perc" type="number" min="0" max="100" className="input" value={form.percentile} onChange={(e) => setForm({ ...form, percentile: e.target.value })} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="mf-take">Key takeaways & mistakes</label>
            <textarea id="mf-take" className="textarea" rows="3" value={form.takeaways || ''} onChange={(e) => setForm({ ...form, takeaways: e.target.value })} placeholder="Which sets did you skip? Any careless errors? Note one fix for next time…" />
          </div>
          <div className="form-actions">
            <button className="btn btn-ghost" onClick={() => setFormOpen(false)}>Cancel</button>
            <button className="btn" onClick={save}>{editId ? 'Save changes' : 'Save mock'}</button>
          </div>
        </div>
      </Modal>

      <Toast message={toast} onDone={() => setToast('')} />
    </div>
  )
}