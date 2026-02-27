export const problems = [
  {
    title: "No Readiness Framework",
    description: "No standardised way to assess whether an organization's infrastructure, policies, and culture are ready for agentic AI tooling.",
    icon: "clipboard",
  },
  {
    title: "Configuration Complexity",
    description: "Claude Code's security model — permission hierarchies, managed settings, hooks, MCP governance — is powerful but complex.",
    icon: "cog",
  },
  {
    title: "Provisioning Friction",
    description: "Getting a secure Claude Code environment requires Docker expertise, firewall configuration, credential management, and IDE integration.",
    icon: "clock",
  },
  {
    title: "Operational Blindness",
    description: "No unified view of what Claude Code is doing across the estate — files accessed, commands run, MCP servers active, policies enforced.",
    icon: "eye-off",
  },
  {
    title: "Compliance Evidence Gap",
    description: "Regulated industries need continuous evidence that agentic AI tools comply with SOC 2, HIPAA, PCI-DSS, ISO 27001, and GDPR.",
    icon: "shield-alert",
  },
];

export const lifecyclePhases = [
  {
    phase: 1,
    name: "ASSESS",
    module: "ARIA Assessment",
    color: "electric",
    input: "Organizational context, existing controls, compliance requirements",
    output: "Maturity score, gap analysis, prioritised roadmap",
    description: "Structured, repeatable methodology for evaluating readiness to deploy agentic AI tools.",
  },
  {
    phase: 2,
    name: "CONFIGURE",
    module: "Security Configurator",
    color: "amber-accent",
    input: "ARIA findings + cloud provider + risk profile selections",
    output: "Hardened deployment package: managed-settings.json, Dockerfile, docker-compose.yml, firewall rules, hook scripts",
    description: "Interactive engine that generates complete, hardened deployment packages tailored to your requirements.",
  },
  {
    phase: 3,
    name: "DEPLOY",
    module: "Sandbox Provisioner",
    color: "emerald-accent",
    input: "Configuration package + infrastructure credentials",
    output: "Running, hardened Claude Code environments per knowledge worker",
    description: "Self-service provisioning that deploys pre-hardened Claude Code containers in minutes, not days.",
  },
  {
    phase: 4,
    name: "MONITOR",
    module: "Security Dashboard",
    color: "danger",
    input: "Runtime telemetry, audit logs, permission events",
    output: "Real-time security posture, compliance scoring, alerting, audit reports",
    description: "Real-time operational visibility across all Claude Code deployments with compliance scoring.",
  },
];

export const ariaDimensions = [
  { name: "Infrastructure Readiness", short: "Infra", description: "Container orchestration, network segmentation, secrets management, CI/CD security" },
  { name: "Identity & Access Governance", short: "IAM", description: "SSO integration, RBAC maturity, MFA enforcement, session management" },
  { name: "Data Protection & Privacy", short: "Data", description: "Data classification, encryption, data residency, retention policies, DLP" },
  { name: "Security Operations", short: "SecOps", description: "SIEM integration, incident response, vulnerability management, threat detection" },
  { name: "Compliance & Audit", short: "Audit", description: "Regulatory alignment, audit trails, evidence collection, control mapping" },
  { name: "Agentic AI Governance", short: "AI Gov", description: "AI usage policies, prompt injection awareness, MCP governance, agent permissions" },
];

export const maturityLevels = [
  { level: 1, label: "Initial", description: "No formal controls. Claude Code should NOT be deployed.", color: "danger" },
  { level: 2, label: "Developing", description: "Some controls exist. Limited pilot only (5-10 users).", color: "amber-accent" },
  { level: 3, label: "Defined", description: "Controls documented & consistent. Up to 50 users with monitoring.", color: "electric" },
  { level: 4, label: "Managed", description: "Measured & monitored. Broad deployment with self-service.", color: "electric-light" },
  { level: 5, label: "Optimising", description: "Continuous improvement. Full autonomous operation.", color: "emerald-accent" },
];

