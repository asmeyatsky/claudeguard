import type { DimensionId } from '../value-objects/aria-dimensions'

export interface DimensionScore {
  readonly dimensionId: DimensionId
  readonly score: number          // 1-5 weighted average
  readonly rawScore: number       // unweighted average
  readonly answeredCount: number
  readonly totalQuestions: number
  readonly maturityLevel: number  // rounded score
}

export interface GapItem {
  readonly dimensionId: DimensionId
  readonly dimensionName: string
  readonly currentScore: number
  readonly targetScore: number   // 3.0 = minimum safe deployment
  readonly gap: number
  readonly priority: 'critical' | 'high' | 'medium' | 'low'
  readonly recommendation: string
}

export interface AssessmentResult {
  readonly dimensionScores: DimensionScore[]
  readonly compositeScore: number   // 1-5 weighted average across all dimensions
  readonly overallMaturity: number  // rounded composite
  readonly gaps: GapItem[]
  readonly deploymentReadiness: 'not-ready' | 'pilot-only' | 'controlled' | 'broad' | 'full'
  readonly maxUsers: string
}

export interface AssessmentState {
  readonly answers: Record<string, number>  // questionId -> selected score
  readonly startedAt: string
  readonly completedDimensions: DimensionId[]
}

export function createAssessmentState(): AssessmentState {
  return {
    answers: {},
    startedAt: new Date().toISOString(),
    completedDimensions: [],
  }
}

export function setAnswer(
  state: AssessmentState,
  questionId: string,
  score: number
): AssessmentState {
  return {
    ...state,
    answers: { ...state.answers, [questionId]: score },
  }
}

export function markDimensionComplete(
  state: AssessmentState,
  dimensionId: DimensionId
): AssessmentState {
  if (state.completedDimensions.includes(dimensionId)) return state
  return {
    ...state,
    completedDimensions: [...state.completedDimensions, dimensionId],
  }
}
