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
  prompt: string
  options: string[]
  answer: string
  explanation: string
}

export interface QuizResult {
  score: number
  total: number
  percentage: number
  feedback: string
}

export interface SimulationResponse {
  counts: Record<string, number>
  fidelity: number
  error_rate: number
  summary: string
  steps: string[]
  circuit_image?: string | null
}
