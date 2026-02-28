# ClaudeGuard — Build Plan (All Phases)

## What We're Building
The **ClaudeGuard Security Configurator** — an interactive web application that generates complete, hardened deployment packages for Claude Code. This is Phase 1 (Weeks 1-4) from the PRD: the highest-impact module and the product-led growth entry point.

## Scope — Phase 1 Deliverables
1. **Interactive Configuration Wizard** — step-by-step guided flow
2. **Live Preview** — real-time preview of generated artifacts as selections change
3. **Artifact Generation Engine** — produces validated config packages
4. **Download as ZIP** — complete deployment package ready for production

## Wizard Steps (from PRD §4.2)

### Step 1: Compliance Framework Selection
- Multi-select from: SOC 2 Type II, HIPAA, PCI-DSS, ISO 27001, GDPR, None (Baseline)
- Each activates specific security controls

### Step 2: Cloud Provider Selection
- Single-select: GCP, AWS, Azure, Multi-Cloud
- Determines infrastructure-specific artifacts

### Step 3: Risk Profile Selection
- Single-select: Standard, Strict, Paranoid
- Determines strictness of generated configs

### Step 4: Review & Generate
- Summary of all selections
- Live preview of each generated artifact
- Download ZIP button

## Generated Artifacts (from PRD §4.3)
1. `managed-settings.json` — Enterprise Claude Code policy (cannot be overridden)
2. `Dockerfile` — Container image with security hardening
3. `docker-compose.yml` — Multi-service orchestration with network isolation
4. `init-firewall.sh` — Container-level network policy (default-deny outbound)
5. `hooks/pre-tool-use.sh` — Pre-execution command validation
6. `hooks/post-tool-use.sh` — Post-execution audit logging
7. `devcontainer.json` — VS Code / Cursor DevContainer config
8. `CLAUDE.md` — Project-level Claude Code behaviour instructions

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS v4
- **Config Engine**: Pure TypeScript — JSON Schema validation + template generation
- **No backend** — all generation happens client-side
- **JSZip** — client-side ZIP packaging for download

## Architecture (per skill2026.md principles)

### Domain Layer (`src/domain/`)
- `ConfigProfile` — immutable value object representing a complete configuration
- `ComplianceFramework` — enum + control mappings
- `RiskProfile` — enum + rule sets
- `CloudProvider` — enum + artifact variations
- `ArtifactSet` — value object for the generated package

### Application Layer (`src/application/`)
- `GenerateConfigUseCase` — orchestrates profile → artifacts
- `ValidateConfigUseCase` — validates generated artifacts against schemas

### Infrastructure Layer (`src/infrastructure/`)
- `TemplateEngine` — renders artifact templates from config profile
- `ZipPackager` — bundles artifacts into downloadable ZIP
- Templates for each artifact type

### Presentation Layer (`src/presentation/`)
- Wizard components (steps 1-4)
- Live preview panel
- Artifact viewer with syntax highlighting

## File Structure
```
claudeguard-site/src/
├── domain/
│   ├── entities/
│   │   └── config-profile.ts       # Immutable config profile
│   ├── value-objects/
│   │   ├── compliance-framework.ts  # Framework definitions + controls
│   │   ├── risk-profile.ts          # Risk profile definitions + rules
│   │   └── cloud-provider.ts        # Provider-specific settings
│   └── ports/
│       ├── template-engine-port.ts  # Template rendering interface
│       └── packager-port.ts         # ZIP packaging interface
├── application/
│   └── use-cases/
│       └── generate-config.ts       # Main generation orchestrator
├── infrastructure/
│   ├── templates/
│   │   ├── managed-settings.ts      # managed-settings.json template
│   │   ├── dockerfile.ts            # Dockerfile template
│   │   ├── docker-compose.ts        # docker-compose.yml template
│   │   ├── firewall.ts              # init-firewall.sh template
│   │   ├── hooks.ts                 # Hook scripts template
│   │   ├── devcontainer.ts          # devcontainer.json template
│   │   └── claude-md.ts             # CLAUDE.md template
│   ├── template-engine.ts           # Template engine implementation
│   └── zip-packager.ts              # JSZip implementation
├── presentation/
│   ├── components/
│   │   ├── Layout.tsx               # App shell + nav
│   │   ├── wizard/
│   │   │   ├── WizardShell.tsx      # Step container + progress
│   │   │   ├── ComplianceStep.tsx   # Step 1
│   │   │   ├── CloudStep.tsx        # Step 2
│   │   │   ├── RiskStep.tsx         # Step 3
│   │   │   └── ReviewStep.tsx       # Step 4 + download
│   │   └── preview/
│   │       ├── ArtifactPreview.tsx   # Tabbed artifact viewer
│   │       └── CodeBlock.tsx         # Syntax-highlighted code
│   └── hooks/
│       └── useConfigWizard.ts       # Wizard state management
├── App.tsx
├── main.tsx
└── index.css
```

