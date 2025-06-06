'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '../../components/Sidebar'
import TopNav from '../../components/TopNav'
import Card from '../../components/Card'

export default function DashboardPage() {
  const [streak, setStreak] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const lastDate = typeof window !== 'undefined' ? localStorage.getItem('lastQuizDate') : null
    const count = typeof window !== 'undefined' ? parseInt(localStorage.getItem('streakCount') || '0', 10) : 0
    if (lastDate) {
      const last = new Date(lastDate)
      const now = new Date()
      if (now.getTime() - last.getTime() > 24 * 60 * 60 * 1000) {
        localStorage.setItem('streakCount', '0')
        setStreak(0)
      } else {
        setStreak(count)
      }
    } else {
      setStreak(count)
    }
  }, [])

  const startNewQuiz = () => {
    router.push('/quiz')
  }

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <TopNav />
        <main className="flex-1 p-4 space-y-4">
          <p>✅ You are logged in. Welcome to your dashboard.</p>
          <p>🔥 Streak: {streak} days</p>
          <Card>
            <h2 className="font-semibold mb-2">Recent Performance</h2>
            <p>Last Quiz Score: --</p>
            <p>Date: --</p>
          </Card>
          <button
            onClick={startNewQuiz}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Start New Quiz
          </button>
        </main>
      </div>
    </div>
  )
}
