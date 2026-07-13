import { lessons } from '../data'

const completedLessons = lessons.slice(0, 4).length
const quizScore = 88
const completion = Math.round((completedLessons / lessons.length) * 100)

const achievements = ['First lesson completed', 'Simulator explorer', 'QEC quiz starter']

export function ProgressPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur">
        <h1 className="text-3xl font-semibold">Your progress</h1>
        <p className="mt-2 text-slate-300">A clear overview of your learning journey through the fundamentals of quantum error correction.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <article className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur">
          <p className="text-sm text-slate-300">Lessons completed</p>
          <p className="mt-3 text-3xl font-semibold text-cyan-300">{completedLessons}/{lessons.length}</p>
        </article>
        <article className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur">
          <p className="text-sm text-slate-300">Quiz score</p>
          <p className="mt-3 text-3xl font-semibold text-cyan-300">{quizScore}%</p>
        </article>
        <article className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur">
          <p className="text-sm text-slate-300">Completion</p>
          <p className="mt-3 text-3xl font-semibold text-cyan-300">{completion}%</p>
        </article>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <article className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold">Achievements</h2>
          <ul className="mt-4 space-y-3">
            {achievements.map((achievement) => (
              <li key={achievement} className="rounded-2xl border border-white/10 bg-slate-950/70 p-3 text-sm text-slate-200">
                {achievement}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold">Current Momentum</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            You have built a strong base in the core ideas of quantum computation. Continue through the remaining lessons to gain deeper confidence in error correction strategies.
          </p>
        </article>
      </div>
    </div>
  )
}
