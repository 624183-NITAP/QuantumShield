import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { lessons, quizBank } from '../data'
import type { QuizResult } from '../types'

export function QuizPage() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const [activeLesson, setActiveLesson] = useState(lessonId ?? lessons[0].id)
  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<QuizResult | null>(null)

  const lessonQuestions = useMemo(() => quizBank[activeLesson as keyof typeof quizBank] ?? quizBank.qubits, [activeLesson])
  const currentQuestion = lessonQuestions[0]

  const handleSubmit = () => {
    if (!selected) return
    const isCorrect = selected === currentQuestion.answer
    const score = isCorrect ? 1 : 0
    const percentage = Math.round((score / lessonQuestions.length) * 100)
    setResult({
      score,
      total: lessonQuestions.length,
      percentage,
      feedback: isCorrect ? 'Excellent work. You understand the concept.' : 'Review the lesson and try again.',
    })
    setSubmitted(true)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
      <aside className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur">
        <h2 className="text-xl font-semibold">Lesson Quizzes</h2>
        <div className="mt-4 space-y-2">
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => {
                setActiveLesson(lesson.id)
                setSelected(null)
                setSubmitted(false)
                setResult(null)
                navigate(`/quiz/${lesson.id}`)
              }}
              className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition ${activeLesson === lesson.id ? 'bg-cyan-500/20 text-cyan-100' : 'bg-slate-900/70 text-slate-300 hover:bg-white/10'}`}
            >
              {lesson.title}
            </button>
          ))}
        </div>
      </aside>

      <section className="rounded-[24px] border border-white/10 bg-white/10 p-8 backdrop-blur">
        <h1 className="text-3xl font-semibold">Quiz</h1>
        <p className="mt-2 text-slate-300">Choose the best answer and receive instant feedback.</p>

        <div className="mt-6 rounded-[24px] border border-white/10 bg-slate-950/70 p-6">
          <h2 className="text-xl font-semibold">{currentQuestion.prompt}</h2>
          <div className="mt-4 space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => setSelected(option)}
                className={`block w-full rounded-2xl border px-4 py-3 text-left transition ${selected === option ? 'border-cyan-400 bg-cyan-500/15 text-cyan-100' : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'}`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button onClick={handleSubmit} className="rounded-full bg-cyan-500 px-5 py-3 font-medium text-slate-950">
              Submit Answer
            </button>
            <span className="text-sm text-slate-400">Score: {result ? `${result.score}/${result.total}` : '0/1'}</span>
          </div>

          {submitted && result && (
            <div className="mt-6 rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-slate-200">
              <p>{result.feedback}</p>
              <p className="mt-2">Progress: {result.percentage}%</p>
              <p className="mt-1">Explanation: {currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
