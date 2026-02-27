import { useState } from 'react'
import {
  ariaDimensions,
  maturityLevels,
  complianceFrameworks,
  riskProfiles,
  artifacts,
  deploymentTargets,
  dashboardViews,
} from '../data/content'

type Tab = 'aria' | 'configurator' | 'provisioner' | 'dashboard'

const tabs: { id: Tab; label: string; phase: string; color: string }[] = [
  { id: 'aria', label: 'ARIA Assessment', phase: 'ASSESS', color: 'electric' },
  { id: 'configurator', label: 'Security Configurator', phase: 'CONFIGURE', color: 'amber-accent' },
  { id: 'provisioner', label: 'Sandbox Provisioner', phase: 'DEPLOY', color: 'emerald-accent' },
  { id: 'dashboard', label: 'Security Dashboard', phase: 'MONITOR', color: 'danger' },
]

const tabColorMap: Record<string, string> = {
  electric: 'border-electric text-electric',
  'amber-accent': 'border-amber-accent text-amber-accent',
  'emerald-accent': 'border-emerald-accent text-emerald-accent',
  danger: 'border-danger text-danger',
}

const tabBgMap: Record<string, string> = {
  electric: 'bg-electric/10',
  'amber-accent': 'bg-amber-accent/10',
  'emerald-accent': 'bg-emerald-accent/10',
  danger: 'bg-danger/10',
}

