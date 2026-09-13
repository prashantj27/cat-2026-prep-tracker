// Renders every page with react-dom/server to catch runtime render errors.
import React from 'react'
import { renderToString } from 'react-dom/server'
import { AppStoreProvider } from '../src/hooks/store.jsx'
import Dashboard from '../src/components/dashboard/Dashboard.jsx'
import SyllabusPage from '../src/components/syllabus/SyllabusPage.jsx'
import MocksPage from '../src/components/mocks/MocksPage.jsx'
import PlannerPage from '../src/components/planner/PlannerPage.jsx'
import WeekPlanner from '../src/components/planner/WeekPlanner.jsx'
import DayPlanner from '../src/components/planner/DayPlanner.jsx'
import TimelineView from '../src/components/planner/TimelineView.jsx'
import SettingsPage from '../src/components/settings/SettingsPage.jsx'

// Minimal browser API stubs (render path only touches localStorage at init)
let localStorageValue = null
globalThis.localStorage = {
  getItem: () => localStorageValue,
  setItem: (k, v) => { localStorageValue = v },
  removeItem: () => { localStorageValue = null },
}

const wrap = (Comp, props) =>
  React.createElement(AppStoreProvider, null, React.createElement(Comp, props || {}))

const pages = [
  ['Dashboard', () => wrap(Dashboard, { setTab: () => {} })],
  ['SyllabusPage', () => wrap(SyllabusPage)],
  ['MocksPage', () => wrap(MocksPage)],
  ['PlannerPage (week default)', () => wrap(PlannerPage)],
  ['WeekPlanner', () => wrap(WeekPlanner)],
  ['DayPlanner', () => wrap(DayPlanner)],
  ['TimelineView', () => wrap(TimelineView)],
  ['SettingsPage', () => wrap(SettingsPage)],
]

const runPass = (label) => {
  console.log(`--- ${label} ---`)
  let fails = 0
  for (const [name, make] of pages) {
    try {
      const html = renderToString(make())
      console.log(`RENDER OK   ${name}  (${html.length} chars)`)
    } catch (e) {
      fails++
      console.log(`RENDER FAIL ${name} -> ${e.message}`)
    }
  }
  return fails
}

let fails = runPass('EMPTY STATE')
if (fails) process.exit(1)

// Seed realistic data: progress, study logs, 2 mocks, tasks, week targets
localStorageValue = JSON.stringify({
  settings: { name: '', examDate: '2026-11-29', prepStart: '2026-09-13', dailyGoal: 180 },
  subtopics: {
    'varc-rc-main': { status: 3, confidence: 5, notes: 'scope traps' },
    'qa-ar-percent': { status: 2, confidence: 3, notes: '' },
    'dilr-lr-arrange': { status: 1, confidence: 4, notes: '' },
  },
  studyLogs: { '2026-09-08': 60, '2026-09-09': 120, '2026-09-10': 15, '2026-09-11': 90, '2026-09-12': 180, '2026-09-13': 45 },
  mocks: [
    { id: 'm1', date: '2026-08-20', series: 'SIMCAT 1', varc: 18, dilr: 12, qa: 15, total: 45, percentile: 82, takeaways: 'RC speed is the issue' },
    { id: 'm2', date: '2026-09-05', series: 'AIMCAT 2', varc: 20, dilr: 16, qa: 18, total: 54, percentile: 90, takeaways: '' },
  ],
  dayPlans: { '2026-09-13': [{ id: 't1', text: 'Review DILR sets', section: 'DILR', done: false }] },
  weekTargets: { '2026-09-07': [{ id: 'w1', text: 'Finish Number System', section: 'QA', done: true }] },
})
fails = runPass('SEEDED DATA')
if (fails) process.exit(1)

console.log('ALL PASS')