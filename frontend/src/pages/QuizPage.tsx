import { useEffect, useMemo, useState } from 'react'
import { quizQuestions } from '../data/quizQuestions'
import type { QuizQuestion, QuizResult } from '../types'

const QUIZ_STORAGE_KEY = 'quantumshield-quiz-progress'

const getPerformanceLevel = (percentage: number): QuizResult['performanceLevel'] => {
  if (percentage >= 90) return 'Quantum Expert'
  if (percentage >= 70) return 'Advanced'
  if (percentage >= 40) return 'Intermediate'
  return 'Beginner'
}

const getPerformanceMessage = (percentage: number) => {
  if (percentage >= 90) return 'Excellent!'
  if (percentage >= 75) return 'Great Job!'
  if (percentage >= 50) return 'Good effort!'
  return 'Review the Learn section and try again.'
}

const formatTime = (milliseconds: number) => {
  const totalSeconds = Math.max(1, Math.floor(milliseconds / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}m ${seconds}s`
}

export function QuizPage() {
  const totalQuestions = quizQuestions.length
  const [answers, setAnswers] = useState<Array<number | null>>(Array.from({ length: totalQuestions }, () => null))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [reviewMode, setReviewMode] = useState(false)
  const [result, setResult] = useState<QuizResult | null>(null)
  const [startedAt, setStartedAt] = useState<number>(Date.now())
  const [completedAt, setCompletedAt] = useState<number | null>(null)
  const [statusMessage, setStatusMessage] = useState('')
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    const savedProgress = window.localStorage.getItem(QUIZ_STORAGE_KEY)

    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress) as {
          answers: Array<number | null>
          currentIndex: number
          submitted: boolean
          startedAt: number
          completedAt: number | null
          result: QuizResult | null
        }

        setAnswers(parsed.answers)
        setCurrentIndex(parsed.currentIndex)
        setSubmitted(parsed.submitted)
        setStartedAt(parsed.startedAt ?? Date.now())
        setCompletedAt(parsed.completedAt)
        setResult(parsed.result)
      } catch {
        window.localStorage.removeItem(QUIZ_STORAGE_KEY)
      }
    }

    setHasHydrated(true)
  }, [])

  useEffect(() => {
    if (!hasHydrated) return

    const progress = {
      answers,
      currentIndex,
      submitted,
      startedAt,
      completedAt,
      result,
    }

    window.localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(progress))
  }, [answers, currentIndex, submitted, startedAt, completedAt, result, hasHydrated])

  const currentQuestion = quizQuestions[currentIndex]
  const currentAnswer = answers[currentIndex]
  const isLastQuestion = currentIndex === totalQuestions - 1
  const answeredCount = answers.filter((answer) => answer !== null).length
  const allAnswered = answers.every((answer) => answer !== null)
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100)

  const reviewQuestions = useMemo(() => {
    return quizQuestions.map((question: QuizQuestion, index: number) => ({
      ...question,
      selectedAnswer: answers[index],
    }))
  }, [answers])

  const handleOptionSelect = (optionIndex: number) => {
    if (submitted) return

    setAnswers((previousAnswers) => {
      const nextAnswers = [...previousAnswers]
      nextAnswers[currentIndex] = optionIndex
      return nextAnswers
    })
    setStatusMessage('')
  }

  const handleNext = () => {
    if (currentAnswer === null) return

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((previousIndex) => previousIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((previousIndex) => previousIndex - 1)
    }
  }

  const handleSubmit = () => {
    if (!allAnswered) {
      setStatusMessage('Please answer every question before submitting the quiz.')
      return
    }

    const correctAnswers = answers.reduce<number>((count, answer, index) => {
      if (answer === quizQuestions[index].correctAnswer) {
        return count + 1
      }

      return count
    }, 0)

    const incorrectAnswers = totalQuestions - correctAnswers
    const percentage = Math.round((correctAnswers / totalQuestions) * 100)
    const endTime = Date.now()
    const elapsedTime = formatTime(endTime - startedAt)

    setResult({
      totalScore: correctAnswers,
      totalQuestions,
      percentage,
      correctAnswers,
      incorrectAnswers,
      timeTaken: elapsedTime,
      performanceLevel: getPerformanceLevel(percentage),
    })
    setCompletedAt(endTime)
    setSubmitted(true)
    setReviewMode(true)
    setStatusMessage('')
  }

  const handleRestart = () => {
    setAnswers(Array.from({ length: totalQuestions }, () => null))
    setCurrentIndex(0)
    setSubmitted(false)
    setReviewMode(false)
    setResult(null)
    setStartedAt(Date.now())
    setCompletedAt(null)
    setStatusMessage('')
    window.localStorage.removeItem(QUIZ_STORAGE_KEY)
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[24px] border border-white/10 bg-white/10 p-7 backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">Educational Assessment</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">QuantumShield Quiz</h1>
            <p className="mt-2 text-slate-300">Complete the full assessment, review explanations, and continue later from saved progress.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-200">
            Question <span className="font-semibold text-cyan-200">{currentIndex + 1}</span> of <span className="font-semibold text-white">{totalQuestions}</span>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
            <span>Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-900">
            <div className="h-full rounded-full bg-cyan-400 transition-all" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur">
          <div className="rounded-[20px] border border-white/10 bg-slate-950/70 p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
                {currentQuestion.category}
              </span>
              <span className="text-sm text-slate-400">{submitted ? 'Submitted' : 'In progress'}</span>
            </div>

            <h2 className="text-2xl font-semibold text-white">{currentQuestion.question}</h2>

            <div className="mt-5 space-y-3">
              {currentQuestion.options.map((option, optionIndex) => {
                const isSelected = currentAnswer === optionIndex
                const isCorrect = optionIndex === currentQuestion.correctAnswer
                const showCorrectState = submitted && isCorrect
                const showIncorrectState = submitted && isSelected && !isCorrect

                return (
                  <button
                    key={option}
                    type="button"
                    disabled={submitted}
                    onClick={() => handleOptionSelect(optionIndex)}
                    className={`block w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                      showCorrectState
                        ? 'border-emerald-400 bg-emerald-500/15 text-emerald-100'
                        : showIncorrectState
                          ? 'border-rose-400 bg-rose-500/15 text-rose-100'
                          : isSelected
                            ? 'border-cyan-400 bg-cyan-500/15 text-cyan-100'
                            : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
                    }`}
                  >
                    {option}
                  </button>
                )
              })}
            </div>

            {statusMessage && <p className="mt-4 text-sm text-amber-200">{statusMessage}</p>}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentIndex === 0 || submitted}
                className="rounded-full border border-white/10 bg-slate-900/70 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentAnswer === null || isLastQuestion || submitted}
                className="rounded-full border border-white/10 bg-slate-900/70 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>

              {isLastQuestion && !submitted && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className="rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Submit Quiz
                </button>
              )}

              <button
                type="button"
                onClick={handleRestart}
                className="rounded-full border border-white/10 bg-slate-900/70 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </div>

        <aside className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">Results & Review</h2>

          {result ? (
            <div className="mt-4 space-y-3 rounded-[20px] border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-200">
              <div className="flex items-center justify-between">
                <span>Score</span>
                <span className="font-semibold text-cyan-100">You scored {result.totalScore}/{result.totalQuestions} ({result.percentage}%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Correct Answers</span>
                <span className="font-semibold text-emerald-300">{result.correctAnswers}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Incorrect Answers</span>
                <span className="font-semibold text-rose-300">{result.incorrectAnswers}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Time Taken</span>
                <span className="font-semibold text-cyan-100">{result.timeTaken}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Performance Level</span>
                <span className="font-semibold text-white">{result.performanceLevel}</span>
              </div>
              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-3 text-cyan-100">
                {getPerformanceMessage(result.percentage)}
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-300">Your score summary will appear after you complete the quiz.</p>
          )}

          {submitted && (
            <button
              type="button"
              onClick={() => setReviewMode((previous) => !previous)}
              className="mt-4 w-full rounded-full bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              {reviewMode ? 'Hide Review Mode' : 'Review Every Question'}
            </button>
          )}
        </aside>
      </section>

      {submitted && reviewMode && (
        <section className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur">
          <h2 className="text-2xl font-semibold text-white">Review Mode</h2>
          <div className="mt-4 space-y-4">
            {reviewQuestions.map((question, index) => {
              const selectedAnswer = question.selectedAnswer
              const isCorrectSelection = selectedAnswer === question.correctAnswer

              return (
                <article key={question.id} className="rounded-[20px] border border-white/10 bg-slate-950/70 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-cyan-100">Question {index + 1}</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-400">{question.category}</span>
                  </div>

                  <p className="text-lg font-medium text-white">{question.question}</p>

                  <div className="mt-3 space-y-2">
                    {question.options.map((option, optionIndex) => {
                      const optionIsCorrect = optionIndex === question.correctAnswer
                      const optionIsSelected = optionIndex === selectedAnswer

                      let className = 'rounded-2xl border px-3 py-2 text-sm text-slate-200'

                      if (optionIsCorrect) {
                        className += ' border-emerald-400 bg-emerald-500/15 text-emerald-100'
                      } else if (optionIsSelected && !optionIsCorrect) {
                        className += ' border-rose-400 bg-rose-500/15 text-rose-100'
                      } else {
                        className += ' border-white/10 bg-white/5'
                      }

                      return (
                        <div key={option} className={className}>
                          {option}
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-3 rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-3 text-sm text-slate-100">
                    <span className="font-semibold text-cyan-100">Explanation:</span> {question.explanation}
                  </div>

                  <div className="mt-3 text-sm text-slate-300">
                    {isCorrectSelection ? 'Correct answer selected.' : 'Incorrect answer selected.'}
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
