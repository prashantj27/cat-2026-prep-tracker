// VARC — Verbal Ability & Reading Comprehension
export const VARC = {
  id: 'VARC',
  name: 'VARC',
  full: 'Verbal Ability & Reading Comprehension',
  icon: '📖',
  color: 'var(--varc)',
  soft: 'var(--varc-soft)',
  weight: '~24 Qs · 40 min',
  topics: [
    {
      id: 'varc-rc',
      name: 'Reading Comprehension',
      subtopics: [
        {
          id: 'varc-rc-active',
          name: 'Active Passage Reading & Mapping',
          tricks: [
            { t: 'Map every paragraph', d: 'After reading, write 2–4 words per paragraph. 60% of RC questions are answered directly from this map — you never re-read the whole passage.' },
            { t: 'Steady pace, single pass', d: 'Read the passage once at ~80% of comfortable speed. Second passes happen for answers, not for reading.' },
          ],
        },
        {
          id: 'varc-rc-main',
          name: 'Main Idea & Central Argument',
          tricks: [
            { t: 'State it in 5 words', d: 'Before seeing options, force yourself to state the main idea in ≤5 words. Any option your summary does not cover is out.' },
            { t: 'Scope trap', d: 'Correct answer = whole passage. Too narrow (one paragraph) or too broad (topic beyond passage) = wrong.' },
          ],
        },
        {
          id: 'varc-rc-inference',
          name: 'Inference Questions',
          tricks: [
            { t: '“Must-be-true” test', d: 'An inference must logically follow from the passage alone. If you need ANY outside knowledge, eliminate it.' },
            { t: 'Extreme-word filter', d: 'Always / never / only / must are almost always wrong — unless the passage itself is that extreme.' },
          ],
        },
        {
          id: 'varc-rc-tone',
          name: "Author's Tone & Attitude",
          tricks: [
            { t: 'Tone keyword bank', d: 'Hedges (perhaps, arguably) → measured; unmistakably / indeed → emphatic; flawed / unfortunately → critical. Collect these while practising.' },
            { t: 'Academic = moderate', d: 'CAT passages are academic; when torn between an extreme and a balanced option, pick the balanced one.' },
          ],
        },
        {
          id: 'varc-rc-structure',
          name: "Author's Purpose & Structure",
          tricks: [
            { t: 'The 4 presets', d: 'Most passages: problem→solution, claim→counterclaim→verdict, phenomenon→explanations, or old-view→new-view. Spot the preset and purpose questions answer themselves.' },
            { t: 'Why this paragraph?', d: "Purpose questions are answered by a paragraph's position & job, not its details." },
          ],
        },
        {
          id: 'varc-rc-detail',
          name: 'Detail & Vocabulary-in-Context',
          tricks: [
            { t: 'Keyword scan', d: 'For detail questions, take the option keyword to your paragraph map, then verify with 1–2 sentences. Skip the full re-read.' },
            { t: 'Cover & predict', d: 'For vocab-in-context, cover the word, predict a synonym from the sentence, then match. Dictionary meaning is a trap.' },
          ],
        },
      ],
    },
{
      id: 'varc-va',
      name: 'Verbal Ability',
      subtopics: [
        {
          id: 'varc-va-jumbles',
          name: 'Para Jumbles (TITA)',
          tricks: [
            { t: 'Noun → pronoun chain', d: 'A sentence using this / he / such refers to a noun fully introduced earlier. Lock such pairs before ordering the rest.' },
            { t: 'Opener elimination', d: "Good openers introduce something new. Sentences starting with this, hence, therefore or so can't open." },
            { t: 'Time & cause order', d: 'Arrange by chronology (since 1990s → after the war) or cause→effect to break ties.' },
          ],
        },
        {
          id: 'varc-va-summary',
          name: 'Para Summary',
          tricks: [
            { t: 'Complete-scope rule', d: 'A summary must cover EVERY sentence’s idea. If any idea is missing, the option is wrong — no matter how well written.' },
            { t: 'Details & distortions', d: 'Options with specific numbers/examples are usually traps. Correct summaries stay abstract and complete.' },
          ],
        },
        {
          id: 'varc-va-odd',
          name: 'Odd One Out / Sentence Elimination',
          tricks: [
            { t: 'Topic ≠ theme', d: 'All correct sentences share ONE specific thread. A sentence on the same topic but a different aspect is the odd one out.' },
            { t: 'Pair first', d: 'Find two sentences that clearly connect; then test the others against that link, not against the topic.' },
          ],
        },
        {
          id: 'varc-va-vocab',
          name: 'Vocabulary in Context',
          tricks: [
            { t: 'Roots & affixes', d: 'Learn ~30 high-value roots (bene, mal, cred, chron, dict). Unknown words in mocks crack open through roots.' },
            { t: 'Theme clusters', d: 'Learn words in families (frugal, thrifty, parsimonious) with usage. Isolated word-lists fade within a week.' },
          ],
        },
        {
          id: 'varc-va-fillers',
          name: 'Sentence Completion & Fillers',
          tricks: [
            { t: 'Signal-word map', d: 'but / however / although → contrast; also / and / moreover → continuation; since / because → cause. Match the blank’s tone to the signal.' },
            { t: 'Predict then match', d: 'Predict your own word before reading options; this protects you from attractive near-misses.' },
          ],
        },
      ],
    },
{
      id: 'varc-vl',
      name: 'Verbal Logic & Grammar',
      subtopics: [
        {
          id: 'varc-vl-cr',
          name: 'Critical Reasoning',
          tricks: [
            { t: 'Find the conclusion first', d: "For strengthen/weaken questions, locate the conclusion, then the premises. Options that touch only premises are traps." },
            { t: 'Attack the link', d: 'Weaken = attack the premise→conclusion link. Strengthen = seal the gap. Never attack the premise itself.' },
          ],
        },
        {
          id: 'varc-vl-sva',
          name: 'Subject–Verb Agreement',
          tricks: [
            { t: 'Strip to the core', d: 'The verb agrees with the main subject, not the nearest noun: “The list of rules IS long.” Park phrases in commas/brackets.' },
            { t: 'Always-singular crew', d: 'each, every, either, neither, none, anyone take singular verbs. A 3-second check; tested every year.' },
          ],
        },
        {
          id: 'varc-vl-tense',
          name: 'Tenses & Conditionals',
          tricks: [
            { t: 'Anchor tense', d: 'Pick the passage’s anchor tense and only shift on a time marker (yesterday, since, by then).' },
            { t: 'Conditional skeleton', d: 'If + past → would + base verb; If + past perfect → would have + V3. Learn the two skeletons and apply instantly.' },
          ],
        },
        {
          id: 'varc-vl-idioms',
          name: 'Idioms & Usage',
          tricks: [
            { t: 'Theme clusters', d: 'Group idioms by theme (business, emotion, negotiation) — themes stick far better than A–Z lists.' },
            { t: 'Usage is memory', d: 'Write 3 idioms into your mock-analysis notes each week. Using them cements them; reading them does not.' },
          ],
        },
      ],
    },
  ],
}