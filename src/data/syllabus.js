import { VARC } from './syllabus-varc.js'
import { DILR } from './syllabus-dilr.js'
import { QA } from './syllabus-qa.js'

export const SECTIONS = [VARC, DILR, QA]

// Flat list of every subtopic (used across the app)
export const ALL_SUBTOPICS = SECTIONS.flatMap((s) =>
  s.topics.flatMap((t) =>
    t.subtopics.map((sub) => ({
      ...sub,
      sectionId: s.id,
      sectionName: s.name,
      topicName: t.name,
    })),
  ),
)

export const STATUS = [
  { id: 0, label: 'Not started', icon: '⬜', color: 'var(--faint)' },
  { id: 1, label: 'Learning', icon: '📖', color: 'var(--blue)' },
  { id: 2, label: 'Practiced', icon: '✏️', color: 'var(--amber)' },
  { id: 3, label: 'Mastered', icon: '✅', color: 'var(--green)' },
]

export const CONFIDENCE = [
  { value: 1, label: 'Very low' },
  { value: 2, label: 'Low' },
  { value: 3, label: 'Okay' },
  { value: 4, label: 'Good' },
  { value: 5, label: 'Strong' },
]

export function sectionById(id) {
  return SECTIONS.find((s) => s.id === id)
}

export function findSubtopic(id) {
  return ALL_SUBTOPICS.find((s) => s.id === id)
}