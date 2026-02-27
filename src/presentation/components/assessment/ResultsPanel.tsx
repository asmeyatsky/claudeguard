import type { AssessmentResult } from '../../../domain/entities/assessment'
import { DIMENSIONS } from '../../../domain/value-objects/aria-dimensions'
import RadarChart from './RadarChart'
import { Link } from '../shared/Router'

interface ResultsPanelProps {
  result: AssessmentResult
  totalAnswered: number
  totalQuestions: number
  onReset: () => void
  getRecommendations: (dimensionId: string, currentScore: number) => string[]
}

const readinessLabels: Record<string, { label: string; color: string; bgColor: string }> = {
  'not-ready': { label: 'Not Ready', color: 'text-danger', bgColor: 'bg-danger/10' },
  'pilot-only': { label: 'Pilot Only', color: 'text-amber-accent', bgColor: 'bg-amber-accent/10' },
  controlled: { label: 'Controlled Rollout', color: 'text-electric', bgColor: 'bg-electric/10' },
  broad: { label: 'Broad Deployment', color: 'text-electric-light', bgColor: 'bg-electric-light/10' },
  full: { label: 'Full Autonomous', color: 'text-emerald-accent', bgColor: 'bg-emerald-accent/10' },
}

const priorityColors: Record<string, string> = {
  critical: 'text-danger bg-danger/10 border-danger/30',
  high: 'text-amber-accent bg-amber-accent/10 border-amber-accent/30',
  medium: 'text-electric bg-electric/10 border-electric/30',
  low: 'text-navy-400 bg-navy-800 border-navy-700',
}

export default function ResultsPanel({ result, totalAnswered, totalQuestions, onReset, getRecommendations }: ResultsPanelProps) {
  const readiness = readinessLabels[result.deploymentReadiness]
  const completionPct = Math.round((totalAnswered / totalQuestions) * 100)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">ARIA Assessment Results</h2>
        <p className="text-navy-400 text-sm">
          {totalAnswered} of {totalQuestions} questions answered ({completionPct}%)
        </p>
      </div>

      {/* Top cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-white mb-1">{result.compositeScore || '—'}</div>
          <div className="text-xs text-navy-500">Composite Score</div>
          <div className="text-xs text-navy-600 mt-1">out of 5.0</div>
        </div>
        <div className="glass-card rounded-xl p-5 text-center">
          <div className={`text-lg font-bold ${readiness.color} mb-1`}>{readiness.label}</div>
          <div className="text-xs text-navy-500">Deployment Readiness</div>
          <div className="text-xs text-navy-600 mt-1">Max users: {result.maxUsers}</div>
        </div>
        <div className="glass-card rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-white mb-1">{result.gaps.length}</div>
          <div className="text-xs text-navy-500">Gaps Identified</div>
          <div className="text-xs text-navy-600 mt-1">below Level 3 target</div>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white mb-4 text-center">Maturity Radar</h3>
        <RadarChart scores={result.dimensionScores} size={320} />
        <div className="flex items-center justify-center gap-6 mt-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-electric/30 border border-electric/60" />
            <span className="text-navy-400">Your Score</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 border-t-2 border-dashed border-amber-accent/60" />
            <span className="text-navy-400">Target (Level 3)</span>
          </div>
        </div>
      </div>

      {/* Dimension Breakdown */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Dimension Scores</h3>
        <div className="space-y-3">
          {result.dimensionScores.map((ds) => {
            const dim = DIMENSIONS[ds.dimensionId]
            const pct = ds.score > 0 ? (ds.score / 5) * 100 : 0
            const barColor = ds.score >= 3 ? 'bg-emerald-accent' : ds.score >= 2 ? 'bg-amber-accent' : ds.score > 0 ? 'bg-danger' : 'bg-navy-700'

            return (
              <div key={ds.dimensionId}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{dim.icon}</span>
                    <span className="text-xs font-medium text-navy-300">{dim.name}</span>
                  </div>
                  <span className={`text-xs font-bold ${ds.score >= 3 ? 'text-emerald-accent' : ds.score >= 2 ? 'text-amber-accent' : ds.score > 0 ? 'text-danger' : 'text-navy-600'}`}>
                    {ds.score > 0 ? ds.score.toFixed(1) : '—'}
                  </span>
                </div>
                <div className="h-2 bg-navy-800 rounded-full overflow-hidden">
                  <div className={`h-full ${barColor} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                </div>
                <div className="text-[10px] text-navy-600 mt-0.5">
                  {ds.answeredCount}/{ds.totalQuestions} answered
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Gap Analysis */}
      {result.gaps.length > 0 && (
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Gap Analysis & Recommendations</h3>
          <div className="space-y-4">
            {result.gaps.map((gap) => {
              const dim = DIMENSIONS[gap.dimensionId]
              const recs = getRecommendations(gap.dimensionId, gap.currentScore)
              return (
                <div key={gap.dimensionId} className="border border-navy-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span>{dim.icon}</span>
                      <span className="text-sm font-medium text-white">{gap.dimensionName}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${priorityColors[gap.priority]}`}>
                      {gap.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs text-navy-400 mb-3">
                    Current: <span className="text-amber-accent font-mono">{gap.currentScore}</span> → Target: <span className="text-emerald-accent font-mono">{gap.targetScore}</span> (gap: {gap.gap})
                  </div>
                  <div className="space-y-1.5">
                    {recs.map((rec, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-navy-300">
                        <svg className="w-3.5 h-3.5 text-electric shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={onReset}
          className="px-5 py-2.5 border border-navy-700 text-navy-300 text-sm font-medium rounded-lg hover:border-navy-500 transition-all"
        >
          Restart Assessment
        </button>
        <Link
          to="/configurator"
          className="px-6 py-2.5 bg-electric text-white text-sm font-semibold rounded-lg hover:bg-electric-dark transition-all shadow-lg shadow-electric/25"
        >
          Configure Based on Results →
        </Link>
      </div>
    </div>
  )
}
