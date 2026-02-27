export interface SecurityEvent {
  readonly id: string
  readonly timestamp: string
  readonly type: 'permission_violation' | 'network_blocked' | 'credential_detected' | 'mcp_activity' | 'config_drift' | 'policy_override'
  readonly severity: 'critical' | 'high' | 'medium' | 'low' | 'info'
  readonly user: string
  readonly environment: string
  readonly tool: string
  readonly detail: string
  readonly resolved: boolean
}

export interface EnvironmentStatus {
  readonly id: string
  readonly name: string
  readonly user: string
  readonly team: string
  readonly status: 'healthy' | 'warning' | 'critical' | 'offline'
  readonly cloudProvider: string
  readonly riskProfile: string
  readonly policyCompliant: boolean
  readonly uptime: string
  readonly cpuUsage: number
  readonly memoryUsage: number
  readonly lastActivity: string
}

export interface DashboardComplianceControl {
  readonly id: string
  readonly framework: string
  readonly controlId: string
  readonly description: string
  readonly status: 'passing' | 'failing' | 'not-tested' | 'not-applicable'
  readonly evidenceAvailable: boolean
  readonly lastVerified: string
}

export interface DashboardMetrics {
  readonly securityScore: number
  readonly policyComplianceRate: number
  readonly activeEnvironments: number
  readonly totalUsers: number
  readonly eventsLast24h: number
  readonly criticalEvents: number
  readonly blockedConnections: number
  readonly credentialAlerts: number
  readonly avgCpuUsage: number
  readonly avgMemoryUsage: number
  readonly apiTokensUsed: number
  readonly costEstimate: number
}

export type DashboardView = 'executive' | 'events' | 'compliance' | 'operational'
