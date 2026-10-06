import React, { useState } from 'react';
import { 
  Bot, 
  Users, 
  Globe, 
  FileCode, 
  Webhook, 
  Database, 
  ShieldAlert, 
  CheckCircle2, 
  Play, 
  Pause, 
  AlertTriangle, 
  Layers, 
  ArrowRight, 
  Clock, 
  ExternalLink, 
  Github, 
  Check, 
  X, 
  Sparkles, 
  Terminal, 
  SlidersHorizontal,
  FileCheck2,
  RefreshCw
} from 'lucide-react';

interface ToolAction {
  id: string;
  name: string;
  connector: 'filesystem' | 'browser' | 'rest_api' | 'company_memory';
  riskScore: number; // 1 to 10
  riskCategory: 'Low' | 'Medium' | 'High (HITL Required)';
  status: 'pending' | 'running' | 'waiting_approval' | 'completed' | 'rejected';
  inputPayload: Record<string, any>;
  outputResult?: string;
  diffPreview?: string;
  hitlDetails?: {
    reason: string;
    suggestedMitigation: string;
    overrideKey?: string;
  };
}

interface AIEmployee {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  status: 'Active' | 'Idle';
  activeWorkflowTitle: string;
  description: string;
  actions: ToolAction[];
}

const EMPLOYEES: AIEmployee[] = [
  {
    id: 'emp_sre',
    name: 'Alex Rivera',
    role: 'Autonomous SRE & DevOps Engineer',
    department: 'Infrastructure Operations',
    avatar: '⚙️',
    status: 'Active',
    activeWorkflowTitle: 'Production Memory Leak Hotfix & Canary Deployment',
    description: 'Diagnoses Kubernetes container metrics, navigates cloud status dashboards, patches configuration files, and deploys canaries.',
    actions: [
      {
        id: 'act_1',
        name: 'Query Prometheus Metric Thresholds',
        connector: 'rest_api',
        riskScore: 2,
        riskCategory: 'Low',
        status: 'pending',
        inputPayload: { endpoint: '/api/v1/query', query: 'container_memory_working_set_bytes{pod="auth-7b"}' },
        outputResult: '{"memory_mb": 3940, "threshold_mb": 4096, "alert": "HighMemorySaturation"}'
      },
      {
        id: 'act_2',
        name: 'Headless Browser Diagnostic Check',
        connector: 'browser',
        riskScore: 3,
        riskCategory: 'Low',
        status: 'pending',
        inputPayload: { url: 'https://status.internal/datadog/live-traces', selector: '#error-rate-graph' },
        outputResult: '{"http_5xx_rate": "4.2%", "dominant_cause": "OOMKiller on pod 7b"}'
      },
      {
        id: 'act_3',
        name: 'Retrieve Runbook from Company Memory',
        connector: 'company_memory',
        riskScore: 2,
        riskCategory: 'Low',
        status: 'pending',
        inputPayload: { query: 'runbook:auth_service_heap_limit', department: 'devops' },
        outputResult: '{"recommended_heap": "4096M", "max_ram": "6144Mi", "reboot_policy": "canary_first"}'
      },
      {
        id: 'act_4',
        name: 'Apply Deployment Memory Patch (Git Diff)',
        connector: 'filesystem',
        riskScore: 5,
        riskCategory: 'Medium',
        status: 'pending',
        inputPayload: { path: '/deploy/k8s/auth-deployment.yaml' },
        diffPreview: `--- a/deploy/k8s/auth-deployment.yaml\n+++ b/deploy/k8s/auth-deployment.yaml\n@@ -24,3 +24,3 @@\n     resources:\n       limits:\n-        memory: "4096Mi"\n+        memory: "6144Mi"`
      },
      {
        id: 'act_5',
        name: 'Promote Canary Deployment to Cluster',
        connector: 'rest_api',
        riskScore: 9,
        riskCategory: 'High (HITL Required)',
        status: 'pending',
        inputPayload: { cluster: 'prod-us-east-1', rollout: 'canary-10pct', replicas: 2 },
        hitlDetails: {
          reason: 'Canary rollout will mutate live production traffic routing in cluster prod-us-east-1.',
          suggestedMitigation: 'Confirm canary target cluster and verify staging validation report before release.'
        }
      }
    ]
  },
  {
    id: 'emp_cs',
    name: 'Priya Sharma',
    role: 'Customer Success & Dispute Specialist',
    department: 'Customer Operations',
    avatar: '💬',
    status: 'Active',
    activeWorkflowTitle: 'Zendesk VIP Dispute Resolution & Stripe Refund',
    description: 'Inspects customer support tickets, audits company refund policies, verifies Stripe transaction logs, and issues refunds.',
    actions: [
      {
        id: 'act_cs_1',
        name: 'Fetch Zendesk VIP Ticket Context',
        connector: 'rest_api',
        riskScore: 2,
        riskCategory: 'Low',
        status: 'pending',
        inputPayload: { ticket_id: 'ZD-88419', customer_tier: 'Enterprise VIP' },
        outputResult: '{"issue": "Accidental double subscription renewal", "disputed_amount": 450.00}'
      },
      {
        id: 'act_cs_2',
        name: 'Query Org Refund Policy in Memory',
        connector: 'company_memory',
        riskScore: 2,
        riskCategory: 'Low',
        status: 'pending',
        inputPayload: { policy_key: 'policy:support:refund:auto_threshold' },
        outputResult: '{"auto_limit_usd": 200.00, "manager_override_required": true}'
      },
      {
        id: 'act_cs_3',
        name: 'Inspect Stripe Merchant Charge History',
        connector: 'browser',
        riskScore: 4,
        riskCategory: 'Medium',
        status: 'pending',
        inputPayload: { dashboard_url: 'https://dashboard.stripe.com/charges/ch_91283' },
        outputResult: '{"charge_status": "succeeded", "amount": 450.00, "duplicate_detected": true}'
      },
      {
        id: 'act_cs_4',
        name: 'Execute $450.00 Stripe Charge Refund',
        connector: 'rest_api',
        riskScore: 9,
        riskCategory: 'High (HITL Required)',
        status: 'pending',
        inputPayload: { charge_id: 'ch_91283', refund_amount_usd: 450.00, reason: 'duplicate_subscription' },
        hitlDetails: {
          reason: 'Refund amount ($450.00) exceeds autonomous authorization ceiling ($200.00). Human manager signoff required.',
          suggestedMitigation: 'Review duplicate billing receipt and approve disbursement.'
        }
      }
    ]
  },
  {
    id: 'emp_hr',
    name: 'Marcus Chen',
    role: 'People Operations & Identity Specialist',
    department: 'Human Resources',
    avatar: '📋',
    status: 'Active',
    activeWorkflowTitle: 'New Hire Identity Verification & Account Provisioning',
    description: 'Autonomous employee onboarding: validates candidate documentation, generates employment contracts, and provisions enterprise tools.',
    actions: [
      {
        id: 'act_hr_1',
        name: 'Validate Academic & ID Credentials',
        connector: 'company_memory',
        riskScore: 2,
        riskCategory: 'Low',
        status: 'pending',
        inputPayload: { candidate_id: 'cand_901', college: 'IIT Dhanbad' },
        outputResult: '{"degree_verified": true, "cgpa_verified": true, "background_check": "clear"}'
      },
      {
        id: 'act_hr_2',
        name: 'Generate Signed NDA & Employment Agreement',
        connector: 'filesystem',
        riskScore: 4,
        riskCategory: 'Medium',
        status: 'pending',
        inputPayload: { template: '/templates/fte_offer_v3.pdf', candidate: 'Tejdeep Kodati' },
        outputResult: '{"document_generated": "/contracts/2026/FTE_Tejdeep_Kodati.pdf", "hash": "sha256_88b"}'
      },
      {
        id: 'act_hr_3',
        name: 'Provision Google Workspace & Slack Account',
        connector: 'rest_api',
        riskScore: 4,
        riskCategory: 'Medium',
        status: 'pending',
        inputPayload: { email: 'kodati.tejdeep@centralign.ai', groups: ['engineering', 'founding-team'] },
        outputResult: '{"google_workspace_created": true, "slack_invited": true}'
      }
    ]
  }
];

