import { createContext, useContext } from 'react'
import useLocalStorage from './useLocalStorage.js'
import { todayStr } from '../utils/dates.js'

export const DEFAULT_STATE = {
  settings: {
    name: '',
    examDate: '2026-11-29',
    prepStart: '2026-09-13',
    dailyGoal: 180,
  },
  subtopics: {}, // id -> { status: 0..3, confidence: 1..5, notes: '' }
  studyLogs: {}, // 'YYYY-MM-DD' -> minutes studied
  mocks: [], // mock records
  dayPlans: {}, // date -> [ {id, text, section, done} ]
  weekTargets: {}, // mondayDate -> [ {id, text, section, done} ]
}

const Ctx = createContext(null)

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

export function AppStoreProvider({ children }) {
  const [state, setState] = useLocalStorage('cat-tracker-v1', DEFAULT_STATE)

  const actions = {
    // Settings
    patchSettings: (patch) => setState((s) => ({ ...s, settings: { ...s.settings, ...patch } })),

    // Syllabus progress
    setSubtopic: (id, patch) =>
      setState((s) => ({
        ...s,
        subtopics: { ...s.subtopics, [id]: { status: 0, confidence: 0, notes: '', ...s.subtopics[id], ...patch } },
      })),

    // Study time
    addStudyMin: (delta) =>
      setState((s) => {
        const d = todayStr()
        return { ...s, studyLogs: { ...s.studyLogs, [d]: Math.max(0, (s.studyLogs[d] || 0) + delta) } }
      }),
    setStudyMinFor: (date, min) =>
      setState((s) => ({ ...s, studyLogs: { ...s.studyLogs, [date]: Math.max(0, min) } })),

    // Day plans
    addDayItem: (date, text, section) =>
      setState((s) => ({
        ...s,
        dayPlans: {
          ...s.dayPlans,
          [date]: [{ id: uid(), text, section, done: false }, ...(s.dayPlans[date] || [])],
        },
      })),
    toggleDayItem: (date, id) =>
      setState((s) => ({
        ...s,
        dayPlans: {
          ...s.dayPlans,
          [date]: (s.dayPlans[date] || []).map((i) => (i.id === id ? { ...i, done: !i.done } : i)),
        },
      })),
    removeDayItem: (date, id) =>
      setState((s) => ({
        ...s,
        dayPlans: {
          ...s.dayPlans,
          [date]: (s.dayPlans[date] || []).filter((i) => i.id !== id),
        },
      })),

    // Week targets
    addWeekItem: (monday, text, section) =>
      setState((s) => ({
        ...s,
        weekTargets: {
          ...s.weekTargets,
          [monday]: [{ id: uid(), text, section, done: false }, ...(s.weekTargets[monday] || [])],
        },
      })),
    toggleWeekItem: (monday, id) =>
      setState((s) => ({
        ...s,
        weekTargets: {
          ...s.weekTargets,
          [monday]: (s.weekTargets[monday] || []).map((i) => (i.id === id ? { ...i, done: !i.done } : i)),
        },
      })),
    removeWeekItem: (monday, id) =>
      setState((s) => ({
        ...s,
        weekTargets: {
          ...s.weekTargets,
          [monday]: (s.weekTargets[monday] || []).filter((i) => i.id !== id),
        },
      })),

    // Mocks
    addMock: (mock) => setState((s) => ({ ...s, mocks: [...s.mocks, { ...mock, id: uid() }] })),
    updateMock: (id, patch) =>
      setState((s) => ({ ...s, mocks: s.mocks.map((m) => (m.id === id ? { ...m, ...patch } : m)) })),
    deleteMock: (id) => setState((s) => ({ ...s, mocks: s.mocks.filter((m) => m.id !== id) })),

    // Data management
    importData: (data) => setState((s) => ({ ...s, ...data })),
    resetAll: () => setState({ ...DEFAULT_STATE }),
  }

  const store = { ...state, ...actions }
  return <Ctx.Provider value={store}>{children}</Ctx.Provider>
}

export function useStore() {
  return useContext(Ctx)
}