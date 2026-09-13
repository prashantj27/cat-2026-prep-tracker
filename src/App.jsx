import { useState } from 'react'
import { Sidebar } from './components/layout/Sidebar.jsx'
import { MobileNav } from './components/layout/MobileNav.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx'
import SyllabusPage from './components/syllabus/SyllabusPage.jsx'
import MocksPage from './components/mocks/MocksPage.jsx'
import PlannerPage from './components/planner/PlannerPage.jsx'
import SettingsPage from './components/settings/SettingsPage.jsx'

const META = {
  dashboard: { title: 'Dashboard', sub: 'Your CAT 2026 journey at a glance' },
  syllabus: { title: 'Syllabus Tracker', sub: 'Sections → Topics → Subtopics with tricks' },
  mocks: { title: 'Mock Tests', sub: 'Log every mock & watch your trend' },
  planner: { title: 'Planner', sub: 'Daily & weekly targets, timeline, study heatmap' },
  settings: { title: 'Settings', sub: 'Exam date, goals & your data' },
}

export default function App() {
  const [tab, setTab] = useState(() => localStorage.getItem('cat-tracker-tab') || 'dashboard')

  // Scroll to top on tab change
  const navigate = (id) => {
    setTab(id)
    try {
      localStorage.setItem('cat-tracker-tab', id)
    } catch {
      /* ignore */
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      <Sidebar tab={tab} setTab={setTab} onNav={navigate} />
      <MobileNav tab={tab} setTab={setTab} onNav={navigate} />

      <main className="main">
        <header className="page-head">
          <h1>{META[tab].title}</h1>
          <p className="sub">{META[tab].sub}</p>
        </header>

        {tab === 'dashboard' && <Dashboard setTab={setTab} />}
        {tab === 'syllabus' && <SyllabusPage />}
        {tab === 'mocks' && <MocksPage />}
        {tab === 'planner' && <PlannerPage />}
        {tab === 'settings' && <SettingsPage />}
      </main>
    </div>
  )
}