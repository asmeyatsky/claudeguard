import type { Question } from '../../../domain/value-objects/aria-dimensions'

interface QuestionCardProps {
  question: Question
  index: number
  selectedScore: number | undefined
  onAnswer: (questionId: string, score: number) => void
}

export default function QuestionCard({ question, index, selectedScore, onAnswer }: QuestionCardProps) {
  return (
    <div className="glass-card rounded-xl p-6 mb-4">
      <div className="flex items-start gap-3 mb-5">
        <span className="w-7 h-7 rounded-full bg-electric/10 text-electric text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
          {index + 1}
        </span>
        <p className="text-sm text-white font-medium leading-relaxed">{question.text}</p>
      </div>

      <div className="space-y-2 ml-10">
        {question.options.map((option) => {
          const isSelected = selectedScore === option.score
          return (
            <button
              key={option.score}
              onClick={() => onAnswer(question.id, option.score)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all border flex items-center gap-3 ${
                isSelected
                  ? 'border-electric bg-electric/10 text-white'
                  : 'border-navy-800 hover:border-navy-700 text-navy-400 hover:text-navy-300'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                isSelected ? 'bg-electric text-white' : 'bg-navy-800 text-navy-500'
              }`}>
                {option.score}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium ${isSelected ? 'text-white' : ''}`}>{option.label}</div>
                <div className="text-xs text-navy-500 mt-0.5">{option.description}</div>
              </div>
              {isSelected && (
                <svg className="w-5 h-5 text-electric shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
