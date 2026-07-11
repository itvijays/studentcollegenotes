# Study Portal

A clean, mobile-first Study Hub for a college lecturer's courses — two theory subjects and one practical lab. Students see a home page with course cards, then dive into each course to browse lessons/notes in an accordion or work through a question bank with toggleable answers.

## Tech Stack

- TanStack Start (React 19 + TanStack Router)
- Tailwind CSS 4
- lucide-react icons
- TypeScript
- Deployed on Netlify

## Content

All course content — subjects, lessons, bullet concepts, notes links, and question bank entries — lives in `src/data/courses.ts`. Edit that file to add new lessons, questions, or courses; no other code changes are required.

## Running locally

```bash
npm install
npm run dev
```

The dev server starts on port 3000 by default.

## Building

```bash
npm run build
```
