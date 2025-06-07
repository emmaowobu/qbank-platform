'use client'

import { useEffect, useState } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import { useSearchParams } from 'next/navigation'
import QuestionCard from '../../components/QuestionCard'
import { supabase } from '../../../lib/supabaseClient'
import { estimateDifficulty, Difficulty } from '../../../utils/estimateDifficulty'

interface Question {
  id: string
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_option: string
  topic: string
  difficulty: Difficulty
  explanation?: string | null
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | Difficulty>('All')
  const session = useSession()
  const searchParams = useSearchParams()

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

    async function loadQuestions() {
      setLoading(true)

      const personalized = searchParams.get('personalized') === 'true'

      let questionQuery = supabase.from('questions').select('*')
      if (difficultyFilter !== 'All') {
        questionQuery = questionQuery.eq('difficulty', difficultyFilter)
      }

      if (personalized) {
        const { data: weakTopics, error: weakErr } = await supabase
          .from('user_topic_stats')
          .select('topic')
          .lt('accuracy', 70)
          .eq('user_id', session.user.id)

        if (weakErr) {
          setError(weakErr.message)
          setLoading(false)
          return
        }

        if (weakTopics && weakTopics.length > 0) {
          const topics = weakTopics.map((w) => w.topic)
          questionQuery = questionQuery.in('topic', topics)
          setNotice('')
        } else {
          setNotice("You don't have any weak topics yet — keep practicing!")
          setQuestions([])
          setLoading(false)
          return
        }
      }

      const { data, error: fetchError } = await questionQuery
        .order('created_at', { ascending: false })
        .limit(10)

      if (fetchError) {
        console.error('Error fetching questions', fetchError.message)
        setError(fetchError.message)
      } else if (data) {
        const processed: Question[] = []
        for (const q of data as Question[]) {
          const estimated = estimateDifficulty(q.question_text)
          processed.push({ ...q, difficulty: estimated })
          if (q.difficulty !== estimated) {
            supabase.from('questions').update({ difficulty: estimated }).eq('id', q.id)
          }
        }
        // randomize and limit to 10
        for (let i = processed.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[processed[i], processed[j]] = [processed[j], processed[i]]
        }
        setQuestions(processed.slice(0, 10))
        setError('')
      }
      setLoading(false)
    }

    loadQuestions()
  }, [session, difficultyFilter, searchParams.toString()])

  const handleSelect = (id: string, option: string) => {
    if (!isSubmitted) {
      setAnswers(prev => ({ ...prev, [id]: option }))
    }
  }

  const handleSubmit = async () => {
    const correct = questions.reduce((acc, q) => {
      const selectedAnswer = answers[q.id]
      return selectedAnswer?.toUpperCase() === q.correct_option?.toUpperCase()
        ? acc + 1
        : acc
    }, 0)
    setScore(correct)

    const stats: Record<string, { attempted: number; correct: number }> = {}
    questions.forEach((q) => {
      const chosen = answers[q.id]
      const isCorrect = chosen?.toUpperCase() === q.correct_option?.toUpperCase()
      if (!stats[q.topic]) {
        stats[q.topic] = { attempted: 0, correct: 0 }
      }
      stats[q.topic].attempted += 1
      if (isCorrect) stats[q.topic].correct += 1
    })

    for (const topic of Object.keys(stats)) {
      const s = stats[topic]
      const accuracy = s.attempted > 0 ? Math.round((s.correct / s.attempted) * 100) : 0
      await supabase
        .from('user_topic_stats')
        .upsert({
          user_id: session!.user.id,
          topic,
          attempted: s.attempted,
          correct: s.correct,
          accuracy,
        })
    }

    setIsSubmitted(true)
  }

  const totalQuestions = questions.length
  const correctAnswers = score
  const scorePercent = Math.round((correctAnswers / totalQuestions) * 100)

  return (
    !session ? (
      <p>You must be logged in to take a quiz.</p>
    ) : (
      <main className="p-4 space-y-4">
        <h1 className="text-lg font-semibold">
          {searchParams.get('personalized') === 'true' ? 'Personalized Quiz' : 'Quiz'}
        </h1>
        <div>
          <label className="mr-2">Difficulty:</label>
          <select
            className="border px-2 py-1 rounded"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as 'All' | Difficulty)}
          >
            <option value="All">All</option>
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        {error && <p className="text-red-600">{error}</p>}
        {notice && <p className="text-gray-700">{notice}</p>}
        {loading && <p>Loading questions...</p>}
        {!loading && questions.length === 0 && !notice && (
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
            <p>{scorePercent >= 80 ? 'Great job!' : 'Keep practicing!'}</p>
            <p className="text-sm mt-2">
              Score: {correctAnswers}/{totalQuestions} correct
            </p>
            <div className="w-full bg-gray-300 h-4 rounded mt-4">
              <div
                className={`${
                  scorePercent >= 80 ? 'bg-green-500' : 'bg-red-500'
                } h-4 rounded transition-all duration-500`}
                style={{ width: `${scorePercent}%` }}
              />
            </div>
            <p className="text-sm mt-2">
              Score: {scorePercent}% ({correctAnswers}/{totalQuestions} correct)
            </p>
          </div>
        )}
      </main>
    )
  )
}
