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
    <main style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h1>📝 Sign up</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ width: "100%", padding: "0.5rem" }}
            disabled={loading}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{ width: "100%", padding: "0.5rem" }}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: loading ? "#ccc" : "#0070f3",
            color: "#fff",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "1rem", fontWeight: "bold" }}>{message}</p>
      )}
    </main>
  );
}
