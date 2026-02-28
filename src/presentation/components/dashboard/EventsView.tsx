import { memo, useState, useMemo } from 'react'
import type { SecurityEvent } from '../../../domain/value-objects/dashboard-types'

interface EventsViewProps {
  events: SecurityEvent[]
}

type FilterType = 'all' | SecurityEvent['type']
type FilterSeverity = 'all' | SecurityEvent['severity']

const typeLabels: Record<SecurityEvent['type'], string> = {
  permission_violation: 'Permission Violation',
  network_blocked: 'Network Blocked',
  credential_detected: 'Credential Detected',
  mcp_activity: 'MCP Activity',
  config_drift: 'Config Drift',
  policy_override: 'Policy Override',
}

const typeColors: Record<SecurityEvent['type'], string> = {
  permission_violation: 'text-amber-accent bg-amber-accent/10',
  network_blocked: 'text-electric bg-electric/10',
  credential_detected: 'text-danger bg-danger/10',
  mcp_activity: 'text-navy-400 bg-navy-800',
  config_drift: 'text-amber-accent bg-amber-accent/10',
  policy_override: 'text-danger bg-danger/10',
}

const sevColors: Record<SecurityEvent['severity'], string> = {
  critical: 'text-danger bg-danger/10 border-danger/30',
  high: 'text-amber-accent bg-amber-accent/10 border-amber-accent/30',
  medium: 'text-electric bg-electric/10 border-electric/30',
  low: 'text-navy-400 bg-navy-800 border-navy-700',
  info: 'text-navy-500 bg-navy-800 border-navy-700',
}

export default memo(function EventsView({ events }: EventsViewProps) {
  const [typeFilter, setTypeFilter] = useState<FilterType>('all')
  const [sevFilter, setSevFilter] = useState<FilterSeverity>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(
    () => events.filter((e) => {
      if (typeFilter !== 'all' && e.type !== typeFilter) return false
      if (sevFilter !== 'all' && e.severity !== sevFilter) return false
      if (searchQuery && !e.detail.toLowerCase().includes(searchQuery.toLowerCase()) && !e.user.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true
    }),
    [events, typeFilter, sevFilter, searchQuery]
  )

  const typeCounts = useMemo(
    () => events.reduce<Record<string, number>>((acc, e) => {
      acc[e.type] = (acc[e.type] || 0) + 1
      return acc
    }, {}),
    [events]
  )

  return (
    <div className="space-y-6">
      {/* Type filter chips */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setTypeFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
            typeFilter === 'all' ? 'border-electric text-electric bg-electric/10' : 'border-navy-800 text-navy-500 hover:text-navy-300'
          }`}
        >
          All ({events.length})
        </button>
        {(Object.keys(typeLabels) as SecurityEvent['type'][]).map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(typeFilter === type ? 'all' : type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
              typeFilter === type ? `${typeColors[type]} border-current` : 'border-navy-800 text-navy-500 hover:text-navy-300'
            }`}
          >
            {typeLabels[type]} ({typeCounts[type] || 0})
          </button>
        ))}
      </div>

      {/* Severity + Search */}
      <div className="flex flex-wrap gap-3">
        <div className="flex gap-1">
          {(['all', 'critical', 'high', 'medium', 'low', 'info'] as FilterSeverity[]).map((sev) => (
            <button
              key={sev}
              onClick={() => setSevFilter(sev)}
              className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors ${
                sevFilter === sev
                  ? sev === 'all' ? 'bg-electric/10 text-electric' : sevColors[sev as SecurityEvent['severity']]
                  : 'text-navy-600 hover:text-navy-400'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-[200px] px-3 py-1.5 bg-navy-900 border border-navy-700 rounded-lg text-xs text-white placeholder-navy-600 focus:border-electric focus:outline-none"
        />
      </div>

      {/* Event list */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-navy-800">
                <th className="text-left py-3 px-4 text-navy-500 font-medium w-16">Severity</th>
                <th className="text-left py-3 px-4 text-navy-500 font-medium w-32">Type</th>
                <th className="text-left py-3 px-4 text-navy-500 font-medium">Detail</th>
                <th className="text-left py-3 px-4 text-navy-500 font-medium w-24">User</th>
                <th className="text-left py-3 px-4 text-navy-500 font-medium w-20">Tool</th>
                <th className="text-left py-3 px-4 text-navy-500 font-medium w-16">Status</th>
                <th className="text-right py-3 px-4 text-navy-500 font-medium w-16">Time</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 50).map((event) => {
                const timeStr = new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                return (
                  <tr key={event.id} className="border-b border-navy-800/30 hover:bg-navy-800/20">
                    <td className="py-2.5 px-4">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${sevColors[event.severity]}`}>
                        {event.severity.slice(0, 4).toUpperCase()}
                      </span>
                    </td>
                    <td className="py-2.5 px-4">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${typeColors[event.type]}`}>
                        {typeLabels[event.type]}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-navy-300 max-w-xs truncate">{event.detail}</td>
                    <td className="py-2.5 px-4 text-navy-400 font-mono">{event.user}</td>
                    <td className="py-2.5 px-4 text-navy-500 font-mono">{event.tool}</td>
                    <td className="py-2.5 px-4">
                      {event.resolved ? (
                        <span className="text-emerald-accent text-[10px]">Resolved</span>
                      ) : (
                        <span className="text-amber-accent text-[10px]">Open</span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-right text-navy-600">{timeStr}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length > 50 && (
          <div className="py-3 px-4 text-center text-xs text-navy-600 border-t border-navy-800">
            Showing 50 of {filtered.length} events
          </div>
        )}
      </div>
    </div>
  )
})
