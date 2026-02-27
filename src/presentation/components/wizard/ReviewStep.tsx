import type { ConfigProfile } from '../../../domain/entities/config-profile'
import type { GeneratedArtifact } from '../../../domain/ports/template-engine-port'
import { COMPLIANCE_FRAMEWORKS } from '../../../domain/value-objects/compliance-framework'
import { RISK_PROFILES } from '../../../domain/value-objects/risk-profile'
import { CLOUD_PROVIDERS } from '../../../domain/value-objects/cloud-provider'
import ArtifactPreview from '../preview/ArtifactPreview'

interface ReviewStepProps {
  profile: ConfigProfile
  artifacts: GeneratedArtifact[]
  isDownloading: boolean
  onDownload: () => void
  onBack: () => void
  onProjectNameChange: (name: string) => void
  onOrgNameChange: (name: string) => void
}

export default function ReviewStep({
  profile,
  artifacts,
  isDownloading,
  onDownload,
  onBack,
  onProjectNameChange,
  onOrgNameChange,
}: ReviewStepProps) {
  const risk = RISK_PROFILES[profile.riskProfile]
  const cloud = CLOUD_PROVIDERS[profile.cloudProvider]
  const frameworks = profile.complianceFrameworks.map((id) => COMPLIANCE_FRAMEWORKS[id])

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Review & Export</h2>
        <p className="text-navy-400 text-sm max-w-lg mx-auto">
          Review your configuration and download the complete deployment package.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left column: Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project details */}
          <div className="glass-card rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Project Details</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-navy-500 mb-1 block">Organization Name</label>
                <input
                  type="text"
                  value={profile.organizationName}
                  onChange={(e) => onOrgNameChange(e.target.value)}
                  className="w-full px-3 py-2 bg-navy-900 border border-navy-700 rounded-lg text-sm text-white focus:border-electric focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-navy-500 mb-1 block">Project Name</label>
                <input
                  type="text"
                  value={profile.projectName}
                  onChange={(e) => onProjectNameChange(e.target.value)}
                  className="w-full px-3 py-2 bg-navy-900 border border-navy-700 rounded-lg text-sm text-white focus:border-electric focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Configuration summary */}
          <div className="glass-card rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Configuration Summary</h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-navy-500 mb-1">Compliance Frameworks</div>
                <div className="flex flex-wrap gap-1.5">
                  {frameworks.map((fw) => (
                    <span key={fw.id} className="px-2 py-1 bg-electric/10 text-electric text-xs rounded">
                      {fw.shortName}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-navy-500 mb-1">Cloud Provider</div>
                <span className="text-sm text-white">{cloud.name}</span>
              </div>
              <div>
                <div className="text-xs text-navy-500 mb-1">Risk Profile</div>
                <span className={`text-sm font-medium ${
                  profile.riskProfile === 'paranoid' ? 'text-danger' :
                  profile.riskProfile === 'strict' ? 'text-amber-accent' : 'text-emerald-accent'
                }`}>
                  {risk.name}
                </span>
              </div>
              <div>
                <div className="text-xs text-navy-500 mb-1">Generated Artifacts</div>
                <span className="text-sm text-white">{artifacts.length} files</span>
              </div>
            </div>
          </div>

          {/* Security posture */}
          <div className="glass-card rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Security Posture</h3>
            <div className="space-y-2">
              {risk.rules.map((rule) => (
                <div key={rule.id} className="flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 text-emerald-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs text-navy-400">{rule.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Download */}
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="px-5 py-3 border border-navy-700 text-navy-300 font-medium rounded-lg hover:border-navy-500 transition-all"
            >
              ← Back
            </button>
            <button
              onClick={onDownload}
              disabled={isDownloading}
              className="flex-1 px-8 py-3 bg-electric text-white font-semibold rounded-lg hover:bg-electric-dark transition-all shadow-lg shadow-electric/25 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isDownloading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Packaging...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download ZIP
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right column: Live preview */}
        <div className="lg:col-span-3">
          <ArtifactPreview artifacts={artifacts} />
        </div>
      </div>
    </div>
  )
}
