// DILR — Data Interpretation & Logical Reasoning
export const DILR = {
  id: 'DILR',
  name: 'DILR',
  full: 'Data Interpretation & Logical Reasoning',
  icon: '🧩',
  color: 'var(--dilr)',
  soft: 'var(--dilr-soft)',
  weight: '~20 Qs · 40 min',
  topics: [
    {
      id: 'dilr-di',
      name: 'Data Interpretation',
      subtopics: [
        {
          id: 'dilr-di-tables',
          name: 'Tables & Data Tables',
          tricks: [
            { t: 'Compute “extras” first', d: 'Before questions, add row/column sums and obvious ratios. ~60% of answers come straight from these derived numbers.' },
            { t: 'Read title + units', d: 'Units (lakh vs crore), titles and footnotes hide the traps — underline them on the rough sheet before solving.' },
          ],
        },
        {
          id: 'dilr-di-bars',
          name: 'Bar & Column Charts',
          tricks: [
            { t: 'Approximate first', d: 'Compare bar heights visually (this ≈ 1.5× that) before exact calculation. CAT arrows are usually spaced wide apart.' },
            { t: 'Percentage-change trick', d: '“Which year grew fastest?” → compare ratios/percentage change, not absolute jumps.' },
          ],
        },
        {
          id: 'dilr-di-lines',
          name: 'Line Graphs',
          tricks: [
            { t: 'Slope = rate of change', d: 'Answer rate questions by the steepness of segments, not the values. Flat slope = zero growth whatever the levels.' },
            { t: 'Cumulative traps', d: 'If the chart is cumulative, differences between points give per-year values. Check the small print.' },
          ],
        },
        {
          id: 'dilr-di-pies',
          name: 'Pie Charts',
          tricks: [
            { t: 'Pie = 360°', d: '25% is a right angle, 12.5% is a semi-right quadrant. Train your eye to convert % ↔ degrees without a calculator.' },
            { t: 'Compare via angles', d: 'Two-pie comparisons: multiply % of whole by whole–value; never compare ° directly across different totals.' },
          ],
        },
        {
          id: 'dilr-di-caselets',
          name: 'Data Caselets',
          tricks: [
            { t: 'Story → table', d: 'Convert the caselet into a table as you read — NEVER answer from the story text directly.' },
            { t: 'Symbol shorthand', d: 'Invent symbols (S = profit, ↑ = increase) to cut 20–30% of reading time in long caselets.' },
          ],
        },
      ],
    },
    {
      id: 'dilr-lr',
      name: 'Logical Reasoning',
      subtopics: [
        {
          id: 'dilr-lr-arrange',
          name: 'Arrangements (Linear / Circular)',
          tricks: [
            { t: 'Fix someone', d: 'In circular arrangements, fix one person’s position first — it removes the rotational symmetry that multiplies cases.' },
            { t: 'Either-or branches', d: 'When a clue allows 2 positions (A is 3rd or 5th), write both branches. One contradiction prunes an entire branch.' },
          ],
        },
        {
          id: 'dilr-lr-tournament',
          name: 'Games & Tournaments',
          tricks: [
            { t: 'Sanity-check with match math', d: 'Round robin: n teams → n(n−1)/2 matches; knockout: n−1. Write these before reading the questions.' },
            { t: 'Points table first', d: 'Build the W/D/L (+points) table before anything else — 80% of tournament answers fall out of it.' },
          ],
        },
        {
          id: 'dilr-lr-venn',
          name: 'Venn Diagrams & Sets',
          tricks: [
            { t: 'Fill from the centre', d: 'Solve from the innermost overlap outward. “Exactly two” decides the double regions; “all three” centres the diagram.' },
            { t: 'At least one', d: '|A ∪ B ∪ C| = total − none. Complement path is usually the shortest route.' },
          ],
        },
        {
          id: 'dilr-lr-family',
          name: 'Blood Relations & Directions',
          tricks: [
            { t: 'Draw with symbols', d: 'Family tree: use + / − for gender, = for marriage. Draw sentence by sentence; never track relations in your head.' },
            { t: 'Turtle turns', d: 'For directions rotate a facing compass (N→E→S→W) as you track turns — draw, don’t imagine.' },
          ],
        },
        {
          id: 'dilr-lr-schedule',
          name: 'Scheduling & Distribution',
          tricks: [
            { t: 'Hard clues before soft', d: 'List fixed constraints (exact slots) first and place them; “X is not on Monday” clues are only useful at the very end.' },
            { t: 'Grid elimination', d: 'Set up rows × slots and mark ✓/✗. One ✓ kills its whole row and column — the fastest pruning tool.' },
          ],
        },
        {
          id: 'dilr-lr-ranking',
          name: 'Ranking & Ordering',
          tricks: [
            { t: 'Number line', d: 'Place absolute ranks on a number line first (3rd from top, 7th from bottom → 9 people), then overlay comparisons.' },
            { t: 'Chain inequalities', d: '“A taller than B but shorter than C” → C > A > B. Chain everything into one inequality string.' },
          ],
        },
        {
          id: 'dilr-lr-quant',
          name: 'Quant-based LR',
          tricks: [
            { t: 'LR in quant clothing', d: 'These sets are hidden equations. Write each numeric condition as an equation before exploring cases.' },
            { t: 'Test the smallest', d: 'When stuck, test the smallest feasible number first — constraints usually prune quickly.' },
          ],
        },
      ],
    },
  ],
}