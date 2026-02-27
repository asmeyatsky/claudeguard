import type { ProvisioningRequest } from '../../../domain/entities/provisioning-request'
import { PROVISIONING_STEPS, type ProvisioningStatus } from '../../../domain/value-objects/provisioner-types'

interface Props {
  request: ProvisioningRequest
  isProvisioning: boolean
}

const statusIndex = (status: ProvisioningStatus): number =>
  PROVISIONING_STEPS.findIndex((s) => s.status === status)

export default function ProvisioningProgress({ request, isProvisioning }: Props) {
  const currentIdx = statusIndex(request.status)

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-2">
        {request.status === 'ready' ? 'Environment Ready' : 'Provisioning Environment'}
      </h2>
      <p className="text-navy-400 text-sm mb-8">
        {request.status === 'ready'
          ? 'Your sandboxed Claude Code environment is live and ready to connect'
          : 'Setting up your secure, policy-hardened sandbox...'}
      </p>

      {/* Progress steps */}
      <div className="space-y-1">
        {PROVISIONING_STEPS.map((step, i) => {
          const isDone = i < currentIdx || request.status === 'ready'
          const isCurrent = i === currentIdx && isProvisioning
          const isPending = i > currentIdx

          const historyEntry = request.statusHistory.find((h) => h.status === step.status)

          return (
            <div
              key={step.status}
              className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
                isCurrent ? 'bg-emerald-accent/5 border border-emerald-accent/20' : ''
              }`}
            >
              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5">
                {isDone ? (
                  <div className="w-6 h-6 rounded-full bg-emerald-accent/20 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-emerald-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : isCurrent ? (
                  <div className="w-6 h-6 rounded-full border-2 border-emerald-accent flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-accent animate-pulse" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-navy-700" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium ${isDone ? 'text-navy-300' : isCurrent ? 'text-white' : 'text-navy-600'}`}>
                  {step.label}
                </div>
                {(isDone || isCurrent) && historyEntry && (
                  <div className="text-xs text-navy-500 mt-0.5">{historyEntry.message}</div>
                )}
                {isPending && (
                  <div className="text-xs text-navy-700 mt-0.5">{step.description}</div>
                )}
              </div>

              {/* Timestamp */}
              {historyEntry && (
                <span className="text-[10px] text-navy-600 flex-shrink-0 mt-0.5">
                  {new Date(historyEntry.timestamp).toLocaleTimeString()}
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Spinner when provisioning */}
      {isProvisioning && (
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-navy-400">
          <svg className="w-4 h-4 animate-spin text-emerald-accent" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          Processing...
        </div>
      )}
    </div>
  )
}
