import { Link, useNavigate } from 'react-router-dom'
import type { LessonContent } from '../data/lessons'
import { getNextLessonSlug } from '../data/lessons'

interface LessonLayoutProps {
  lesson: LessonContent
}

export function LessonLayout({ lesson }: LessonLayoutProps) {
  const navigate = useNavigate()
  const nextSlug = getNextLessonSlug(lesson.slug)

  return (
    <div className="space-y-8">
      <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Learn Module</p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{lesson.title}</h1>
          </div>
          <Link to="/learn" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">
            Back to lessons
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[22px] border border-white/10 bg-slate-950/70 p-6">
            <h2 className="text-xl font-semibold text-white">Learning objectives</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              {lesson.objectives.map((objective) => (
                <li key={objective} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-400" />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-slate-950/70 p-6">
            <h2 className="text-xl font-semibold text-white">Explanation</h2>
            <p className="mt-4 text-sm leading-8 text-slate-300">{lesson.explanation}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">Mathematical intuition</h2>
          <p className="mt-4 text-sm leading-8 text-slate-300">{lesson.math}</p>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">Real-world analogy</h2>
          <p className="mt-4 text-sm leading-8 text-slate-300">{lesson.analogy}</p>
        </div>
      </div>

      <div className="rounded-[24px] border border-dashed border-cyan-400/30 bg-cyan-500/10 p-8 text-center backdrop-blur">
        <h2 className="text-xl font-semibold text-white">Circuit visualization placeholder</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          A visual circuit diagram for {lesson.title} will appear here as the simulator experience expands.
        </p>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
        <h2 className="text-xl font-semibold text-white">Key points summary</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {lesson.summary.map((point) => (
            <li key={point} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => navigate(`/learn/${nextSlug}`)}
          className="rounded-full bg-cyan-500 px-6 py-3 font-medium text-slate-950 transition hover:bg-cyan-400"
        >
          Next Lesson
        </button>
      </div>
    </div>
  )
}
