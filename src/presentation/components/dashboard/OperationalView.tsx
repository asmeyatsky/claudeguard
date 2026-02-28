import { memo, useMemo } from 'react'
import type { DashboardMetrics, EnvironmentStatus } from '../../../domain/value-objects/dashboard-types'

interface OperationalViewProps {
  metrics: DashboardMetrics
  environments: EnvironmentStatus[]
}

const statusColors: Record<EnvironmentStatus['status'], { dot: string; text: string }> = {
  healthy: { dot: 'bg-emerald-accent', text: 'text-emerald-accent' },
  warning: { dot: 'bg-amber-accent', text: 'text-amber-accent' },
  critical: { dot: 'bg-danger', text: 'text-danger' },
  offline: { dot: 'bg-navy-600', text: 'text-navy-500' },
}

export default memo(function OperationalView({ metrics, environments }: OperationalViewProps) {
  const formatTokens = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K`
    return n.toString()
  }

  const cloudCounts = useMemo(
    () => environments.reduce<Record<string, number>>((acc, e) => {
      acc[e.cloudProvider] = (acc[e.cloudProvider] || 0) + 1
      return acc
    }, {}),
    [environments]
  )

  const profileCounts = useMemo(
    () => environments.reduce<Record<string, number>>((acc, e) => {
      acc[e.riskProfile] = (acc[e.riskProfile] || 0) + 1
      return acc
    }, {}),
    [environments]
  )

  const displayedEnvs = useMemo(() => environments.slice(0, 20), [environments])

  return (
    <div className="space-y-6">
      {/* Resource metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-5 text-center">
          <div className={`text-3xl font-bold mb-1 ${metrics.avgCpuUsage > 70 ? 'text-amber-accent' : 'text-emerald-accent'}`}>
            {metrics.avgCpuUsage}%
          </div>
          <div className="text-xs text-navy-500">Avg CPU</div>
        </div>
        <div className="glass-card rounded-xl p-5 text-center">
          <div className={`text-3xl font-bold mb-1 ${metrics.avgMemoryUsage > 70 ? 'text-amber-accent' : 'text-emerald-accent'}`}>
            {metrics.avgMemoryUsage}%
          </div>
          <div className="text-xs text-navy-500">Avg Memory</div>
        </div>
        <div className="glass-card rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-electric mb-1">{formatTokens(metrics.apiTokensUsed)}</div>
          <div className="text-xs text-navy-500">API Tokens (24h)</div>
        </div>
        <div className="glass-card rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-white mb-1">{metrics.costEstimate.toLocaleString()}</div>
          <div className="text-xs text-navy-500">Est. Monthly Cost</div>
        </div>
      </div>

      {/* Distribution cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">By Cloud Provider</h3>
          <div className="space-y-3">
            {Object.entries(cloudCounts).sort((a, b) => b[1] - a[1]).map(([provider, count]) => (
              <div key={provider} className="flex items-center justify-between">
                <span className="text-sm text-navy-300">{provider}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-navy-800 rounded-full overflow-hidden">
                    <div className="h-full bg-electric rounded-full" style={{ width: `${(count / environments.length) * 100}%` }} />
                  </div>
                  <span className="text-xs text-navy-500 w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">By Risk Profile</h3>
          <div className="space-y-3">
            {Object.entries(profileCounts).sort((a, b) => b[1] - a[1]).map(([profile, count]) => {
              const color = profile === 'Paranoid' ? 'bg-danger' : profile === 'Strict' ? 'bg-amber-accent' : 'bg-emerald-accent'
              return (
                <div key={profile} className="flex items-center justify-between">
                  <span className="text-sm text-navy-300">{profile}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-navy-800 rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full`} style={{ width: `${(count / environments.length) * 100}%` }} />
                    </div>
                    <span className="text-xs text-navy-500 w-8 text-right">{count}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Environment table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-navy-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Active Environments</h3>
          <span className="text-xs text-navy-500">{environments.length} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-navy-800">
                <th className="text-left py-3 px-4 text-navy-500 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-navy-500 font-medium">Environment</th>
                <th className="text-left py-3 px-4 text-navy-500 font-medium">User</th>
                <th className="text-left py-3 px-4 text-navy-500 font-medium">Team</th>
                <th className="text-left py-3 px-4 text-navy-500 font-medium">Cloud</th>
                <th className="text-left py-3 px-4 text-navy-500 font-medium">Profile</th>
                <th className="text-left py-3 px-4 text-navy-500 font-medium">CPU</th>
                <th className="text-left py-3 px-4 text-navy-500 font-medium">Memory</th>
                <th className="text-left py-3 px-4 text-navy-500 font-medium">Policy</th>
                <th className="text-right py-3 px-4 text-navy-500 font-medium">Activity</th>
              </tr>
            </thead>
            <tbody>
              {displayedEnvs.map((env) => {
                const sc = statusColors[env.status]
                return (
                  <tr key={env.id} className="border-b border-navy-800/30 hover:bg-navy-800/20">
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${sc.dot}`} />
                        <span className={`text-[10px] ${sc.text}`}>{env.status}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-4 text-navy-300 font-mono">{env.name}</td>
                    <td className="py-2.5 px-4 text-navy-400">{env.user}</td>
                    <td className="py-2.5 px-4 text-navy-500">{env.team}</td>
                    <td className="py-2.5 px-4 text-navy-400">{env.cloudProvider}</td>
                    <td className="py-2.5 px-4">
                      <span className={`${env.riskProfile === 'Paranoid' ? 'text-danger' : env.riskProfile === 'Strict' ? 'text-amber-accent' : 'text-emerald-accent'}`}>
                        {env.riskProfile}
                      </span>
                    </td>
                    <td className="py-2.5 px-4">
                      <span className={env.cpuUsage > 80 ? 'text-danger' : env.cpuUsage > 60 ? 'text-amber-accent' : 'text-navy-400'}>
                        {env.cpuUsage}%
                      </span>
                    </td>
                    <td className="py-2.5 px-4">
                      <span className={env.memoryUsage > 80 ? 'text-danger' : env.memoryUsage > 60 ? 'text-amber-accent' : 'text-navy-400'}>
                        {env.memoryUsage}%
                      </span>
                    </td>
                    <td className="py-2.5 px-4">
                      {env.policyCompliant ? (
                        <span className="text-emerald-accent">Compliant</span>
                      ) : (
                        <span className="text-danger">Drift</span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-right text-navy-600">{env.lastActivity}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
})
