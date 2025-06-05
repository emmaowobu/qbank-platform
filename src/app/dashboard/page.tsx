'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'

function DashboardPage() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      setError(error.message)
      return
    }
    router.push('/login')
  }

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError) {
        setError(sessionError.message)
        setChecking(false)
        return
      }

      if (!session) {
        router.push('/login')
      } else {
        setChecking(false)
      }
    }
    checkUser()
  }, [router])

  if (checking) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>❌ {error}</p>
  return (
    <div>
      <p>✅ You are logged in. Welcome to your dashboard.</p>
      <button
        onClick={handleLogout}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#ef4444',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </div>
  )
}

export default DashboardPage
