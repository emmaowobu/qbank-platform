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
}

export default function QuestionCard({ question, selected, onSelect, showFeedback }: Props) {
  const options = [
    { key: 'option_a', label: question.option_a },
    { key: 'option_b', label: question.option_b },
    { key: 'option_c', label: question.option_c },
    { key: 'option_d', label: question.option_d },
  ]

  const handleChange = (key: string) => {
    onSelect(key)
  }

  return (
    <div className="border rounded p-4 space-y-2">
      <p className="font-medium">{question.question_text}</p>
      {options.map(({ key, label }) => {
        const isChecked = selected === key
        let optionStyle = ''
        if (showFeedback && isChecked) {
          optionStyle = key === question.correct_option ? 'text-green-600' : 'text-red-600'
        }
        return (
          <label key={key} className={`block ${optionStyle}`}>
            <input
              type="radio"
              name={question.id}
              checked={isChecked}
              onChange={() => handleChange(key)}
              className="mr-2"
            />
            {label}
          </label>
        )
      })}
      {showFeedback && selected && question.explanation && (
        <p className="mt-2 text-sm text-gray-600">{question.explanation}</p>
      )}
    </div>
  )
}
