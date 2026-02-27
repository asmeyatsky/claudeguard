import { ENVIRONMENT_TEMPLATES, type EnvironmentTemplate } from '../../../domain/value-objects/provisioner-types'

interface Props {
  selected: EnvironmentTemplate
  onSelect: (template: EnvironmentTemplate) => void
}

const templates = Object.values(ENVIRONMENT_TEMPLATES)

export default function TemplateSelector({ selected, onSelect }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-2">Select Environment Template</h2>
      <p className="text-navy-400 text-sm mb-6">Pre-configured runtime stacks with tooling and MCP servers</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {templates.map((t) => {
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
                  <div className="font-semibold text-white mb-1">{t.name}</div>
                  <p className="text-xs text-navy-400 mb-3">{t.description}</p>

                  <div className="space-y-2">
                    <div>
                      <div className="text-[10px] text-navy-500 font-semibold uppercase tracking-wider mb-1">Runtimes</div>
                      <div className="flex flex-wrap gap-1">
                        {t.runtimes.map((r) => (
                          <span key={r} className="px-2 py-0.5 rounded bg-navy-800 text-[10px] text-navy-300">{r}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-navy-500 font-semibold uppercase tracking-wider mb-1">Tools</div>
                      <div className="flex flex-wrap gap-1">
                        {t.tools.slice(0, 5).map((tool) => (
                          <span key={tool} className="px-2 py-0.5 rounded bg-navy-800 text-[10px] text-navy-300">{tool}</span>
                        ))}
                        {t.tools.length > 5 && (
                          <span className="px-2 py-0.5 rounded bg-navy-800 text-[10px] text-navy-500">+{t.tools.length - 5}</span>
                        )}
                      </div>
                    </div>
                    {t.mcpServers.length > 0 && (
                      <div>
                        <div className="text-[10px] text-navy-500 font-semibold uppercase tracking-wider mb-1">MCP Servers</div>
                        <div className="flex flex-wrap gap-1">
                          {t.mcpServers.map((s) => (
                            <span key={s} className="px-2 py-0.5 rounded bg-emerald-accent/10 text-[10px] text-emerald-accent/80">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
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
