import type { ConfigProfile } from '../entities/config-profile'

export interface GeneratedArtifact {
  readonly filename: string
  readonly content: string
  readonly language: string
  readonly description: string
}

export interface TemplateEnginePort {
  generateAll(profile: ConfigProfile): GeneratedArtifact[]
}
