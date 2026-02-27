import type { AssessmentState, AssessmentResult, DimensionScore, GapItem } from '../../domain/entities/assessment'
import { QUESTIONS, DIMENSIONS, DIMENSION_ORDER, type DimensionId } from '../../domain/value-objects/aria-dimensions'

const TARGET_SCORE = 3.0 // minimum for safe Claude Code deployment

const RECOMMENDATIONS: Record<DimensionId, string[]> = {
  infrastructure: [
    'Deploy container orchestration (Kubernetes or managed equivalent)',
    'Implement network segmentation with service-level policies',
    'Migrate secrets to a centralized secrets manager with rotation',
    'Integrate container image scanning into CI/CD pipeline',
    'Adopt Infrastructure as Code for all provisioning',
  ],
  identity: [
    'Configure SSO via corporate IdP for all development tools',
    'Define and enforce RBAC aligned to job functions',
    'Enforce MFA for all users, prioritize phishing-resistant methods',
    'Implement service account lifecycle management',
    'Establish quarterly access review process',
  ],
  data: [
    'Create and apply a data classification scheme',
    'Enforce TLS 1.2+ for all traffic, encrypt data at rest',
    'Document and enforce data residency requirements',
    'Define data retention policies per classification level',
    'Deploy DLP tooling that covers AI tool interactions',
  ],
  secops: [
    'Deploy and actively monitor a SIEM platform',
    'Document and test an Incident Response plan',
    'Establish vulnerability scanning cadence with patching SLAs',
    'Implement user and entity behaviour analytics',
    'Integrate threat intelligence into detection workflows',
  ],
  compliance: [
    'Adopt at least one compliance framework (SOC 2 recommended)',
    'Implement comprehensive audit logging across all systems',
    'Automate compliance evidence collection',
    'Map controls to framework requirements in a GRC tool',
    'Monitor regulatory changes with impact assessment process',
  ],
  'ai-governance': [
    'Create an AI Acceptable Use Policy and communicate to all staff',
    'Train the security team on agentic AI threats (prompt injection, tool abuse)',
    'Establish an MCP server review and approval process',
    'Deploy managed-settings.json with baseline security controls',
    'Implement centralized monitoring of Claude Code activity',
    'Add credential scanning hooks to prevent secret exposure',
    'Control AI model endpoints via network policy',
    'Require human review for AI-generated code',
    'Test defenses against prompt injection attacks',
    'Create an AI-specific incident response playbook',
  ],
}

function scoreDimension(dimensionId: DimensionId, answers: Record<string, number>): DimensionScore {
  const questions = QUESTIONS.filter((q) => q.dimension === dimensionId)
  const answered = questions.filter((q) => answers[q.id] !== undefined)

  if (answered.length === 0) {
    return {
      dimensionId,
      score: 0,
      rawScore: 0,
      answeredCount: 0,
      totalQuestions: questions.length,
      maturityLevel: 0,
    }
  }

  const totalWeight = answered.reduce((sum, q) => sum + q.weight, 0)
  const weightedSum = answered.reduce((sum, q) => sum + answers[q.id] * q.weight, 0)
  const weightedAvg = weightedSum / totalWeight

  const rawSum = answered.reduce((sum, q) => sum + answers[q.id], 0)
  const rawAvg = rawSum / answered.length

  return {
    dimensionId,
    score: Math.round(weightedAvg * 10) / 10,
    rawScore: Math.round(rawAvg * 10) / 10,
    answeredCount: answered.length,
    totalQuestions: questions.length,
    maturityLevel: Math.round(weightedAvg),
  }
}

function getGaps(dimensionScores: DimensionScore[]): GapItem[] {
  return dimensionScores
    .filter((ds) => ds.score > 0 && ds.score < TARGET_SCORE)
    .map((ds) => {
      const dim = DIMENSIONS[ds.dimensionId]
      const gap = TARGET_SCORE - ds.score
      const recs = RECOMMENDATIONS[ds.dimensionId]
      const recIndex = Math.min(Math.floor((TARGET_SCORE - ds.score) * 2), recs.length - 1)

      return {
        dimensionId: ds.dimensionId,
        dimensionName: dim.name,
        currentScore: ds.score,
        targetScore: TARGET_SCORE,
        gap: Math.round(gap * 10) / 10,
        priority: gap >= 1.5 ? 'critical' : gap >= 1.0 ? 'high' : gap >= 0.5 ? 'medium' : 'low',
        recommendation: recs[Math.max(0, recIndex)],
      } satisfies GapItem
    })
    .sort((a, b) => b.gap - a.gap)
}

function getDeploymentReadiness(composite: number): { readiness: AssessmentResult['deploymentReadiness']; maxUsers: string } {
  if (composite < 1.5) return { readiness: 'not-ready', maxUsers: '0' }
  if (composite < 2.5) return { readiness: 'pilot-only', maxUsers: '5-10' }
  if (composite < 3.5) return { readiness: 'controlled', maxUsers: '50' }
  if (composite < 4.5) return { readiness: 'broad', maxUsers: 'Unlimited (with guardrails)' }
  return { readiness: 'full', maxUsers: 'Unlimited (autonomous)' }
}

export class ScoreAssessmentUseCase {
  score(state: AssessmentState): AssessmentResult {
    const dimensionScores = DIMENSION_ORDER.map((dimId) =>
      scoreDimension(dimId, state.answers)
    )

    const scored = dimensionScores.filter((ds) => ds.score > 0)
    const compositeScore = scored.length > 0
      ? Math.round((scored.reduce((sum, ds) => sum + ds.score, 0) / scored.length) * 10) / 10
      : 0

    const gaps = getGaps(dimensionScores)
    const { readiness, maxUsers } = getDeploymentReadiness(compositeScore)

    return {
      dimensionScores,
      compositeScore,
      overallMaturity: Math.round(compositeScore),
      gaps,
      deploymentReadiness: readiness,
      maxUsers,
    }
  }

  getRecommendations(dimensionId: DimensionId, currentScore: number): string[] {
    const recs = RECOMMENDATIONS[dimensionId]
    const count = Math.max(1, Math.ceil((TARGET_SCORE - currentScore) * 2))
    return recs.slice(0, Math.min(count, recs.length))
  }
}

// Keep named exports for backward compatibility during migration
export function scoreAssessment(state: AssessmentState): AssessmentResult {
  return new ScoreAssessmentUseCase().score(state)
}

export function getRecommendations(dimensionId: DimensionId, currentScore: number): string[] {
  return new ScoreAssessmentUseCase().getRecommendations(dimensionId, currentScore)
}

export type { AssessmentResult }