function AriaPanel() {
  return (
    <div className="space-y-10">
      {/* Six Dimensions */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Six Assessment Dimensions</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ariaDimensions.map((dim) => (
            <div key={dim.short} className="glass-card rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-electric bg-electric/10 px-2 py-0.5 rounded">
                  {dim.short}
                </span>
                <span className="text-sm font-medium text-white">{dim.name}</span>
              </div>
              <p className="text-navy-400 text-xs leading-relaxed">{dim.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Maturity Levels */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Maturity Scale</h4>
        <div className="space-y-3">
          {maturityLevels.map((lvl) => (
            <div key={lvl.level} className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg bg-${lvl.color}/10 text-${lvl.color} flex items-center justify-center font-bold text-sm shrink-0`}>
                {lvl.level}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">{lvl.label}</span>
                </div>
                <p className="text-navy-400 text-xs">{lvl.description}</p>
              </div>
              <div className="hidden sm:block w-32 h-2 bg-navy-800 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-${lvl.color} rounded-full`}
                  style={{ width: `${lvl.level * 20}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Assessment Workflow</h4>
        <div className="flex flex-wrap gap-3">
          {['Intake Questionnaire', 'Evidence Upload', 'Automated Scoring', 'Gap Analysis', 'Roadmap Generation', 'Report Export'].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-electric/10 text-electric text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-sm text-navy-300">{step}</span>
              {i < 5 && (
                <svg className="w-4 h-4 text-navy-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ConfiguratorPanel() {
  return (
    <div className="space-y-10">
      {/* Compliance Frameworks */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Compliance Frameworks</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {complianceFrameworks.map((fw) => (
            <div key={fw.name} className="glass-card rounded-lg p-4">
              <h5 className="text-sm font-semibold text-amber-accent mb-2">{fw.name}</h5>
              <p className="text-navy-400 text-xs leading-relaxed">{fw.controls}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Profiles */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Risk Profiles</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {riskProfiles.map((profile) => (
            <div key={profile.name} className="glass-card rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                {Array.from({ length: profile.level }).map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-amber-accent" />
                ))}
                {Array.from({ length: 3 - profile.level }).map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-navy-700" />
                ))}
              </div>
              <h5 className="text-base font-semibold text-white mb-1">{profile.name}</h5>
              <p className="text-navy-400 text-xs mb-2">{profile.description}</p>
              <p className="text-navy-500 text-xs italic">{profile.useCase}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Generated Artifacts */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Generated Artifacts</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {artifacts.map((a) => (
            <div key={a.name} className="flex items-start gap-3 glass-card rounded-lg p-3">
              <span className="text-amber-accent text-xs mt-0.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
              <div>
                <span className="text-xs font-mono text-white">{a.name}</span>
                <p className="text-navy-500 text-xs">{a.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProvisionerPanel() {
  return (
    <div className="space-y-10">
      {/* Workflow */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Provisioning Workflow</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: 'Request', desc: 'Knowledge worker submits via portal or CLI' },
            { step: 'Policy Resolution', desc: 'Combines org, team, and project policies' },
            { step: 'Image Build', desc: 'Container built with resolved policy baked in' },
            { step: 'Secret Injection', desc: 'Credentials via cloud secrets manager' },
            { step: 'Network Config', desc: 'Firewall rules, DNS, egress restrictions' },
            { step: 'Health Check', desc: 'Auth, firewall, settings, hooks verified' },
            { step: 'Delivery', desc: 'VS Code, SSH, or web IDE link delivered' },
          ].map((item, i) => (
            <div key={item.step} className="glass-card rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-emerald-accent/10 text-emerald-accent text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-white">{item.step}</span>
              </div>
              <p className="text-navy-400 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Deployment Targets */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Deployment Targets</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-800">
                <th className="text-left py-3 px-4 text-navy-500 font-medium">Target</th>
                <th className="text-left py-3 px-4 text-navy-500 font-medium">Best For</th>
                <th className="text-left py-3 px-4 text-navy-500 font-medium">Key Advantage</th>
              </tr>
            </thead>
            <tbody>
              {deploymentTargets.map((t) => (
                <tr key={t.name} className="border-b border-navy-800/50 hover:bg-navy-800/30">
                  <td className="py-3 px-4 text-white font-medium">{t.name}</td>
                  <td className="py-3 px-4 text-navy-400">{t.best}</td>
                  <td className="py-3 px-4 text-emerald-accent">{t.pros}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function DashboardPanel() {
  return (
    <div className="space-y-10">
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Dashboard Views</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dashboardViews.map((view) => (
            <div key={view.name} className="glass-card rounded-lg p-5">
              <div className="text-xs font-medium text-danger mb-1">{view.audience}</div>
              <h5 className="text-base font-semibold text-white mb-2">{view.name}</h5>
              <p className="text-navy-400 text-xs leading-relaxed">{view.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Integrations */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Alerting & Integration</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['Splunk', 'Elastic', 'Microsoft Sentinel', 'Google Chronicle', 'PagerDuty', 'Slack / Teams', 'OpenTelemetry', 'REST API'].map((name) => (
            <div key={name} className="glass-card rounded-lg p-3 text-center">
              <span className="text-sm text-navy-300">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Metrics */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Key Metrics</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Security Score', value: '94/100', color: 'text-emerald-accent' },
            { label: 'Policy Compliance', value: '99.2%', color: 'text-electric' },
            { label: 'Active Environments', value: '247', color: 'text-white' },
            { label: 'Events (24h)', value: '12,847', color: 'text-amber-accent' },
          ].map((m) => (
            <div key={m.label} className="glass-card rounded-lg p-4 text-center">
              <div className={`text-2xl font-bold ${m.color} mb-1`}>{m.value}</div>
              <div className="text-xs text-navy-500">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Modules() {
  const [activeTab, setActiveTab] = useState<Tab>('aria')
  const active = tabs.find((t) => t.id === activeTab)!

  return (
    <section id="modules" className="py-24 px-4">
      <div className="section-divider mb-24" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Four Integrated Modules
          </h2>
          <p className="text-navy-400 text-lg max-w-2xl mx-auto">
            Each module operates independently but shares a common data layer. Adopt incrementally as your deployment matures.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                activeTab === tab.id
                  ? `${tabColorMap[tab.color]} ${tabBgMap[tab.color]}`
                  : 'border-navy-800 text-navy-500 hover:text-navy-300 hover:border-navy-700'
              }`}
            >
              <span className="text-xs font-bold mr-2 opacity-60">{tab.phase}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="glass-card rounded-xl p-6 sm:p-8">
          {activeTab === 'aria' && <AriaPanel />}
          {activeTab === 'configurator' && <ConfiguratorPanel />}
          {activeTab === 'provisioner' && <ProvisionerPanel />}
          {activeTab === 'dashboard' && <DashboardPanel />}
        </div>
      </div>
    </section>
  )
}
