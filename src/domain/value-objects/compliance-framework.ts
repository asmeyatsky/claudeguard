export type ComplianceFrameworkId = 'soc2' | 'hipaa' | 'pci-dss' | 'iso27001' | 'gdpr' | 'baseline'

export interface ComplianceControl {
  readonly id: string
  readonly description: string
  readonly settingPath: string
  readonly settingValue: unknown
}

export interface ComplianceFramework {
  readonly id: ComplianceFrameworkId
  readonly name: string
  readonly shortName: string
  readonly description: string
  readonly controls: readonly ComplianceControl[]
}

export const COMPLIANCE_FRAMEWORKS: Record<ComplianceFrameworkId, ComplianceFramework> = {
  soc2: {
    id: 'soc2',
    name: 'SOC 2 Type II',
    shortName: 'SOC 2',
    description: 'Audit logging, session metadata capture, access reviews, change management',
    controls: [
      { id: 'soc2-audit', description: 'Enable comprehensive audit logging', settingPath: 'audit.enabled', settingValue: true },
      { id: 'soc2-session', description: 'Capture session metadata', settingPath: 'audit.sessionMetadata', settingValue: true },
      { id: 'soc2-transcript', description: 'Retain transcripts for compliance', settingPath: 'transcript.retention', settingValue: '90d' },
      { id: 'soc2-change', description: 'Require change management workflow', settingPath: 'hooks.preToolUse', settingValue: true },
    ],
  },
  hipaa: {
    id: 'hipaa',
    name: 'HIPAA',
    shortName: 'HIPAA',
    description: 'ZDR mode, PHI path deny rules, enhanced encryption, transcript cleanup',
    controls: [
      { id: 'hipaa-zdr', description: 'Zero Data Retention mode required', settingPath: 'privacy.zdr', settingValue: true },
      { id: 'hipaa-phi', description: 'Deny access to PHI paths', settingPath: 'permissions.denyPaths', settingValue: ['/phi/**', '/patient/**', '/medical/**'] },
      { id: 'hipaa-encrypt', description: 'Enhanced encryption requirements', settingPath: 'security.encryption', settingValue: 'aes-256-gcm' },
      { id: 'hipaa-cleanup', description: 'Transcript cleanup after 7 days', settingPath: 'transcript.retention', settingValue: '7d' },
      { id: 'hipaa-audit', description: 'Comprehensive audit trail', settingPath: 'audit.enabled', settingValue: true },
    ],
  },
  'pci-dss': {
    id: 'pci-dss',
    name: 'PCI-DSS',
    shortName: 'PCI-DSS',
    description: 'Network segmentation, cardholder data deny rules, VPC routing, vulnerability scanning',
    controls: [
      { id: 'pci-network', description: 'Network segmentation enforced', settingPath: 'network.segmentation', settingValue: true },
      { id: 'pci-cardholder', description: 'Deny cardholder data paths', settingPath: 'permissions.denyPaths', settingValue: ['/card/**', '/payment/**', '/pan/**'] },
      { id: 'pci-vpc', description: 'VPC-contained routing required', settingPath: 'network.vpcOnly', settingValue: true },
      { id: 'pci-scan', description: 'Quarterly vulnerability scanning', settingPath: 'security.vulnScan', settingValue: 'quarterly' },
      { id: 'pci-audit', description: 'Audit logging for compliance', settingPath: 'audit.enabled', settingValue: true },
    ],
  },
  iso27001: {
    id: 'iso27001',
    name: 'ISO 27001',
    shortName: 'ISO 27001',
    description: 'Full ISMS control mapping, risk treatment integration, management review evidence',
    controls: [
      { id: 'iso-isms', description: 'ISMS control mapping enabled', settingPath: 'compliance.ismsMapping', settingValue: true },
      { id: 'iso-risk', description: 'Risk treatment plan integration', settingPath: 'compliance.riskTreatment', settingValue: true },
      { id: 'iso-review', description: 'Management review evidence collection', settingPath: 'audit.managementReview', settingValue: true },
      { id: 'iso-improve', description: 'Continuous improvement metrics', settingPath: 'audit.improvementMetrics', settingValue: true },
      { id: 'iso-audit', description: 'Full audit logging', settingPath: 'audit.enabled', settingValue: true },
    ],
  },
  gdpr: {
    id: 'gdpr',
    name: 'GDPR',
    shortName: 'GDPR',
    description: 'Data residency enforcement, right-to-erasure, consent management, privacy impact assessment',
    controls: [
      { id: 'gdpr-residency', description: 'Data residency enforcement', settingPath: 'privacy.dataResidency', settingValue: 'eu' },
      { id: 'gdpr-erasure', description: 'Right-to-erasure support', settingPath: 'privacy.rightToErasure', settingValue: true },
      { id: 'gdpr-consent', description: 'Consent management required', settingPath: 'privacy.consentManagement', settingValue: true },
      { id: 'gdpr-pia', description: 'Privacy impact assessment enabled', settingPath: 'privacy.impactAssessment', settingValue: true },
      { id: 'gdpr-audit', description: 'Audit logging for compliance', settingPath: 'audit.enabled', settingValue: true },
    ],
  },
  baseline: {
    id: 'baseline',
    name: 'None (Baseline)',
    shortName: 'Baseline',
    description: 'Sensible defaults: deny dangerous commands, restrict file access, enable basic logging',
    controls: [
      { id: 'base-deny', description: 'Deny dangerous commands', settingPath: 'permissions.denyCommands', settingValue: true },
      { id: 'base-restrict', description: 'Restrict file access to project', settingPath: 'permissions.restrictPaths', settingValue: true },
      { id: 'base-log', description: 'Enable basic logging', settingPath: 'audit.enabled', settingValue: true },
      { id: 'base-nonroot', description: 'Non-root execution enforced', settingPath: 'security.nonRoot', settingValue: true },
    ],
  },
}
