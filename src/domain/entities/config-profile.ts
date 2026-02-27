import type { ComplianceFrameworkId } from '../value-objects/compliance-framework'
import type { RiskProfileId } from '../value-objects/risk-profile'
import type { CloudProviderId } from '../value-objects/cloud-provider'

export interface ConfigProfile {
  readonly complianceFrameworks: readonly ComplianceFrameworkId[]
  readonly cloudProvider: CloudProviderId
  readonly riskProfile: RiskProfileId
  readonly projectName: string
  readonly organizationName: string
}

export function createConfigProfile(
  overrides: Partial<ConfigProfile> = {}
): ConfigProfile {
  return {
    complianceFrameworks: overrides.complianceFrameworks ?? ['baseline'],
    cloudProvider: overrides.cloudProvider ?? 'gcp',
    riskProfile: overrides.riskProfile ?? 'standard',
    projectName: overrides.projectName ?? 'my-project',
    organizationName: overrides.organizationName ?? 'My Organization',
  }
}

export function updateConfigProfile(
  profile: ConfigProfile,
  updates: Partial<ConfigProfile>
): ConfigProfile {
  return { ...profile, ...updates }
}
