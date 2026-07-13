import { Link } from 'react-router-dom'
import { lessons } from '../data/lessons'

export function LearnPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur">
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">Learn the foundations of quantum error correction</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
          Explore a structured path through quantum computing basics and the core ideas behind protecting fragile quantum information.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {lessons.map((lesson, index) => (
          <Link
            key={lesson.slug}
            to={`/learn/${lesson.slug}`}
            className="rounded-[24px] border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-cyan-950/20 transition duration-200 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-800/80"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Lesson {index + 1}</span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">{lesson.title}</span>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-white">{lesson.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{lesson.explanation}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
