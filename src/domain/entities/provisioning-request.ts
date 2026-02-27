import type { DeploymentTarget, EnvironmentTemplate, ProvisioningStatus } from '../value-objects/provisioner-types'
import type { RiskProfileId } from '../value-objects/risk-profile'

export interface ProvisioningRequest {
  readonly id: string
  readonly projectName: string
  readonly userName: string
  readonly teamName: string
  readonly deploymentTarget: DeploymentTarget
  readonly environmentTemplate: EnvironmentTemplate
  readonly riskProfile: RiskProfileId
  readonly mcpServers: readonly string[]
  readonly requestedAt: string
  readonly status: ProvisioningStatus
  readonly statusHistory: readonly StatusEntry[]
  readonly connectionDetails: ConnectionDetails | null
}

export interface StatusEntry {
  readonly status: ProvisioningStatus
  readonly timestamp: string
  readonly message: string
}

export interface ConnectionDetails {
  readonly vscodeUrl: string
  readonly sshCommand: string
  readonly webIdeUrl: string
  readonly containerId: string
  readonly expiresAt: string
}

export function createProvisioningRequest(params: {
  projectName: string
  userName: string
  teamName: string
  deploymentTarget: DeploymentTarget
  environmentTemplate: EnvironmentTemplate
  riskProfile: RiskProfileId
  mcpServers: string[]
}): ProvisioningRequest {
  const id = `prov-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
  const now = new Date().toISOString()
  return {
    id,
    projectName: params.projectName,
    userName: params.userName,
    teamName: params.teamName,
    deploymentTarget: params.deploymentTarget,
    environmentTemplate: params.environmentTemplate,
    riskProfile: params.riskProfile,
    mcpServers: params.mcpServers,
    requestedAt: now,
    status: 'idle',
    statusHistory: [],
    connectionDetails: null,
  }
}

export function advanceStatus(
  request: ProvisioningRequest,
  newStatus: ProvisioningStatus,
  message: string
): ProvisioningRequest {
  const now = new Date().toISOString()
  return {
    ...request,
    status: newStatus,
    statusHistory: [
      ...request.statusHistory,
      { status: newStatus, timestamp: now, message },
    ],
  }
}

export function completeProvisioning(request: ProvisioningRequest): ProvisioningRequest {
  const containerId = `cg-${request.id.slice(5, 13)}`
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  return {
    ...request,
    status: 'ready',
    statusHistory: [
      ...request.statusHistory,
      { status: 'ready', timestamp: new Date().toISOString(), message: 'Environment ready' },
    ],
    connectionDetails: {
      vscodeUrl: `vscode://vscode-remote/attached-container+${containerId}/home/claudecode/workspace`,
      sshCommand: `ssh claudecode@${containerId}.claudeguard.internal`,
      webIdeUrl: `https://${containerId}.ide.claudeguard.dev`,
      containerId,
      expiresAt: expires,
    },
  }
}