export const complianceFrameworks = [
  { name: "SOC 2 Type II", controls: "Audit logging, session metadata, access reviews, change management" },
  { name: "HIPAA", controls: "ZDR mode, PHI path deny rules, enhanced encryption, transcript cleanup" },
  { name: "PCI-DSS", controls: "Network segmentation, cardholder data deny rules, VPC routing, vuln scanning" },
  { name: "ISO 27001", controls: "ISMS control mapping, risk treatment, management review, improvement metrics" },
  { name: "GDPR", controls: "Data residency, right-to-erasure, consent management, privacy impact assessment" },
];

export const riskProfiles = [
  {
    name: "Standard",
    description: "Balanced security and developer experience",
    useCase: "Tech companies, SaaS startups, digital agencies",
    level: 1,
  },
  {
    name: "Strict",
    description: "Security-first posture. Deny by default, mandatory hooks",
    useCase: "Financial services, healthcare, government, legal",
    level: 2,
  },
  {
    name: "Paranoid",
    description: "Maximum isolation. VPC-only, ZDR, read-only filesystem, no MCP",
    useCase: "Defence, intelligence, critical infrastructure",
    level: 3,
  },
];

export const artifacts = [
  { name: "managed-settings.json", description: "Enterprise-level Claude Code policy that cannot be overridden" },
  { name: "Dockerfile", description: "Container image with security hardening, non-root user, firewall" },
  { name: "docker-compose.yml", description: "Multi-service orchestration with network isolation" },
  { name: "init-firewall.sh", description: "Container-level network policy with default-deny outbound" },
  { name: "hooks/", description: "Pre/post execution gate scripts for validation and auditing" },
  { name: "devcontainer.json", description: "VS Code / Cursor DevContainer configuration" },
  { name: "terraform/", description: "Infrastructure-as-Code for cloud provider resources" },
  { name: "CLAUDE.md", description: "Project-level instructions for Claude Code behaviour" },
  { name: "compliance-mapping.xlsx", description: "Control-to-configuration mapping for audit evidence" },
];

export const deploymentTargets = [
  { name: "Local Docker Desktop", best: "Individual developers", pros: "Lowest latency, works offline" },
  { name: "Cloud Run (GCP)", best: "Serverless, on-demand", pros: "Scale to zero, fast cold starts" },
  { name: "ECS Fargate (AWS)", best: "AWS-native teams", pros: "Serverless, Bedrock integration" },
  { name: "GKE / EKS / AKS", best: "Large-scale Kubernetes", pros: "Maximum flexibility, multi-tenant" },
  { name: "Remote VM", best: "Maximum isolation", pros: "Hypervisor-level isolation, full OS control" },
];

export const dashboardViews = [
  {
    name: "Executive Overview",
    description: "Composite security score, active environments, policy compliance rate, risk heatmap, incident timeline",
    audience: "CISOs & Security Leads",
  },
  {
    name: "Security Events",
    description: "Permission violations, network egress attempts, credential exposure alerts, MCP server activity, config drift",
    audience: "Security Analysts & DevSecOps",
  },
  {
    name: "Compliance Centre",
    description: "Framework dashboards, evidence library, audit report generator, continuous compliance monitoring",
    audience: "Compliance Officers & Auditors",
  },
  {
    name: "Operational Metrics",
    description: "Resource utilisation, API usage, environment health, adoption metrics, cost forecasting",
    audience: "Platform Engineers",
  },
];

