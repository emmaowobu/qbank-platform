import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create Supabase client using environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST() {
  try {
    // TEMP: Use a real user_id from your database for testing
    const user_id = 'test-user-id-123';

    // Step 1: Fetch user's performance by tag
    const { data: performanceData, error: perfErr } = await supabase
      .from('user_performance')
      .select('tag, accuracy')
      .eq('user_id', user_id);

    if (perfErr || !performanceData || performanceData.length === 0) {
      return NextResponse.json({ error: 'No performance data' }, { status: 404 });
    }

    // Step 2: Get 2 weakest tags
    const weakTags = performanceData
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 2)
      .map((entry) => entry.tag);

    // Step 3: Fetch questions from weak tags
    const { data: questions, error: questionErr } = await supabase
      .from('questions')
      .select('*')
      .in('tag', weakTags)
      .limit(15);

    if (questionErr || !questions) {
      return NextResponse.json({ error: 'No questions found' }, { status: 404 });
    }

    return NextResponse.json({ questions });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
