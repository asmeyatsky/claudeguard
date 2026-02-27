import { Link } from '../shared/Router'

export default function Hero() {
  const phases = [
    { name: 'ASSESS', color: 'bg-electric', href: '/assessment' },
    { name: 'CONFIGURE', color: 'bg-amber-accent', href: '/configurator' },
    { name: 'DEPLOY', color: 'bg-emerald-accent', href: '' },
    { name: 'MONITOR', color: 'bg-danger', href: '' },
  ]

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-electric/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-electric-dark/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-electric/30 bg-electric/5 text-electric text-sm mb-8">
          <span className="w-2 h-2 bg-electric rounded-full animate-pulse" />
          Enterprise Security Lifecycle Platform
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
          <span className="gradient-text">ClaudeGuard</span>
        </h1>

        <p className="text-xl sm:text-2xl text-navy-400 max-w-3xl mx-auto mb-4">
          Safely deploy, govern, and monitor{' '}
          <span className="text-white font-semibold">Claude Code</span>{' '}
          across your entire knowledge worker population
        </p>

        <p className="text-navy-500 text-lg mb-12 max-w-2xl mx-auto">
          The only platform providing end-to-end security lifecycle management for agentic AI development environments
        </p>

        {/* Lifecycle flow */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-12 flex-wrap">
          {phases.map((phase, i) => (
            <div key={phase.name} className="flex items-center gap-2 sm:gap-4">
              {phase.href ? (
                <Link to={phase.href} className={`px-4 sm:px-6 py-2.5 ${phase.color} rounded-lg text-white font-bold text-sm sm:text-base tracking-wide shadow-lg hover:scale-105 transition-transform`}>
                  {phase.name}
                </Link>
              ) : (
                <div className={`px-4 sm:px-6 py-2.5 ${phase.color}/50 rounded-lg text-white/50 font-bold text-sm sm:text-base tracking-wide`}>
                  {phase.name}
                  <span className="text-[10px] ml-1 opacity-60">soon</span>
                </div>
              )}
              {i < phases.length - 1 && (
                <svg className="w-5 h-5 text-navy-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <Link
            to="/assessment"
            className="px-8 py-3 bg-electric text-white font-semibold rounded-lg hover:bg-electric-dark transition-all shadow-lg shadow-electric/25 animate-pulse-glow"
          >
            Start Assessment
          </Link>
          <Link
            to="/configurator"
            className="px-8 py-3 border border-navy-700 text-navy-300 font-semibold rounded-lg hover:border-electric/50 hover:text-white transition-all"
          >
            Security Configurator
          </Link>
        </div>

        <p className="text-navy-600 text-sm">
          Created by <span className="text-navy-400">Allan Smeyatsky</span>{' '}
          <span className="text-navy-700">|</span>{' '}
          Google Cloud Partner All-Star 2024{' '}
          <span className="text-navy-700">|</span>{' '}
          Google UK CTO Council Member
        </p>
      </div>
    </section>
  )
}
