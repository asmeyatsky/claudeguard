import { RISK_PROFILES, type RiskProfileId } from '../../../domain/value-objects/risk-profile'
import { DEPLOYMENT_TARGETS, ENVIRONMENT_TEMPLATES, type DeploymentTarget, type EnvironmentTemplate } from '../../../domain/value-objects/provisioner-types'

interface Props {
  projectName: string
  userName: string
  teamName: string
  riskProfile: RiskProfileId
  deploymentTarget: DeploymentTarget
  environmentTemplate: EnvironmentTemplate
  mcpServers: string[]
  onProjectNameChange: (v: string) => void
  onUserNameChange: (v: string) => void
  onTeamNameChange: (v: string) => void
  onRiskProfileChange: (v: RiskProfileId) => void
  onMcpServersChange: (v: string[]) => void
}

const riskProfiles = Object.entries(RISK_PROFILES) as [RiskProfileId, (typeof RISK_PROFILES)[RiskProfileId]][]

const AVAILABLE_MCP_SERVERS = ['github', 'postgres', 'bigquery', 'slack', 'jira', 'confluence', 'linear', 'notion']

export default function ProvisioningForm({
  projectName,
  userName,
  teamName,
  riskProfile,
  deploymentTarget,
  environmentTemplate,
  mcpServers,
  onProjectNameChange,
  onUserNameChange,
  onTeamNameChange,
  onRiskProfileChange,
  onMcpServersChange,
}: Props) {
  const target = DEPLOYMENT_TARGETS[deploymentTarget]
  const template = ENVIRONMENT_TEMPLATES[environmentTemplate]

  const toggleMcp = (server: string) => {
    if (mcpServers.includes(server)) {
      onMcpServersChange(mcpServers.filter((s) => s !== server))
    } else {
      onMcpServersChange([...mcpServers, server])
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-2">Environment Details</h2>
      <p className="text-navy-400 text-sm mb-6">Configure your sandboxed environment before provisioning</p>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="px-3 py-1 rounded-full bg-navy-800 text-xs text-navy-300">
          {target.icon} {target.name}
        </span>
        <span className="px-3 py-1 rounded-full bg-navy-800 text-xs text-navy-300">
          {template.icon} {template.name}
        </span>
      </div>

      <div className="space-y-5">
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium text-navy-300 mb-1.5">Project Name</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => onProjectNameChange(e.target.value)}
            placeholder="e.g. billing-service"
            className="w-full px-3 py-2.5 rounded-lg bg-navy-900 border border-navy-800 text-white text-sm placeholder-navy-600 focus:outline-none focus:border-emerald-accent/50 transition-colors"
          />
        </div>

        {/* User / Team */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy-300 mb-1.5">User Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => onUserNameChange(e.target.value)}
              placeholder="e.g. jane.doe"
              className="w-full px-3 py-2.5 rounded-lg bg-navy-900 border border-navy-800 text-white text-sm placeholder-navy-600 focus:outline-none focus:border-emerald-accent/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-300 mb-1.5">Team Name</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => onTeamNameChange(e.target.value)}
              placeholder="e.g. platform-eng"
              className="w-full px-3 py-2.5 rounded-lg bg-navy-900 border border-navy-800 text-white text-sm placeholder-navy-600 focus:outline-none focus:border-emerald-accent/50 transition-colors"
            />
          </div>
        </div>

        {/* Risk Profile */}
        <div>
          <label className="block text-sm font-medium text-navy-300 mb-1.5">Security Profile</label>
          <div className="grid grid-cols-3 gap-2">
            {riskProfiles.map(([id, rp]) => (
              <button
                key={id}
                onClick={() => onRiskProfileChange(id)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  riskProfile === id
                    ? 'border-emerald-accent/60 bg-emerald-accent/10'
                    : 'border-navy-800 bg-navy-900/50 hover:border-navy-700'
                }`}
              >
                <div className="font-medium text-white text-sm">{rp.name}</div>
                <div className="text-[10px] text-navy-500 mt-0.5">{rp.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* MCP Servers */}
        <div>
          <label className="block text-sm font-medium text-navy-300 mb-1.5">MCP Servers</label>
          <p className="text-xs text-navy-500 mb-2">Select which MCP servers to enable in the sandbox</p>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_MCP_SERVERS.map((server) => {
              const isActive = mcpServers.includes(server)
              return (
                <button
                  key={server}
                  onClick={() => toggleMcp(server)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    isActive
                      ? 'border-emerald-accent/50 bg-emerald-accent/10 text-emerald-accent'
                      : 'border-navy-800 text-navy-500 hover:border-navy-700 hover:text-navy-400'
                  }`}
                >
                  {server}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
