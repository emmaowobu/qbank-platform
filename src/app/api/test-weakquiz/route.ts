import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST() {
  try {
    const user_id = 'test-user-id-123';

    const { data: performanceData, error: perfErr } = await supabase
      .from('user_performance')
      .select('tag, accuracy')
      .eq('user_id', user_id);

    if (perfErr || !performanceData || performanceData.length === 0) {
      return NextResponse.json({ error: 'No performance data' }, { status: 404 });
    }

    const weakTags = performanceData
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 2)
      .map((entry) => entry.tag);

    const { data: questions, error: questionErr } = await supabase
      .from('questions')
      .select('*')
      .in('tags', weakTags)
      .limit(15);

    if (questionErr || !questions || questions.length === 0) {
      return NextResponse.json({ error: 'No questions found' }, { status: 404 });
    }

    return NextResponse.json({ questions });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