export default function App() {
  const [selectedEmp, setSelectedEmp] = useState<AIEmployee>(EMPLOYEES[0]);
  const [actions, setActions] = useState<ToolAction[]>(EMPLOYEES[0].actions);
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentActionIndex, setCurrentActionIndex] = useState<number | null>(null);
  const [hitlModalAction, setHitlModalAction] = useState<ToolAction | null>(null);
  const [activeTab, setActiveTab] = useState<'workflow' | 'connectors' | 'queue' | 'audit'>('workflow');
  const [customParam, setCustomParam] = useState('');

  const handleSelectEmp = (emp: AIEmployee) => {
    setSelectedEmp(emp);
    setActions(emp.actions.map(a => ({ ...a, status: 'pending' })));
    setIsExecuting(false);
    setCurrentActionIndex(null);
    setHitlModalAction(null);
  };

  const startExecution = async () => {
    setIsExecuting(true);
    
    for (let i = 0; i < actions.length; i++) {
      const act = actions[i];
      setCurrentActionIndex(i);

      // Set to running
      setActions(prev => prev.map((a, idx) => idx === i ? { ...a, status: 'running' } : a));
      await new Promise(r => setTimeout(r, 700));

      // Check if HITL required
      if (act.riskCategory === 'High (HITL Required)') {
        setActions(prev => prev.map((a, idx) => idx === i ? { ...a, status: 'waiting_approval' } : a));
        setHitlModalAction(act);
        setIsExecuting(false);
        return; // Pause execution loop
      }

      // Mark completed
      setActions(prev => prev.map((a, idx) => idx === i ? { ...a, status: 'completed' } : a));
      await new Promise(r => setTimeout(r, 400));
    }

    setIsExecuting(false);
    setCurrentActionIndex(null);
  };

  const handleApproveHITL = async () => {
    if (!hitlModalAction) return;
    const actionIndex = actions.findIndex(a => a.id === hitlModalAction.id);
    
    // Mark approved and running
    setActions(prev => prev.map((a, idx) => idx === actionIndex ? { 
      ...a, 
      status: 'completed', 
      outputResult: `{"status": "approved_by_human", "execution_tx": "tx_${Date.now()}", "timestamp": "${new Date().toISOString()}"}` 
    } : a));

    setHitlModalAction(null);
    setIsExecuting(true);

    // Resume any remaining actions
    for (let i = actionIndex + 1; i < actions.length; i++) {
      setCurrentActionIndex(i);
      setActions(prev => prev.map((a, idx) => idx === i ? { ...a, status: 'running' } : a));
      await new Promise(r => setTimeout(r, 600));
      setActions(prev => prev.map((a, idx) => idx === i ? { ...a, status: 'completed' } : a));
    }

    setIsExecuting(false);
    setCurrentActionIndex(null);
  };

  const handleRejectHITL = () => {
    if (!hitlModalAction) return;
    const actionIndex = actions.findIndex(a => a.id === hitlModalAction.id);
    setActions(prev => prev.map((a, idx) => idx === actionIndex ? { 
      ...a, 
      status: 'rejected', 
      outputResult: '{"status": "rejected_by_human_reviewer", "reason": "Destructive mutation prevented"}' 
    } : a));
    setHitlModalAction(null);
    setIsExecuting(false);
    setCurrentActionIndex(null);
  };

  const resetWorkflow = () => {
    setActions(selectedEmp.actions.map(a => ({ ...a, status: 'pending' })));
    setIsExecuting(false);
    setCurrentActionIndex(null);
    setHitlModalAction(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-lg shadow-lg shadow-purple-500/20">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl tracking-tight text-white">CentraSphere</span>
                <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded-full font-mono">
                  Autonomous AI Employees
                </span>
              </div>
              <p className="text-xs text-slate-400">Tool Connectors, Company Memory & Human-in-the-Loop Governance</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex bg-slate-800/80 p-1 rounded-lg border border-slate-700 text-xs">
              <button 
                onClick={() => setActiveTab('workflow')}
                className={`px-3 py-1.5 rounded-md font-medium transition ${activeTab === 'workflow' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>
                Agent Runtime
              </button>
              <button 
                onClick={() => setActiveTab('connectors')}
                className={`px-3 py-1.5 rounded-md font-medium transition ${activeTab === 'connectors' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>
                Tool Connectors
              </button>
              <button 
                onClick={() => setActiveTab('queue')}
                className={`px-3 py-1.5 rounded-md font-medium transition ${activeTab === 'queue' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>
                Task Queue & Metrics
              </button>
              <button 
                onClick={() => setActiveTab('audit')}
                className={`px-3 py-1.5 rounded-md font-medium transition ${activeTab === 'audit' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>
                Audit Trace
              </button>
            </div>

            <a 
              href="https://github.com/TejdeepKodati/centrasphere" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center space-x-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-2 rounded-lg transition"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">Enterprise AI Workforce</span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-400">CentrAlign AI Founding Engineer Implementation</span>
              </div>
              <h1 className="text-xl font-bold text-white">Autonomous AI Employees Operating Across Files, Browsers & APIs</h1>
              <p className="text-sm text-slate-300 mt-1 max-w-3xl">
                End-to-end task execution with sandboxed filesystem diffs, headless browser navigation, 
                organizational memory grounding, and strict risk-gated Human-in-the-Loop (HITL) approval stops.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button 
                onClick={startExecution}
                disabled={isExecuting || actions.every(a => a.status === 'completed')}
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold px-4 py-2.5 rounded-lg shadow-lg shadow-purple-600/20 text-sm transition">
                <Play className="w-4 h-4 fill-white" />
                <span>Run Autonomous Agent</span>
              </button>

              <button 
                onClick={resetWorkflow}
                disabled={isExecuting}
                className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium px-3 py-2.5 rounded-lg text-sm transition">
                <RefreshCw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Agent Runtime & HITL Loop */}
        {activeTab === 'workflow' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: AI Employee Roster & Current Persona Details */}
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
                Autonomous AI Workforce Roster
              </div>

              <div className="space-y-3">
                {EMPLOYEES.map(emp => (
                  <div
                    key={emp.id}
                    onClick={() => handleSelectEmp(emp)}
                    className={`p-4 rounded-xl border cursor-pointer transition ${
                      selectedEmp.id === emp.id 
                        ? 'border-purple-500 bg-slate-800/90 shadow-md shadow-purple-500/10' 
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl p-2 bg-slate-800 rounded-lg border border-slate-700">{emp.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-white text-sm truncate">{emp.name}</h3>
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono">
                            {emp.status}
                          </span>
                        </div>
                        <p className="text-xs text-purple-300 truncate">{emp.role}</p>
                        <p className="text-[11px] text-slate-400 mt-1">{emp.department}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Persona Context Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs space-y-2">
                <div className="font-semibold text-white">Active Objective:</div>
                <p className="text-slate-300">{selectedEmp.description}</p>
                <div className="border-t border-slate-800 pt-2 text-slate-400 space-y-1">
                  <div>Department: <span className="text-slate-200">{selectedEmp.department}</span></div>
                  <div>Workflow Steps: <span className="text-slate-200">{actions.length} tools</span></div>
                  <div>HITL Gates: <span className="text-amber-400 font-mono">1 Destructive Action</span></div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Execution Stream & Step Timeline */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h2 className="font-bold text-white text-base">{selectedEmp.activeWorkflowTitle}</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Runtime Plan: Sequential Tool Invocation with Invariant Verification</p>
                  </div>
                  <span className="text-xs font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded">
                    {actions.filter(a => a.status === 'completed').length} / {actions.length} Completed
                  </span>
                </div>

                {/* Steps List */}
                <div className="space-y-3">
                  {actions.map((act, index) => (
                    <div 
                      key={act.id}
                      className={`p-4 rounded-xl border transition ${
                        act.status === 'waiting_approval'
                          ? 'border-amber-500 bg-amber-500/5 ring-1 ring-amber-500'
                          : act.status === 'running'
                          ? 'border-purple-500 bg-purple-500/5'
                          : act.status === 'completed'
                          ? 'border-emerald-500/30 bg-emerald-500/5'
                          : act.status === 'rejected'
                          ? 'border-rose-500/30 bg-rose-500/5'
                          : 'border-slate-800 bg-slate-950/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg text-xs font-mono mt-0.5 ${
                            act.connector === 'filesystem' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                            act.connector === 'browser' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                            act.connector === 'rest_api' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                            'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                          }`}>
                            {act.connector === 'filesystem' && <FileCode className="w-4 h-4" />}
                            {act.connector === 'browser' && <Globe className="w-4 h-4" />}
                            {act.connector === 'rest_api' && <Webhook className="w-4 h-4" />}
                            {act.connector === 'company_memory' && <Database className="w-4 h-4" />}
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-mono text-slate-400">Step {index + 1}</span>
                              <span className="text-slate-600">•</span>
                              <span className="text-sm font-semibold text-white">{act.name}</span>
                            </div>
                            <div className="text-xs font-mono text-slate-400">
                              Connector: <span className="text-slate-200">{act.connector}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status Badges */}
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-0.5 rounded font-mono ${
                            act.riskCategory.includes('High') ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                            act.riskCategory === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            'bg-slate-800 text-slate-400'
                          }`}>
                            Risk: {act.riskScore}/10
                          </span>

                          {act.status === 'completed' && (
                            <span className="flex items-center space-x-1 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Verified</span>
                            </span>
                          )}
                          {act.status === 'running' && (
                            <span className="flex items-center space-x-1 text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded animate-pulse">
                              <RefreshCw className="w-3 h-3 animate-spin" />
                              <span>Running</span>
                            </span>
                          )}
                          {act.status === 'waiting_approval' && (
                            <span className="flex items-center space-x-1 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                              <ShieldAlert className="w-3 h-3" />
                              <span>Awaiting Approval</span>
                            </span>
                          )}
                          {act.status === 'rejected' && (
                            <span className="flex items-center space-x-1 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded">
                              <X className="w-3 h-3" />
                              <span>Rejected</span>
                            </span>
                          )}
                          {act.status === 'pending' && (
                            <span className="flex items-center space-x-1 text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
                              <Clock className="w-3 h-3" />
                              <span>Pending</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Diff Preview if File Connector */}
                      {act.diffPreview && (
                        <div className="mt-3">
                          <span className="text-[11px] text-slate-400 block mb-1">Generated File Diff Preview:</span>
                          <pre className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-400 overflow-x-auto">
                            {act.diffPreview}
                          </pre>
                        </div>
                      )}

                      {/* Output Result */}
                      {act.outputResult && (
                        <div className="mt-3">
                          <span className="text-[11px] text-slate-400 block mb-1">Execution Output & Invariant State:</span>
                          <pre className="bg-slate-950 p-2 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto">
                            {act.outputResult}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Tool & Connector Abstractions */}
        {activeTab === 'connectors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Connector 1: FileSystem */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg">
                  <FileCode className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">FileSystem Connector Abstraction</h3>
                  <p className="text-xs text-slate-400">Sandboxed I/O, AST generation & Unified Patch Application</p>
                </div>
              </div>
              <p className="text-xs text-slate-300">
                Enables autonomous AI employees to read codebases, configuration files, and generate atomic git diffs without unrestricted host filesystem access.
              </p>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                <div>Isolation: Virtual Workspace Chroot</div>
                <div>Permitted Operations: Read, Patch, VerifySyntax</div>
                <div>Forbidden: Direct Shell Execution, System Dir Mutation</div>
              </div>
            </div>

            {/* Connector 2: Browser Automation */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Browser Automation Connector</h3>
                  <p className="text-xs text-slate-400">Headless Chromium DOM Navigation & Form Interaction</p>
                </div>
              </div>
              <p className="text-xs text-slate-300">
                Navigates internal company web applications, monitors real-time dashboards, fills multi-step portal forms, and captures DOM snapshots for verification.
              </p>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                <div>Engine: Headless Chromium CDP Protocol</div>
                <div>Capabilities: Click, Type, WaitSelector, ScrapeTable</div>
                <div>Session Security: Isolated Cookie Sandbox</div>
              </div>
            </div>

            {/* Connector 3: REST API */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg">
                  <Webhook className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">REST API & Webhook Connector</h3>
                  <p className="text-xs text-slate-400">Schema-Validated HTTP Dispatch & Idempotency Gating</p>
                </div>
              </div>
              <p className="text-xs text-slate-300">
                Integrates with SaaS tools (Salesforce, Zendesk, Stripe, Slack, Workday, GitHub). Guarantees JSON schema compliance and idempotency keys to prevent duplicate transactions.
              </p>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                <div>Protocols: REST, GraphQL, Webhooks</div>
                <div>Security: mTLS, HMAC Signatures, Token Bucket Rate Limits</div>
                <div>Error Recovery: Exponential Backoff & DLQ</div>
              </div>
            </div>

            {/* Connector 4: Company Memory */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-lg">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Company Memory & Policy Connector</h3>
                  <p className="text-xs text-slate-400">Hierarchical Knowledge Base & Episodic Session Memory</p>
                </div>
              </div>
              <p className="text-xs text-slate-300">
                Grounds AI employee actions in company rules, SOP runbooks, organizational charts, and previous resolution traces, preventing hallucinated decisions.
              </p>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                <div>Retrieval: Dense Cosine Embeddings + Prefix Trie</div>
                <div>Retention: Working Memory (LRU) + Persistent Knowledge Base</div>
                <div>Privacy: Role-Based Tenant Data Partitioning</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Task Queue & Worker Metrics */}
        {activeTab === 'queue' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Task Queue & Distributed Worker Observability</h2>
              <p className="text-sm text-slate-400">Real-time status of priority scheduling, concurrency throughput, and Dead Letter Queue (DLQ).</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Active Worker Threads</div>
                <div className="text-2xl font-bold text-white font-mono mt-1">16 <span className="text-xs text-emerald-400 font-normal">/ 16 online</span></div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Average Job Latency</div>
                <div className="text-2xl font-bold text-white font-mono mt-1">182 ms</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Total Tokens Processed</div>
                <div className="text-2xl font-bold text-white font-mono mt-1">428,910</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">DLQ Exhausted Tasks</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">0 <span className="text-xs text-slate-400 font-normal">healthy</span></div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-purple-400">Priority Heap Queue Distribution</div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center bg-slate-900 p-2.5 rounded border border-slate-800">
                  <span className="text-rose-400">Priority: Critical [Security & Cluster Alert]</span>
                  <span className="text-slate-300">0 queued</span>
                </div>
                <div className="flex justify-between items-center bg-slate-900 p-2.5 rounded border border-slate-800">
                  <span className="text-amber-400">Priority: High [SRE Canary Rollout]</span>
                  <span className="text-slate-300">1 queued</span>
                </div>
                <div className="flex justify-between items-center bg-slate-900 p-2.5 rounded border border-slate-800">
                  <span className="text-blue-400">Priority: Normal [Customer Ticket Triage]</span>
                  <span className="text-slate-300">4 queued</span>
                </div>
                <div className="flex justify-between items-center bg-slate-900 p-2.5 rounded border border-slate-800">
                  <span className="text-slate-400">Priority: Low [Background Runbook Indexing]</span>
                  <span className="text-slate-300">12 queued</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Audit Trace Export */}
        {activeTab === 'audit' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Immutable Enterprise Audit Trace</h2>
                <p className="text-sm text-slate-400">Complete JSON telemetry for compliance, security officers, and SOC2 verification.</p>
              </div>
              <button 
                onClick={() => alert("Audit trace JSON copied to clipboard!")}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg transition"
              >
                Copy JSON Trace
              </button>
            </div>

            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 max-h-96 overflow-y-auto">
{JSON.stringify({
  audit_version: "2.1.0",
  session_id: "sess_centralign_99214",
  timestamp: new Date().toISOString(),
  agent: {
    id: selectedEmp.id,
    name: selectedEmp.name,
    role: selectedEmp.role,
    department: selectedEmp.department
  },
  workflow: selectedEmp.activeWorkflowTitle,
  execution_steps: actions.map(a => ({
    id: a.id,
    name: a.name,
    connector: a.connector,
    risk_score: a.riskScore,
    risk_tier: a.riskCategory,
    status: a.status,
    input: a.inputPayload,
    output: a.outputResult || "pending"
  }))
}, null, 2)}
            </pre>
          </div>
        )}
      </main>

      {/* Interactive Human-in-the-Loop (HITL) Modal */}
      {hitlModalAction && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-xl">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Human-in-the-Loop Required</span>
                  <h3 className="text-lg font-bold text-white">{hitlModalAction.name}</h3>
                </div>
              </div>
              <button 
                onClick={handleRejectHITL}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Action Risk Score:</span>
                <span className="font-mono text-rose-400 font-bold">{hitlModalAction.riskScore} / 10 (Critical / Destructive)</span>
              </div>
              
              <div>
                <span className="text-slate-400 block mb-1">Reason for Human Interception:</span>
                <p className="text-amber-200/90 bg-amber-500/10 p-2.5 rounded border border-amber-500/20">
                  {hitlModalAction.hitlDetails?.reason}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Action Payload Parameters:</span>
                <pre className="bg-slate-900 p-2.5 rounded border border-slate-800 font-mono text-[11px] text-slate-300">
                  {JSON.stringify(hitlModalAction.inputPayload, null, 2)}
                </pre>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Operator Parameter Override (Optional):</span>
                <input 
                  type="text"
                  placeholder="e.g. override_target_cluster=canary-pilot-1 or max_refund_usd=400"
                  value={customParam}
                  onChange={e => setCustomParam(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-mono text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={handleRejectHITL}
                className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-4 py-2 rounded-lg text-sm transition"
              >
                <X className="w-4 h-4" />
                <span>Deny & Abort Action</span>
              </button>

              <button
                onClick={handleApproveHITL}
                className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold px-5 py-2 rounded-lg text-sm shadow-lg shadow-emerald-500/20 transition"
              >
                <Check className="w-4 h-4" />
                <span>Authorize & Resume Workflow</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mandatory Footer with made with ♥ by Tejdeep */}
      <footer className="border-t border-slate-800 bg-slate-950/80 px-6 py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span>CentraSphere © 2026. Enterprise Autonomous AI Workforce Platform.</span>
          </div>

          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/TejdeepKodati/centrasphere" 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-300 hover:text-white transition font-medium underline flex items-center space-x-1"
            >
              <span>made with ♥ by Tejdeep</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
