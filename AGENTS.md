# AGENTS.md

This document provides an overview of the project structure for developers and AI agents working on this codebase.

## Project Overview

A mobile-first Study Portal for a college lecturer's courses: two theory subjects and one practical lab. Students browse to a course, then switch between "Lessons & Notes" (accordion) and "Question Bank" (toggleable answers). Built with TanStack Start and deployed on Netlify.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Icons | lucide-react |
| Language | TypeScript 5.9 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
├── public/
│   └── favicon.ico
├── src/
│   ├── data/
│   │   └── courses.ts       # All editable content: courses, lessons, question bank
│   ├── routes/
│   │   ├── __root.tsx       # Root layout: fonts, meta tags
│   │   ├── index.tsx        # Home page — grid of course cards
│   │   └── courses/
│   │       └── $courseId.tsx  # Course detail — tabs for Lessons & Notes / Question Bank
│   ├── router.tsx           # Router setup
│   └── styles.css           # Tailwind import + global styles
├── netlify.toml
├── package.json
├── tsconfig.json            # `@/*` path alias maps to `src/*`
└── vite.config.ts
```

## Content Model (`src/data/courses.ts`)

This is the single file a lecturer edits to update the site — no other code changes are needed to add/edit content.

- `academicYear`, `collegeName` — header text on the home page.
- `courses: Course[]` — each course has `id` (used in the URL), `name`, `type` (`theory` | `practical`), `yearSemester`, `description`, a `color` theme, `lessons`, and `categories`.
- `lessons: Lesson[]` — each lesson has a `title`, a `concepts` bullet list, and a `notesUrl` (replace `#` with a real PDF/Drive link).
- `categories: QuestionCategory[]` — grouped questions; each `Question` has `question`, `answer`, and an optional `important` flag that renders an "Important" badge.

## Routing

File-based routing via TanStack Router:
- `/` → `src/routes/index.tsx`
- `/courses/$courseId` → `src/routes/courses/$courseId.tsx`, loads the matching course via `getCourseById` and throws `notFound()` if the id doesn't exist.

## Conventions

- Components are function components with local `useState` — no global state library is used since content is static/mock data.
- Styling is Tailwind utility classes only, using a blue/indigo/teal + slate palette for a clean educational look.
- Icons come from `lucide-react`.
- Import paths use the `@/` alias for anything under `src/`.

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
```