export const personas = [
  { role: "CISO / Security Lead", module: "ARIA + Dashboard", outcome: "Confidence that AI adoption is governed and auditable", icon: "shield" },
  { role: "Platform Engineer", module: "Configurator + Provisioner", outcome: "Self-service Claude Code environments at scale", icon: "server" },
  { role: "DevSecOps Engineer", module: "Configurator + Dashboard", outcome: "Hardened configs, real-time policy enforcement", icon: "lock" },
  { role: "IT Administrator", module: "Provisioner + Dashboard", outcome: "Centralized management of all Claude Code instances", icon: "monitor" },
  { role: "Knowledge Worker", module: "Provisioner", outcome: "Secure Claude Code environment in minutes, not days", icon: "user" },
  { role: "Compliance Officer", module: "ARIA + Dashboard", outcome: "Continuous compliance evidence and audit trails", icon: "file-check" },
];

export const pricingTiers = [
  {
    name: "Starter",
    price: "15",
    period: "/user/month",
    features: [
      "1 ARIA Assessment",
      "Standard + Strict profiles",
      "Up to 10 environments",
      "Basic events + 7-day retention",
      "Community support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "45",
    period: "/user/month",
    features: [
      "Unlimited assessments",
      "All profiles + custom rules",
      "Up to 100 environments",
      "Full dashboard + 30-day retention",
      "Email + chat support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: [
      "Unlimited + benchmarking",
      "All + Terraform + templates",
      "Unlimited + multi-cloud",
      "Full + SIEM + 90-day retention",
      "Dedicated CSM + SLA",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
  {
    name: "Consulting",
    price: "Day Rate",
    period: "",
    features: [
      "Consultant-led + white-label",
      "Custom policy development",
      "Custom deployment architecture",
      "Custom dashboards + integrations",
      "On-site + priority support",
    ],
    cta: "Talk to Us",
    highlighted: false,
  },
];

export const roadmapPhases = [
  {
    phase: 1,
    name: "Foundation",
    timeline: "Weeks 1-4",
    deliverables: "Security Configurator with Standard and Strict profiles. Generates managed-settings.json, Dockerfile, docker-compose.yml, firewall rules.",
    criteria: "10+ configurations generated by external users",
  },
  {
    phase: 2,
    name: "Assessment",
    timeline: "Weeks 5-8",
    deliverables: "ARIA Assessment module with six-dimension questionnaire, automated scoring, gap analysis, and report generation.",
    criteria: "5+ assessments completed with real organizations",
  },
  {
    phase: 3,
    name: "Monitoring",
    timeline: "Weeks 9-14",
    deliverables: "Security Posture Dashboard with executive overview, security events, compliance centre. SIEM integration and alerting.",
    criteria: "Dashboard processing real telemetry from 10+ environments",
  },
  {
    phase: 4,
    name: "Provisioning",
    timeline: "Weeks 15-20",
    deliverables: "Sandbox Provisioner with self-service portal, environment templates, lifecycle management for Docker Desktop and GCP.",
    criteria: "50+ environments provisioned, avg < 5 minutes",
  },
  {
    phase: 5,
    name: "Platform",
    timeline: "Weeks 21-26",
    deliverables: "Multi-cloud support, advanced ARIA features, Paranoid profile, API access, white-labelling for partners.",
    criteria: "Multi-cloud validated, 3+ paying organizations",
  },
];

export const integrations = [
  { name: "Anthropic API", purpose: "Configuration validation & policy sync", protocol: "REST + OAuth 2.0" },
  { name: "GCP / AWS / Azure", purpose: "Container orchestration, VPC, secrets", protocol: "Provider SDKs, Terraform" },
  { name: "Okta / Azure AD / Auth0", purpose: "SSO, user provisioning, group sync", protocol: "SAML 2.0, OIDC, SCIM" },
  { name: "Splunk / Elastic / Sentinel", purpose: "Security event export & correlation", protocol: "Syslog, webhook, native" },
  { name: "GitHub Actions / GitLab / Jenkins", purpose: "Automated config deployment", protocol: "REST API, CLI, actions" },
  { name: "Docker / Kubernetes", purpose: "Container & orchestration management", protocol: "Docker API, K8s API" },
];
