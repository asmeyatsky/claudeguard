import type { ConfigProfile } from '../domain/entities/config-profile'
import type { GeneratedArtifact, TemplateEnginePort } from '../domain/ports/template-engine-port'
import { generateManagedSettings } from './templates/managed-settings'
import { generateDockerfile } from './templates/dockerfile'
import { generateDockerCompose } from './templates/docker-compose'
import { generateFirewall } from './templates/firewall'
import { generatePreToolUseHook, generatePostToolUseHook } from './templates/hooks'
import { generateDevcontainer } from './templates/devcontainer'
import { generateClaudeMd } from './templates/claude-md'

export class TemplateEngine implements TemplateEnginePort {
  generateAll(profile: ConfigProfile): GeneratedArtifact[] {
    const artifacts: GeneratedArtifact[] = [
      generateManagedSettings(profile),
      generateDockerfile(profile),
      generateDockerCompose(profile),
      generateFirewall(profile),
      generateDevcontainer(profile),
      generateClaudeMd(profile),
    ]

    if (profile.riskProfile !== 'standard') {
      artifacts.push(generatePreToolUseHook(profile))
      artifacts.push(generatePostToolUseHook(profile))
    }

    return artifacts
  }
}
