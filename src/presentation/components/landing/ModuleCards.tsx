import { Link } from '../shared/Router'

const modules = [
  {
    phase: 1,
    name: 'ASSESS',
    module: 'ARIA Assessment',
    description: 'Structured maturity scoring across six dimensions of agentic AI readiness. Gap analysis and prioritised remediation roadmap.',
    color: 'electric',
    borderColor: 'border-electric/30',
    bgColor: 'bg-electric/5',
    textColor: 'text-electric',
    href: '/assessment',
    cta: 'Start Assessment',
    available: true,
  },
  {
    phase: 2,
    name: 'CONFIGURE',
    module: 'Security Configurator',
    description: 'Interactive engine generating hardened deployment packages: managed-settings.json, Dockerfile, firewall rules, hooks, and more.',
    color: 'amber-accent',
    borderColor: 'border-amber-accent/30',
    bgColor: 'bg-amber-accent/5',
    textColor: 'text-amber-accent',
    href: '/configurator',
    cta: 'Open Configurator',
    available: true,
  },
  {
    phase: 3,
    name: 'DEPLOY',
    module: 'Sandbox Provisioner',
    description: 'Self-service provisioning of pre-hardened Claude Code containers for knowledge workers. Minutes, not days.',
    color: 'emerald-accent',
    borderColor: 'border-emerald-accent/30',
    bgColor: 'bg-emerald-accent/5',
    textColor: 'text-emerald-accent',
    href: '/provisioner',
    cta: 'Open Provisioner',
    available: true,
  },
  {
    phase: 4,
    name: 'MONITOR',
    module: 'Security Dashboard',
    description: 'Real-time operational visibility with compliance scoring, alerting, SIEM integration, and audit evidence generation.',
    color: 'danger',
    borderColor: 'border-danger/30',
    bgColor: 'bg-danger/5',
    textColor: 'text-danger',
    href: '/dashboard',
    cta: 'Open Dashboard',
    available: true,
  },
]

export default function ModuleCards() {
  return (
    <section className="py-20 px-4">
      <div className="section-divider mb-20" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Four Integrated Modules
          </h2>
          <p className="text-navy-400 text-lg max-w-2xl mx-auto">
            Adopt incrementally — each module operates independently but shares a common data layer
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {modules.map((mod) => (
            <div key={mod.name} className={`rounded-xl border ${mod.borderColor} ${mod.bgColor} p-7 transition-all ${mod.available ? 'hover:shadow-lg' : 'opacity-70'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-lg ${mod.bgColor} ${mod.textColor} flex items-center justify-center font-bold text-sm border ${mod.borderColor}`}>
                  {mod.phase}
                </div>
                <div>
                  <div className={`text-[10px] font-bold tracking-widest ${mod.textColor} uppercase`}>{mod.name}</div>
                  <div className="text-lg font-semibold text-white">{mod.module}</div>
                </div>
              </div>
              <p className="text-sm text-navy-400 mb-6 leading-relaxed">{mod.description}</p>
              {mod.available ? (
                <Link to={mod.href} className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border ${mod.borderColor} ${mod.textColor} hover:${mod.bgColor} transition-all`}>
                  {mod.cta}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-navy-800 text-navy-600">
                  {mod.cta}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
