import { TemplateEngine } from './infrastructure/template-engine'
import { ZipPackager } from './infrastructure/zip-packager'
import { MockTelemetryAdapter } from './infrastructure/mock-telemetry'
import { GenerateConfigUseCase } from './application/use-cases/generate-config'
import { ProvisionEnvironmentUseCase } from './application/use-cases/provision-environment'
import type { TelemetryPort } from './domain/ports/telemetry-port'

const templateEngine = new TemplateEngine()
const packager = new ZipPackager()

export const generateConfigUseCase = new GenerateConfigUseCase(templateEngine, packager)
export const provisionEnvironmentUseCase = new ProvisionEnvironmentUseCase()
export const telemetryAdapter: TelemetryPort = new MockTelemetryAdapter()
