import { RISK_PROFILES, type RiskProfileId } from '../../../domain/value-objects/risk-profile'

interface RiskStepProps {
  selected: RiskProfileId
  onSelect: (profile: RiskProfileId) => void
  onNext: () => void
  onBack: () => void
}

const profileOrder: RiskProfileId[] = ['standard', 'strict', 'paranoid']

const profileIcons: Record<RiskProfileId, string> = {
  standard: '🟢',
  strict: '🟡',
  paranoid: '🔴',
}

const profileColors: Record<RiskProfileId, { border: string; bg: string; badge: string }> = {
  standard: { border: 'border-emerald-accent', bg: 'bg-emerald-accent/10', badge: 'bg-emerald-accent' },
  strict: { border: 'border-amber-accent', bg: 'bg-amber-accent/10', badge: 'bg-amber-accent' },
  paranoid: { border: 'border-danger', bg: 'bg-danger/10', badge: 'bg-danger' },
}

export default function RiskStep({ selected, onSelect, onNext, onBack }: RiskStepProps) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Risk Profile</h2>
        <p className="text-navy-400 text-sm max-w-lg mx-auto">
          Choose the security strictness level. This determines permission defaults, network policy, filesystem access, and hook requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mb-8 items-start">
        {profileOrder.map((id) => {
          const profile = RISK_PROFILES[id]
          const isSelected = selected === id
          const colors = profileColors[id]

          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={`text-left p-6 rounded-xl transition-colors border ${
                isSelected
                  ? `${colors.border} ${colors.bg} shadow-lg`
                  : 'border-navy-800 bg-navy-900/50 hover:border-navy-700'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{profileIcons[id]}</span>
                <div>
                  <div className="text-lg font-bold text-white">{profile.name}</div>
                  <div className="text-xs text-navy-500">Level {profile.level}</div>
                </div>
                <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isSelected ? `${colors.border} ${colors.badge}` : 'border-navy-700'
                }`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>

              <p className="text-xs text-navy-400 mb-3">{profile.description}</p>
              <p className="text-[10px] text-navy-500 italic mb-4">{profile.useCase}</p>

              {/* Security details */}
              <div className="space-y-2 text-xs border-t border-navy-800 pt-3">
                <div className="flex justify-between">
                  <span className="text-navy-500">Default</span>
                  <span className={`font-mono ${profile.permissionDefaults.defaultBehavior === 'deny' ? 'text-danger' : 'text-amber-accent'}`}>
                    {profile.permissionDefaults.defaultBehavior}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-500">Bypass</span>
                  <span className={profile.permissionDefaults.bypassMode ? 'text-amber-accent' : 'text-emerald-accent'}>
                    {profile.permissionDefaults.bypassMode ? 'Allowed' : 'Disabled'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-500">Egress</span>
                  <span className={`font-mono ${profile.networkPolicy.defaultEgress === 'deny' ? 'text-danger' : 'text-emerald-accent'}`}>
                    {profile.networkPolicy.defaultEgress}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-500">VPC Only</span>
                  <span className={profile.networkPolicy.vpcOnly ? 'text-danger' : 'text-navy-400'}>
                    {profile.networkPolicy.vpcOnly ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>

              {/* Rules */}
              <div className="mt-3 pt-3 border-t border-navy-800">
                <div className="text-[10px] font-medium text-navy-500 mb-1">{profile.rules.length} security rules:</div>
                {profile.rules.map((rule) => (
                  <div key={rule.id} className="text-[10px] text-navy-400 flex items-start gap-1 mb-0.5">
                    <span className="text-navy-600 mt-px">•</span>
                    {rule.description}
                  </div>
                ))}
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-navy-700 text-navy-300 font-medium rounded-lg hover:border-navy-500 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 bg-electric text-white font-semibold rounded-lg hover:bg-electric-dark transition-colors shadow-lg shadow-electric/25"
        >
          Next: Review & Export →
        </button>
      </div>
    </div>
  )
}
