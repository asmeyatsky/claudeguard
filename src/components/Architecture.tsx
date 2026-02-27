import { integrations } from '../data/content'

export default function Architecture() {
  return (
    <section className="py-24 px-4">
      <div className="section-divider mb-24" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Platform Architecture
          </h2>
          <p className="text-navy-400 text-lg max-w-2xl mx-auto">
            Modular platform with shared data layer, identity system, and event bus
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="glass-card rounded-xl p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
            {[
              { name: 'ARIA Assessment', phase: 'ASSESS', color: 'border-electric/40 bg-electric/5' },
              { name: 'Security Configurator', phase: 'CONFIGURE', color: 'border-amber-accent/40 bg-amber-accent/5' },
              { name: 'Sandbox Provisioner', phase: 'DEPLOY', color: 'border-emerald-accent/40 bg-emerald-accent/5' },
              { name: 'Security Dashboard', phase: 'MONITOR', color: 'border-danger/40 bg-danger/5' },
            ].map((mod) => (
              <div key={mod.name} className={`rounded-lg border ${mod.color} p-4 text-center`}>
                <div className="text-xs text-navy-500 font-medium mb-1">{mod.phase}</div>
                <div className="text-sm font-semibold text-white">{mod.name}</div>
              </div>
            ))}
          </div>

          {/* Shared Services */}
          <div className="flow-line h-px mb-6" />
          <div className="text-center text-xs text-navy-500 font-medium mb-4 tracking-widest uppercase">
            Core Platform Services
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {['Identity & Access', 'Config Store', 'Event Bus', 'API Gateway', 'Multi-Tenancy'].map((svc) => (
              <div key={svc} className="rounded-lg border border-navy-700 bg-navy-800/50 p-3 text-center">
                <span className="text-xs text-navy-300">{svc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Points */}
        <h3 className="text-xl font-semibold text-white mb-6">Integration Points</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((int) => (
            <div key={int.name} className="glass-card rounded-lg p-5">
              <h4 className="text-sm font-semibold text-white mb-1">{int.name}</h4>
              <p className="text-navy-400 text-xs mb-2">{int.purpose}</p>
              <span className="inline-block text-xs text-electric bg-electric/10 px-2 py-0.5 rounded font-mono">
                {int.protocol}
              </span>
            </div>
          ))}
        </div>

        {/* NFRs */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Config Generation', value: '< 5s', desc: 'Full package' },
            { label: 'Env Provisioning', value: '< 3 min', desc: 'Cached image' },
            { label: 'Event Latency', value: '< 30s', desc: 'Event to dashboard' },
            { label: 'Uptime SLA', value: '99.9%', desc: 'Platform availability' },
          ].map((nfr) => (
            <div key={nfr.label} className="glass-card rounded-lg p-5 text-center">
              <div className="text-2xl font-bold text-electric mb-1">{nfr.value}</div>
              <div className="text-sm text-white font-medium">{nfr.label}</div>
              <div className="text-xs text-navy-500">{nfr.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
