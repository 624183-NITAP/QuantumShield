import { useParams } from 'react-router-dom'
import { LessonLayout } from '../components/LessonLayout'
import { getLessonBySlug } from '../data/lessons'

export function LessonPage() {
  const { lessonSlug } = useParams()
  const lesson = getLessonBySlug(lessonSlug ?? 'introduction-to-quantum-computing')

  return <LessonLayout lesson={lesson} />
}
