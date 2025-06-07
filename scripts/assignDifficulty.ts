import { supabase } from '../lib/supabaseClient'
import { estimateDifficulty } from '../utils/estimateDifficulty'

async function assignDifficulty() {
  const { data: questions, error } = await supabase
    .from('questions')
    .select('id, question_text, difficulty')
    .is('difficulty', null)

  if (error) {
    console.error('Failed to fetch questions:', error)
    return
  }

  if (!questions) {
    console.log('No questions found.')
    return
  }

  for (const q of questions) {
    const difficulty = estimateDifficulty(q.question_text)
    const { error: updateError } = await supabase
      .from('questions')
      .update({ difficulty })
      .eq('id', q.id)

    if (updateError) {
      console.error(`Failed to update question ${q.id}:`, updateError)
    } else {
      console.log(`Updated question ${q.id} → ${difficulty}`)
    }
  }
}

assignDifficulty().then(() => {
  console.log('Done')
})
