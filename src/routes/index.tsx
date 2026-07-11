import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, BookOpen, FlaskConical, GraduationCap } from 'lucide-react'
import courses, { academicYear, collegeName } from '@/data/courses'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const colorStyles = {
  blue: {
    icon: 'text-blue-600 bg-blue-50',
    ring: 'group-hover:ring-blue-200',
    tag: 'bg-blue-50 text-blue-700',
  },
  indigo: {
    icon: 'text-indigo-600 bg-indigo-50',
    ring: 'group-hover:ring-indigo-200',
    tag: 'bg-indigo-50 text-indigo-700',
  },
  teal: {
    icon: 'text-teal-600 bg-teal-50',
    ring: 'group-hover:ring-teal-200',
    tag: 'bg-teal-50 text-teal-700',
  },
} as const

function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Academic Year {academicYear}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            {collegeName}
          </h1>
          <p className="mt-2 max-w-xl text-slate-500 text-base sm:text-lg">
            Everything you need for lessons, notes, and exam preparation — organized in one place.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 sm:py-12">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Your Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course) => {
            const styles = colorStyles[course.color]
            const Icon = course.type === 'practical' ? FlaskConical : BookOpen
            return (
              <Link
                key={course.id}
                to="/courses/$courseId"
                params={{ courseId: course.id }}
                className={`group flex flex-col rounded-2xl bg-white border border-slate-200 p-6 shadow-sm ring-1 ring-transparent transition-all hover:shadow-md ${styles.ring} active:scale-[0.99]`}
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${styles.icon}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span
                  className={`mt-4 inline-block w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${styles.tag}`}
                >
                  {course.yearSemester}
                </span>
                <h3 className="mt-3 text-xl font-bold text-slate-900">{course.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 flex-1">
                  {course.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                  View course
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            )
          })}
        </div>
      </main>

      <footer className="mx-auto max-w-6xl px-5 pb-10 pt-4 text-center text-xs text-slate-400">
        Built for quick, mobile-friendly studying — tap any course to get started.
      </footer>
    </div>
  )
}
