// QA — Quantitative Ability
export const QA = {
  id: 'QA',
  name: 'QA',
  full: 'Quantitative Ability',
  icon: '🔢',
  color: 'var(--qa)',
  soft: 'var(--qa-soft)',
  weight: '~22 Qs · 40 min',
  topics: [
    {
      id: 'qa-arithmetic',
      name: 'Arithmetic',
      subtopics: [
        {
          id: 'qa-ar-percent',
          name: 'Percentages',
          tricks: [
            { t: 'Successive change formula', d: 'Net change = a + b + ab/100 for two changes a% and b% (mind the signs). One formula kills half the chapter.' },
            { t: 'Fraction anchors', d: '1/8 = 12.5%, 1/6 ≈ 16.67%, 1/7 ≈ 14.28%. Convert % to friendly fractions and multiply.' },
            { t: 'x% of y = y% of x', d: '6% of 50 = 50% of 6 = 3. Flip the calculation to the easier side.' },
          ],
        },
        {
          id: 'qa-ar-pl',
          name: 'Profit, Loss & Discount',
          tricks: [
            { t: 'Assume CP = 100', d: 'When quantities are unknown, set CP = 100. Profit % becomes plain addition, no variables.' },
            { t: 'Successive discounts', d: 'Two discounts a%, b% = single discount (a + b − ab/100)%.' },
          ],
        },
        {
          id: 'qa-ar-si',
          name: 'Simple & Compound Interest',
          tricks: [
            { t: 'CI in 3 lines', d: 'Yr1 CI = SI. CI grows its own interest every year. Use year-wise SI table instead of the CI formula.' },
            { t: 'CI − SI shortcut', d: 'For 2 years: CI − SI = P(r/100)². For 3 years: P(r/100)²(3 + r/100).' },
          ],
        },
        {
          id: 'qa-ar-ratio',
          name: 'Ratio, Proportion & Partnership',
          tricks: [
            { t: 'Ratio = units', d: '3:5 with difference 40 → 2 units = 40, one unit = 20, parts are 60 and 100. No algebra needed.' },
            { t: 'Partnership profits', d: 'Split profit in ratio of (capital × time), never capital alone.' },
          ],
        },
        {
          id: 'qa-ar-mixture',
          name: 'Mixtures & Alligations',
          tricks: [
            { t: 'Alligation cross', d: 'Ratio of quantities = (dearer − mean) : (mean − cheaper). Draw the cross, skip the equation.' },
            { t: 'Repeated replacement', d: 'After n times, remaining pure = initial × (1 − r/V)ⁿ. One formula, whole sub-topic.' },
          ],
        },
        {
          id: 'qa-ar-tsd',
          name: 'Time, Speed & Distance',
          tricks: [
            { t: 'Unit discipline', d: 'km/h ↔ m/s via ×5/18. Convert FIRST; 80% of TSD errors are unit errors.' },
            { t: 'Relative speed', d: 'Opposite directions add speeds; same direction subtract. Trains: add lengths when crossing each other.' },
            { t: 'Average ≠ mean of speeds', d: 'Average speed = total distance / total time. For equal distances: harmonic mean of speeds.' },
          ],
        },
        {
          id: 'qa-ar-work',
          name: 'Time & Work',
          tricks: [
            { t: 'LCM method', d: 'Let total work = LCM of individual days → work becomes clean integers, no fractions.' },
            { t: 'A & B together', d: 'If A takes x days, B takes y: together = xy/(x+y) days. Pairs formula; use for pipes & cisterns too (outlets = negative).' },
          ],
        },
        {
          id: 'qa-ar-avg',
          name: 'Averages',
          tricks: [
            { t: 'Deviation method', d: 'New member value = old average + (n+1) × change in average. Skips recalculation entirely.' },
            { t: 'Removed member', d: "When someone leaves, removed value = old average + n × change (with sign)." },
          ],
        },
      ],
    },
    {
      id: 'qa-algebra',
      name: 'Algebra',
      subtopics: [
        {
          id: 'qa-al-equations',
          name: 'Linear & Quadratic Equations',
          tricks: [
            { t: "Vieta's formulas", d: 'For x² + bx + c = 0: sum of roots = −b, product = c. Many questions answer without solving.' },
            { t: 'Read the discriminant', d: 'D > 0 → real distinct roots; D = 0 → equal; D < 0 → no real. Inequality & range questions are discriminant tests.' },
          ],
        },
        {
          id: 'qa-al-ineq',
          name: 'Inequalities & Modulus',
          tricks: [
            { t: 'Number-line sign flow', d: 'For polynomial inequalities, mark roots, test ONE value per region — signs alternate. Never multiply by variable expressions.' },
            { t: 'Modulus = distance', d: '|x − a| ≤ k means a − k ≤ x ≤ a + k. Modulus questions are distance-from-a-point questions in disguise.' },
          ],
        },
        {
          id: 'qa-al-functions',
          name: 'Functions & Graphs',
          tricks: [
            { t: 'Transform inside-out', d: 'f(x) + k shifts up; f(x + k) shifts LEFT; −f(x) flips across x-axis. Apply the change to x first.' },
            { t: 'Even/odd instantly', d: 'f(−x) = f(x) → even (y-axis symmetry); f(−x) = −f(x) → odd (origin symmetry).' },
          ],
        },
        {
          id: 'qa-al-log',
          name: 'Logarithms',
          tricks: [
            { t: 'Bases are 2, 3, 10', d: 'In CAT, 90% of log questions use bases 2, 3 or 10. Convert everything to one base.' },
            { t: 'Expand before solving', d: 'log(ab) = log a + log b; log(aⁿ) = n·log a. Expand the expression fully, then solve.' },
          ],
        },
        {
          id: 'qa-al-progressions',
          name: 'Progressions (AP, GP, HP)',
          tricks: [
            { t: 'Middle-term magic', d: '3 terms in AP = (a−d, a, a+d). Sum of 5 consecutive terms = 5 × middle term.' },
            { t: 'GP ratio test', d: 'Terms with constant ratio r form a GP — question needs only r and one term; learn the forms for 3–4 terms.' },
          ],
        },
      ],
    },
{
      id: 'qa-geometry',
      name: 'Geometry & Mensuration',
      subtopics: [
        {
          id: 'qa-ge-triangles',
          name: 'Triangles & Similarity',
          tricks: [
            { t: 'Similarity scales areas²', d: 'If sides scale by k, area scales by k². Shadow & height questions are similarity questions.' },
            { t: 'Pythagorean triple bank', d: '(3,4,5), (5,12,13), (7,24,25), (8,15,17) and their multiples. Spot them, skip the algebra.' },
            { t: '30-60-90 memory', d: 'Sides are 1 : √3 : 2; 45-45-90 are 1 : 1 : √2. Learn once, use forever.' },
          ],
        },
        {
          id: 'qa-ge-circles',
          name: 'Circles',
          tricks: [
            { t: 'Tangent ⊥ radius', d: 'A tangent meets the radius at 90°. Most circle proofs start from this single right angle.' },
            { t: 'Equal chords', d: 'Equal chords are equidistant from the centre (and the converse). Chord questions collapse into this.' },
          ],
        },
        {
          id: 'qa-ge-polygons',
          name: 'Polygons & Quadrilaterals',
          tricks: [
            { t: 'Interior angle formula', d: 'Sum = (n − 2) × 180°; regular polygon’s angle = 180° − 360°/n. Memorise for n ≤ 12.' },
            { t: 'Diagonals define shape', d: 'Parallelogram bisecting diagonals; rhombus + right angle; square = equal + right. Classify via diagonal tests.' },
          ],
        },
        {
          id: 'qa-ge-coord',
          name: 'Coordinate Geometry',
          tricks: [
            { t: 'Sketch first', d: 'Rough-plot the points before formulae — quadrants and orientation eliminate wrong options instantly.' },
            { t: 'Collinearity test', d: 'Area of triangle = 0 ⇔ collinear; slope AB = slope BC. Two tests, pick the faster.' },
          ],
        },
        {
          id: 'qa-ge-mensuration',
          name: 'Mensuration (2D & 3D)',
          tricks: [
            { t: 'Conservation', d: 'Melting/recasting solids = volume conserved. Painting/cutting cubes: count by position (corners 3 faces, edges 2, faces 1, inside 0).' },
            { t: 'Scaling', d: 'Scale sides by k → perimeter by k, area by k², volume by k³. Filling/overflow questions are scaling questions.' },
          ],
        },
        {
          id: 'qa-ge-trig',
          name: 'Trigonometry Basics',
          tricks: [
            { t: 'Two identities', d: 'sin²θ + cos²θ = 1 and 1 + tan²θ = sec²θ solve the majority of CAT trig.' },
            { t: 'Standard angle table', d: 'Memorise 0°/30°/45°/60°/90° as one 2×6 row. Height–distance = table lookup.' },
          ],
        },
      ],
    },
    {
      id: 'qa-numbers',
      name: 'Number System',
      subtopics: [
        {
          id: 'qa-ns-remainders',
          name: 'Divisibility & Remainders',
          tricks: [
            { t: 'Chase the cycle', d: 'For aⁿ mod m, list remainders of small powers — they cycle. Find cycle length, then reduce the exponent.' },
            { t: 'Euler shortcut', d: 'When gcd(a, m) = 1: a^φ(m) ≡ 1 (mod m). Big exponents collapse to tiny ones.' },
          ],
        },
        {
          id: 'qa-ns-lcmhcf',
          name: 'LCM & HCF',
          tricks: [
            { t: 'Product relation', d: 'LCM × HCF = product of the two numbers. The fastest route in the chapter.' },
            { t: 'Scenario decode', d: 'Rings/bells meet again → LCM; tile/pack perfect-fit → HCF. Identify the word, pick the tool.' },
          ],
        },
        {
          id: 'qa-ns-factorials',
          name: 'Factorials & Trailing Zeros',
          tricks: [
            { t: 'Count the fives', d: 'Trailing zeros of n! = ⌊n/5⌋ + ⌊n/25⌋ + ⌊n/125⌋ + …' },
            { t: 'Any prime p', d: 'Highest power of p in n! uses the same division ladder over p.' },
          ],
        },
        {
          id: 'qa-ns-base',
          name: 'Base System',
          tricks: [
            { t: 'Convert via division', d: 'Decimal → base b: keep dividing, read remainders bottom-up. Base b → decimal: multiply-add digits.' },
            { t: 'Power-bases shortcut', d: 'Direct jumps only when bases are powers (2↔4↔8↔16). Otherwise two-step through decimal.' },
          ],
        },
      ],
    },
    {
      id: 'qa-modern',
      name: 'Modern Math',
      subtopics: [
        {
          id: 'qa-mm-pc',
          name: 'Permutations & Combinations',
          tricks: [
            { t: 'The verb decides', d: '“Select/choose” → C; “arrange/order” → P. Read the action, not the numbers.' },
            { t: 'At least one', d: '“At least one” = total selections − none. The complement is nearly always faster.' },
            { t: 'Circles & garlands', d: 'Circular arrangements = (n−1)!; garlands/necklaces divide by 2 (flip symmetry).' },
          ],
        },
        {
          id: 'qa-mm-prob',
          name: 'Probability',
          tricks: [
            { t: 'P = favourable/total', d: 'Count with C(n,r) for “select k items” events. Dice sums: count ordered pairs, not sums.' },
            { t: 'Complement reflex', d: 'P(at least one) = 1 − P(none). Whenever “at least” appears, flip it.' },
          ],
        },
        {
          id: 'qa-mm-sets',
          name: 'Set Theory & Counting',
          tricks: [
            { t: 'Inclusion–exclusion', d: '|A∪B| = |A| + |B| − |A∩B|; for 3 sets, add back the triple overlap.' },
            { t: 'Fill from centre', d: 'Venn counting questions: fill the innermost region first, then work outward.' },
          ],
        },
        {
          id: 'qa-mm-series',
          name: 'Series & Special Sums',
          tricks: [
            { t: 'Three sum formulas', d: 'Σn = n(n+1)/2; Σn² = n(n+1)(2n+1)/6; Σn³ = [n(n+1)/2]². The whole sub-topic.' },
            { t: 'Difference-of-differences', d: 'Unusual series: subtract consecutive terms TWICE — a constant second difference reveals the degree.' },
          ],
        },
      ],
    },
  ],
}