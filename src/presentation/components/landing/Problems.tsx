const problems = [
  {
    title: 'No Readiness Framework',
    description: 'No standardised way to assess whether infrastructure, policies, and culture are ready for agentic AI.',
    icon: '📋',
  },
  {
    title: 'Configuration Complexity',
    description: "Claude Code's security model — permissions, managed settings, hooks, MCP governance — is powerful but complex.",
    icon: '⚙️',
  },
  {
    title: 'Provisioning Friction',
    description: 'Getting a secure environment requires Docker, firewall, credential management, and IDE integration expertise.',
    icon: '⏱️',
  },
  {
    title: 'Operational Blindness',
    description: 'No unified view of what Claude Code is doing — files accessed, commands run, policies enforced.',
    icon: '🔍',
  },
  {
    title: 'Compliance Evidence Gap',
    description: 'Regulated industries need continuous evidence for SOC 2, HIPAA, PCI-DSS, ISO 27001, and GDPR compliance.',
    icon: '🛡️',
  },
]

export default function Problems() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            The Enterprise Challenge
          </h2>
          <p className="text-navy-400 text-lg max-w-2xl mx-auto">
            Five compounding challenges when adopting Claude Code at scale
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <div key={i} className={`glass-card rounded-xl p-6 ${i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
              <span className="text-2xl mb-3 block">{p.icon}</span>
              <h3 className="text-base font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-navy-400 text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
