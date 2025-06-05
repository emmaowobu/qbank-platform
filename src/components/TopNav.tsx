'use client'

import { useRouter } from 'next/navigation'
import { useSession } from '@supabase/auth-helpers-react'
import { supabase } from '../../lib/supabaseClient'

export default function TopNav() {
  const router = useRouter()
  const session = useSession()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <header className="flex items-center justify-between bg-gray-200 px-4 py-2">
      <span className="text-sm sm:text-base">
        Welcome back, {session?.user?.email}
      </span>
      <button
        onClick={handleLogout}
        className="text-red-600 text-sm hover:underline"
      >
        Logout
      </button>
    </header>
  )
}
