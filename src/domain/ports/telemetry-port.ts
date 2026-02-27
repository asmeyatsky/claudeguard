import type { SecurityEvent, EnvironmentStatus, DashboardComplianceControl, DashboardMetrics } from '../value-objects/dashboard-types'

export interface TelemetryPort {
  getEvents(count: number): SecurityEvent[]
  getEnvironments(count: number): EnvironmentStatus[]
  getComplianceControls(): DashboardComplianceControl[]
  getMetrics(): DashboardMetrics
}
