import { pricingTiers } from '../data/content'

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4">
      <div className="section-divider mb-24" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-navy-400 text-lg max-w-2xl mx-auto">
            Per-seat SaaS subscription with professional services for enterprise onboarding
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl p-6 flex flex-col ${
                tier.highlighted
                  ? 'bg-electric/10 border-2 border-electric shadow-lg shadow-electric/10 relative'
                  : 'glass-card'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-electric text-white text-xs font-bold rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="text-lg font-bold text-white mb-2">{tier.name}</h3>

              <div className="mb-6">
                {tier.price === 'Custom' || tier.price === 'Day Rate' ? (
                  <span className="text-3xl font-bold text-white">{tier.price}</span>
                ) : (
                  <>
                    <span className="text-sm text-navy-500">£</span>
                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                    <span className="text-navy-500 text-sm">{tier.period}</span>
                  </>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-navy-300">
                    <svg className="w-4 h-4 text-emerald-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all ${
                  tier.highlighted
                    ? 'bg-electric text-white hover:bg-electric-dark'
                    : 'border border-navy-700 text-navy-300 hover:border-electric/50 hover:text-white'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
