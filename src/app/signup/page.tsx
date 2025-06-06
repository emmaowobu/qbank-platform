'use client';

import { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('Creating account...');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Signup error:', error.message);
      setMessage(`❌ ${error.message}`);
    } else {
      console.log('Signup success:', data);
      setMessage('✅ Check your email to confirm your account.');
      setEmail('');
      setPassword('');
    }

    setLoading(false);
  };

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1>📝 Sign up</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full p-2"
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full p-2"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-white bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {message && (
        <p className="mt-4 font-bold">{message}</p>
      )}
    </main>
  );
}
