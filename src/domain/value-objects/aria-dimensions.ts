export type DimensionId = 'infrastructure' | 'identity' | 'data' | 'secops' | 'compliance' | 'ai-governance'

export interface Question {
  readonly id: string
  readonly text: string
  readonly dimension: DimensionId
  readonly weight: number
  readonly options: readonly QuestionOption[]
}

export interface QuestionOption {
  readonly label: string
  readonly score: number
  readonly description: string
}

export interface Dimension {
  readonly id: DimensionId
  readonly name: string
  readonly shortName: string
  readonly description: string
  readonly icon: string
  readonly color: string
}

export const DIMENSIONS: Record<DimensionId, Dimension> = {
  infrastructure: {
    id: 'infrastructure',
    name: 'Infrastructure Readiness',
    shortName: 'Infra',
    description: 'Container orchestration maturity, network segmentation, secrets management, CI/CD security',
    icon: '🏗️',
    color: 'electric',
  },
  identity: {
    id: 'identity',
    name: 'Identity & Access Governance',
    shortName: 'IAM',
    description: 'SSO integration, RBAC maturity, MFA enforcement, session management',
    icon: '🔑',
    color: 'amber-accent',
  },
  data: {
    id: 'data',
    name: 'Data Protection & Privacy',
    shortName: 'Data',
    description: 'Data classification, encryption posture, data residency, retention policies',
    icon: '🗄️',
    color: 'emerald-accent',
  },
  secops: {
    id: 'secops',
    name: 'Security Operations',
    shortName: 'SecOps',
    description: 'SIEM integration, incident response, vulnerability management, threat detection',
    icon: '🛡️',
    color: 'danger',
  },
  compliance: {
    id: 'compliance',
    name: 'Compliance & Audit',
    shortName: 'Audit',
    description: 'Regulatory alignment, audit trails, evidence collection, control mapping',
    icon: '📋',
    color: 'electric-light',
  },
  'ai-governance': {
    id: 'ai-governance',
    name: 'Agentic AI Governance',
    shortName: 'AI Gov',
    description: 'AI usage policies, prompt injection awareness, MCP governance, agent permissions',
    icon: '🤖',
    color: 'electric',
  },
}

export const DIMENSION_ORDER: readonly DimensionId[] = [
  'infrastructure', 'identity', 'data', 'secops', 'compliance', 'ai-governance',
]

const opt = (label: string, score: number, description: string): QuestionOption => ({
  label, score, description,
})

