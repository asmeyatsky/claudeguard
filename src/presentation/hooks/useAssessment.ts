import { useState, useRef, useMemo, useCallback } from 'react'
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

  // Use refs to avoid stale closures in callbacks without adding dependencies
  const activeDimensionRef = useRef(activeDimension)
  activeDimensionRef.current = activeDimension
  const stateRef = useRef(state)
  stateRef.current = state

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
    const currentDim = activeDimensionRef.current
    const currentAnswers = stateRef.current.answers
    // Mark current dimension as complete if all questions answered
    const currentQuestions = QUESTIONS.filter((q) => q.dimension === currentDim)
    const allAnswered = currentQuestions.every((q) => currentAnswers[q.id] !== undefined)
    if (allAnswered) {
      setState((prev) => markDimensionComplete(prev, currentDim))
    }
    setActiveDimension(dimId)
    setShowResults(false)
  }, [])

  const goToNextDimension = useCallback(() => {
    const currentIndex = DIMENSION_ORDER.indexOf(activeDimensionRef.current)
    if (currentIndex < DIMENSION_ORDER.length - 1) {
      goToDimension(DIMENSION_ORDER[currentIndex + 1])
    } else {
      setShowResults(true)
    }
  }, [goToDimension])

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
