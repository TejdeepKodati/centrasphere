# CentraSphere: Enterprise Autonomous AI Employee Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-cyan.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Enterprise platform powering autonomous AI employees operating across files, headless browsers, and SaaS APIs with company memory grounding and strict Human-in-the-Loop (HITL) governance.

Built by **[Tejdeep Kodati](https://github.com/TejdeepKodati)**.

---

## 🌐 Live Deployment & Source Code
- **Live Vercel Application**: [https://centrasphere.vercel.app](https://centrasphere.vercel.app)
- **GitHub Repository**: [https://github.com/TejdeepKodati/centrasphere](https://github.com/TejdeepKodati/centrasphere)

---

## 🏛️ Architectural Overview

CentraSphere implements the complete product and infrastructure layer for autonomous enterprise AI employees:

```
                            ┌────────────────────────────────────────┐
                            │      Enterprise AI Employees           │
                            │  [DevOps SRE]  [FinOps]  [HR]  [CS]    │
                            └───────────────────┬────────────────────┘
                                                │
                                                ▼
                            ┌────────────────────────────────────────┐
                            │     Autonomous Execution Runtime       │
                            │  Sequential & DAG Planning / Recovery  │
                            └───────────────────┬────────────────────┘
                                                │
                 ┌──────────────────────────────┴──────────────────────────────┐
                 ▼                                                             ▼
   ┌───────────────────────────┐                                 ┌───────────────────────────┐
   │ Tool/Connector Layer      │                                 │ Human-in-the-Loop (HITL)  │
   │ • FileSystem Connector    │                                 │ • Risk Scoring (1-10)     │
   │ • Browser Automation CDP  │                                 │ • Destructive Gatekeeper  │
   │ • REST API & Webhooks     │ ──[ Risk >= 8 (Destructive) ]──►│ • Diff & Payload Review   │
   │ • Company Memory Store    │                                 │ • Human Override / Veto   │
   └─────────────┬─────────────┘                                 └─────────────┬─────────────┘
                 │                                                             │
                 │ [ Low/Med Risk OR Human Authorized ]                        │
                 ▼                                                             ▼
   ┌───────────────────────────────────────────────────────────────────────────┐
   │                     Task Queue & Worker Observability                     │
   │   • Priority Scheduling  • Concurrency Workers  • Dead Letter Queue (DLQ) │
   └─────────────────────────────────────┬─────────────────────────────────────┘
                                         │
                                         ▼
   ┌───────────────────────────────────────────────────────────────────────────┐
   │                     Immutable Compliance Audit Trail                      │
   │   Structured SOC2-compliant JSON telemetry with cryptographic execution tx│
   └───────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Core Platform Features

### 1. Specialized AI Employee Personas
- **Alex Rivera (Autonomous SRE & DevOps)**: Inspects container metrics, navigates live status dashboards, writes atomic YAML memory patches, and halts before canary rollout for human verification.
- **Priya Sharma (Customer Success & Dispute Resolver)**: Triages VIP Zendesk tickets, checks company refund limits in memory, verifies Stripe transaction records, and requests manager authorization for refunds exceeding $200.
- **Marcus Chen (People Ops & Identity Specialist)**: Automates candidate onboarding, generates verified employment agreements via File connector, and provisions Google Workspace and Slack accounts.

### 2. Pluggable Tool & Connector Abstractions
- **FileSystem Connector**: Sandboxed read/write within virtual workspace chroot; generates unified git diffs before mutation.
- **Browser Automation Connector**: Headless Chromium CDP interaction simulator with DOM selectors, form inputs, and screenshot capture.
- **REST API Connector**: Schema-validated HTTP dispatcher supporting HMAC authentication, idempotency keys, and automated retries.
- **Company Memory Connector**: Hierarchical context grounding combining enterprise policy rules with episodic session memory.

### 3. Human-in-the-Loop (HITL) Risk Gatekeeper
- Evaluates action risk score on a 10-point scale:
  - **Low (1-3)**: Auto-executed with audit log.
  - **Medium (4-6)**: Monitored with state assertion.
  - **High / Destructive (7-10)**: Execution immediately halts. Renders interactive approval dialog displaying side-effects, exact parameters, diff preview, and operator override inputs.

### 4. Task Queue & Worker Metrics
- Priority heap queues (Critical, High, Normal, Low).
- Live metrics tracking active worker pool threads, average job latency, token consumption, and Dead Letter Queue (DLQ) status.

---

## 🛠️ Local Setup & Development

```bash
# Clone the repository
git clone https://github.com/TejdeepKodati/centrasphere.git
cd centrasphere

# Install dependencies
npm install

# Run local development server
npm run dev

# Build production bundle
npm run build
```

---

## 📄 License
MIT © Tejdeep Kodati
