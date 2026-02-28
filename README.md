# ClaudeGuard

Enterprise Security Lifecycle Platform for Claude Code. Safely deploy, govern, and monitor agentic AI development environments across your organization.

## Modules

| Phase | Module | Route | Description |
|-------|--------|-------|-------------|
| ASSESS | ARIA Assessment | `/assessment` | Interactive questionnaire across 6 security dimensions with maturity scoring, radar chart, and gap analysis |
| CONFIGURE | Security Configurator | `/configurator` | Step-by-step wizard generating hardened deployment packages (managed-settings.json, Dockerfile, firewall, hooks, etc.) |
| DEPLOY | Sandbox Provisioner | `/provisioner` | Self-service provisioning of pre-hardened Claude Code containers with connection details |
| MONITOR | Security Dashboard | `/dashboard` | Real-time visibility with executive overview, security events, compliance centre, and operational metrics |

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS v4
- JSZip (client-side ZIP packaging)
- No backend — all generation happens client-side

## Getting Started

```bash
npm install
npm run dev       # Development server (http://localhost:5173)
npm run build     # Production build
npm run preview   # Preview production build (http://localhost:4173)
```

## Architecture

Clean architecture with domain-driven design:

```
src/
├── domain/          # Entities, value objects, ports (interfaces)
├── application/     # Use cases (generate config, score assessment, provision)
├── infrastructure/  # Template engine, ZIP packager, mock telemetry
├── presentation/    # React components, pages, hooks
└── composition-root.ts  # Dependency injection
```

## Generated Artifacts (Configurator)

The Security Configurator generates a complete deployment package:

1. `managed-settings.json` — Enterprise Claude Code policy
2. `Dockerfile` — Container image with security hardening
3. `docker-compose.yml` — Multi-service orchestration with network isolation
4. `init-firewall.sh` — Container-level network policy (default-deny outbound)
5. `hooks/pre-tool-use.sh` — Pre-execution command validation
6. `hooks/post-tool-use.sh` — Post-execution audit logging
7. `devcontainer.json` — VS Code / Cursor DevContainer config
8. `CLAUDE.md` — Project-level Claude Code behaviour instructions

## Author

Allan Smeyatsky — Google Cloud Partner All-Star 2024, Google UK CTO Council Member
