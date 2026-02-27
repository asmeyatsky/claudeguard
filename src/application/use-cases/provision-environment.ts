import {
  type ProvisioningRequest,
  advanceStatus,
  completeProvisioning,
  failProvisioning,
} from '../../domain/entities/provisioning-request'
import { PROVISIONING_STEPS, type ProvisioningStatus } from '../../domain/value-objects/provisioner-types'

const STEP_MESSAGES: Record<ProvisioningStatus, string> = {
  idle: 'Waiting...',
  requesting: 'Provisioning request submitted and validated',
  'resolving-policy': 'Combining org-level managed-settings.json with team overrides and project CLAUDE.md',
  'building-image': 'Building container image with resolved policy, runtimes, and security artifacts',
  'injecting-secrets': 'Injecting ANTHROPIC_API_KEY and Git credentials via secrets manager',
  'configuring-network': 'Applying firewall rules: default-deny egress, allowlisted domains, DNS restriction',
  'health-check': 'Verifying: Claude Code auth ✓ Firewall active ✓ managed-settings loaded ✓ Hooks registered ✓',
  ready: 'Environment ready — connection details available',
  failed: 'Provisioning failed',
}

export class ProvisionEnvironmentUseCase {
  async execute(
    request: ProvisioningRequest,
    onProgress: (updated: ProvisioningRequest) => void
  ): Promise<ProvisioningRequest> {
    let current = request

    try {
      for (const step of PROVISIONING_STEPS) {
        // Simulate processing time (800ms - 2500ms per step)
        const delay = 800 + Math.random() * 1700
        await new Promise((resolve) => setTimeout(resolve, delay))

        if (step.status === 'ready') {
          current = completeProvisioning(current)
        } else {
          current = advanceStatus(current, step.status, STEP_MESSAGES[step.status])
        }
        onProgress(current)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error during provisioning'
      current = failProvisioning(current, message)
      onProgress(current)
    }

    return current
  }
}
