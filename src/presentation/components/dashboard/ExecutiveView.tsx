import { memo, useMemo } from 'react'
import type { DashboardMetrics, SecurityEvent, EnvironmentStatus } from '../../../domain/value-objects/dashboard-types'

interface ExecutiveViewProps {
  metrics: DashboardMetrics
  events: SecurityEvent[]
  environments: EnvironmentStatus[]
}

const scoreColor = (score: number) =>
  score >= 90 ? 'text-emerald-accent' : score >= 70 ? 'text-amber-accent' : 'text-danger'

const scoreRing = (score: number) =>
  score >= 90 ? 'stroke-emerald-accent' : score >= 70 ? 'stroke-amber-accent' : 'stroke-danger'

export default memo(function ExecutiveView({ metrics, events, environments }: ExecutiveViewProps) {
  const unresolvedCritical = useMemo(
    () => events.filter((e) => e.severity === 'critical' && !e.resolved),
    [events]
  )

  const teamCounts = useMemo(
    () => environments.reduce<Record<string, number>>((acc, env) => {
      acc[env.team] = (acc[env.team] || 0) + 1
      return acc
    }, {}),
    [environments]
  )

  const statusCounts = useMemo(
    () => environments.reduce<Record<string, number>>((acc, env) => {
      acc[env.status] = (acc[env.status] || 0) + 1
      return acc
    }, {}),
    [environments]
  )

  const driftCount = useMemo(
    () => events.filter((e) => e.type === 'config_drift').length,
    [events]
  )

  const recentEvents = useMemo(() => events.slice(0, 8), [events])

  // SVG donut for security score
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (metrics.securityScore / 100) * circumference

  return (
    <div className="space-y-6">
      {/* Top KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Security Score */}
        <div className="glass-card rounded-xl p-5 flex flex-col items-center">
          <svg width="100" height="100" viewBox="0 0 100 100" className="mb-2">
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(30,41,59,0.5)" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="45" fill="none"
              className={scoreRing(metrics.securityScore)}
              strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 50 50)"
            />
            <text x="50" y="50" textAnchor="middle" dominantBaseline="central" className={`text-2xl font-bold ${scoreColor(metrics.securityScore)}`} fill="currentColor">
              {metrics.securityScore}
            </text>
          </svg>
          <div className="text-xs text-navy-500">Security Score</div>
        </div>

        {/* Policy Compliance */}
        <div className="glass-card rounded-xl p-5 text-center">
          <div className={`text-3xl font-bold mb-1 ${metrics.policyComplianceRate >= 98 ? 'text-emerald-accent' : 'text-amber-accent'}`}>
            {metrics.policyComplianceRate}%
          </div>
          <div className="text-xs text-navy-500">Policy Compliance</div>
          {driftCount > 0 && (
            <div className="text-[10px] text-amber-accent mt-1">{driftCount} drift events</div>
          )}
        </div>

        {/* Active Environments */}
        <div className="glass-card rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-white mb-1">{metrics.activeEnvironments}</div>
          <div className="text-xs text-navy-500">Active Environments</div>
          <div className="text-[10px] text-navy-600 mt-1">{metrics.totalUsers} users</div>
        </div>

        {/* Critical Events */}
        <div className="glass-card rounded-xl p-5 text-center">
          <div className={`text-3xl font-bold mb-1 ${unresolvedCritical.length > 0 ? 'text-danger' : 'text-emerald-accent'}`}>
            {unresolvedCritical.length}
          </div>
          <div className="text-xs text-navy-500">Unresolved Critical</div>
          <div className="text-[10px] text-navy-600 mt-1">{metrics.eventsLast24h.toLocaleString()} events (24h)</div>
        </div>
      </div>

      {/* Risk Heatmap + Environment Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk by Team */}
        <div className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Environments by Team</h3>
          <div className="space-y-3">
            {Object.entries(teamCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([team, count]) => {
                const maxCount = Math.max(...Object.values(teamCounts))
                const pct = (count / maxCount) * 100
                return (
                  <div key={team}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-navy-300">{team}</span>
                      <span className="text-navy-500">{count}</span>
                    </div>
                    <div className="h-2 bg-navy-800 rounded-full overflow-hidden">
                      <div className="h-full bg-electric rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        {/* Environment Health */}
        <div className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Environment Health</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[
              { label: 'Healthy', count: statusCounts['healthy'] || 0, color: 'text-emerald-accent', bg: 'bg-emerald-accent' },
              { label: 'Warning', count: statusCounts['warning'] || 0, color: 'text-amber-accent', bg: 'bg-amber-accent' },
              { label: 'Critical', count: statusCounts['critical'] || 0, color: 'text-danger', bg: 'bg-danger' },
              { label: 'Offline', count: statusCounts['offline'] || 0, color: 'text-navy-500', bg: 'bg-navy-600' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${s.bg}`} />
                <div>
                  <div className={`text-lg font-bold ${s.color}`}>{s.count}</div>
                  <div className="text-[10px] text-navy-500">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Mini bar showing distribution */}
          <div className="h-3 rounded-full overflow-hidden flex">
            {[
              { count: statusCounts['healthy'] || 0, color: 'bg-emerald-accent' },
              { count: statusCounts['warning'] || 0, color: 'bg-amber-accent' },
              { count: statusCounts['critical'] || 0, color: 'bg-danger' },
              { count: statusCounts['offline'] || 0, color: 'bg-navy-600' },
            ].map((s, i) => {
              const total = environments.length || 1
              return <div key={i} className={s.color} style={{ width: `${(s.count / total) * 100}%` }} />
            })}
          </div>
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="glass-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Recent Security Events</h3>
        <div className="space-y-2">
          {recentEvents.map((event) => {
            const sevColors: Record<string, string> = {
              critical: 'text-danger bg-danger/10',
              high: 'text-amber-accent bg-amber-accent/10',
              medium: 'text-electric bg-electric/10',
              low: 'text-navy-400 bg-navy-800',
              info: 'text-navy-500 bg-navy-800',
            }
            const timeStr = new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            return (
              <div key={event.id} className="flex items-center gap-3 py-2 border-b border-navy-800/50 last:border-0">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${sevColors[event.severity]}`}>
                  {event.severity.toUpperCase()}
                </span>
                <span className="text-xs text-navy-300 flex-1 truncate">{event.detail}</span>
                <span className="text-[10px] text-navy-600 shrink-0">{event.user}</span>
                <span className="text-[10px] text-navy-700 shrink-0 w-12 text-right">{timeStr}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
})
