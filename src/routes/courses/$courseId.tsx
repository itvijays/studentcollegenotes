import { useState } from 'react'
import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  Code2,
  Download,
  Eye,
  EyeOff,
  FileQuestion,
  FolderOpen,
} from 'lucide-react'
import { DriveFileBrowser } from '@/components/drive-file-browser'
import { getCourseById } from '@/data/courses'

export const Route = createFileRoute('/courses/$courseId')({
  component: CourseDetailPage,
  loader: async ({ params }) => {
    const course = getCourseById(params.courseId)
    if (!course) throw notFound()
    return course
  },
})

type Tab = 'lessons' | 'programs' | 'questions' | 'files'

function CourseDetailPage() {
  const course = Route.useLoaderData()
  const [tab, setTab] = useState<Tab>('lessons')
  const [openLesson, setOpenLesson] = useState<string | null>(course.lessons[0]?.id ?? null)
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})

  const toggleAnswer = (id: string) =>
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="min-h-screen pb-24 sm:pb-10">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-3xl px-5 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
            {course.name}
          </h1>
          <p className="text-sm text-slate-500">{course.yearSemester}</p>

          <div
            className="mt-4 grid grid-cols-4 gap-1 rounded-xl bg-slate-100 p-1"
            role="tablist"
            aria-label={`${course.name} resources`}
          >
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'lessons'}
              onClick={() => setTab('lessons')}
              className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2.5 text-xs font-semibold transition-colors sm:flex-row sm:gap-2 sm:text-sm ${
                tab === 'lessons'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Lessons & Notes</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'programs'}
              onClick={() => setTab('programs')}
              className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2.5 text-xs font-semibold transition-colors sm:flex-row sm:gap-2 sm:text-sm ${
                tab === 'programs'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Code2 className="h-4 w-4" />
              <span>Programs</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'questions'}
              onClick={() => setTab('questions')}
              className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2.5 text-xs font-semibold transition-colors sm:flex-row sm:gap-2 sm:text-sm ${
                tab === 'questions'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <FileQuestion className="h-4 w-4" />
              <span>Questions</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'files'}
              onClick={() => setTab('files')}
              className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2.5 text-xs font-semibold transition-colors sm:flex-row sm:gap-2 sm:text-sm ${
                tab === 'files'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <FolderOpen className="h-4 w-4" />
              <span>Files</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-6">
        {tab === 'lessons' && (
          <div className="flex flex-col gap-3">
            {course.lessons.map((lesson) => {
              const isOpen = openLesson === lesson.id
              return (
                <div
                  key={lesson.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenLesson(isOpen ? null : lesson.id)}
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                  >
                    <span className="font-semibold text-slate-900">{lesson.title}</span>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-slate-100 px-5 py-4">
                      <ul className="flex flex-col gap-2">
                        {lesson.concepts.map((concept) => (
                          <li key={concept} className="flex gap-2 text-sm leading-relaxed text-slate-600">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                            {concept}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={lesson.notesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 sm:w-auto"
                      >
                        <Download className="h-4 w-4" />
                        Download / View Lecture Notes
                      </a>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {tab === 'programs' && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Practice Programs</h2>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                Starter examples for practice. More programs can be added here later.
              </p>
            </div>
            {course.programs.map((program) => (
              <article
                key={program.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="p-5">
                  <h3 className="font-bold text-slate-900">{program.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {program.description}
                  </p>
                </div>
                <div className="border-t border-slate-200 bg-slate-900 p-4">
                  <pre className="overflow-x-auto text-sm leading-relaxed text-slate-100">
                    <code>{program.code}</code>
                  </pre>
                </div>
              </article>
            ))}
          </div>
        )}

        {tab === 'files' && (
          <DriveFileBrowser
            courseId={course.id}
            folderConfigured={!course.driveFolderId.startsWith('REPLACE_WITH_')}
          />
        )}

        {tab === 'questions' && (
          <div className="flex flex-col gap-6">
            {course.categories.map((category) => (
              <div key={category.id}>
                <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-400">
                  {category.title}
                </h2>
                <div className="flex flex-col gap-3">
                  {category.questions.map((question) => {
                    const isRevealed = !!revealed[question.id]
                    return (
                      <div
                        key={question.id}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-medium leading-relaxed text-slate-900">
                            {question.question}
                          </p>
                          {question.important && (
                            <span className="flex-shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                              Important
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          aria-expanded={isRevealed}
                          onClick={() => toggleAnswer(question.id)}
                          className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-200"
                        >
                          {isRevealed ? (
                            <>
                              <EyeOff className="h-3.5 w-3.5" />
                              Hide Answer
                            </>
                          ) : (
                            <>
                              <Eye className="h-3.5 w-3.5" />
                              Show Answer
                            </>
                          )}
                        </button>

                        {isRevealed && (
                          <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-600">
                            {question.answer}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
