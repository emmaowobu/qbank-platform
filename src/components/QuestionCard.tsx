'use client'


type Question = {
  id: string
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_option: string
  explanation?: string | null
}

interface Props {
  question: Question
  selected?: string
  onSelect: (option: string) => void
  showFeedback?: boolean
  disabled?: boolean
  isSubmitted?: boolean
}

export default function QuestionCard({
  question,
  selected,
  onSelect,
  showFeedback,
  disabled,
  isSubmitted,
}: Props) {
  const options = [
    { key: 'A', label: question.option_a },
    { key: 'B', label: question.option_b },
    { key: 'C', label: question.option_c },
    { key: 'D', label: question.option_d },
  ]

  const handleChange = (key: string) => {
    if (!disabled) {
      onSelect(key)
    }
  }

  return (
    <div className="mb-6 p-4 border rounded space-y-2">
      <p className="text-lg font-semibold mb-2">{question.question_text}</p>
      {options.map(({ key, label }) => {
        const isChecked = selected?.toUpperCase() === key?.toUpperCase()
        const isCorrect = key?.toUpperCase() === question.correct_option?.toUpperCase()
        let optionStyle = ''
        if (isSubmitted) {
          if (isCorrect) {
            optionStyle = 'text-green-600'
          } else if (isChecked) {
            optionStyle = 'text-red-600'
          } else {
            optionStyle = 'text-gray-400'
          }
        } else if (showFeedback && isChecked) {
          optionStyle = isCorrect ? 'text-green-600' : 'text-red-600'
        }

        const icon = isSubmitted
          ? isCorrect
            ? <span className="ml-1 text-green-600">✅</span>
            : isChecked
              ? <span className="ml-1 text-red-600">❌</span>
              : null
          : null

        return (
          <label key={key} className={`block ${optionStyle}`.trim()}>
            <input
              type="radio"
              name={question.id}
              checked={isChecked}
              onChange={() => handleChange(key)}
              disabled={disabled}
              className={`mr-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            {label}
            {icon}
          </label>
        )
      })}
      {(showFeedback || isSubmitted) && selected && question.explanation && (
        <p className="mt-4 text-sm text-gray-600">{question.explanation}</p>
      )}
    </div>
  )
}
