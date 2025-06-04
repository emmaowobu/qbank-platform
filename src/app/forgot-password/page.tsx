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
    <main style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h1>🔑 Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email:</label><br />
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='you@example.com'
            style={{ width: '100%', padding: '0.5rem' }}
            disabled={loading}
          />
        </div>
        <button
          type='submit'
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: loading ? '#ccc' : '#0070f3',
            color: '#fff',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Sending...' : 'Send reset link'}
        </button>
      </form>
      {message && (
        <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{message}</p>
      )}
    </main>
  )
}
