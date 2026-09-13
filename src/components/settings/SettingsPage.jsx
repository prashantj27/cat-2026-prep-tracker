import { useState } from 'react'
import { useStore } from '../../hooks/store.jsx'
import { Toast } from '../ui.jsx'
import { daysBetween, todayStr, fmtFull } from '../../utils/dates.js'
import { overallProgress, totalMinutes, studyStreak } from '../../utils/analytics.js'

export default function SettingsPage() {
  const store = useStore()
  const [toast, setToast] = useState('')
  const [confirmReset, setConfirmReset] = useState(false)
  const days = Math.max(0, daysBetween(todayStr(), store.settings.examDate))
  const progress = overallProgress(store)

  const exportData = () => {
    const payload = {
      settings: store.settings,
      subtopics: store.subtopics,
      studyLogs: store.studyLogs,
      mocks: store.mocks,
      dayPlans: store.dayPlans,
      weekTargets: store.weekTargets,
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cat-2026-backup-${todayStr()}.json`
    a.click()
    URL.revokeObjectURL(url)
    setToast('📦 Backup downloaded')
  }

  const importData = async (file) => {
    try {
      const data = JSON.parse(await file.text())
      if (!data || typeof data !== 'object') throw new Error('bad')
      store.importData({
        settings: data.settings || store.settings,
        subtopics: data.subtopics || {},
        studyLogs: data.studyLogs || {},
        mocks: Array.isArray(data.mocks) ? data.mocks : [],
        dayPlans: data.dayPlans || {},
        weekTargets: data.weekTargets || {},
      })
      setToast('✅ Backup imported — everything restored')
    } catch {
      setToast('⚠️ That file does not look like a valid backup')
    }
  }

  const hardReset = () => {
    const ok = typeof window.confirm === 'function' ? window.confirm('Erase ALL data? This cannot be undone.') : true
    if (ok) {
      store.resetAll()
      setConfirmReset(false)
      setToast('🧹 All data cleared')
    }
  }

  return (
    <div className="stack">
      <div className="grid-2">
        <div className="settings-card">
          <h3 className="sc-head">📅 Exam & goals</h3>
          <p className="sc-sub">~{days} days to CAT · {fmtFull(store.settings.examDate)}</p>
          <div className="form-row">
            <div className="field">
              <label htmlFor="st-exam">CAT exam date</label>
              <input id="st-exam" type="date" className="input" value={store.settings.examDate} onChange={(e) => store.patchSettings({ examDate: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="st-start">Prep started on</label>
              <input id="st-start" type="date" className="input" value={store.settings.prepStart} onChange={(e) => store.patchSettings({ prepStart: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="st-goal">Daily goal (minutes)</label>
              <input id="st-goal" type="number" min="0" step="15" className="input" value={store.settings.dailyGoal} onChange={(e) => store.patchSettings({ dailyGoal: Math.max(0, Number(e.target.value) || 0) })} />
            </div>
          </div>
          <p className="sc-sub" style={{ marginTop: 8 }}>
            Tip: the CAT 2026 date is expected around late Nov 2026 — update it the day it is announced and the countdown & timeline adjust automatically.
          </p>
        </div>

        <div className="settings-card">
          <h3 className="sc-head">📊 Your prep in numbers</h3>
          <p className="sc-sub">Live summary — no action needed</p>
          <div className="grid-4">
            <div className="metric"><p className="m-label">Readiness</p><p className="m-value">{progress.pct}%</p></div>
            <div className="metric"><p className="m-label">Study hours</p><p className="m-value">{Math.round(totalMinutes(store) / 60)}h</p></div>
            <div className="metric"><p className="m-label">Day streak</p><p className="m-value">🔥 {studyStreak(store)}</p></div>
            <div className="metric"><p className="m-label">Mocks taken</p><p className="m-value">{(store.mocks || []).length}</p></div>
          </div>
          {progress.sections.map((p) => (
            <div className="sb-row" key={p.section.id} style={{ gridTemplateColumns: '70px 1fr 40px', marginTop: 6 }}>
              <span className="sb-name">{p.section.icon} {p.section.name}</span>
              <div className="bar">
                <div className="fill" style={{ width: `${p.pct}%`, background: p.section.color }} />
              </div>
              <span className="sb-pct">{p.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="settings-card">
        <h3 className="sc-head">💾 Your data</h3>
        <p className="sc-sub">
          Everything is saved privately in this browser (localStorage). Export a backup regularly — restore it later on any
          browser or device.
        </p>
        <div className="sc-actions">
          <button className="btn" onClick={exportData}>⬇️ Export backup</button>
          <label className="btn btn-ghost">
            ⬆️ Import backup
            <input
              type="file"
              accept="application/json,.json"
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files.length) importData(e.target.files[0])
                e.target.value = ''
              }}
            />
          </label>
          {confirmReset ? (
            <>
              <button className="btn btn-danger" onClick={hardReset}>Yes, erase everything</button>
              <button className="btn btn-ghost" onClick={() => setConfirmReset(false)}>Cancel</button>
            </>
          ) : (
            <button className="btn btn-danger-ghost" onClick={() => setConfirmReset(true)}>Reset all data</button>
          )}
        </div>
      </div>

      <div className="settings-card">
        <h3 className="sc-head">🌱 About this app</h3>
        <p className="sc-sub">
          Built as a personal CAT 2026 prep companion: syllabus tracking with 100+ exam tricks, mock analytics,
          daily & weekly planning and a study heatmap — all offline in your browser. Your data stays exactly where you
          left it.
        </p>
      </div>

      <Toast message={toast} onDone={() => setToast('')} />
    </div>
  )
}