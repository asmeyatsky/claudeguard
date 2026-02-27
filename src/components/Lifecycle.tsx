import { lifecyclePhases } from '../data/content'

const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  electric: { bg: 'bg-electric/10', text: 'text-electric', border: 'border-electric/30', glow: 'shadow-electric/20' },
  'amber-accent': { bg: 'bg-amber-accent/10', text: 'text-amber-accent', border: 'border-amber-accent/30', glow: 'shadow-amber-accent/20' },
  'emerald-accent': { bg: 'bg-emerald-accent/10', text: 'text-emerald-accent', border: 'border-emerald-accent/30', glow: 'shadow-emerald-accent/20' },
  danger: { bg: 'bg-danger/10', text: 'text-danger', border: 'border-danger/30', glow: 'shadow-danger/20' },
}

export default function Lifecycle() {
  return (
    <section id="lifecycle" className="py-24 px-4">
      <div className="section-divider mb-24" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Four-Phase Security Lifecycle
          </h2>
          <p className="text-navy-400 text-lg max-w-2xl mx-auto">
            A coherent journey from initial assessment to continuous monitoring — each phase builds on the outputs of the previous
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {lifecyclePhases.map((phase) => {
            const colors = colorMap[phase.color]
            return (
              <div
                key={phase.phase}
                className={`glass-card rounded-xl p-8 border ${colors.border}`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-10 h-10 rounded-lg ${colors.bg} ${colors.text} flex items-center justify-center font-bold text-lg`}>
                    {phase.phase}
                  </div>
                  <div>
                    <div className={`text-xs font-bold tracking-widest ${colors.text} uppercase`}>
                      Phase {phase.phase}
                    </div>
                    <h3 className="text-xl font-bold text-white">{phase.name}</h3>
                  </div>
                </div>

                <p className="text-navy-300 text-sm mb-6">{phase.description}</p>

                <div className={`text-xs font-semibold ${colors.text} mb-2 uppercase tracking-wider`}>
                  {phase.module}
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-navy-600 text-xs font-medium mt-0.5 shrink-0 w-12">INPUT</span>
                    <span className="text-navy-400 text-sm">{phase.input}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className={`${colors.text} text-xs font-medium mt-0.5 shrink-0 w-12`}>OUTPUT</span>
                    <span className="text-navy-300 text-sm">{phase.output}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
