'use client'

import { useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) {
      setMessage(`❌ ${error.message}`)
    } else {
      setMessage('✅ Check your email for the reset link.')
    }
    setLoading(false)
  }

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1>🔑 Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Email:</label>
          <br />
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='you@example.com'
            className='w-full p-2'
            disabled={loading}
          />
        </div>
        <button
          type='submit'
          disabled={loading}
          className='px-4 py-2 text-white bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed'
        >
          {loading ? 'Sending...' : 'Send reset link'}
        </button>
      </form>
      {message && (
        <p className='mt-4 font-bold'>{message}</p>
      )}
    </main>
  )
}
