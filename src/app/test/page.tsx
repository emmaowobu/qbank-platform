'use client'

import { useEffect } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function TestPage() {
  useEffect(() => {
    async function fetchTest() {
      try {
        const { data, error } = await supabase
          .from('nonexistent_table')
          .select('*');

        if (error) {
          console.error(error);
        } else {
          console.log(data);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchTest();
  }, []);

  return <div>✅ Supabase connection test page</div>;
}
