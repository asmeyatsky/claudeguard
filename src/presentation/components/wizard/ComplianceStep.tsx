import { COMPLIANCE_FRAMEWORKS, type ComplianceFrameworkId } from '../../../domain/value-objects/compliance-framework'

interface ComplianceStepProps {
  selected: readonly ComplianceFrameworkId[]
  onSelect: (frameworks: ComplianceFrameworkId[]) => void
  onNext: () => void
}

const frameworkOrder: ComplianceFrameworkId[] = ['soc2', 'hipaa', 'pci-dss', 'iso27001', 'gdpr', 'baseline']

const frameworkIcons: Record<ComplianceFrameworkId, string> = {
  soc2: '🔒',
  hipaa: '🏥',
  'pci-dss': '💳',
  iso27001: '📋',
  gdpr: '🇪🇺',
  baseline: '🛡',
}

export default function ComplianceStep({ selected, onSelect, onNext }: ComplianceStepProps) {
  const toggle = (id: ComplianceFrameworkId) => {
    if (id === 'baseline') {
      onSelect(['baseline'])
      return
    }

    const withoutBaseline = selected.filter((s) => s !== 'baseline')

    if (withoutBaseline.includes(id)) {
      const next = withoutBaseline.filter((s) => s !== id)
      onSelect(next.length === 0 ? ['baseline'] : [...next])
    } else {
      onSelect([...withoutBaseline, id])
    }
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Compliance Frameworks</h2>
        <p className="text-navy-400 text-sm max-w-lg mx-auto">
          Select the compliance frameworks your organization must adhere to. Each activates specific security controls in the generated configuration.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
        {frameworkOrder.map((id) => {
          const fw = COMPLIANCE_FRAMEWORKS[id]
          const isSelected = selected.includes(id)

          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              className={`text-left p-5 rounded-xl transition-all border ${
                isSelected
                  ? 'border-electric bg-electric/10 shadow-lg shadow-electric/10'
                  : 'border-navy-800 bg-navy-900/50 hover:border-navy-700'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{frameworkIcons[id]}</span>
                <div>
                  <div className="text-sm font-semibold text-white">{fw.name}</div>
                  <div className="text-[10px] text-navy-500">{fw.controls.length} controls</div>
                </div>
                <div className={`ml-auto w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  isSelected ? 'border-electric bg-electric' : 'border-navy-700'
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <p className="text-xs text-navy-400 leading-relaxed">{fw.description}</p>

              {isSelected && id !== 'baseline' && (
                <div className="mt-3 pt-3 border-t border-electric/20">
                  <div className="text-[10px] text-electric font-medium mb-1">Active Controls:</div>
                  {fw.controls.map((c) => (
                    <div key={c.id} className="text-[10px] text-navy-400 flex items-center gap-1 mb-0.5">
                      <svg className="w-2.5 h-2.5 text-emerald-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      {c.description}
                    </div>
                  ))}
                </div>
              )}
            </button>
          )
        })}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="px-8 py-3 bg-electric text-white font-semibold rounded-lg hover:bg-electric-dark transition-all shadow-lg shadow-electric/25"
        >
          Next: Cloud Provider →
        </button>
      </div>
    </div>
  )
}
