export interface Lesson {
  id: string
  title: string
  description: string
  summary: string
  keyTakeaway: string
  analogy: string
  math: string
  nextLesson: string
}

export interface QuizQuestion {
  id: number
  category: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface QuizResult {
  totalScore: number
  totalQuestions: number
  percentage: number
  correctAnswers: number
  incorrectAnswers: number
  timeTaken: string
  performanceLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Quantum Expert'
}

export interface SimulationResponse {
  counts: Record<string, number>
  fidelity: number
  error_rate: number
  summary: string
  steps: string[]
  circuit_image?: string | null
}
