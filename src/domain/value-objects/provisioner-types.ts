export type DeploymentTarget = 'docker-desktop' | 'cloud-run' | 'ecs-fargate' | 'kubernetes' | 'remote-vm'

export type EnvironmentTemplate = 'python-ds' | 'node-dev' | 'fullstack' | 'infra-architect' | 'ml-engineer' | 'custom'

export type ProvisioningStatus = 'idle' | 'requesting' | 'resolving-policy' | 'building-image' | 'injecting-secrets' | 'configuring-network' | 'health-check' | 'ready' | 'failed'

export interface DeploymentTargetConfig {
  readonly id: DeploymentTarget
  readonly name: string
  readonly description: string
  readonly bestFor: string
  readonly pros: string[]
  readonly cons: string[]
  readonly icon: string
  readonly estimatedTime: string
}

export interface EnvironmentTemplateConfig {
  readonly id: EnvironmentTemplate
  readonly name: string
  readonly description: string
  readonly runtimes: string[]
  readonly tools: string[]
  readonly mcpServers: string[]
  readonly icon: string
}

export const DEPLOYMENT_TARGETS: Record<DeploymentTarget, DeploymentTargetConfig> = {
  'docker-desktop': {
    id: 'docker-desktop',
    name: 'Local Docker Desktop',
    description: 'Run on the developer\'s local machine via Docker Desktop',
    bestFor: 'Individual developers on personal machines',
    pros: ['Lowest latency', 'Works offline', 'Familiar DX', 'No cloud costs'],
    cons: ['Requires Docker Desktop', 'Harder to enforce policy centrally'],
    icon: '🐳',
    estimatedTime: '~2 min',
  },
  'cloud-run': {
    id: 'cloud-run',
    name: 'Cloud Run (GCP)',
    description: 'Serverless container on Google Cloud Run',
    bestFor: 'Serverless, on-demand environments',
    pros: ['Scale to zero', 'No infra management', 'Fast cold starts', 'GCP-native'],
    cons: ['Ephemeral by default', 'Needs Cloud Storage for persistence'],
    icon: '☁️',
    estimatedTime: '~3 min',
  },
  'ecs-fargate': {
    id: 'ecs-fargate',
    name: 'ECS Fargate (AWS)',
    description: 'Serverless container on AWS ECS Fargate',
    bestFor: 'AWS-native teams',
    pros: ['Serverless', 'Bedrock integration', 'IAM-native auth'],
    cons: ['Cold start latency', 'VPC configuration complexity'],
    icon: '🟧',
    estimatedTime: '~4 min',
  },
  kubernetes: {
    id: 'kubernetes',
    name: 'Kubernetes (GKE/EKS/AKS)',
    description: 'Container on managed Kubernetes cluster',
    bestFor: 'Large-scale, multi-tenant deployments',
    pros: ['Maximum flexibility', 'Multi-tenant', 'Auto-scaling', 'Any cloud'],
    cons: ['Operational complexity', 'Requires K8s expertise'],
    icon: '⎈',
    estimatedTime: '~5 min',
  },
  'remote-vm': {
    id: 'remote-vm',
    name: 'Remote VM',
    description: 'Dedicated virtual machine with full OS isolation',
    bestFor: 'Maximum isolation / regulated workloads',
    pros: ['Hypervisor-level isolation', 'Full OS control', 'Persistent state'],
    cons: ['Slowest provisioning', 'Highest cost', 'Manual lifecycle'],
    icon: '🖥️',
    estimatedTime: '~8 min',
  },
}

export const ENVIRONMENT_TEMPLATES: Record<EnvironmentTemplate, EnvironmentTemplateConfig> = {
  'python-ds': {
    id: 'python-ds',
    name: 'Python Data Scientist',
    description: 'Jupyter, pandas, scikit-learn, matplotlib, and data analysis tooling',
    runtimes: ['Python 3.12', 'Jupyter Lab'],
    tools: ['pandas', 'numpy', 'scikit-learn', 'matplotlib', 'seaborn', 'dbt'],
    mcpServers: ['postgres', 'bigquery'],
    icon: '📊',
  },
  'node-dev': {
    id: 'node-dev',
    name: 'Node.js Developer',
    description: 'Node.js, TypeScript, React, and modern web development',
    runtimes: ['Node.js 22', 'TypeScript 5'],
    tools: ['npm', 'pnpm', 'eslint', 'prettier', 'vitest'],
    mcpServers: ['github', 'postgres'],
    icon: '🟩',
  },
  fullstack: {
    id: 'fullstack',
    name: 'Full-Stack Engineer',
    description: 'Node.js + Python with database and cloud tooling',
    runtimes: ['Node.js 22', 'Python 3.12', 'TypeScript 5'],
    tools: ['npm', 'pip', 'docker-cli', 'terraform', 'kubectl'],
    mcpServers: ['github', 'postgres', 'slack'],
    icon: '🔧',
  },
  'infra-architect': {
    id: 'infra-architect',
    name: 'Infrastructure Architect',
    description: 'Terraform, Kubernetes, cloud CLIs, and IaC tooling',
    runtimes: ['Python 3.12', 'Go 1.22'],
    tools: ['terraform', 'kubectl', 'helm', 'gcloud', 'aws-cli', 'az-cli', 'pulumi'],
    mcpServers: ['github'],
    icon: '🏗️',
  },
  'ml-engineer': {
    id: 'ml-engineer',
    name: 'ML Engineer',
    description: 'PyTorch, transformers, CUDA support, experiment tracking',
    runtimes: ['Python 3.12', 'CUDA 12'],
    tools: ['pytorch', 'transformers', 'wandb', 'mlflow', 'ray'],
    mcpServers: ['github', 'bigquery'],
    icon: '🧠',
  },
  custom: {
    id: 'custom',
    name: 'Custom',
    description: 'Start from a minimal base and configure manually',
    runtimes: ['Node.js 22'],
    tools: ['git'],
    mcpServers: [],
    icon: '⚡',
  },
}

export const PROVISIONING_STEPS: readonly { status: ProvisioningStatus; label: string; description: string }[] = [
  { status: 'requesting', label: 'Request Submitted', description: 'Provisioning request received and validated' },
  { status: 'resolving-policy', label: 'Resolving Policy', description: 'Combining org, team, and project security policies' },
  { status: 'building-image', label: 'Building Image', description: 'Container image built with resolved policy baked in' },
  { status: 'injecting-secrets', label: 'Injecting Secrets', description: 'Credentials injected via cloud secrets manager' },
  { status: 'configuring-network', label: 'Configuring Network', description: 'Firewall rules, DNS, and egress restrictions applied' },
  { status: 'health-check', label: 'Health Check', description: 'Verifying auth, firewall, settings, and hooks' },
  { status: 'ready', label: 'Ready', description: 'Environment is ready for use' },
]
