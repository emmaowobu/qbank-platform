'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'

function DashboardPage() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
      } else {
        setChecking(false)
      }
    }
    checkUser()
  }, [router])

  if (checking) return <p>Loading...</p>
  return <p>✅ You are logged in. Welcome to your dashboard.</p>
}

export default DashboardPage
