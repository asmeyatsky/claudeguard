import { useState, useMemo } from 'react'
import type { DashboardView } from '../../domain/value-objects/dashboard-types'
import { telemetryAdapter } from '../../composition-root'
import ExecutiveView from '../components/dashboard/ExecutiveView'
import EventsView from '../components/dashboard/EventsView'
import ComplianceView from '../components/dashboard/ComplianceView'
import OperationalView from '../components/dashboard/OperationalView'

const views: { id: DashboardView; label: string; icon: string; audience: string }[] = [
  { id: 'executive', label: 'Executive', icon: '📊', audience: 'CISOs & Leadership' },
  { id: 'events', label: 'Security Events', icon: '🔔', audience: 'Security Analysts' },
  { id: 'compliance', label: 'Compliance', icon: '📋', audience: 'Compliance Officers' },
  { id: 'operational', label: 'Operational', icon: '⚙️', audience: 'Platform Engineers' },
]

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<DashboardView>('executive')

  // Generate data once via telemetry port
  const events = useMemo(() => telemetryAdapter.getEvents(200), [])
  const environments = useMemo(() => telemetryAdapter.getEnvironments(50), [])
  const controls = useMemo(() => telemetryAdapter.getComplianceControls(), [])
  const metrics = useMemo(() => telemetryAdapter.getMetrics(), [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Security Posture Dashboard</h1>
          <p className="text-xs text-navy-500 mt-1">Real-time visibility across all Claude Code deployments</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-accent rounded-full animate-pulse" />
          <span className="text-xs text-navy-500">Live — Demo Data</span>
        </div>
      </div>

      {/* View tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all border ${
              activeView === view.id
                ? 'border-electric bg-electric/10 text-electric'
                : 'border-navy-800 text-navy-500 hover:text-navy-300 hover:border-navy-700'
            }`}
          >
            <span>{view.icon}</span>
            <div className="text-left">
              <div className="font-medium">{view.label}</div>
              <div className="text-[10px] opacity-60">{view.audience}</div>
            </div>
          </button>
        ))}
      </div>

      {/* View content */}
      {activeView === 'executive' && (
        <ExecutiveView metrics={metrics} events={events} environments={environments} />
      )}
      {activeView === 'events' && (
        <EventsView events={events} />
      )}
      {activeView === 'compliance' && (
        <ComplianceView controls={controls} />
      )}
      {activeView === 'operational' && (
        <OperationalView metrics={metrics} environments={environments} />
      )}
    </div>
  )
}
