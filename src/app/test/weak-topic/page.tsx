'use client'

import { useState } from 'react'

export default function WeakTopicQuizTestPage() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<unknown>(null)
  const [error, setError] = useState('')

  const generateQuiz = async () => {
    setLoading(true)
    setError('')
    setData(null)
    try {
      const res = await fetch('/api/quiz/weak-topics', { method: 'POST' })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error || 'Error generating quiz')
      } else {
        setData(json)
      }
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="p-4">
      <h1 className="font-bold mb-4">Weak Topic Quiz Test</h1>
      <button
        onClick={generateQuiz}
        disabled={loading}
        className="px-4 py-2 rounded bg-blue-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Generate Weak Topic Quiz
      </button>
      {loading && <p className="mt-2 text-sm">Loading...</p>}
      {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
      {data && (
        <pre className="mt-4 p-2 text-sm bg-gray-100 rounded overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  )
}
