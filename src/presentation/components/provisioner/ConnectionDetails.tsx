import { useState, useRef, useCallback } from 'react'
import type { ProvisioningRequest } from '../../../domain/entities/provisioning-request'

interface Props {
  request: ProvisioningRequest
  onReset: () => void
}

export default function ConnectionDetails({ request, onReset }: Props) {
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  const copyToClipboard = useCallback(async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(label)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setCopiedField(null), 2000)
    } catch {
      // Clipboard API not available
    }
  }, [])

  if (!request.connectionDetails) return null

  const { connectionDetails: cd } = request

  const fields = [
    { label: 'VS Code Remote', value: cd.vscodeUrl, icon: '💻' },
    { label: 'SSH Command', value: cd.sshCommand, icon: '🔑' },
    { label: 'Web IDE', value: cd.webIdeUrl, icon: '🌐' },
    { label: 'Container ID', value: cd.containerId, icon: '📦' },
    { label: 'Expires', value: new Date(cd.expiresAt).toLocaleString(), icon: '⏱️' },
  ]

  return (
    <div className="mt-8 rounded-xl border border-emerald-accent/30 bg-emerald-accent/5 p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-accent/20 flex items-center justify-center">
          <svg className="w-4 h-4 text-emerald-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white">Connection Details</h3>
      </div>

      <div className="space-y-3">
        {fields.map((f) => (
          <div key={f.label} className="flex items-start gap-3 p-3 rounded-lg bg-navy-900/50">
            <span className="text-lg">{f.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-navy-500 font-semibold uppercase tracking-wider">{f.label}</div>
              <div className="text-sm text-white font-mono break-all mt-0.5">{f.value}</div>
            </div>
            {f.label !== 'Expires' && (
              <button
                onClick={() => copyToClipboard(f.value, f.label)}
                className={`flex-shrink-0 px-2 py-1 rounded text-[10px] border transition-colors ${
                  copiedField === f.label
                    ? 'text-emerald-accent border-emerald-accent/50'
                    : 'text-navy-400 border-navy-700 hover:text-white hover:border-navy-600'
                }`}
              >
                {copiedField === f.label ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <a
          href={cd.webIdeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-emerald-accent text-white font-semibold rounded-lg text-sm hover:bg-emerald-accent/80 transition-colors"
        >
          Open Web IDE
        </a>
        <button
          onClick={onReset}
          className="px-5 py-2.5 border border-navy-700 text-navy-300 font-medium rounded-lg text-sm hover:border-navy-600 hover:text-white transition-colors"
        >
          Provision Another
        </button>
      </div>
    </div>
  )
}
