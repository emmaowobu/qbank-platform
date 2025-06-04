'use client';

import { useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export default function TestPage() {
  useEffect(() => {
    supabase
      .from('nonexistent_table')
      .select('*')
      .then(console.log)
      .then(undefined, console.error);
  }, []);

  return <div>✅ Supabase connection test page</div>;
}