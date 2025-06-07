import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { user_id, results } = body

    if (!user_id || !Array.isArray(results)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const grouped: Record<string, { attempts: number; correct: number }> = {}
    for (const item of results) {
      if (!item.tag) continue
      if (!grouped[item.tag]) {
        grouped[item.tag] = { attempts: 0, correct: 0 }
      }
      grouped[item.tag].attempts += 1
      if (item.correct) grouped[item.tag].correct += 1
    }

    const updates = Object.keys(grouped).map((tag) => {
      const g = grouped[tag]
      const accuracy = g.attempts > 0 ? Math.round((g.correct / g.attempts) * 100) : 0
      return { user_id, tag, accuracy }
    })

    const { error } = await supabase
      .from('user_performance')
      .upsert(updates, { onConflict: 'user_id,tag' })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ updates }, { status: 200 })
  } catch (err) {
    console.error('API Error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
