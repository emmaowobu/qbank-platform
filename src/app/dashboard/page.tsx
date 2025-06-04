'use client';

import { useEffect, useState, useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';

function DashboardPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifySession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setError(error.message);
      } else if (!data.session) {
        router.push('/login');
      }
      setChecking(false);
    };

    verifySession();
  }, [router]);

  if (checking) {
    return <main>Checking session...</main>;
  }

  if (error) {
    return <main>❌ {error}</main>;
  }

  return (
    <main>✅ You are logged in. Welcome to your dashboard.</main>
  );
}

export default DashboardPage;
