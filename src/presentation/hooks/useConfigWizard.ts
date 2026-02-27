import { useState, useMemo, useCallback } from 'react'
import { createConfigProfile, updateConfigProfile, type ConfigProfile } from '../../domain/entities/config-profile'
import type { ComplianceFrameworkId } from '../../domain/value-objects/compliance-framework'
import type { RiskProfileId } from '../../domain/value-objects/risk-profile'
import type { CloudProviderId } from '../../domain/value-objects/cloud-provider'
import type { GeneratedArtifact } from '../../domain/ports/template-engine-port'
import { TemplateEngine } from '../../infrastructure/template-engine'
import { ZipPackager } from '../../infrastructure/zip-packager'
import { GenerateConfigUseCase } from '../../application/use-cases/generate-config'

export type WizardStep = 'compliance' | 'cloud' | 'risk' | 'review'

const STEPS: WizardStep[] = ['compliance', 'cloud', 'risk', 'review']

const templateEngine = new TemplateEngine()
const packager = new ZipPackager()
const useCase = new GenerateConfigUseCase(templateEngine, packager)

export function useConfigWizard() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('compliance')
  const [profile, setProfile] = useState<ConfigProfile>(createConfigProfile())
  const [isDownloading, setIsDownloading] = useState(false)

  const stepIndex = STEPS.indexOf(currentStep)

  const artifacts: GeneratedArtifact[] = useMemo(
    () => useCase.generateArtifacts(profile),
    [profile]
  )

  const goNext = useCallback(() => {
    if (stepIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[stepIndex + 1])
    }
  }, [stepIndex])

  const goBack = useCallback(() => {
    if (stepIndex > 0) {
      setCurrentStep(STEPS[stepIndex - 1])
    }
  }, [stepIndex])

  const goToStep = useCallback((step: WizardStep) => {
    setCurrentStep(step)
  }, [])

  const setComplianceFrameworks = useCallback((frameworks: ComplianceFrameworkId[]) => {
    setProfile((prev) => updateConfigProfile(prev, { complianceFrameworks: frameworks }))
  }, [])

  const setCloudProvider = useCallback((provider: CloudProviderId) => {
    setProfile((prev) => updateConfigProfile(prev, { cloudProvider: provider }))
  }, [])

  const setRiskProfile = useCallback((riskProfile: RiskProfileId) => {
    setProfile((prev) => updateConfigProfile(prev, { riskProfile }))
  }, [])

  const setProjectName = useCallback((projectName: string) => {
    setProfile((prev) => updateConfigProfile(prev, { projectName }))
  }, [])

  const setOrganizationName = useCallback((organizationName: string) => {
    setProfile((prev) => updateConfigProfile(prev, { organizationName }))
  }, [])

  const downloadPackage = useCallback(async () => {
    setIsDownloading(true)
    try {
      const result = await useCase.generateAndPackage(profile)
      const url = URL.createObjectURL(result.downloadBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${profile.projectName}-claudeguard-config.zip`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } finally {
      setIsDownloading(false)
    }
  }, [profile])

  return {
    currentStep,
    stepIndex,
    totalSteps: STEPS.length,
    profile,
    artifacts,
    isDownloading,
    goNext,
    goBack,
    goToStep,
    setComplianceFrameworks,
    setCloudProvider,
    setRiskProfile,
    setProjectName,
    setOrganizationName,
    downloadPackage,
  }
}
