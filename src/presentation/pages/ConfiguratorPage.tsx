import WizardShell from '../components/wizard/WizardShell'
import ComplianceStep from '../components/wizard/ComplianceStep'
import CloudStep from '../components/wizard/CloudStep'
import RiskStep from '../components/wizard/RiskStep'
import ReviewStep from '../components/wizard/ReviewStep'
import ArtifactPreview from '../components/preview/ArtifactPreview'
import { useConfigWizard } from '../hooks/useConfigWizard'

export default function ConfiguratorPage() {
  const wizard = useConfigWizard()
  const showSidePreview = wizard.currentStep !== 'review'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <WizardShell
        currentStep={wizard.currentStep}
        stepIndex={wizard.stepIndex}
        totalSteps={wizard.totalSteps}
        onStepClick={wizard.goToStep}
      >
        <div className={showSidePreview ? 'grid grid-cols-1 lg:grid-cols-5 gap-8' : ''}>
          <div className={showSidePreview ? 'lg:col-span-3' : ''}>
            {wizard.currentStep === 'compliance' && (
              <ComplianceStep
                selected={[...wizard.profile.complianceFrameworks]}
                onSelect={wizard.setComplianceFrameworks}
                onNext={wizard.goNext}
              />
            )}
            {wizard.currentStep === 'cloud' && (
              <CloudStep
                selected={wizard.profile.cloudProvider}
                onSelect={wizard.setCloudProvider}
                onNext={wizard.goNext}
                onBack={wizard.goBack}
              />
            )}
            {wizard.currentStep === 'risk' && (
              <RiskStep
                selected={wizard.profile.riskProfile}
                onSelect={wizard.setRiskProfile}
                onNext={wizard.goNext}
                onBack={wizard.goBack}
              />
            )}
            {wizard.currentStep === 'review' && (
              <ReviewStep
                profile={wizard.profile}
                artifacts={wizard.artifacts}
                isDownloading={wizard.isDownloading}
                onDownload={wizard.downloadPackage}
                onBack={wizard.goBack}
                onProjectNameChange={wizard.setProjectName}
                onOrgNameChange={wizard.setOrganizationName}
              />
            )}
          </div>
          {showSidePreview && (
            <div className="lg:col-span-2 hidden lg:block">
              <div className="sticky top-20">
                <ArtifactPreview artifacts={wizard.artifacts} />
              </div>
            </div>
          )}
        </div>
      </WizardShell>
    </div>
  )
}
