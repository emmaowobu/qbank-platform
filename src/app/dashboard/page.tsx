'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'

function DashboardPage() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

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
  return <p>✅ You are logged in. Welcome to your dashboard.</p>
}

export default DashboardPage
