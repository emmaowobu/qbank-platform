'use client'

import { useEffect, useState } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import { supabase } from '../../../lib/supabaseClient'
import Sidebar from '../../components/Sidebar'
import TopNav from '../../components/TopNav'
import Card from '../../components/Card'

export default function ProfilePage() {
  const session = useSession()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session) {
      setName((session.user.user_metadata as any)?.full_name || '')
    }
  }, [session])

  const handleSave = async () => {
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.updateUser({ data: { full_name: name } })
    if (error) {
      setMessage(`❌ ${error.message}`)
    } else {
      setMessage('✅ Saved changes.')
    }
    setLoading(false)
  }

  if (!session) {
    return <p>Loading...</p>
  }

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <TopNav />
        <main className="flex-1 p-4">
          <Card className="max-w-md">
            <h1 className="text-lg font-semibold mb-4">Profile</h1>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={session.user.email}
                disabled
                className="border px-2 py-1 rounded w-full bg-gray-100 cursor-not-allowed"
              />
            </div>
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            {message && <p className="mt-2">{message}</p>}
          </Card>
        </main>
      </div>
    </div>
  )
}
