'use client'

import { useEffect, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import { supabase } from '../../../lib/supabaseClient'

interface Question {
  id: string
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_option: string
  explanation?: string | null
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  // load saved answers from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('quizAnswers')
    if (saved) {
      setAnswers(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('quizAnswers', JSON.stringify(answers))
  }, [answers])

  useEffect(() => {
    async function loadQuestions() {
      setLoading(true)
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .limit(10)

      if (error) {
        console.error('Error fetching questions', error.message)
      } else if (data) {
        setQuestions(data as Question[])
      }
      setLoading(false)
    }

    loadQuestions()
  }, [])

  const handleSelect = (id: string, option: string) => {
    setAnswers(prev => ({ ...prev, [id]: option }))
  }

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-lg font-semibold">Quiz</h1>
      {loading && <p>Loading questions...</p>}
      {questions.map(q => (
        <QuestionCard
          key={q.id}
          question={q}
          selected={answers[q.id]}
          onSelect={(opt) => handleSelect(q.id, opt)}
          showFeedback={!!answers[q.id]}
        />
      ))}
    </main>
  )
}
