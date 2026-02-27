import type { WizardStep } from '../../hooks/useConfigWizard'

interface WizardShellProps {
  currentStep: WizardStep
  stepIndex: number
  onStepClick: (step: WizardStep) => void
  children: React.ReactNode
}

const steps: { id: WizardStep; label: string; icon: string }[] = [
  { id: 'compliance', label: 'Compliance', icon: '1' },
  { id: 'cloud', label: 'Cloud Provider', icon: '2' },
  { id: 'risk', label: 'Risk Profile', icon: '3' },
  { id: 'review', label: 'Review & Export', icon: '4' },
]

export default function WizardShell({ currentStep, stepIndex, onStepClick, children }: WizardShellProps) {
  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
        {steps.map((step, i) => {
          const isActive = step.id === currentStep
          const isCompleted = i < stepIndex
          const isClickable = i <= stepIndex

          return (
            <div key={step.id} className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => isClickable && onStepClick(step.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all text-sm ${
                  isActive
                    ? 'bg-electric/15 text-electric border border-electric/30'
                    : isCompleted
                    ? 'bg-emerald-accent/10 text-emerald-accent border border-emerald-accent/30 cursor-pointer'
                    : 'text-navy-600 border border-navy-800'
                } ${isClickable && !isActive ? 'hover:border-navy-600 cursor-pointer' : ''}`}
                disabled={!isClickable}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isActive ? 'bg-electric text-white' : isCompleted ? 'bg-emerald-accent text-white' : 'bg-navy-800 text-navy-600'
                }`}>
                  {isCompleted ? (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.icon
                  )}
                </span>
                <span className="hidden sm:inline">{step.label}</span>
              </button>
              {i < steps.length - 1 && (
                <div className={`w-6 sm:w-10 h-px ${i < stepIndex ? 'bg-emerald-accent/50' : 'bg-navy-800'}`} />
              )}
            </div>
          )
        })}
      </div>

      {/* Step content */}
      {children}
    </div>
  )
}
