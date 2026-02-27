export type RiskProfileId = 'standard' | 'strict' | 'paranoid'

export interface RiskProfileRule {
  readonly id: string
  readonly description: string
  readonly category: 'permissions' | 'network' | 'filesystem' | 'mcp' | 'execution'
}

export interface RiskProfile {
  readonly id: RiskProfileId
  readonly name: string
  readonly description: string
  readonly useCase: string
  readonly level: 1 | 2 | 3
  readonly rules: readonly RiskProfileRule[]
  readonly permissionDefaults: {
    readonly defaultBehavior: 'ask' | 'deny'
    readonly bypassMode: boolean
    readonly allowedTools: readonly string[]
    readonly deniedCommands: readonly string[]
  }
  readonly networkPolicy: {
    readonly defaultEgress: 'allow' | 'deny'
    readonly allowedDomains: readonly string[]
    readonly dnsRestriction: boolean
    readonly vpcOnly: boolean
  }
}

export const RISK_PROFILES: Record<RiskProfileId, RiskProfile> = {
  standard: {
    id: 'standard',
    name: 'Standard',
    description: 'Balanced security and developer experience. Deny dangerous commands, allow common development tools, prompt for unknown actions.',
    useCase: 'Technology companies, digital agencies, SaaS startups with no specific regulatory requirements.',
    level: 1,
    rules: [
      { id: 'std-deny-dangerous', description: 'Deny dangerous commands (rm -rf /, shutdown, etc.)', category: 'execution' },
      { id: 'std-allow-dev', description: 'Allow common development tools (git, npm, pip, etc.)', category: 'execution' },
      { id: 'std-ask-unknown', description: 'Prompt for unknown/unrecognized actions', category: 'permissions' },
      { id: 'std-project-scope', description: 'Restrict file access to project directory', category: 'filesystem' },
      { id: 'std-log-basic', description: 'Basic command and file access logging', category: 'execution' },
    ],
    permissionDefaults: {
      defaultBehavior: 'ask',
      bypassMode: true,
      allowedTools: ['Read', 'Write', 'Edit', 'Bash', 'Glob', 'Grep'],
      deniedCommands: ['rm -rf /', 'shutdown', 'reboot', 'mkfs', 'dd if=', ':(){:|:&};:', 'chmod -R 777', 'curl | bash', 'wget | sh'],
    },
    networkPolicy: {
      defaultEgress: 'allow',
      allowedDomains: ['*'],
      dnsRestriction: false,
      vpcOnly: false,
    },
  },
  strict: {
    id: 'strict',
    name: 'Strict',
    description: 'Security-first posture. Minimal allow list, deny by default, no bypass mode, mandatory hooks, restricted network egress.',
    useCase: 'Financial services, healthcare, government, legal. Organizations with active compliance obligations.',
    level: 2,
    rules: [
      { id: 'str-deny-default', description: 'Deny all actions by default', category: 'permissions' },
      { id: 'str-no-bypass', description: 'Bypass mode disabled — no user override', category: 'permissions' },
      { id: 'str-mandatory-hooks', description: 'Pre-execution hooks mandatory for all tool use', category: 'execution' },
      { id: 'str-restricted-egress', description: 'Network egress restricted to allowlisted domains only', category: 'network' },
      { id: 'str-no-arbitrary', description: 'No arbitrary command execution without approval', category: 'execution' },
      { id: 'str-credential-scan', description: 'Post-execution credential scanning on all output', category: 'execution' },
      { id: 'str-mcp-approve', description: 'MCP server connections require explicit approval', category: 'mcp' },
    ],
    permissionDefaults: {
      defaultBehavior: 'deny',
      bypassMode: false,
      allowedTools: ['Read', 'Glob', 'Grep'],
      deniedCommands: ['rm -rf /', 'shutdown', 'reboot', 'mkfs', 'dd if=', ':(){:|:&};:', 'chmod -R 777', 'curl | bash', 'wget | sh', 'curl', 'wget', 'nc', 'ncat', 'ssh', 'scp'],
    },
    networkPolicy: {
      defaultEgress: 'deny',
      allowedDomains: [
        'api.anthropic.com',
        'registry.npmjs.org',
        'pypi.org',
        'github.com',
        'objects.githubusercontent.com',
      ],
      dnsRestriction: true,
      vpcOnly: false,
    },
  },
  paranoid: {
    id: 'paranoid',
    name: 'Paranoid',
    description: 'Maximum isolation. VPC-contained routing only, ZDR mode, read-only filesystem, no MCP servers, no web access, full audit logging.',
    useCase: 'Defence, intelligence, critical infrastructure. Organizations handling classified or state-secret-level data.',
    level: 3,
    rules: [
      { id: 'par-vpc-only', description: 'VPC-contained routing only — no public internet', category: 'network' },
      { id: 'par-zdr', description: 'Zero Data Retention — no data stored on Anthropic servers', category: 'permissions' },
      { id: 'par-readonly', description: 'Read-only filesystem outside designated work directory', category: 'filesystem' },
      { id: 'par-no-mcp', description: 'All MCP servers disabled', category: 'mcp' },
      { id: 'par-no-web', description: 'No web access — all external connections blocked', category: 'network' },
      { id: 'par-full-audit', description: 'Full audit logging of every action', category: 'execution' },
      { id: 'par-no-bypass', description: 'Bypass mode permanently disabled', category: 'permissions' },
      { id: 'par-no-bash', description: 'No direct Bash execution — all commands via hooks only', category: 'execution' },
      { id: 'par-credential-block', description: 'Credential-like patterns blocked in all output', category: 'execution' },
    ],
    permissionDefaults: {
      defaultBehavior: 'deny',
      bypassMode: false,
      allowedTools: ['Read', 'Glob', 'Grep'],
      deniedCommands: ['*'],
    },
    networkPolicy: {
      defaultEgress: 'deny',
      allowedDomains: ['api.anthropic.com'],
      dnsRestriction: true,
      vpcOnly: true,
    },
  },
}
