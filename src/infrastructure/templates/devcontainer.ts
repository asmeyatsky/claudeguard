import type { ConfigProfile } from '../../domain/entities/config-profile'
import { RISK_PROFILES } from '../../domain/value-objects/risk-profile'
import type { GeneratedArtifact } from '../../domain/ports/template-engine-port'

export function generateDevcontainer(profile: ConfigProfile): GeneratedArtifact {
  const risk = RISK_PROFILES[profile.riskProfile]
  const isParanoid = profile.riskProfile === 'paranoid'
  const isStrict = profile.riskProfile === 'strict' || isParanoid

  const extensions: string[] = [
    'anthropics.claude-code',
  ]

  if (!isParanoid) {
    extensions.push(
      'ms-python.python',
      'dbaeumer.vscode-eslint',
      'esbenp.prettier-vscode',
    )
  }

  const settings: Record<string, unknown> = {
    'terminal.integrated.defaultProfile.linux': 'bash',
    'editor.formatOnSave': true,
    'files.autoSave': 'afterDelay',
  }

  if (isStrict) {
    settings['terminal.integrated.allowedShells'] = ['/bin/bash']
    settings['security.workspace.trust.enabled'] = true
  }

  const devcontainer: Record<string, unknown> = {
    name: `ClaudeGuard — ${profile.projectName}`,
    dockerComposeFile: 'docker-compose.yml',
    service: 'claude-code',
    workspaceFolder: '/home/claudecode/workspace',
    customizations: {
      vscode: {
        extensions,
        settings,
      },
    },
    postCreateCommand: 'echo "[ClaudeGuard] DevContainer ready. Risk profile: ' + risk.name + '"',
    postStartCommand: '/usr/local/bin/init-firewall.sh echo "Firewall active"',
    remoteUser: 'claudecode',
    features: {},
  }

  if (isStrict) {
    devcontainer.forwardPorts = []
    devcontainer.portsAttributes = { '*': { onAutoForward: 'ignore' } }
  }

  return {
    filename: 'devcontainer.json',
    content: JSON.stringify(devcontainer, null, 2),
    language: 'json',
    description: 'VS Code / Cursor DevContainer configuration with security settings',
  }
}
