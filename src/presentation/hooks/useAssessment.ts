import { useState, useMemo, useCallback } from 'react'
import {
  createAssessmentState,
  setAnswer,
  markDimensionComplete,
  type AssessmentState,
} from '../../domain/entities/assessment'
import {
  QUESTIONS,
  DIMENSION_ORDER,
  type DimensionId,
} from '../../domain/value-objects/aria-dimensions'
import { scoreAssessment, getRecommendations, type AssessmentResult } from '../../application/use-cases/score-assessment'

export function useAssessment() {
  const [state, setState] = useState<AssessmentState>(createAssessmentState())
  const [activeDimension, setActiveDimension] = useState<DimensionId>('infrastructure')
  const [showResults, setShowResults] = useState(false)

  const dimensionQuestions = useMemo(
    () => QUESTIONS.filter((q) => q.dimension === activeDimension),
    [activeDimension]
  )

  const result: AssessmentResult = useMemo(
    () => scoreAssessment(state),
    [state]
  )

  const answeredInDimension = useMemo(
    () => dimensionQuestions.filter((q) => state.answers[q.id] !== undefined).length,
    [dimensionQuestions, state.answers]
  )

  const totalAnswered = Object.keys(state.answers).length
  const totalQuestions = QUESTIONS.length
  const progress = totalQuestions > 0 ? Math.round((totalAnswered / totalQuestions) * 100) : 0

  const answerQuestion = useCallback((questionId: string, score: number) => {
    setState((prev) => setAnswer(prev, questionId, score))
  }, [])

  const goToDimension = useCallback((dimId: DimensionId) => {
    // Mark current dimension as complete if all questions answered
    const currentQuestions = QUESTIONS.filter((q) => q.dimension === activeDimension)
    const allAnswered = currentQuestions.every((q) => state.answers[q.id] !== undefined)
    if (allAnswered) {
      setState((prev) => markDimensionComplete(prev, activeDimension))
    }
    setActiveDimension(dimId)
    setShowResults(false)
  }, [activeDimension, state.answers])

  const goToNextDimension = useCallback(() => {
    const currentIndex = DIMENSION_ORDER.indexOf(activeDimension)
    if (currentIndex < DIMENSION_ORDER.length - 1) {
      goToDimension(DIMENSION_ORDER[currentIndex + 1])
    } else {
      setShowResults(true)
    }
  }, [activeDimension, goToDimension])

  const viewResults = useCallback(() => {
    setShowResults(true)
  }, [])

  const resetAssessment = useCallback(() => {
    setState(createAssessmentState())
    setActiveDimension('infrastructure')
    setShowResults(false)
  }, [])

  return {
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
  }
}
