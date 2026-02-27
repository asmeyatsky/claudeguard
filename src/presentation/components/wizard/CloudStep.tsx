import { CLOUD_PROVIDERS, type CloudProviderId } from '../../../domain/value-objects/cloud-provider'

interface CloudStepProps {
  selected: CloudProviderId
  onSelect: (provider: CloudProviderId) => void
  onNext: () => void
  onBack: () => void
}

const providerOrder: CloudProviderId[] = ['gcp', 'aws', 'azure', 'multi-cloud']

const providerIcons: Record<CloudProviderId, string> = {
  gcp: '☁️',
  aws: '🟧',
  azure: '🔷',
  'multi-cloud': '🌐',
}

export default function CloudStep({ selected, onSelect, onNext, onBack }: CloudStepProps) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Cloud Provider</h2>
        <p className="text-navy-400 text-sm max-w-lg mx-auto">
          Select your primary cloud provider. This determines infrastructure-specific artifacts like container registry, secrets management, and AI endpoint routing.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-8">
        {providerOrder.map((id) => {
          const provider = CLOUD_PROVIDERS[id]
          const isSelected = selected === id

          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={`text-left p-6 rounded-xl transition-all border ${
                isSelected
                  ? 'border-electric bg-electric/10 shadow-lg shadow-electric/10'
                  : 'border-navy-800 bg-navy-900/50 hover:border-navy-700'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{providerIcons[id]}</span>
                <div>
                  <div className="text-base font-semibold text-white">{provider.name}</div>
                  <div className="text-xs text-navy-500">{provider.shortName}</div>
                </div>
                <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected ? 'border-electric bg-electric' : 'border-navy-700'
                }`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>

              <p className="text-xs text-navy-400 mb-4">{provider.description}</p>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-navy-500">Registry</span>
                  <span className="text-navy-300">{provider.registry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-500">Secrets</span>
                  <span className="text-navy-300">{provider.secretsManager}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-500">AI Endpoint</span>
                  <span className="text-navy-300">{provider.aiEndpoint}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-500">Logging</span>
                  <span className="text-navy-300">{provider.loggingSink}</span>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-navy-700 text-navy-300 font-medium rounded-lg hover:border-navy-500 transition-all"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 bg-electric text-white font-semibold rounded-lg hover:bg-electric-dark transition-all shadow-lg shadow-electric/25"
        >
          Next: Risk Profile →
        </button>
      </div>
    </div>
  )
}