export const QUESTIONS: readonly Question[] = [
  // ── Infrastructure Readiness (10 questions) ──
  {
    id: 'infra-1', dimension: 'infrastructure', weight: 1.2,
    text: 'Does your organization have a container runtime (Docker, containerd, Podman) available in development and production?',
    options: [
      opt('No containers', 1, 'No container technology in use'),
      opt('Dev only', 2, 'Containers used in development but not production'),
      opt('Production ready', 3, 'Containers running in production with basic orchestration'),
      opt('Fully orchestrated', 4, 'Kubernetes or equivalent with auto-scaling and self-healing'),
      opt('Platform engineering', 5, 'Internal developer platform with self-service container provisioning'),
    ],
  },
  {
    id: 'infra-2', dimension: 'infrastructure', weight: 1.0,
    text: 'How mature is your network segmentation and firewall policy management?',
    options: [
      opt('Flat network', 1, 'Single network zone, no segmentation'),
      opt('Basic VLANs', 2, 'Some network zones but inconsistent policy enforcement'),
      opt('Segmented', 3, 'Network policies defined per environment (dev/staging/prod)'),
      opt('Micro-segmented', 4, 'Service-level network policies with zero-trust principles'),
      opt('Software-defined', 5, 'Fully automated network policy as code with continuous verification'),
    ],
  },
  {
    id: 'infra-3', dimension: 'infrastructure', weight: 1.1,
    text: 'How does your organization manage secrets (API keys, credentials, certificates)?',
    options: [
      opt('In code/config', 1, 'Secrets stored in source code or config files'),
      opt('Environment vars', 2, 'Secrets in environment variables, no central management'),
      opt('Secrets manager', 3, 'Centralized secrets manager (Vault, AWS SM, GCP SM) in use'),
      opt('Automated rotation', 4, 'Secrets manager with automated rotation and access auditing'),
      opt('Zero-standing', 5, 'Just-in-time secret provisioning with no standing credentials'),
    ],
  },
  {
    id: 'infra-4', dimension: 'infrastructure', weight: 1.0,
    text: 'Is container image scanning integrated into your CI/CD pipeline?',
    options: [
      opt('No scanning', 1, 'No image vulnerability scanning'),
      opt('Manual scans', 2, 'Occasional manual scanning of images'),
      opt('CI integrated', 3, 'Scanning runs in CI but does not block deployment'),
      opt('Gate blocking', 4, 'Critical/high vulnerabilities block deployment automatically'),
      opt('Continuous', 5, 'Continuous scanning of running images with automated patching'),
    ],
  },
  {
    id: 'infra-5', dimension: 'infrastructure', weight: 0.8,
    text: 'How do you manage infrastructure provisioning?',
    options: [
      opt('Manual / console', 1, 'Infrastructure provisioned manually via cloud console'),
      opt('Scripts', 2, 'Shell scripts or ad-hoc automation'),
      opt('IaC basics', 3, 'Terraform/Pulumi for core infrastructure, some manual steps remain'),
      opt('Full IaC', 4, 'All infrastructure as code, reviewed via PR, applied via CI/CD'),
      opt('GitOps', 5, 'Full GitOps with drift detection, auto-remediation, and policy as code'),
    ],
  },
  // ── Identity & Access (10 questions) ──
  {
    id: 'iam-1', dimension: 'identity', weight: 1.2,
    text: 'Is Single Sign-On (SSO) configured for your development tools and cloud consoles?',
    options: [
      opt('No SSO', 1, 'Individual accounts per service, no centralized auth'),
      opt('Partial SSO', 2, 'SSO for some tools, local accounts for others'),
      opt('SSO enforced', 3, 'SSO via corporate IdP for all primary tools'),
      opt('SSO + SCIM', 4, 'SSO with automated user provisioning/deprovisioning (SCIM)'),
      opt('Conditional access', 5, 'SSO with conditional access policies, device trust, and session controls'),
    ],
  },
  {
    id: 'iam-2', dimension: 'identity', weight: 1.1,
    text: 'How mature is your Role-Based Access Control (RBAC) implementation?',
    options: [
      opt('No formal roles', 1, 'Ad-hoc permissions, no defined roles'),
      opt('Basic roles', 2, 'Broad roles (admin/user) but not well-defined'),
      opt('Documented roles', 3, 'Roles documented and aligned to job functions'),
      opt('Least privilege', 4, 'Roles follow least privilege principle, reviewed quarterly'),
      opt('Attribute-based', 5, 'Fine-grained ABAC/RBAC with automated access certification'),
    ],
  },
  {
    id: 'iam-3', dimension: 'identity', weight: 1.0,
    text: 'Is Multi-Factor Authentication (MFA) enforced across your organization?',
    options: [
      opt('No MFA', 1, 'MFA not available or not used'),
      opt('Optional MFA', 2, 'MFA available but not enforced'),
      opt('Enforced for admins', 3, 'MFA enforced for privileged accounts'),
      opt('Enforced for all', 4, 'MFA enforced for all users via corporate policy'),
      opt('Phishing-resistant', 5, 'Hardware keys or passkeys enforced, SMS/TOTP phased out'),
    ],
  },
  {
    id: 'iam-4', dimension: 'identity', weight: 0.9,
    text: 'How do you manage service account and API key lifecycle?',
    options: [
      opt('Unmanaged', 1, 'Service accounts created ad-hoc, never reviewed'),
      opt('Inventory exists', 2, 'Service accounts inventoried but not regularly reviewed'),
      opt('Reviewed', 3, 'Regular access reviews for service accounts'),
      opt('Auto-expiring', 4, 'Service credentials auto-expire and require renewal'),
      opt('Workload identity', 5, 'Workload identity federation, no long-lived service credentials'),
    ],
  },
  {
    id: 'iam-5', dimension: 'identity', weight: 0.8,
    text: 'Do you have a formal access review process?',
    options: [
      opt('Never', 1, 'No access reviews performed'),
      opt('Annual', 2, 'Annual access reviews, often incomplete'),
      opt('Quarterly', 3, 'Quarterly reviews for privileged access'),
      opt('Continuous', 4, 'Automated access certification with manager approval workflows'),
      opt('Risk-adaptive', 5, 'Continuous access evaluation based on user risk score and behaviour'),
    ],
  },
  // ── Data Protection (10 questions) ──
  {
    id: 'data-1', dimension: 'data', weight: 1.2,
    text: 'Has your organization classified its data by sensitivity level?',
    options: [
      opt('No classification', 1, 'No data classification scheme exists'),
      opt('Informal', 2, 'Informal understanding of sensitive data, not documented'),
      opt('Policy exists', 3, 'Data classification policy documented and communicated'),
      opt('Applied', 4, 'Classification labels applied to data stores and enforced by tooling'),
      opt('Automated', 5, 'Automated data discovery and classification with DLP enforcement'),
    ],
  },
  {
    id: 'data-2', dimension: 'data', weight: 1.0,
    text: 'What is your encryption posture for data in transit and at rest?',
    options: [
      opt('Minimal', 1, 'Some services use HTTPS, no consistent policy'),
      opt('TLS enforced', 2, 'TLS enforced for external traffic, internal may be unencrypted'),
      opt('Full TLS', 3, 'TLS 1.2+ for all traffic, encryption at rest for databases'),
      opt('TLS 1.3 + managed keys', 4, 'TLS 1.3, customer-managed encryption keys (CMEK)'),
      opt('End-to-end', 5, 'End-to-end encryption with HSM-backed keys and certificate automation'),
    ],
  },
  {
    id: 'data-3', dimension: 'data', weight: 1.1,
    text: 'Are data residency and sovereignty requirements documented and enforced?',
    options: [
      opt('Not considered', 1, 'Data location not tracked or constrained'),
      opt('Known', 2, 'Data residency requirements known but not technically enforced'),
      opt('Region-locked', 3, 'Cloud resources deployed in required regions by policy'),
      opt('Enforced', 4, 'Technical controls prevent data from leaving required regions'),
      opt('Verified', 5, 'Continuous verification of data residency with automated alerting'),
    ],
  },
  {
    id: 'data-4', dimension: 'data', weight: 0.9,
    text: 'Do you have data retention and deletion policies?',
    options: [
      opt('No policies', 1, 'No data retention policies; data kept indefinitely'),
      opt('Informal', 2, 'Some understanding of retention needs, not enforced'),
      opt('Documented', 3, 'Retention policies documented per data category'),
      opt('Automated', 4, 'Automated retention enforcement with scheduled deletion'),
      opt('Verified', 5, 'Cryptographic verification of deletion, right-to-erasure automated'),
    ],
  },
  {
    id: 'data-5', dimension: 'data', weight: 0.8,
    text: 'Is Data Loss Prevention (DLP) tooling deployed?',
    options: [
      opt('None', 1, 'No DLP controls in place'),
      opt('Email only', 2, 'DLP for email/messaging, not for development tools'),
      opt('Endpoint DLP', 3, 'DLP on endpoints and cloud storage'),
      opt('API-level', 4, 'DLP integrated into API gateways and CI/CD pipelines'),
      opt('AI-aware', 5, 'DLP policies specifically cover AI tool interactions and prompt/response data'),
    ],
  },
  // ── Security Operations (10 questions) ──
  {
    id: 'secops-1', dimension: 'secops', weight: 1.2,
    text: 'Is a SIEM platform deployed and actively monitored?',
    options: [
      opt('No SIEM', 1, 'No centralized security event monitoring'),
      opt('Log aggregation', 2, 'Basic log aggregation but no correlation or alerting'),
      opt('SIEM deployed', 3, 'SIEM with basic correlation rules and alerting'),
      opt('Tuned SIEM', 4, 'SIEM with custom detection rules, low false-positive rate, 24/7 coverage'),
      opt('SOAR integrated', 5, 'SIEM with automated response playbooks (SOAR) and threat intelligence feeds'),
    ],
  },
  {
    id: 'secops-2', dimension: 'secops', weight: 1.1,
    text: 'Does your organization have a documented Incident Response plan?',
    options: [
      opt('None', 1, 'No incident response plan exists'),
      opt('Draft', 2, 'IR plan exists as a draft, never tested'),
      opt('Documented', 3, 'IR plan documented, roles assigned, basic training completed'),
      opt('Tested', 4, 'IR plan tested via tabletop exercises at least annually'),
      opt('Exercised', 5, 'Regular IR simulations including AI-specific scenarios, metrics tracked'),
    ],
  },
  {
    id: 'secops-3', dimension: 'secops', weight: 1.0,
    text: 'What is your vulnerability management cadence?',
    options: [
      opt('Ad-hoc', 1, 'Vulnerabilities addressed reactively when discovered'),
      opt('Quarterly scans', 2, 'Quarterly vulnerability scanning, patching not SLA-bound'),
      opt('Monthly + SLA', 3, 'Monthly scanning with defined patching SLAs by severity'),
      opt('Continuous', 4, 'Continuous scanning, critical CVEs patched within 48 hours'),
      opt('Predictive', 5, 'Predictive vulnerability prioritization, auto-patching for non-breaking fixes'),
    ],
  },
  {
    id: 'secops-4', dimension: 'secops', weight: 0.9,
    text: 'Do you have anomaly detection for user and system behaviour?',
    options: [
      opt('None', 1, 'No behavioural monitoring'),
      opt('Basic alerts', 2, 'Simple threshold-based alerts (e.g., failed login count)'),
      opt('UEBA basics', 3, 'User/entity behaviour analytics with baseline profiling'),
      opt('ML-driven', 4, 'ML-based anomaly detection with investigation workflows'),
      opt('AI-native', 5, 'AI-native detection including agentic tool behaviour patterns'),
    ],
  },
  {
    id: 'secops-5', dimension: 'secops', weight: 0.8,
    text: 'How do you handle threat intelligence?',
    options: [
      opt('None', 1, 'No threat intelligence programme'),
      opt('Free feeds', 2, 'Consume free threat intelligence feeds'),
      opt('Commercial TI', 3, 'Commercial threat intel integrated into SIEM'),
      opt('Contextual', 4, 'Threat intel contextualized to your tech stack and industry'),
      opt('Proactive', 5, 'Proactive threat hunting including AI/agentic-specific threat vectors'),
    ],
  },
  // ── Compliance & Audit (10 questions) ──
  {
    id: 'comp-1', dimension: 'compliance', weight: 1.2,
    text: 'Which compliance frameworks does your organization actively maintain?',
    options: [
      opt('None', 1, 'No formal compliance frameworks adopted'),
      opt('One framework', 2, 'One framework (e.g., SOC 2) with initial implementation'),
      opt('Certified', 3, 'One or more certifications actively maintained (annual audits)'),
      opt('Multiple', 4, 'Multiple frameworks with unified control mapping'),
      opt('Continuous', 5, 'Continuous compliance with automated evidence collection and GRC platform'),
    ],
  },
  {
    id: 'comp-2', dimension: 'compliance', weight: 1.0,
    text: 'How comprehensive is your audit trail capability?',
    options: [
      opt('Minimal', 1, 'Some application logs but no systematic audit trail'),
      opt('Basic logging', 2, 'Authentication and admin action logging'),
      opt('Comprehensive', 3, 'All user actions logged with timestamps and user attribution'),
      opt('Tamper-proof', 4, 'Immutable audit logs with centralized storage and retention policy'),
      opt('Real-time', 5, 'Real-time audit streaming with automated compliance checks and alerting'),
    ],
  },
  {
    id: 'comp-3', dimension: 'compliance', weight: 1.1,
    text: 'How is compliance evidence collected for audits?',
    options: [
      opt('Manual', 1, 'Evidence collected manually before each audit'),
      opt('Partially scripted', 2, 'Some automation but mostly manual evidence gathering'),
      opt('Scheduled', 3, 'Scheduled automated evidence collection for key controls'),
      opt('Continuous', 4, 'Continuous evidence collection mapped to control frameworks'),
      opt('Automated + attested', 5, 'Automated collection with cryptographic attestation and auditor portal'),
    ],
  },
  {
    id: 'comp-4', dimension: 'compliance', weight: 0.9,
    text: 'Do your controls map to specific framework requirements?',
    options: [
      opt('No mapping', 1, 'Controls exist but are not mapped to framework requirements'),
      opt('Spreadsheet', 2, 'Mapping exists in spreadsheets, occasionally updated'),
      opt('GRC tool', 3, 'Control mapping in a GRC tool, maintained by compliance team'),
      opt('Automated', 4, 'Controls automatically mapped to multiple frameworks with gap identification'),
      opt('Dynamic', 5, 'Dynamic control mapping with real-time effectiveness scoring'),
    ],
  },
  {
    id: 'comp-5', dimension: 'compliance', weight: 0.8,
    text: 'How do you handle regulatory change management?',
    options: [
      opt('Reactive', 1, 'Learn about regulatory changes when auditors flag them'),
      opt('Monitored', 2, 'Subscribe to regulatory update services'),
      opt('Assessed', 3, 'New regulations assessed for impact within 30 days'),
      opt('Managed', 4, 'Regulatory change programme with impact assessment and remediation tracking'),
      opt('Automated', 5, 'Automated regulatory monitoring with AI-assisted impact analysis'),
    ],
  },
  // ── Agentic AI Governance (10 questions) ──
  {
    id: 'ai-1', dimension: 'ai-governance', weight: 1.3,
    text: 'Does your organization have an Acceptable Use Policy for AI coding tools?',
    options: [
      opt('No policy', 1, 'No AI usage policy exists; tools used without governance'),
      opt('Informal guidance', 2, 'Informal guidance shared via email or chat, not enforced'),
      opt('Documented policy', 3, 'Formal AI acceptable use policy, communicated to all staff'),
      opt('Enforced policy', 4, 'Policy enforced via technical controls (managed settings, hooks)'),
      opt('Adaptive policy', 5, 'Policy continuously updated based on usage data and emerging threats'),
    ],
  },
  {
    id: 'ai-2', dimension: 'ai-governance', weight: 1.2,
    text: 'Has your security team been trained on agentic AI threat vectors (prompt injection, tool abuse, data exfiltration)?',
    options: [
      opt('No training', 1, 'Security team has no specific AI threat training'),
      opt('Self-study', 2, 'Individual team members have self-studied AI security topics'),
      opt('Formal training', 3, 'Security team completed formal agentic AI security training'),
      opt('Red team exercises', 4, 'Team conducts regular prompt injection and agent abuse red teaming'),
      opt('Continuous education', 5, 'Ongoing AI security education with internal knowledge base and attack library'),
    ],
  },
  {
    id: 'ai-3', dimension: 'ai-governance', weight: 1.1,
    text: 'Do you have a review process for MCP (Model Context Protocol) server connections?',
    options: [
      opt('No awareness', 1, 'MCP not understood or considered'),
      opt('Known concept', 2, 'Team understands MCP but no governance process'),
      opt('Approval required', 3, 'MCP server connections require security team approval'),
      opt('Registry managed', 4, 'Approved MCP server registry with automated enforcement'),
      opt('Supply chain secured', 5, 'MCP servers undergo supply chain review, pinned versions, integrity verification'),
    ],
  },
  {
    id: 'ai-4', dimension: 'ai-governance', weight: 1.0,
    text: 'How do you manage Claude Code permission boundaries?',
    options: [
      opt('Unmanaged', 1, 'Claude Code runs with whatever permissions the user has'),
      opt('User-managed', 2, 'Users configure their own permission settings'),
      opt('Managed settings', 3, 'Organization deploys managed-settings.json with baseline controls'),
      opt('Layered policy', 4, 'Org + team + project permission layers with deny-takes-precedence'),
      opt('Adaptive', 5, 'Dynamic permissions that adjust based on context, user risk, and sensitivity'),
    ],
  },
  {
    id: 'ai-5', dimension: 'ai-governance', weight: 1.0,
    text: 'Do you monitor and audit what Claude Code does across your organization?',
    options: [
      opt('No visibility', 1, 'No monitoring of agentic AI tool activity'),
      opt('Local logs', 2, 'Users can check their own session transcripts'),
      opt('Centralized logs', 3, 'Tool invocations and file changes logged centrally'),
      opt('SIEM integrated', 4, 'AI tool activity streamed to SIEM with correlation rules'),
      opt('Real-time dashboard', 5, 'Dedicated dashboard with anomaly detection, policy compliance, and audit trails'),
    ],
  },
  {
    id: 'ai-6', dimension: 'ai-governance', weight: 0.9,
    text: 'How do you handle credential exposure risk from AI coding tools?',
    options: [
      opt('Not considered', 1, 'Credential exposure via AI tools not considered a risk'),
      opt('Awareness', 2, 'Developers told not to share secrets with AI tools'),
      opt('.env excluded', 3, '.env and secret files excluded from AI tool access'),
      opt('Scanning hooks', 4, 'Pre/post execution hooks scan for credential patterns'),
      opt('Zero exposure', 5, 'Credential injection via secrets manager, AI tool never sees raw credentials'),
    ],
  },
  {
    id: 'ai-7', dimension: 'ai-governance', weight: 0.9,
    text: 'Do you control which AI models and providers your tools can connect to?',
    options: [
      opt('Unrestricted', 1, 'Any AI model endpoint can be used'),
      opt('Preferred vendor', 2, 'Preferred vendor communicated but not enforced'),
      opt('Approved list', 3, 'Approved model/provider list, enforced by network policy'),
      opt('VPC routed', 4, 'AI traffic routed through VPC/private endpoints only'),
      opt('Proxy controlled', 5, 'AI gateway proxy with model governance, rate limiting, and content filtering'),
    ],
  },
  {
    id: 'ai-8', dimension: 'ai-governance', weight: 0.8,
    text: 'Do you have data handling policies specific to AI-generated code?',
    options: [
      opt('None', 1, 'AI-generated code treated same as human code, no special handling'),
      opt('Awareness', 2, 'Developers aware that AI code should be reviewed'),
      opt('Review required', 3, 'AI-generated code requires human review before merge'),
      opt('Scanning', 4, 'Automated security scanning of AI-generated code in CI/CD'),
      opt('Full lifecycle', 5, 'AI code attribution, review, scanning, and provenance tracking'),
    ],
  },
  {
    id: 'ai-9', dimension: 'ai-governance', weight: 0.8,
    text: 'How prepared are you for prompt injection attacks against your AI tools?',
    options: [
      opt('Unaware', 1, 'Prompt injection not understood as a threat'),
      opt('Aware', 2, 'Security team aware of prompt injection conceptually'),
      opt('Mitigated', 3, 'Input validation and sandboxing reduce prompt injection surface'),
      opt('Tested', 4, 'Regular prompt injection testing with documented mitigations'),
      opt('Defense in depth', 5, 'Multi-layer prompt injection defense with monitoring and automated response'),
    ],
  },
  {
    id: 'ai-10', dimension: 'ai-governance', weight: 0.7,
    text: 'Do you have an AI incident response playbook?',
    options: [
      opt('None', 1, 'No AI-specific incident procedures'),
      opt('General IR', 2, 'AI incidents handled via general IR process'),
      opt('AI section', 3, 'IR plan includes AI-specific scenarios and escalation paths'),
      opt('Dedicated playbook', 4, 'Dedicated AI incident playbook with rehearsed scenarios'),
      opt('Automated response', 5, 'Automated containment for AI incidents (kill switch, permission revoke, session freeze)'),
    ],
  },
]
