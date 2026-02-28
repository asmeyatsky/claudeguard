import { memo } from 'react'
import { DIMENSIONS } from '../../domain/value-objects/aria-dimensions'
import type { DimensionId } from '../../domain/value-objects/aria-dimensions'
import { useAssessment } from '../hooks/useAssessment'
import DimensionNav from '../components/assessment/DimensionNav'
import QuestionCard from '../components/assessment/QuestionCard'
import RadarChart from '../components/assessment/RadarChart'
import ResultsPanel from '../components/assessment/ResultsPanel'

const ProgressBar = memo(function ProgressBar({ totalAnswered, totalQuestions, progress }: {
  totalAnswered: number
  totalQuestions: number
  progress: number
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold text-white">ARIA Assessment</h1>
        <span className="text-xs text-navy-500">{totalAnswered}/{totalQuestions} questions ({progress}%)</span>
      </div>
      <div className="h-1.5 bg-navy-800 rounded-full overflow-hidden">
        <div className="h-full bg-electric rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
})

const DimensionHeader = memo(function DimensionHeader({ dimensionId, answeredInDimension, totalInDimension }: {
  dimensionId: DimensionId
  answeredInDimension: number
  totalInDimension: number
}) {
  const dim = DIMENSIONS[dimensionId]
  return (
    <div className="glass-card rounded-xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{dim.icon}</span>
        <div>
          <h2 className="text-lg font-bold text-white">{dim.name}</h2>
          <p className="text-xs text-navy-400">{dim.description}</p>
        </div>
      </div>
      <div className="text-xs text-navy-500 mt-2">
        {answeredInDimension} of {totalInDimension} questions answered
      </div>
    </div>
  )
})

export default function AssessmentPage() {
  const {
    state,
    activeDimension,
    dimensionQuestions,
    result,
    answeredInDimension,
    totalAnswered,
    totalQuestions,
    progress,
    showResults,
    answerQuestion,
    goToDimension,
    goToNextDimension,
    viewResults,
    resetAssessment,
    getRecommendations,
  } = useAssessment()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProgressBar totalAnswered={totalAnswered} totalQuestions={totalQuestions} progress={progress} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left sidebar: dimension nav */}
        <div className="lg:col-span-3">
          <div className="sticky top-20 space-y-4">
            <DimensionNav
              activeDimension={activeDimension}
              answers={state.answers}
              onSelect={goToDimension}
              showResults={showResults}
              onViewResults={viewResults}
            />

            {/* Mini radar — only show when there are answers */}
            {totalAnswered > 0 && !showResults && (
              <div className="glass-card rounded-xl p-4">
                <RadarChart scores={result.dimensionScores} size={200} />
              </div>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-9">
          {showResults ? (
            <ResultsPanel
              result={result}
              totalAnswered={totalAnswered}
              totalQuestions={totalQuestions}
              onReset={resetAssessment}
              getRecommendations={getRecommendations}
            />
          ) : (
            <div>
              <DimensionHeader
                dimensionId={activeDimension}
                answeredInDimension={answeredInDimension}
                totalInDimension={dimensionQuestions.length}
              />

              {/* Questions */}
              {dimensionQuestions.map((q, i) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  index={i}
                  selectedScore={state.answers[q.id]}
                  onAnswer={answerQuestion}
                />
              ))}

              {/* Next dimension button */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={goToNextDimension}
                  className="px-8 py-3 bg-electric text-white font-semibold rounded-lg hover:bg-electric-dark transition-colors shadow-lg shadow-electric/25"
                >
                  {answeredInDimension === dimensionQuestions.length
                    ? 'Next Dimension →'
                    : 'Skip to Next →'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
