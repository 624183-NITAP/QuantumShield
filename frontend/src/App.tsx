import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { LearnPage } from './pages/LearnPage'
import { LessonPage } from './pages/LessonPage'
import { SimulatorPage } from './pages/SimulatorPage'
import { BitFlipSimulatorPage } from './pages/BitFlipSimulatorPage'
import { QuizPage } from './pages/QuizPage'
import { ProgressPage } from './pages/ProgressPage'
import { AboutPage } from './pages/AboutPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/learn/:lessonSlug" element={<LessonPage />} />
          <Route path="/simulator" element={<SimulatorPage />} />
          <Route path="/simulator/bit-flip" element={<BitFlipSimulatorPage />} />
          <Route path="/quiz" element={<Navigate to="/quiz/qubits" replace />} />
          <Route path="/quiz/:lessonId" element={<QuizPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
