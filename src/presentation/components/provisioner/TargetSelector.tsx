import { DEPLOYMENT_TARGETS, type DeploymentTarget } from '../../../domain/value-objects/provisioner-types'

interface Props {
  selected: DeploymentTarget
  onSelect: (target: DeploymentTarget) => void
}

const targets = Object.values(DEPLOYMENT_TARGETS)

export default function TargetSelector({ selected, onSelect }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-2">Select Deployment Target</h2>
      <p className="text-navy-400 text-sm mb-6">Choose where your sandboxed Claude Code environment will run</p>

      <div className="grid gap-3">
        {targets.map((t) => {
          const isSelected = t.id === selected
          return (
            <button
              key={t.id}
              onClick={() => onSelect(t.id)}
              className={`text-left p-4 rounded-xl border transition-all ${
                isSelected
                  ? 'border-emerald-accent/60 bg-emerald-accent/10'
                  : 'border-navy-800 bg-navy-900/50 hover:border-navy-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{t.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-white">{t.name}</span>
                    <span className="text-xs text-navy-500">{t.estimatedTime}</span>
                  </div>
                  <p className="text-sm text-navy-400 mb-2">{t.description}</p>
                  <p className="text-xs text-navy-500 mb-2">Best for: {t.bestFor}</p>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="text-[10px] text-emerald-accent/70 font-semibold uppercase tracking-wider mb-1">Pros</div>
                      <ul className="text-xs text-navy-400 space-y-0.5">
                        {t.pros.map((p) => (
                          <li key={p}>+ {p}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] text-amber-accent/70 font-semibold uppercase tracking-wider mb-1">Cons</div>
                      <ul className="text-xs text-navy-400 space-y-0.5">
                        {t.cons.map((c) => (
                          <li key={c}>- {c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1 flex items-center justify-center ${
                  isSelected ? 'border-emerald-accent bg-emerald-accent' : 'border-navy-700'
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
