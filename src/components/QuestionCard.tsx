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
    { key: 'option_a', label: question.option_a },
    { key: 'option_b', label: question.option_b },
    { key: 'option_c', label: question.option_c },
    { key: 'option_d', label: question.option_d },
  ]

  const handleChange = (key: string) => {
    if (!disabled) {
      onSelect(key)
    }
  }

  return (
    <div className="border rounded p-4 space-y-2">
      <p className="font-medium">{question.question_text}</p>
      {options.map(({ key, label }) => {
        const isChecked = selected === key
        const isCorrect = key === question.correct_option
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
            ? ' ✅'
            : isChecked
              ? ' ❌'
              : ''
          : ''

        return (
          <label key={key} className={`block ${optionStyle}`.trim()}>
            <input
              type="radio"
              name={question.id}
              checked={isChecked}
              onChange={() => handleChange(key)}
              disabled={disabled}
              className="mr-2"
            />
            {label}
            {icon}
          </label>
        )
      })}
      {(showFeedback || isSubmitted) && selected && question.explanation && (
        <p className="mt-2 text-sm text-gray-600">{question.explanation}</p>
      )}
    </div>
  )
}
