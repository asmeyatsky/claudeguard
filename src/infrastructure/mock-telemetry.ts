import type {
  SecurityEvent,
  EnvironmentStatus,
  DashboardComplianceControl,
  DashboardMetrics,
} from '../domain/value-objects/dashboard-types'
import type { TelemetryPort } from '../domain/ports/telemetry-port'

const users = ['alice.chen', 'bob.kumar', 'carol.wright', 'david.okafor', 'elena.petrov', 'frank.garcia', 'gina.liu', 'henry.jones']
const teams = ['Platform', 'Data Science', 'Backend', 'Infrastructure', 'ML Ops', 'Security']
const tools = ['Bash', 'Write', 'Edit', 'Read', 'Glob', 'Grep', 'MCP:github', 'MCP:postgres']
const envNames = ['dev-notebook', 'ml-pipeline', 'api-service', 'infra-mgmt', 'data-analysis', 'research-env', 'staging-build', 'compliance-audit']

function randomFrom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomBetween(min: number, max: number): number {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10
}

function timeAgo(minutesAgo: number): string {
  const d = new Date(Date.now() - minutesAgo * 60 * 1000)
  return d.toISOString()
}

function relativeTime(iso: string): string {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export function generateEvents(count: number): SecurityEvent[] {
  const types: SecurityEvent['type'][] = ['permission_violation', 'network_blocked', 'credential_detected', 'mcp_activity', 'config_drift', 'policy_override']
  const severities: Record<SecurityEvent['type'], SecurityEvent['severity'][]> = {
    permission_violation: ['high', 'medium'],
    network_blocked: ['medium', 'low'],
    credential_detected: ['critical', 'high'],
    mcp_activity: ['info', 'low'],
    config_drift: ['high', 'medium'],
    policy_override: ['critical', 'high'],
  }
  const details: Record<SecurityEvent['type'], string[]> = {
    permission_violation: [
      'Attempted rm -rf /tmp/* — blocked by deny rule',
      'Write to /etc/hosts denied — sensitive path',
      'Bash execution denied — Strict mode active',
      'Attempted chmod 777 on project directory',
      'Write to .env file blocked by policy',
    ],
    network_blocked: [
      'Outbound connection to pastebin.com blocked',
      'DNS query for unknown-domain.xyz dropped',
      'Egress to 45.33.32.156:443 denied — not allowlisted',
      'Connection to metadata endpoint 169.254.169.254 blocked',
      'Attempted connection to raw.githubusercontent.com blocked',
    ],
    credential_detected: [
      'AWS Access Key pattern (AKIA...) detected in tool output',
      'GitHub PAT (ghp_...) found in generated code',
      'Private key header detected in file read output',
      'Anthropic API key (sk-ant-...) in environment output',
      'PostgreSQL connection string with password detected',
    ],
    mcp_activity: [
      'MCP:github — list_pull_requests invoked',
      'MCP:postgres — execute_query: SELECT * FROM users',
      'MCP:github — create_issue invoked',
      'MCP:slack — post_message to #engineering',
      'MCP:jira — transition_issue PROJ-123',
    ],
    config_drift: [
      'managed-settings.json hash mismatch — possible tampering',
      'Firewall rules modified outside of ClaudeGuard',
      'Hook script permissions changed from 555 to 755',
      'Docker resource limits reduced below policy minimum',
      'DNS resolver changed from corporate to public (8.8.8.8)',
    ],
    policy_override: [
      'Bypass mode activation attempted — blocked (Strict)',
      'User attempted to disable pre-tool-use hook',
      'managed-settings.json override attempted via env var',
      'Attempted to mount /etc as writable volume',
      'Security policy downgrade request from Strict to Standard',
    ],
  }

  return Array.from({ length: count }, (_, i) => {
    const type = randomFrom(types)
    return {
      id: `evt-${1000 + i}`,
      timestamp: timeAgo(Math.floor(Math.random() * 1440)),
      type,
      severity: randomFrom(severities[type]),
      user: randomFrom(users),
      environment: `${randomFrom(envNames)}-${Math.floor(Math.random() * 100)}`,
      tool: randomFrom(tools),
      detail: randomFrom(details[type]),
      resolved: Math.random() > 0.3,
    }
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export function generateEnvironments(count: number): EnvironmentStatus[] {
  const statuses: EnvironmentStatus['status'][] = ['healthy', 'healthy', 'healthy', 'healthy', 'warning', 'warning', 'critical', 'offline']
  const clouds = ['GCP', 'AWS', 'Azure']
  const profiles = ['Standard', 'Strict', 'Paranoid']

  return Array.from({ length: count }, (_, i) => {
    const status = randomFrom(statuses)
    return {
      id: `env-${100 + i}`,
      name: `${randomFrom(envNames)}-${100 + i}`,
      user: randomFrom(users),
      team: randomFrom(teams),
      status,
      cloudProvider: randomFrom(clouds),
      riskProfile: randomFrom(profiles),
      policyCompliant: status !== 'critical' && Math.random() > 0.1,
      uptime: `${Math.floor(Math.random() * 30)}d ${Math.floor(Math.random() * 24)}h`,
      cpuUsage: randomBetween(5, status === 'critical' ? 95 : 70),
      memoryUsage: randomBetween(10, status === 'critical' ? 98 : 75),
      lastActivity: relativeTime(timeAgo(Math.floor(Math.random() * 480))),
    }
  })
}

export function generateDashboardComplianceControls(): DashboardComplianceControl[] {
  const controls: Omit<DashboardComplianceControl, 'status' | 'evidenceAvailable' | 'lastVerified'>[] = [
    { id: 'cc-1', framework: 'SOC 2', controlId: 'CC6.1', description: 'Logical access security — unauthorized access prevented' },
    { id: 'cc-2', framework: 'SOC 2', controlId: 'CC6.2', description: 'System access authenticated before access granted' },
    { id: 'cc-3', framework: 'SOC 2', controlId: 'CC6.3', description: 'Access to data restricted to authorized personnel' },
    { id: 'cc-4', framework: 'SOC 2', controlId: 'CC7.1', description: 'Security events detected and monitored' },
    { id: 'cc-5', framework: 'SOC 2', controlId: 'CC7.2', description: 'Anomalies detected and evaluated' },
    { id: 'cc-6', framework: 'SOC 2', controlId: 'CC8.1', description: 'Changes to infrastructure managed and authorized' },
    { id: 'cc-7', framework: 'HIPAA', controlId: '164.312(a)', description: 'Access control — unique user identification' },
    { id: 'cc-8', framework: 'HIPAA', controlId: '164.312(b)', description: 'Audit controls — record and examine access' },
    { id: 'cc-9', framework: 'HIPAA', controlId: '164.312(c)', description: 'Integrity controls — protect PHI from alteration' },
    { id: 'cc-10', framework: 'HIPAA', controlId: '164.312(d)', description: 'Authentication — verify identity of persons seeking access' },
    { id: 'cc-11', framework: 'HIPAA', controlId: '164.312(e)', description: 'Transmission security — guard against unauthorized access' },
    { id: 'cc-12', framework: 'PCI-DSS', controlId: 'Req 1', description: 'Network segmentation and firewall configuration' },
    { id: 'cc-13', framework: 'PCI-DSS', controlId: 'Req 2', description: 'Secure configuration standards applied' },
    { id: 'cc-14', framework: 'PCI-DSS', controlId: 'Req 7', description: 'Access restricted on need-to-know basis' },
    { id: 'cc-15', framework: 'PCI-DSS', controlId: 'Req 10', description: 'Track and monitor all access to network and cardholder data' },
    { id: 'cc-16', framework: 'ISO 27001', controlId: 'A.9.1', description: 'Access control policy documented and enforced' },
    { id: 'cc-17', framework: 'ISO 27001', controlId: 'A.12.4', description: 'Event logging and monitoring active' },
    { id: 'cc-18', framework: 'ISO 27001', controlId: 'A.14.1', description: 'Security requirements for information systems' },
    { id: 'cc-19', framework: 'GDPR', controlId: 'Art. 25', description: 'Data protection by design and by default' },
    { id: 'cc-20', framework: 'GDPR', controlId: 'Art. 32', description: 'Security of processing — appropriate technical measures' },
    { id: 'cc-21', framework: 'GDPR', controlId: 'Art. 33', description: 'Notification of personal data breach within 72 hours' },
  ]

  const statusWeights: DashboardComplianceControl['status'][] = ['passing', 'passing', 'passing', 'passing', 'passing', 'failing', 'not-tested']

  return controls.map((c) => ({
    ...c,
    status: randomFrom(statusWeights),
    evidenceAvailable: Math.random() > 0.15,
    lastVerified: relativeTime(timeAgo(Math.floor(Math.random() * 10080))),
  }))
}

export function generateMetrics(): DashboardMetrics {
  return {
    securityScore: Math.floor(randomBetween(82, 98)),
    policyComplianceRate: randomBetween(95, 99.9),
    activeEnvironments: Math.floor(randomBetween(180, 320)),
    totalUsers: Math.floor(randomBetween(45, 120)),
    eventsLast24h: Math.floor(randomBetween(800, 15000)),
    criticalEvents: Math.floor(randomBetween(0, 8)),
    blockedConnections: Math.floor(randomBetween(50, 400)),
    credentialAlerts: Math.floor(randomBetween(1, 12)),
    avgCpuUsage: randomBetween(25, 55),
    avgMemoryUsage: randomBetween(35, 65),
    apiTokensUsed: Math.floor(randomBetween(500000, 3000000)),
    costEstimate: randomBetween(2400, 8500),
  }
}

export class MockTelemetryAdapter implements TelemetryPort {
  getEvents(count: number): SecurityEvent[] {
    return generateEvents(count)
  }
  getEnvironments(count: number): EnvironmentStatus[] {
    return generateEnvironments(count)
  }
  getComplianceControls(): DashboardComplianceControl[] {
    return generateDashboardComplianceControls()
  }
  getMetrics(): DashboardMetrics {
    return generateMetrics()
  }
}
