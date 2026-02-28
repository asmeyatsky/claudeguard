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

  // Stable refs for use in callbacks
  const activeDimensionRef = useRef(activeDimension)
  activeDimensionRef.current = activeDimension
  const stateRef = useRef(state)
  stateRef.current = state

  const dimensionQuestions = useMemo(
    () => QUESTIONS.filter((q) => q.dimension === activeDimension),
    [activeDimension]
  )

  // Only recompute scores when answers actually change (by key count + values)
  const answersKey = useMemo(() => {
    const entries = Object.entries(state.answers)
    return entries.map(([k, v]) => `${k}:${v}`).join('|')
  }, [state.answers])

  const result: AssessmentResult = useMemo(
    () => scoreAssessment(state),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [answersKey]
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
    const currentQuestions = QUESTIONS.filter((q) => q.dimension === currentDim)
    const allAnswered = currentQuestions.every((q) => currentAnswers[q.id] !== undefined)
    if (allAnswered) {
      setState((prev) => markDimensionComplete(prev, currentDim))
    }
    setActiveDimension(dimId)
    setShowResults(false)
    // Scroll to top of content area when switching dimensions
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const goToNextDimension = useCallback(() => {
    const currentIndex = DIMENSION_ORDER.indexOf(activeDimensionRef.current)
    if (currentIndex < DIMENSION_ORDER.length - 1) {
      goToDimension(DIMENSION_ORDER[currentIndex + 1])
    } else {
      setShowResults(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [goToDimension])

  const viewResults = useCallback(() => {
    setShowResults(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const resetAssessment = useCallback(() => {
    setState(createAssessmentState())
    setActiveDimension('infrastructure')
    setShowResults(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
