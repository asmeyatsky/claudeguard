import { roadmapPhases } from '../data/content'

const phaseColors = [
  'border-electric/40 bg-electric/5',
  'border-electric-light/40 bg-electric-light/5',
  'border-amber-accent/40 bg-amber-accent/5',
  'border-emerald-accent/40 bg-emerald-accent/5',
  'border-danger/40 bg-danger/5',
]

const dotColors = ['bg-electric', 'bg-electric-light', 'bg-amber-accent', 'bg-emerald-accent', 'bg-danger']

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-24 px-4">
      <div className="section-divider mb-24" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Development Roadmap
          </h2>
          <p className="text-navy-400 text-lg max-w-2xl mx-auto">
            Phased delivery prioritising time-to-market for the highest-impact modules
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-navy-800" />

          <div className="space-y-8">
            {roadmapPhases.map((phase, i) => (
              <div key={phase.phase} className="relative pl-12 sm:pl-20">
                {/* Timeline dot */}
                <div className={`absolute left-2.5 sm:left-6.5 top-6 w-3 h-3 rounded-full ${dotColors[i]} ring-4 ring-navy-950`} />

                <div className={`rounded-xl border ${phaseColors[i]} p-6`}>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-navy-500 tracking-widest uppercase">
                      Phase {phase.phase}
                    </span>
                    <span className="text-xs font-medium text-navy-400 bg-navy-800 px-2.5 py-0.5 rounded-full">
                      {phase.timeline}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{phase.name}</h3>
                  <p className="text-navy-400 text-sm mb-3">{phase.deliverables}</p>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                    </svg>
                    <span className="text-xs text-emerald-accent">{phase.criteria}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
