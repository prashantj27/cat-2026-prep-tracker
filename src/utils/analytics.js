import { SECTIONS } from '../data/syllabus.js'
import { addDays, todayStr, monOf } from './dates.js'

// Weighted syllabus readiness per section / overall
const WEIGHT = [0, 1, 2, 3] // notStarted, learning, practiced, mastered

function subtopicState(st, id) {
  return (st.subtopics && st.subtopics[id]) || {}
}

export function sectionProgress(st, section) {
  let total = 0
  let weighted = 0
  let mastered = 0
  let started = 0
  for (const t of section.topics) {
    for (const s of t.subtopics) {
      const rec = subtopicState(st, s.id)
      const status = Math.max(0, Math.min(3, rec.status || 0))
      total++
      weighted += WEIGHT[status]
      if (status === 3) mastered++
      if (status > 0) started++
    }
  }
  return {
    total,
    mastered,
    started,
    pct: total ? Math.round((weighted / (total * 3)) * 100) : 0,
  }
}

export function overallProgress(st) {
  const sections = SECTIONS.map((s) => ({ section: s, ...sectionProgress(st, s) }))
  let total = 0
  let weighted = 0
  for (const p of sections) {
    total += p.total
    weighted += (p.pct / 100) * p.total * 3
  }
  const pct = total ? Math.round((weighted / (total * 3)) * 100) : 0
  return { pct, sections }
}

// Study streak: consecutive days with logged minutes, ending today or yesterday
export function studyStreak(st) {
  let s = 0
  let d = todayStr()
  const logs = st.studyLogs || {}
  if (!(logs[d] > 0)) d = addDays(d, -1)
  while (logs[d] > 0) {
    s++
    d = addDays(d, -1)
  }
  return s
}

export function totalMinutes(st) {
  return Object.values(st.studyLogs || {}).reduce((a, b) => a + b, 0)
}

export function weeklyMinutes(st, monday) {
  let sum = 0
  const logs = st.studyLogs || {}
  for (let i = 0; i < 7; i++) {
    const d = addDays(monday, i)
    if (logs[d]) sum += logs[d]
  }
  return sum
}

export function dayItems(st, date) {
  return (st.dayPlans && st.dayPlans[date]) || []
}

export function weekItems(st, monday) {
  return (st.weekTargets && st.weekTargets[monday]) || []
}

export function itemsDone(items) {
  return items.filter((i) => i.done).length
}

export function topicCounts(st, section) {
  return SECTIONS.map((s) => {
    let total = 0
    let mastered = 0
    for (const t of s.topics) for (const sub of t.subtopics) {
      total++
      const rec = subtopicState(st, sub.id)
      if ((rec.status || 0) === 3) mastered++
    }
    return { id: s.id, total, mastered }
  })
}

// ---- Mock analytics ----
export function mockStats(mocks) {
  if (!mocks || mocks.length === 0) return null
  const sorted = [...mocks].sort((a, b) => (a.date < b.date ? -1 : 1))
  const latest = sorted[sorted.length - 1]
  const prev = sorted.length > 1 ? sorted[sorted.length - 2] : null
  const delta = prev ? latest.total - prev.total : null
  const totals = sorted.map((m) => m.total)
  const perc = sorted.filter((m) => m.percentile != null).map((m) => m.percentile)
  return {
    count: sorted.length,
    sorted,
    latest,
    prev,
    delta,
    best: Math.max(...totals),
    avg: Math.round(totals.reduce((a, b) => a + b, 0) / totals.length),
    bestPercentile: perc.length ? Math.max(...perc) : null,
    latestPercentile: latest.percentile,
  }
}

export function mockTotal(m) {
  return (m.varc || 0) + (m.dilr || 0) + (m.qa || 0)
}

// --- Weekly target helpers (Mon..Sun anchored) ----
export function weekKey(date) {
  return monOf(date)
}

export function weekRange(monday) {
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i))
}

// Trick of the day: deterministic pick from the whole trick bank
export function trickOfDay(allSubtopics, seed = todayStr()) {
  const flat = allSubtopics
    .map((s) => s.tricks.map((tr) => ({ ...tr, sub: s.name })))
    .flat()
  if (flat.length === 0) return null
  let hash = 0
  for (const ch of seed) hash = (hash * 31 + ch.charCodeAt(0)) % 100000
  return flat[hash % flat.length]
}