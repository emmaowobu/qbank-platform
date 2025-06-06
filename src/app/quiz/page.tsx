'use client'

import { useEffect, useState } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
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
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [error, setError] = useState('')
  const session = useSession()

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
    if (!session) {
      return
    }

    console.log('Session:', session)

    async function loadQuestions() {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('questions')
        .select('*')
        .limit(5)

      if (fetchError) {
        console.error('Error fetching questions', fetchError.message)
        setError(fetchError.message)
      } else if (data) {
        setQuestions(data as Question[])
        setError('')
      }
      setLoading(false)
    }

    loadQuestions()
  }, [session])

  const handleSelect = (id: string, option: string) => {
    if (!isSubmitted) {
      setAnswers(prev => ({ ...prev, [id]: option }))
    }
  }

  const handleSubmit = () => {
    const correct = questions.reduce((acc, q) => {
      return answers[q.id] === q.correct_option ? acc + 1 : acc
    }, 0)
    setScore(correct)
    setIsSubmitted(true)
  }

  return (
    !session ? (
      <p>You must be logged in to take a quiz.</p>
    ) : (
      <main className="p-4 space-y-4">
        <h1 className="text-lg font-semibold">Quiz</h1>
        {error && <p className="text-red-600">{error}</p>}
        {loading && <p>Loading questions...</p>}
        {!loading && questions.length === 0 && (
          <p>No questions available.</p>
        )}
        {questions.map(q => (
          <QuestionCard
            key={q.id}
            question={q}
            selected={answers[q.id]}
            onSelect={(opt) => handleSelect(q.id, opt)}
            showFeedback={isSubmitted}
            disabled={isSubmitted}
            isSubmitted={isSubmitted}
          />
        ))}
        {questions.length > 0 && !isSubmitted && (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Submit Quiz
          </button>
        )}
        {isSubmitted && (
          <div className="p-4 border rounded mt-6 space-y-2">
            <p>
              {score / questions.length >= 0.8 ? 'Great job!' : 'Keep practicing!'}
            </p>
            <div className="w-full bg-gray-300 h-4 rounded">
              <div
                className={`h-4 rounded transition-all ${score / questions.length >= 0.8 ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: `${(score / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm mt-2">
              Score: {score}/{questions.length} ({Math.round((score / questions.length) * 100)}%)
            </p>
          </div>
        )}
      </main>
    )
  )
}
