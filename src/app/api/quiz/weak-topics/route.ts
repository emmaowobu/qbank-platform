import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export async function POST() {
  const supabase = createRouteHandlerClient({ cookies })

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const { data: perfData, error: perfError } = await supabase
    .from('user_performance')
    .select('tag, accuracy')
    .eq('user_id', user.id)
    .order('accuracy', { ascending: true })
    .limit(3)

  if (perfError || !perfData || perfData.length === 0) {
    return NextResponse.json(
      { error: 'No weak topics found' },
      { status: 404 }
    )
  }

  const tags = perfData.map((row) => row.tag)

  const { data: questionData, error: questionError } = await supabase
    .from('questions')
    .select('*')
    .in('tag', tags)
    .limit(50)

  if (questionError || !questionData || questionData.length === 0) {
    return NextResponse.json(
      { error: 'No questions found for weak topics' },
      { status: 404 }
    )
  }

  const shuffled = questionData.sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, Math.min(15, questionData.length))

  if (selected.length < 10) {
    return NextResponse.json(
      { error: 'Not enough questions available' },
      { status: 400 }
    )
  }

  return NextResponse.json({ questions: selected })
}