## Build Order — Phase 1 ✅ COMPLETE
1. ✅ Domain layer — entities, value objects, ports
2. ✅ Infrastructure — templates for all 7+ artifacts
3. ✅ Application — generation use case
4. ✅ Presentation — wizard UI + live preview
5. ✅ ZIP download integration

---

## Build Order — Phase 2 ✅ COMPLETE
1. ✅ Landing page — Hero, Problems, ModuleCards, Footer
2. ✅ Client-side Router (`/`, `/configurator`, `/assessment`)
3. ✅ ARIA Assessment — 6 dimensions, questionnaire, scoring, radar chart, gap analysis, results panel

## Phase 2: Landing Page + ARIA Assessment + Router

### Landing Page
- Hero with ASSESS → CONFIGURE → DEPLOY → MONITOR lifecycle
- Problem statement (5 enterprise challenges)
- Module cards with CTAs
- Author credit

### ARIA Assessment Module (PRD §3)
- Interactive questionnaire across 6 dimensions
- 60 questions with context-sensitive branching
- Automated maturity scoring (1-5 per dimension)
- Radar chart visualization
- Gap analysis against Level 3 (minimum safe deployment)
- Report generation with recommendations
- Integration: assessment results pre-populate Configurator

### Client-Side Router
- `/` — Landing page
- `/configurator` — Security Configurator (Phase 1)
- `/assessment` — ARIA Assessment (Phase 2)

---

## Build Order — Phase 3 ✅ COMPLETE
1. ✅ Dashboard types in domain layer
2. ✅ Mock telemetry generator (events, environments, compliance, metrics)
3. ✅ Executive Overview — security score, policy compliance, risk heatmap, health distribution, events timeline
4. ✅ Security Events — filterable event stream with type/severity/search filters, 200 mock events
5. ✅ Compliance Centre — per-framework compliance rates, control status, evidence tracking
6. ✅ Operational Metrics — CPU/memory, API tokens, cost estimates, environment table
7. ✅ Router updated (`/dashboard`)

## Phase 3: Security Posture Dashboard

### Dashboard Views
- **Executive Overview**: Security score donut, policy compliance, risk heatmap, environment health, recent events
- **Security Events**: Filterable stream (permission violations, network blocks, credential detection, MCP activity, config drift, policy overrides)
- **Compliance Centre**: SOC 2, HIPAA, PCI-DSS, ISO 27001, GDPR — per-framework rates, control status, audit report
- **Operational Metrics**: CPU/memory utilisation, API token consumption, cost estimates, environment table

### Files Added
```
src/
├── domain/value-objects/
│   └── dashboard-types.ts          # Dashboard metric types
├── infrastructure/
│   └── mock-telemetry.ts           # Realistic mock data generator
├── presentation/
│   ├── pages/
│   │   └── DashboardPage.tsx
│   └── components/dashboard/
│       ├── ExecutiveView.tsx
│       ├── EventsView.tsx
│       ├── ComplianceView.tsx
│       └── OperationalView.tsx
```

---

## Build Order — Phase 4 ✅ COMPLETE
1. ✅ Provisioner domain — deployment targets, environment templates, provisioning state machine
2. ✅ Provisioning use case — simulated step-by-step with progress callbacks
3. ✅ Provisioner UI — 3-step wizard (target → template → details), live progress, connection details
4. ✅ Router updated (`/provisioner`), landing page wired up

## Phase 4: Sandbox Provisioner

### Self-Service Provisioning
- Deployment target selection (cloud provider + region)
- Environment template selection (pre-hardened configurations)
- Connection details form (environment name, team)
- Live provisioning progress with step-by-step status
- Connection details display on completion

### Files Added
```
src/
├── domain/
│   ├── entities/
│   │   └── provisioning-request.ts  # Provisioning state machine
│   └── value-objects/
│       └── provisioner-types.ts     # Targets, templates, steps
├── application/use-cases/
│   └── provision-environment.ts     # Provisioning orchestrator
├── presentation/
│   ├── pages/
│   │   └── ProvisionerPage.tsx
│   ├── components/provisioner/
│   │   ├── ProvisioningForm.tsx
│   │   ├── TargetSelector.tsx
│   │   ├── TemplateSelector.tsx
│   │   ├── ConnectionDetails.tsx
│   │   └── ProvisioningProgress.tsx
│   └── hooks/
│       └── useProvisioner.ts
```

---

## Consistency Audit ✅ COMPLETE

### Architecture
- Composition root for dependency injection (`composition-root.ts`)
- TelemetryPort interface — DashboardPage uses port, not infrastructure directly
- Use cases consumed via composition root throughout

### Type Safety
- Resolved DashboardComplianceControl name collision
- SettingValue union type replaces `unknown`
- Readonly arrays for DIMENSION_ORDER, QUESTIONS, PROVISIONING_STEPS
- ScoreAssessmentUseCase converted to class-based (consistent pattern)

