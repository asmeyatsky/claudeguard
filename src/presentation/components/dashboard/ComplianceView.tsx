import type { ComplianceControl } from '../../../domain/value-objects/dashboard-types'

interface ComplianceViewProps {
  controls: ComplianceControl[]
}

const statusConfig: Record<ComplianceControl['status'], { label: string; color: string; bg: string }> = {
  passing: { label: 'Passing', color: 'text-emerald-accent', bg: 'bg-emerald-accent' },
  failing: { label: 'Failing', color: 'text-danger', bg: 'bg-danger' },
  'not-tested': { label: 'Not Tested', color: 'text-navy-500', bg: 'bg-navy-600' },
  'not-applicable': { label: 'N/A', color: 'text-navy-600', bg: 'bg-navy-700' },
}

export default function ComplianceView({ controls }: ComplianceViewProps) {
  const frameworks = [...new Set(controls.map((c) => c.framework))]

  const frameworkStats = frameworks.map((fw) => {
    const fwControls = controls.filter((c) => c.framework === fw)
    const passing = fwControls.filter((c) => c.status === 'passing').length
    const failing = fwControls.filter((c) => c.status === 'failing').length
    const total = fwControls.filter((c) => c.status !== 'not-applicable').length
    const rate = total > 0 ? Math.round((passing / total) * 100) : 0
    return { framework: fw, passing, failing, total, rate, controls: fwControls }
  })

  const overallPassing = controls.filter((c) => c.status === 'passing').length
  const overallTotal = controls.filter((c) => c.status !== 'not-applicable').length
  const overallRate = overallTotal > 0 ? Math.round((overallPassing / overallTotal) * 100) : 0
  const evidenceAvailable = controls.filter((c) => c.evidenceAvailable).length

  return (
    <div className="space-y-6">
      {/* Top metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-5 text-center">
          <div className={`text-3xl font-bold mb-1 ${overallRate >= 90 ? 'text-emerald-accent' : overallRate >= 70 ? 'text-amber-accent' : 'text-danger'}`}>
            {overallRate}%
          </div>
          <div className="text-xs text-navy-500">Overall Compliance</div>
        </div>
        <div className="glass-card rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-emerald-accent mb-1">{overallPassing}</div>
          <div className="text-xs text-navy-500">Controls Passing</div>
        </div>
        <div className="glass-card rounded-xl p-5 text-center">
          <div className={`text-3xl font-bold mb-1 ${controls.filter((c) => c.status === 'failing').length > 0 ? 'text-danger' : 'text-emerald-accent'}`}>
            {controls.filter((c) => c.status === 'failing').length}
          </div>
          <div className="text-xs text-navy-500">Controls Failing</div>
        </div>
        <div className="glass-card rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-electric mb-1">{evidenceAvailable}</div>
          <div className="text-xs text-navy-500">Evidence Available</div>
        </div>
      </div>

      {/* Framework cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {frameworkStats.map((fw) => (
          <div key={fw.framework} className="glass-card rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">{fw.framework}</h3>
              <span className={`text-sm font-bold ${fw.rate >= 90 ? 'text-emerald-accent' : fw.rate >= 70 ? 'text-amber-accent' : 'text-danger'}`}>
                {fw.rate}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-navy-800 rounded-full overflow-hidden mb-4 flex">
              <div className="bg-emerald-accent h-full" style={{ width: `${(fw.passing / Math.max(fw.total, 1)) * 100}%` }} />
              <div className="bg-danger h-full" style={{ width: `${(fw.failing / Math.max(fw.total, 1)) * 100}%` }} />
            </div>

            {/* Controls list */}
            <div className="space-y-1.5">
              {fw.controls.map((ctrl) => {
                const sc = statusConfig[ctrl.status]
                return (
                  <div key={ctrl.id} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${sc.bg} shrink-0`} />
                    <span className="text-[10px] text-navy-500 font-mono w-16 shrink-0">{ctrl.controlId}</span>
                    <span className="text-[10px] text-navy-400 flex-1 truncate">{ctrl.description}</span>
                    <span className={`text-[10px] ${sc.color}`}>{sc.label}</span>
                    {ctrl.evidenceAvailable && (
                      <svg className="w-3 h-3 text-electric shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Audit Report Button */}
      <div className="glass-card rounded-xl p-5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white mb-1">Audit Report Generator</h3>
          <p className="text-xs text-navy-400">Generate audit-ready reports with scope statement, control descriptions, evidence references, and testing results.</p>
        </div>
        <button className="px-5 py-2.5 bg-electric text-white text-sm font-medium rounded-lg hover:bg-electric-dark transition-all shrink-0">
          Generate Report
        </button>
      </div>
    </div>
  )
}
