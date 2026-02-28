import { useState, useCallback } from 'react'
import type { DeploymentTarget, EnvironmentTemplate } from '../../domain/value-objects/provisioner-types'
import type { RiskProfileId } from '../../domain/value-objects/risk-profile'
import {
  type ProvisioningRequest,
  createProvisioningRequest,
} from '../../domain/entities/provisioning-request'
import { provisionEnvironmentUseCase } from '../../composition-root'

export type ProvisionerStep = 'target' | 'template' | 'details' | 'provisioning'

const STEPS: ProvisionerStep[] = ['target', 'template', 'details', 'provisioning']

export function useProvisioner() {
  const [currentStep, setCurrentStep] = useState<ProvisionerStep>('target')
  const [deploymentTarget, setDeploymentTarget] = useState<DeploymentTarget>('docker-desktop')
  const [environmentTemplate, setEnvironmentTemplate] = useState<EnvironmentTemplate>('fullstack')
  const [riskProfile, setRiskProfile] = useState<RiskProfileId>('strict')
  const [projectName, setProjectName] = useState('')
  const [userName, setUserName] = useState('')
  const [teamName, setTeamName] = useState('')
  const [mcpServers, setMcpServers] = useState<string[]>([])
  const [provisioningRequest, setProvisioningRequest] = useState<ProvisioningRequest | null>(null)
  const [isProvisioning, setIsProvisioning] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const stepIndex = STEPS.indexOf(currentStep)

  const goNext = useCallback(() => {
    if (stepIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[stepIndex + 1])
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [stepIndex])

  const goBack = useCallback(() => {
    if (stepIndex > 0) {
      setCurrentStep(STEPS[stepIndex - 1])
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [stepIndex])

  const canProceed = useCallback(() => {
    switch (currentStep) {
      case 'target':
        return !!deploymentTarget
      case 'template':
        return !!environmentTemplate
      case 'details':
        return projectName.trim() !== '' && userName.trim() !== '' && teamName.trim() !== ''
      default:
        return false
    }
  }, [currentStep, deploymentTarget, environmentTemplate, projectName, userName, teamName])

  const startProvisioning = useCallback(async () => {
    const request = createProvisioningRequest({
      projectName: projectName.trim(),
      userName: userName.trim(),
      teamName: teamName.trim(),
      deploymentTarget,
      environmentTemplate,
      riskProfile,
      mcpServers,
    })
    setProvisioningRequest(request)
    setCurrentStep('provisioning')
    setIsProvisioning(true)
    setError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })

    try {
      const final = await provisionEnvironmentUseCase.execute(request, (updated) => {
        setProvisioningRequest(updated)
      })
      setProvisioningRequest(final)
      if (final.status === 'failed') {
        const lastEntry = final.statusHistory[final.statusHistory.length - 1]
        setError(lastEntry?.message ?? 'Provisioning failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsProvisioning(false)
    }
  }, [projectName, userName, teamName, deploymentTarget, environmentTemplate, riskProfile, mcpServers])

  const reset = useCallback(() => {
    setCurrentStep('target')
    setProvisioningRequest(null)
    setIsProvisioning(false)
    setError(null)
    setProjectName('')
    setUserName('')
    setTeamName('')
    setMcpServers([])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return {
    currentStep,
    stepIndex,
    totalSteps: STEPS.length,
    deploymentTarget,
    setDeploymentTarget,
    environmentTemplate,
    setEnvironmentTemplate,
    riskProfile,
    setRiskProfile,
    projectName,
    setProjectName,
    userName,
    setUserName,
    teamName,
    setTeamName,
    mcpServers,
    setMcpServers,
    provisioningRequest,
    isProvisioning,
    error,
    canProceed,
    goNext,
    goBack,
    startProvisioning,
    reset,
  }
}