### Error Handling
- Provisioning failure state machine transitions
- Error states exposed in useProvisioner and useConfigWizard
- Failure UI in ProvisionerPage

### UX Polish
- Clipboard copy feedback ("Copied!") in CodeBlock and ConnectionDetails
- Generate Report button shows coming-soon alert
- Dead "Coming Soon" branches removed
- Form validation in Provisioner details step
- Accessibility: aria-label, aria-required, role=radiogroup

### Rendering Stability
- Removed StrictMode double-renders
- Memoized Router context value
- Stable callbacks via refs in useAssessment
- Narrowed CSS transitions to avoid layout-triggering properties

---

## Routes (Final)
- `/` — Landing page
- `/configurator` — Security Configurator (Phase 1)
- `/assessment` — ARIA Assessment (Phase 2)
- `/dashboard` — Security Posture Dashboard (Phase 3)
- `/provisioner` — Sandbox Provisioner (Phase 4)

## Complete File Structure
```
claudeguard-site/src/
├── composition-root.ts              # Dependency injection
├── domain/
│   ├── entities/
│   │   ├── config-profile.ts        # Immutable config profile
│   │   ├── assessment.ts            # Assessment state, dimension scores
│   │   └── provisioning-request.ts  # Provisioning state machine
│   ├── value-objects/
│   │   ├── compliance-framework.ts  # Framework definitions + controls
│   │   ├── risk-profile.ts          # Risk profile definitions + rules
│   │   ├── cloud-provider.ts        # Provider-specific settings
│   │   ├── aria-dimensions.ts       # 6 dimensions, questions, scoring
│   │   ├── dashboard-types.ts       # Dashboard metric types
│   │   └── provisioner-types.ts     # Targets, templates, steps
│   └── ports/
│       ├── template-engine-port.ts  # Template rendering interface
│       ├── packager-port.ts         # ZIP packaging interface
│       └── telemetry-port.ts        # Telemetry data interface
├── application/
│   └── use-cases/
│       ├── generate-config.ts       # Config generation orchestrator
│       ├── score-assessment.ts      # Scoring algorithm + gap analysis
│       └── provision-environment.ts # Provisioning orchestrator
├── infrastructure/
│   ├── templates/
│   │   ├── managed-settings.ts      # managed-settings.json template
│   │   ├── dockerfile.ts            # Dockerfile template
│   │   ├── docker-compose.ts        # docker-compose.yml template
│   │   ├── firewall.ts              # init-firewall.sh template
│   │   ├── hooks.ts                 # Hook scripts template
│   │   ├── devcontainer.ts          # devcontainer.json template
│   │   └── claude-md.ts             # CLAUDE.md template
│   ├── template-engine.ts           # Template engine implementation
│   ├── zip-packager.ts              # JSZip implementation
│   └── mock-telemetry.ts            # Mock telemetry data generator
├── presentation/
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── ConfiguratorPage.tsx
│   │   ├── AssessmentPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── ProvisionerPage.tsx
│   ├── components/
│   │   ├── Layout.tsx               # App shell + nav
│   │   ├── shared/
│   │   │   └── Router.tsx           # Client-side hash router
│   │   ├── wizard/
│   │   │   ├── WizardShell.tsx
│   │   │   ├── ComplianceStep.tsx
│   │   │   ├── CloudStep.tsx
│   │   │   ├── RiskStep.tsx
│   │   │   └── ReviewStep.tsx
│   │   ├── preview/
│   │   │   ├── ArtifactPreview.tsx
│   │   │   └── CodeBlock.tsx
│   │   ├── landing/
│   │   │   ├── Hero.tsx
│   │   │   ├── Problems.tsx
│   │   │   ├── ModuleCards.tsx
│   │   │   └── Footer.tsx
│   │   ├── assessment/
│   │   │   ├── DimensionNav.tsx
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── RadarChart.tsx
│   │   │   └── ResultsPanel.tsx
│   │   ├── dashboard/
│   │   │   ├── ExecutiveView.tsx
│   │   │   ├── EventsView.tsx
│   │   │   ├── ComplianceView.tsx
│   │   │   └── OperationalView.tsx
│   │   └── provisioner/
│   │       ├── ProvisioningForm.tsx
│   │       ├── TargetSelector.tsx
│   │       ├── TemplateSelector.tsx
│   │       ├── ConnectionDetails.tsx
│   │       └── ProvisioningProgress.tsx
│   └── hooks/
│       ├── useConfigWizard.ts
│       ├── useAssessment.ts
│       └── useProvisioner.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Design Language
- Navy (#0F172A) background, electric blue (#3B82F6) accent
- Amber (#F59E0B) for warnings, emerald (#10B981) for success
- Glass-morphism cards, monospace code preview
- Step indicator with completion states
