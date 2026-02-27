import { useState, useCallback } from 'react'
import type { DeploymentTarget, EnvironmentTemplate } from '../../domain/value-objects/provisioner-types'
import type { RiskProfileId } from '../../domain/value-objects/risk-profile'
import {
  type ProvisioningRequest,
  createProvisioningRequest,
} from '../../domain/entities/provisioning-request'
import { ProvisionEnvironmentUseCase } from '../../application/use-cases/provision-environment'

export type ProvisionerStep = 'target' | 'template' | 'details' | 'provisioning'

const STEPS: ProvisionerStep[] = ['target', 'template', 'details', 'provisioning']

const useCase = new ProvisionEnvironmentUseCase()

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

  const stepIndex = STEPS.indexOf(currentStep)

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

    try {
      const final = await useCase.execute(request, (updated) => {
        setProvisioningRequest(updated)
      })
      setProvisioningRequest(final)
    } finally {
      setIsProvisioning(false)
    }
  }, [projectName, userName, teamName, deploymentTarget, environmentTemplate, riskProfile, mcpServers])

  const reset = useCallback(() => {
    setCurrentStep('target')
    setProvisioningRequest(null)
    setIsProvisioning(false)
    setProjectName('')
    setUserName('')
    setTeamName('')
    setMcpServers([])
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
    canProceed,
    goNext,
    goBack,
    startProvisioning,
    reset,
  }
}
