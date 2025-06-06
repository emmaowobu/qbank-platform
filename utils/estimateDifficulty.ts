export type Difficulty = 'easy' | 'moderate' | 'hard'

export function estimateDifficulty(questionText: string): Difficulty {
  const wordCount = questionText.trim().split(/\s+/).filter(Boolean).length
  if (wordCount < 10) return 'easy'
  if (wordCount <= 20) return 'moderate'
  return 'hard'
}
