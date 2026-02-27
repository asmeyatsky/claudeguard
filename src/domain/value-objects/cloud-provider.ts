export type CloudProviderId = 'gcp' | 'aws' | 'azure' | 'multi-cloud'

export interface CloudProviderConfig {
  readonly id: CloudProviderId
  readonly name: string
  readonly shortName: string
  readonly description: string
  readonly registry: string
  readonly secretsManager: string
  readonly orchestration: string[]
  readonly aiEndpoint: string
  readonly aiRoutingNote: string
  readonly loggingSink: string
  readonly firewallAllowDomains: readonly string[]
}

export const CLOUD_PROVIDERS: Record<CloudProviderId, CloudProviderConfig> = {
  gcp: {
    id: 'gcp',
    name: 'Google Cloud Platform',
    shortName: 'GCP',
    description: 'Artifact Registry, Cloud Run / GKE, Vertex AI PSC routing, Secret Manager, Cloud Logging',
    registry: 'Artifact Registry',
    secretsManager: 'Secret Manager',
    orchestration: ['Cloud Run', 'GKE'],
    aiEndpoint: 'Vertex AI',
    aiRoutingNote: 'Private Service Connect (PSC) routing to Anthropic API via Vertex AI',
    loggingSink: 'Cloud Logging',
    firewallAllowDomains: [
      'api.anthropic.com',
      '*.googleapis.com',
      'secretmanager.googleapis.com',
      'logging.googleapis.com',
      'artifactregistry.googleapis.com',
    ],
  },
  aws: {
    id: 'aws',
    name: 'Amazon Web Services',
    shortName: 'AWS',
    description: 'ECR, ECS Fargate / EKS, Bedrock PrivateLink routing, Secrets Manager, CloudWatch',
    registry: 'ECR',
    secretsManager: 'AWS Secrets Manager',
    orchestration: ['ECS Fargate', 'EKS'],
    aiEndpoint: 'Amazon Bedrock',
    aiRoutingNote: 'PrivateLink routing to Anthropic API via Amazon Bedrock',
    loggingSink: 'CloudWatch',
    firewallAllowDomains: [
      'api.anthropic.com',
      '*.amazonaws.com',
      'secretsmanager.*.amazonaws.com',
      'logs.*.amazonaws.com',
      'ecr.*.amazonaws.com',
    ],
  },
  azure: {
    id: 'azure',
    name: 'Microsoft Azure',
    shortName: 'Azure',
    description: 'ACR, ACI / AKS, cross-cloud routing via ExpressRoute, Key Vault, Azure Monitor',
    registry: 'Azure Container Registry',
    secretsManager: 'Azure Key Vault',
    orchestration: ['ACI', 'AKS'],
    aiEndpoint: 'Azure AI / Cross-cloud',
    aiRoutingNote: 'Cross-cloud routing to Anthropic API via ExpressRoute or direct',
    loggingSink: 'Azure Monitor',
    firewallAllowDomains: [
      'api.anthropic.com',
      '*.azure.com',
      '*.vault.azure.net',
      '*.monitor.azure.com',
      '*.azurecr.io',
    ],
  },
  'multi-cloud': {
    id: 'multi-cloud',
    name: 'Multi-Cloud',
    shortName: 'Multi',
    description: 'Terraform modules with provider-agnostic abstractions and provider-specific implementations',
    registry: 'Provider-specific (configured per environment)',
    secretsManager: 'Provider-specific (configured per environment)',
    orchestration: ['Kubernetes (any provider)'],
    aiEndpoint: 'Direct Anthropic API',
    aiRoutingNote: 'Direct HTTPS routing to api.anthropic.com with provider-specific VPN/peering',
    loggingSink: 'OpenTelemetry (provider-agnostic)',
    firewallAllowDomains: [
      'api.anthropic.com',
    ],
  },
}
