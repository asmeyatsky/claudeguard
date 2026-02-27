import type { GeneratedArtifact } from './template-engine-port'

export interface PackagerPort {
  packageArtifacts(artifacts: GeneratedArtifact[], projectName: string): Promise<Blob>
}
