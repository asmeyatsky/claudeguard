import { DIMENSIONS, DIMENSION_ORDER, QUESTIONS, type DimensionId } from '../../../domain/value-objects/aria-dimensions'

interface DimensionNavProps {
  activeDimension: DimensionId
  answers: Record<string, number>
  onSelect: (dim: DimensionId) => void
  showResults: boolean
  onViewResults: () => void
}

export default function DimensionNav({ activeDimension, answers, onSelect, showResults, onViewResults }: DimensionNavProps) {
  return (
    <div className="space-y-1.5">
      {DIMENSION_ORDER.map((dimId) => {
        const dim = DIMENSIONS[dimId]
        const questions = QUESTIONS.filter((q) => q.dimension === dimId)
        const answered = questions.filter((q) => answers[q.id] !== undefined).length
        const isComplete = answered === questions.length
        const isActive = dimId === activeDimension && !showResults

        return (
          <button
            key={dimId}
            onClick={() => onSelect(dimId)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm flex items-center gap-3 ${
              isActive
                ? 'bg-electric/10 border border-electric/30 text-white'
                : 'border border-transparent hover:bg-navy-800/50 text-navy-400 hover:text-navy-300'
            }`}
          >
            <span className="text-lg">{dim.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{dim.shortName}</div>
              <div className="text-[10px] text-navy-500">{answered}/{questions.length}</div>
            </div>
            {isComplete && (
              <svg className="w-4 h-4 text-emerald-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        )
      })}

      {/* View Results button */}
      <button
        onClick={onViewResults}
        className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm flex items-center gap-3 mt-4 ${
          showResults
            ? 'bg-emerald-accent/10 border border-emerald-accent/30 text-emerald-accent'
            : 'border border-navy-800 text-navy-500 hover:text-navy-300 hover:border-navy-700'
        }`}
      >
        <span className="text-lg">📊</span>
        <span className="font-medium">View Results</span>
      </button>
    </div>
  )
}
