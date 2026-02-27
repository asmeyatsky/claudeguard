import { memo } from 'react'
import type { DimensionScore } from '../../../domain/entities/assessment'
import { DIMENSIONS, DIMENSION_ORDER } from '../../../domain/value-objects/aria-dimensions'

interface RadarChartProps {
  scores: DimensionScore[]
  size?: number
}

export default memo(function RadarChart({ scores, size = 280 }: RadarChartProps) {
  const cx = size / 2
  const cy = size / 2
  const radius = size / 2 - 40
  const n = DIMENSION_ORDER.length

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2
    const r = (value / 5) * radius
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    }
  }

  const getLabelPoint = (index: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2
    const r = radius + 24
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    }
  }

  // Grid rings
  const rings = [1, 2, 3, 4, 5]

  // Score polygon
  const scoreMap = new Map(scores.map((s) => [s.dimensionId, s.score]))
  const scorePoints = DIMENSION_ORDER.map((dimId, i) => {
    const score = scoreMap.get(dimId) || 0
    return getPoint(i, score)
  })
  const scorePath = scorePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'

  // Target polygon (level 3)
  const targetPoints = DIMENSION_ORDER.map((_, i) => getPoint(i, 3))
  const targetPath = targetPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="mx-auto">
      {/* Grid rings */}
      {rings.map((ring) => {
        const points = DIMENSION_ORDER.map((_, i) => getPoint(i, ring))
        const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'
        return (
          <path key={ring} d={path} fill="none" stroke="rgba(71, 85, 105, 0.3)" strokeWidth={1} />
        )
      })}

      {/* Axis lines */}
      {DIMENSION_ORDER.map((_, i) => {
        const p = getPoint(i, 5)
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(71, 85, 105, 0.2)" strokeWidth={1} />
      })}

      {/* Target polygon (level 3 — minimum safe) */}
      <path d={targetPath} fill="rgba(245, 158, 11, 0.05)" stroke="rgba(245, 158, 11, 0.4)" strokeWidth={1.5} strokeDasharray="4 4" />

      {/* Score polygon */}
      <path d={scorePath} fill="rgba(59, 130, 246, 0.15)" stroke="rgba(59, 130, 246, 0.8)" strokeWidth={2} />

      {/* Score dots */}
      {scorePoints.map((p, i) => {
        const score = scoreMap.get(DIMENSION_ORDER[i]) || 0
        const color = score >= 3 ? '#10b981' : score >= 2 ? '#f59e0b' : '#ef4444'
        return score > 0 ? (
          <circle key={i} cx={p.x} cy={p.y} r={4} fill={color} stroke="white" strokeWidth={1.5} />
        ) : null
      })}

      {/* Labels */}
      {DIMENSION_ORDER.map((dimId, i) => {
        const lp = getLabelPoint(i)
        const dim = DIMENSIONS[dimId]
        const score = scoreMap.get(dimId) || 0
        return (
          <text
            key={dimId}
            x={lp.x}
            y={lp.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-[9px] font-medium"
            fill={score >= 3 ? '#10b981' : score > 0 ? '#f59e0b' : '#64748b'}
          >
            {dim.shortName}
            {score > 0 && (
              <tspan dx={2} className="text-[8px] font-bold">
                {score.toFixed(1)}
              </tspan>
            )}
          </text>
        )
      })}
    </svg>
  )
}, (prev, next) => {
  // Only re-render if scores actually changed
  if (prev.size !== next.size) return false
  if (prev.scores.length !== next.scores.length) return false
  return prev.scores.every((s, i) => s.score === next.scores[i].score && s.dimensionId === next.scores[i].dimensionId)
})
