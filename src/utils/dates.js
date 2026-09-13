// Date helpers (all local time, ISO 'YYYY-MM-DD')

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function toStr(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function todayStr() {
  return toStr(new Date())
}

export function fromStr(s) {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function addDays(s, n) {
  const d = fromStr(s)
  d.setDate(d.getDate() + n)
  return toStr(d)
}

export function daysBetween(a, b) {
  return Math.round((fromStr(b) - fromStr(a)) / 86400000)
}

// Date of the Monday for the week containing s
export function monOf(s) {
  const d = fromStr(s)
  const dow = (d.getDay() + 6) % 7 // Monday=0
  d.setDate(d.getDate() - dow)
  return toStr(d)
}

export function fmtShort(s) {
  const d = fromStr(s)
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`
}

export function fmtLong(s) {
  const d = fromStr(s)
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

export function fmtFull(s) {
  const d = fromStr(s)
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

export function weekday(s) {
  return DAYS[fromStr(s).getDay()]
}

export function weekdays() {
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
}

// All date strings from start to end inclusive
export function dateRange(start, end) {
  const out = []
  const n = Math.max(0, daysBetween(start, end))
  for (let i = 0; i <= n; i++) out.push(addDays(start, i))
  return out
}

export function lastNDays(n, end = todayStr()) {
  return Array.from({ length: n }, (_, i) => addDays(end, -(n - 1 - i)))
}

// Prep timeline phases: anchored between prepStart and examDate
export function getPhases(prepStart, examDate) {
  const total = Math.max(1, daysBetween(prepStart, examDate))
  const defs = [
    { id: 'foundation', name: 'Foundation', pct: 0.35, desc: 'Core concepts, formulas & full syllabus coverage' },
    { id: 'practice', name: 'Practice', pct: 0.3, desc: 'Section-wise practice, speed & accuracy drills' },
    { id: 'mocks', name: 'Mock Season', pct: 0.25, desc: 'Full mocks, deep analysis & weak-area fixes' },
    { id: 'final', name: 'Final Revision', pct: 0.1, desc: 'Formula sheets, tricks & exam-day readiness' },
  ]
  let cursor = prepStart
  return defs.map((d) => {
    const days = Math.max(1, Math.round(total * d.pct))
    const start = cursor
    const end = addDays(start, days - 1)
    cursor = addDays(end, 1)
    return { ...d, start, end }
  })
}

export function currentPhaseOf(phases, date = todayStr()) {
  const hit = phases.find((p) => date >= p.start && date <= p.end)
  if (hit) return hit
  return date < phases[0].start ? phases[0] : phases[phases.length - 1]
}