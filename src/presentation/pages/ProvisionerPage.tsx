import { useProvisioner } from '../hooks/useProvisioner'
import TargetSelector from '../components/provisioner/TargetSelector'
import TemplateSelector from '../components/provisioner/TemplateSelector'
import ProvisioningForm from '../components/provisioner/ProvisioningForm'
import ProvisioningProgress from '../components/provisioner/ProvisioningProgress'
import ConnectionDetails from '../components/provisioner/ConnectionDetails'

const STEP_LABELS = ['Target', 'Template', 'Details', 'Provision']

export default function ProvisionerPage() {
  const p = useProvisioner()

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-accent/30 bg-emerald-accent/5 text-emerald-accent text-xs mb-4">
          <span className="w-1.5 h-1.5 bg-emerald-accent rounded-full animate-pulse" />
          Phase 3 — Deploy
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Sandbox Provisioner</h1>
        <p className="text-navy-400">
          Self-service provisioning of pre-hardened Claude Code containers
        </p>
      </div>

      {/* Step indicator */}
      {p.currentStep !== 'provisioning' && (
        <div className="flex items-center gap-2 mb-8">
          {STEP_LABELS.slice(0, 3).map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  i === p.stepIndex
                    ? 'bg-emerald-accent/10 text-emerald-accent border border-emerald-accent/30'
                    : i < p.stepIndex
                    ? 'bg-navy-800 text-navy-300'
                    : 'bg-navy-900 text-navy-600'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  i < p.stepIndex ? 'bg-emerald-accent/20 text-emerald-accent' : ''
                }`}>
                  {i < p.stepIndex ? '✓' : i + 1}
                </span>
                {label}
              </div>
              {i < 2 && (
                <svg className="w-4 h-4 text-navy-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Step content */}
      <div className="glass-card rounded-xl p-6 sm:p-8">
        {p.currentStep === 'target' && (
          <TargetSelector selected={p.deploymentTarget} onSelect={p.setDeploymentTarget} />
        )}
        {p.currentStep === 'template' && (
          <TemplateSelector selected={p.environmentTemplate} onSelect={p.setEnvironmentTemplate} />
        )}
        {p.currentStep === 'details' && (
          <ProvisioningForm
            projectName={p.projectName}
            userName={p.userName}
            teamName={p.teamName}
            riskProfile={p.riskProfile}
            deploymentTarget={p.deploymentTarget}
            environmentTemplate={p.environmentTemplate}
            mcpServers={p.mcpServers}
            onProjectNameChange={p.setProjectName}
            onUserNameChange={p.setUserName}
            onTeamNameChange={p.setTeamName}
            onRiskProfileChange={p.setRiskProfile}
            onMcpServersChange={p.setMcpServers}
          />
        )}
        {p.currentStep === 'provisioning' && p.provisioningRequest && (
          <>
            <ProvisioningProgress
              request={p.provisioningRequest}
              isProvisioning={p.isProvisioning}
            />
            {p.provisioningRequest.status === 'ready' && (
              <ConnectionDetails request={p.provisioningRequest} onReset={p.reset} />
            )}
            {p.provisioningRequest.status === 'failed' && (
              <div className="mt-6 rounded-xl border border-danger/30 bg-danger/5 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <h3 className="text-sm font-semibold text-danger">Provisioning Failed</h3>
                </div>
                <p className="text-xs text-navy-400 mb-4">{p.error}</p>
                <button
                  onClick={p.reset}
                  className="px-5 py-2.5 border border-navy-700 text-navy-300 font-medium rounded-lg text-sm hover:border-navy-600 hover:text-white transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Navigation */}
      {p.currentStep !== 'provisioning' && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={p.goBack}
            disabled={p.stepIndex === 0}
            className="px-5 py-2.5 border border-navy-700 text-navy-300 font-medium rounded-lg text-sm hover:border-navy-600 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Back
          </button>

          {p.currentStep === 'details' ? (
            <div className="flex items-center gap-3">
              {!p.canProceed() && (
                <span className="text-xs text-amber-accent">Please fill in all required fields</span>
              )}
              <button
                onClick={p.startProvisioning}
                disabled={!p.canProceed()}
                className="px-6 py-2.5 bg-emerald-accent text-white font-semibold rounded-lg text-sm hover:bg-emerald-accent/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-emerald-accent/20"
              >
                Provision Environment
              </button>
            </div>
          ) : (
            <button
              onClick={p.goNext}
              disabled={!p.canProceed()}
              className="px-5 py-2.5 bg-emerald-accent text-white font-semibold rounded-lg text-sm hover:bg-emerald-accent/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          )}
        </div>
      )}
    </div>
  )
}
