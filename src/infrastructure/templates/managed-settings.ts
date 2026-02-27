import type { ConfigProfile } from '../../domain/entities/config-profile'
import { COMPLIANCE_FRAMEWORKS } from '../../domain/value-objects/compliance-framework'
import { RISK_PROFILES } from '../../domain/value-objects/risk-profile'
import type { GeneratedArtifact } from '../../domain/ports/template-engine-port'

export function generateManagedSettings(profile: ConfigProfile): GeneratedArtifact {
  const risk = RISK_PROFILES[profile.riskProfile]
  const frameworks = profile.complianceFrameworks.map((id) => COMPLIANCE_FRAMEWORKS[id])

  const denyPaths = new Set<string>()
  frameworks.forEach((fw) => {
    fw.controls.forEach((c) => {
      if (c.settingPath === 'permissions.denyPaths' && Array.isArray(c.settingValue)) {
        ;(c.settingValue as string[]).forEach((p) => denyPaths.add(p))
      }
    })
  })

  const needsZdr = frameworks.some((fw) =>
    fw.controls.some((c) => c.settingPath === 'privacy.zdr' && c.settingValue === true)
  )

  const retentionValues = frameworks
    .flatMap((fw) => fw.controls)
    .filter((c) => c.settingPath === 'transcript.retention')
    .map((c) => c.settingValue as string)

  const shortestRetention = retentionValues.length > 0
    ? retentionValues.sort((a, b) => parseInt(a) - parseInt(b))[0]
    : '30d'

  const denyRules: Array<{ tool: string; command?: string; path?: string }> = []

  risk.permissionDefaults.deniedCommands.forEach((cmd) => {
    if (cmd === '*') {
      denyRules.push({ tool: 'Bash', command: '*' })
    } else {
      denyRules.push({ tool: 'Bash', command: cmd })
    }
  })

  denyPaths.forEach((p) => {
    denyRules.push({ tool: 'Read', path: p })
    denyRules.push({ tool: 'Write', path: p })
    denyRules.push({ tool: 'Edit', path: p })
  })

  const allowRules = risk.permissionDefaults.allowedTools.map((tool) => ({
    tool,
  }))

  const settings: Record<string, unknown> = {
    $schema: 'https://claude.ai/schemas/managed-settings.json',
    _metadata: {
      generator: 'ClaudeGuard Security Configurator',
      generatedAt: new Date().toISOString(),
      organization: profile.organizationName,
      project: profile.projectName,
      riskProfile: risk.name,
      complianceFrameworks: frameworks.map((fw) => fw.name),
    },
    permissions: {
      defaultBehavior: risk.permissionDefaults.defaultBehavior,
      deny: denyRules,
      allow: risk.permissionDefaults.defaultBehavior === 'deny' ? allowRules : [],
    },
    security: {
      bypassMode: risk.permissionDefaults.bypassMode,
      nonRootExecution: true,
    },
    hooks: {
      preToolUse: profile.riskProfile !== 'standard',
      postToolUse: profile.riskProfile !== 'standard',
      credentialScanning: profile.riskProfile !== 'standard',
    },
    transcript: {
      retention: shortestRetention,
    },
    audit: {
      enabled: true,
      sessionMetadata: frameworks.some((fw) =>
        fw.controls.some((c) => c.settingPath === 'audit.sessionMetadata')
      ),
      level: profile.riskProfile === 'paranoid' ? 'full' : profile.riskProfile === 'strict' ? 'detailed' : 'basic',
    },
    mcp: {
      enabled: profile.riskProfile !== 'paranoid',
      requireApproval: profile.riskProfile !== 'standard',
      allowedServers: profile.riskProfile === 'paranoid' ? [] : undefined,
    },
  }

  if (needsZdr) {
    settings.privacy = {
      zeroDataRetention: true,
      ...(frameworks.some((fw) => fw.id === 'gdpr')
        ? { dataResidency: 'eu', rightToErasure: true, consentManagement: true }
        : {}),
    }
  } else if (frameworks.some((fw) => fw.id === 'gdpr')) {
    settings.privacy = {
      dataResidency: 'eu',
      rightToErasure: true,
      consentManagement: true,
    }
  }

  return {
    filename: 'managed-settings.json',
    content: JSON.stringify(settings, null, 2),
    language: 'json',
    description: 'Enterprise-level Claude Code policy that cannot be overridden by developers',
  }
}
