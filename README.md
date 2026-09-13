# CAT 2026 Prep Tracker

A simple, fast, mobile-friendly personal platform to plan and track your CAT 2026 preparation — fully private, all data stays in your browser (localStorage).

## 🚀 Run it

```bash
npm install     # first time only
npm run dev     # opens http://localhost:5173
```

Build for production:

```bash
npm run build   # outputs to ./dist
npm run preview # serve the production build
```

## ✨ What's inside

| Tab | Purpose |
|---|---|
| **Dashboard** | Countdown to exam, today's tasks, quick study-time log, streak 🔥, weekly progress ring, syllabus readiness, latest mock snapshot, trick of the day |
| **Syllabus** | VARC / DILR / QA → topics → **54 subtopics**, each with status (Not started → Mastered), confidence 1–5, personal notes and **100+ real exam tricks**. Search & filter included |
| **Mocks** | Log every mock (series, date, sectional scores, percentile, takeaways). Trend charts for total / sections / percentile, best & average stats |
| **Planner** | Week planner (per-section targets), day planner with carry-over, preparation timeline (Foundation → Practice → Mocks → Final Revision) and a 12-week study heatmap |
| **Settings** | Exam date, prep start date, daily goal, JSON export / import backup, reset |

## 🗄 Data & privacy

- Everything is saved under the `cat-tracker-v1` key in `localStorage` — no account, no server.
- Export a backup from **Settings → Export backup** and import it on any other browser/device.

## 🛠 Tech

- React 18 + Vite 5, plain hand-written CSS (no UI framework), Recharts for trends.