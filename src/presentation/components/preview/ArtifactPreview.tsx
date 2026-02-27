import { useState } from 'react'
import type { GeneratedArtifact } from '../../../domain/ports/template-engine-port'
import CodeBlock from './CodeBlock'

interface ArtifactPreviewProps {
  artifacts: GeneratedArtifact[]
}

export default function ArtifactPreview({ artifacts }: ArtifactPreviewProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (artifacts.length === 0) return null

  const safeIndex = activeIndex >= artifacts.length ? 0 : activeIndex
  const active = artifacts[safeIndex]

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white">Live Preview</h3>
        <span className="text-xs text-navy-500">{artifacts.length} artifacts</span>
      </div>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {artifacts.map((artifact, i) => (
          <button
            key={artifact.filename}
            onClick={() => setActiveIndex(i)}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
              i === safeIndex
                ? 'bg-electric/15 text-electric border border-electric/30'
                : 'text-navy-500 hover:text-navy-300 border border-navy-800 hover:border-navy-700'
            }`}
          >
            {artifact.filename}
          </button>
        ))}
      </div>

      {/* Description */}
      <p className="text-xs text-navy-500 mb-3">{active.description}</p>

      {/* Code */}
      <div className="flex-1 min-h-0">
        <CodeBlock
          code={active.content}
          language={active.language}
          filename={active.filename}
        />
      </div>
    </div>
  )
}
