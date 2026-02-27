import type { ConfigProfile } from '../../domain/entities/config-profile'
import type { TemplateEnginePort, GeneratedArtifact } from '../../domain/ports/template-engine-port'
import type { PackagerPort } from '../../domain/ports/packager-port'

export interface GenerateConfigResult {
  artifacts: GeneratedArtifact[]
  downloadBlob: Blob
}

export class GenerateConfigUseCase {
  constructor(
    private readonly templateEngine: TemplateEnginePort,
    private readonly packager: PackagerPort
  ) {}

  generateArtifacts(profile: ConfigProfile): GeneratedArtifact[] {
    return this.templateEngine.generateAll(profile)
  }

  async generateAndPackage(profile: ConfigProfile): Promise<GenerateConfigResult> {
    const artifacts = this.templateEngine.generateAll(profile)
    const downloadBlob = await this.packager.packageArtifacts(artifacts, profile.projectName)
    return { artifacts, downloadBlob }
  }
}
