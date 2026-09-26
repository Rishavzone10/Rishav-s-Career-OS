/**
 * Rishav's Career OS — Interactive Showcase Logic
 * Architecture Case Study & Interactive Simulators
 */

(function () {
  'use strict';

  // --- State Store ---
  const state = {
    currentRevision: 42,
    selectedNode: 'profile',
    selectedView: 'backend',
    selectedDemoTab: 'mcp',
    selectedMcpTool: 'get_profile_view',
    selectedEndpoint: 'profile',
    activeStoryStep: 7,
    isMcpExecuting: false,
    isJobExecuting: false,
    isDiffProcessing: false
  };

  // --- Architecture Subsystems Data ---
  const architectureData = {
    profile: {
      kicker: 'Core System',
      title: 'Career Profile Core',
      body: 'The canonical machine-readable source of professional truth. Maintains identity, verified experiences, skill graphs, metric provenance, and Git-style revisions. Downstream consumers request role projections instead of creating detached duplicates.',
      tags: ['FastAPI', 'PostgreSQL', 'Pydantic v2', 'SQLAlchemy', 'JSON-RPC'],
      subnodes: [
        { label: 'Contract', desc: 'Immutable revisions with SHA-256 provenance hashes.' },
        { label: 'Validation', desc: 'Automated Pydantic schema validation & truth guardrails.' },
        { label: 'Dual-Interface', desc: 'MCP tools for AI clients + REST for deterministic consumers.' }
      ]
    },
    ai: {
      kicker: 'AI Interface Layer',
      title: 'LLM Clients (GPT · Gemini · Claude)',
      body: 'AI agents interact with Career OS using Model Context Protocol (MCP) tool-calling schemas. Agents query purpose-built projections, propose updates with evidence citations, and analyze job descriptions without raw prompt injection.',
      tags: ['Model Context Protocol', 'Claude 3.5 Sonnet', 'GPT-4o', 'Gemini 1.5 Pro', 'Structured Outputs'],
      subnodes: [
        { label: 'Tool Calling', desc: 'Strict JSON-RPC contracts over stdio or SSE transports.' },
        { label: 'Least Privilege', desc: 'Read access is immediate; mutations generate staging proposals.' },
        { label: 'No Hallucinations', desc: 'AI responses are anchored directly in Profile Core evidence.' }
      ]
    },
    mcp: {
      kicker: 'Protocol Bridge',
      title: 'Model Context Protocol (MCP) Server',
      body: 'Exposes 17 dedicated MCP tools (`get_profile`, `get_profile_view`, `propose_change`, `validate_profile`, etc.) allowing any compliant AI runtime to inspect candidate state and generate auditable change proposals.',
      tags: ['MCP SDK', 'Python 3.11', 'JSON Schema', 'RPC Protocol', 'Validation Gates'],
      subnodes: [
        { label: 'Surface', desc: '17 typed tools covering read, diff, proposal, and validation.' },
        { label: 'Deterministic', desc: 'Input arguments are strictly validated against Pydantic schemas.' },
        { label: 'Audit Trail', desc: 'All AI tool invocations are logged with query context.' }
      ]
    },
    revision: {
      kicker: 'Version Control',
      title: 'Revision & Diff Engine',
      body: 'Implements Git-style versioning for career data. Every approved change increments the revision number (e.g. REV 41 → REV 42), produces a line-by-line diff, and preserves historical snapshots for application context recall.',
      tags: ['Immutable Log', 'Delta Computation', 'Historical Replay', 'Provenance Chains'],
      subnodes: [
        { label: 'Diffing', desc: 'Line-by-line and field-by-field JSON diff generation.' },
        { label: 'Rollback', desc: 'Ability to replay or restore any prior verified revision.' },
        { label: 'Integrity', desc: 'Downstream applications are permanently pinned to specific revisions.' }
      ]
    },
    validation: {
      kicker: 'Guardrails',
      title: 'Profile Validation & Guardrails',
      body: 'Protects the core profile from schema corruption, exaggerated claims, or hallucinated competencies. Every proposal must pass type checking, metric sanity bounds, and evidence verification before review.',
      tags: ['Pydantic v2', 'Assertion Rules', 'Truth Guardrails', 'Schema Integrity'],
      subnodes: [
        { label: 'Schema Enforcement', desc: 'Reject invalid types, missing dates, or untyped tags.' },
        { label: 'Truth Bounds', desc: 'Flags unverified metrics or unsupported technical claims.' },
        { label: 'Pre-flight Check', desc: 'Simulates view generation before committing revisions.' }
      ]
    },
    views: {
      kicker: 'Projections (CQRS)',
      title: 'Purpose-Built Profile Views',
      body: 'Projects the single canonical profile into role-tailored configurations: Backend, Full Stack, AI/Agentic, ML, and ATS Resume. Skills and highlights are dynamically weighted without mutating the master source of truth.',
      tags: ['CQRS Pattern', 'Dynamic Weighting', 'ATS Formatter', 'Domain Filtering'],
      subnodes: [
        { label: 'Decoupled', desc: 'Role views are derived read models, never independent masters.' },
        { label: 'Zero Drift', desc: 'When the canonical core updates, all projections update instantly.' },
        { label: 'Optimized', desc: 'Tailors keyword density and project ordering per domain.' }
      ]
    },
    evidence: {
      kicker: 'Provenance',
      title: 'Evidence & Provenance Tracking',
      body: 'Every bullet point, metric, and skill is linked to source evidence: GitHub repositories, production commit logs, publication DOIs, or verified project milestones. No unsubstantiated claims.',
      tags: ['Cryptographic Hashes', 'GitHub Linkage', 'Commit Metadata', 'Audit Records'],
      subnodes: [
        { label: 'Deep Linking', desc: 'Direct links from profile bullet points to source repositories.' },
        { label: 'Proof of Work', desc: 'Verified architecture diagrams and working demos.' },
        { label: 'Recruiter Trust', desc: 'Eliminates candidate resume exaggerations with verifiability.' }
      ]
    },
    engines: {
      kicker: 'Modular Downstream',
      title: 'Career OS Engine Suite',
      body: 'Specialized autonomous subsystems (Networking Graph, Job Intelligence, Lifecycle Context, Lab POCs) that poll the Profile Core and execute targeted workflows at scale.',
      tags: ['Engine A (Network)', 'Engine B (Job Intel)', 'Engine C (Lifecycle)', 'Engine D (Lab)'],
      subnodes: [
        { label: 'Engine A', desc: 'Affinity graph scoring and context-driven warm outreach.' },
        { label: 'Engine B', desc: 'Direct ATS verification and deterministic fit scoring.' },
        { label: 'Engine C & D', desc: 'Context recall and company proof-of-work generators.' }
      ]
    },
    rest: {
      kicker: 'Deterministic REST',
      title: 'FastAPI REST & Internal Endpoints',
      body: 'For deterministic automation, scheduled cron jobs, and web interfaces. High-performance, async endpoints returning standard JSON payloads with sub-10ms response times.',
      tags: ['FastAPI', 'Uvicorn', 'OpenAPI 3.1', 'Sub-10ms Latency', 'ETag Caching'],
      subnodes: [
        { label: 'Endpoints', desc: '`/v1/profile`, `/v1/views/*`, `/v1/revisions/*`, `/v1/proposals`' },
        { label: 'Caching', desc: 'ETag-based cache validation against current revision number.' },
        { label: 'Docs', desc: 'Auto-generated interactive Swagger / Redoc specifications.' }
      ]
    }
  };

  // --- Profile Projections Data ---
  const projectionsData = {
    backend: {
      title: 'Backend Engineer · Distributed Architecture',
      desc: 'Java, Spring Boot, microservices, distributed systems, Kafka streaming, and robust relational data models — derived from the canonical profile core.',
      code: `revision = 42\nview = "backend"\nsource = "canonical_profile"\nprimary_stack = ["Java 21", "Spring Boot", "PostgreSQL", "Kafka", "Redis"]\nhighlight = "Enterprise QMS Microservices Platform (150k+ events/day)"`
    },
    full_stack: {
      title: 'Full Stack Product Engineer',
      desc: 'Combines reactive modern frontend user experiences with performant API backends, type safety across boundaries, and polished interactive web interfaces.',
      code: `revision = 42\nview = "full_stack"\nsource = "canonical_profile"\nprimary_stack = ["Next.js 14", "TypeScript", "Node.js", "Java / Spring", "PostgreSQL"]\nhighlight = "Career OS Interactive Recruiter Showcase + Audit Platform"`
    },
    ai_agentic: {
      title: 'AI Systems & Agentic Workflows',
      desc: 'Engineered around Model Context Protocol (MCP), structured LLM tool-calling, autonomous reasoning loops, and deterministic validation guardrails.',
      code: `revision = 42\nview = "ai_agentic"\nsource = "canonical_profile"\nprimary_stack = ["Model Context Protocol (MCP)", "FastAPI", "Python 3.11", "LangChain"]\nhighlight = "Career Profile Core MCP Server with 17 typed tools"`
    },
    ml: {
      title: 'Machine Learning & Predictive Analytics',
      desc: 'Emphasizes quantitative time-series forecasting, machine learning pipelines, feature engineering, and model interpretability with SHAP.',
      code: `revision = 42\nview = "ml"\nsource = "canonical_profile"\nprimary_stack = ["Python", "PyTorch", "Scikit-Learn", "SHAP", "LightGBM"]\nhighlight = "Enterprise Demand & Anomaly Forecasting Pipeline"`
    },
    resume: {
      title: 'ATS-Optimized Resume Model',
      desc: 'Structured, plain-text parseable JSON projection designed specifically to feed ATS parsers without styling artifacts or layout distortion.',
      code: `revision = 42\nview = "resume_ats"\ntarget_parser = "Greenhouse / Lever / Workday compatible"\ncanonical_id = "RS_CORE_001"\nsummary = "Software Engineer with deep experience in Java/Spring distributed backends and MCP AI integration."`
    },
    public: {
      title: 'Public Recruiter Summary',
      desc: 'High-level sanitized summary stripped of private metrics, internal corporate references, and proprietary database endpoints.',
      code: `revision = 42\nview = "public_overview"\ncandidate = "Rishav Srivastav"\nheadline = "Software Engineer · Backend & AI Systems"\nlocation = "India"\nlinks = {"github": "github.com/Rishavzone10"}`
    }
  };

  // --- MCP Tools Sample Responses ---
  const mcpToolDefinitions = {
    get_profile_view: {
      prompt: 'Get the latest backend profile for this candidate.',
      response: {
        jsonrpc: '2.0',
        id: 'call_mcp_091',
        result: {
          tool: 'get_profile_view',
          view: 'backend',
          revision: 42,
          status: 'SUCCESS',
          validation: 'PASSED (Pydantic v2.8)',
          latency_ms: 7.8,
          candidate: 'Rishav Srivastav',
          role: 'Backend Engineer · Distributed Systems',
          verified_skills: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Kafka', 'Redis', 'MCP'],
          guardrail_check: 'PASS_NO_EXAGGERATIONS'
        }
      }
    },
    get_profile: {
      prompt: 'Fetch the entire canonical master profile record for revision 42.',
      response: {
        jsonrpc: '2.0',
        id: 'call_mcp_092',
        result: {
          tool: 'get_profile',
          revision: 42,
          include_evidence: true,
          status: 'SUCCESS',
          latency_ms: 9.2,
          sections: ['identity', 'experiences', 'projects', 'skills', 'education'],
          project_count: 7,
          verified_skills_count: 25,
          evidence_links_count: 18
        }
      }
    },
    get_revision_diff: {
      prompt: 'Query the commit delta between REV 41 and REV 42.',
      response: {
        jsonrpc: '2.0',
        id: 'call_mcp_097',
        result: {
          tool: 'get_revision_diff',
          from_revision: 41,
          to_revision: 42,
          summary: 'Added Career OS flagship project and Model Context Protocol skills',
          changed_sections: ['positioning', 'projects', 'skills'],
          status: 'COMMITTED'
        }
      }
    },
    validate_profile: {
      prompt: 'Execute full schema validation and provenance verification on Profile Core.',
      response: {
        jsonrpc: '2.0',
        id: 'call_mcp_098',
        result: {
          tool: 'validate_profile',
          status: '100% HEALTHY',
          checks: {
            pydantic_schema_integrity: 'PASS',
            date_ordering_consistency: 'PASS',
            evidence_url_validity: 'PASS',
            projection_materialization: 'PASS (6/6 views generated in 12ms)'
          }
        }
      }
    }
  };

  // --- REST Endpoints Data ---
  const restEndpointsData = {
    profile: {
      status: '200 OK',
      json: `{
  "view": "canonical",
  "revision": 42,
  "status": "valid",
  "candidate": "Rishav Srivastav",
  "views_available": ["backend", "full_stack", "ai_agentic", "ml", "resume", "public"],
  "evidence_count": 18
}`
    },
    view: {
      status: '200 OK',
      json: `{
  "view": "backend",
  "revision": 42,
  "headline": "Backend Engineer · Distributed Systems",
  "featured_skills": ["Java 21", "Spring Boot 3", "PostgreSQL", "Kafka", "Docker"],
  "projects": ["Enterprise QMS Platform", "Career OS Profile Core"]
}`
    },
    changes: {
      status: '200 OK',
      json: `{
  "since_revision": 41,
  "current_revision": 42,
  "delta": [
    { "field": "positioning", "action": "UPDATE", "added": "MCP Systems" },
    { "field": "projects", "action": "APPEND", "item": "Career OS Flagship" }
  ],
  "consumers_notified": ["Job Engine", "Network Engine", "Resume Generator"]
}`
    },
    proposal: {
      status: '201 Created',
      json: `{
  "proposal_id": "PROP_DEMO_08",
  "status": "STAGED",
  "target_revision": 43,
  "validation": "VALID",
  "requires_human_approval": true
}`
    }
  };

  // --- End-to-End Story Stages Data ---
  const storyStages = {
    1: {
      label: 'Stage: 01 · Discover',
      heading: 'Ingest signals across verified ATS channels.',
      desc: 'The job intelligence engine continuously scans live careers portals (Greenhouse, Lever, Workday) and tech feeds, converting messy scraped data into a canonical job schema.',
      rev: 'REV 042',
      view: 'RAW_INGEST',
      resume: 'N/A',
      status: 'SIGNAL DETECTED'
    },
    2: {
      label: 'Stage: 02 · Verify',
      heading: 'Direct ATS verification filters out ghost jobs.',
      desc: 'Before any computational time is wasted, Engine B validates that the requisition is currently open on the hiring company official ATS domain.',
      rev: 'REV 042',
      view: 'ATS_VERIFIED',
      resume: 'N/A',
      status: 'ROLE CONFIRMED'
    },
    3: {
      label: 'Stage: 03 · Understand',
      heading: 'Extract JD requirements into a structured competency graph.',
      desc: 'Deconstructs the job description into required vs preferred technical competencies, team size context, and architectural challenges.',
      rev: 'REV 042',
      view: 'JD_GRAPH_V1',
      resume: 'N/A',
      status: 'GRAPH PARSED'
    },
    4: {
      label: 'Stage: 04 · Connect',
      heading: 'Discover warm relationship paths via the Network Graph.',
      desc: 'Engine A maps multi-degree connections to the target engineering team and drafts high-affinity, context-rich notes tied to real projects.',
      rev: 'REV 042',
      view: 'OUTREACH_PATH',
      resume: 'N/A',
      status: 'AFFINITY: 94%'
    },
    5: {
      label: 'Stage: 05 · Tailor',
      heading: 'Project role-specific narrative from Profile Core.',
      desc: 'Rather than fabricating claims, Career OS loads the Backend view of REV 42, highlighting relevant microservices and distributed systems work.',
      rev: 'REV 042',
      view: 'BACKEND_V2',
      resume: 'R-019-ATS',
      status: 'FIT: 96%'
    },
    6: {
      label: 'Stage: 06 · Apply',
      heading: 'Human approval boundary before formal submission.',
      desc: 'The complete application bundle, tailored resume, and cover synthesis are presented to Rishav for a mandatory one-click signoff.',
      rev: 'REV 042',
      view: 'BACKEND_V2',
      resume: 'R-019-ATS',
      status: 'HUMAN APPROVED'
    },
    7: {
      label: 'The interesting part',
      heading: 'The system remembers <em>which version of me</em> was used.',
      desc: 'A submitted artifact can stay tied to the profile revision and role-specific view that created it. That keeps the narrative consistent when the profile evolves later.',
      rev: 'REV 042',
      view: 'BACKEND',
      resume: 'R-019',
      status: 'INTERVIEW'
    }
  };

  // --- Toast Notification ---
  function showToast(message, duration = 2500) {
    let toast = document.getElementById('toastNotification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotification';
      toast.className = 'toast';
      toast.innerHTML = '<span class="status-dot"></span><span id="toastMessage"></span>';
      document.body.appendChild(toast);
    }
    const toastMsg = document.getElementById('toastMessage');
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // --- 01. Architecture Canvas (Event Delegation) ---
  function initArchitectureCanvas() {
    const canvas = document.getElementById('architectureCanvas');
    if (!canvas) return;

    canvas.addEventListener('click', (e) => {
      const node = e.target.closest('[data-node]');
      if (!node) return;
      e.preventDefault();

      const nodeKey = node.getAttribute('data-node');
      const nodeInfo = architectureData[nodeKey];
      if (!nodeInfo) return;

      state.selectedNode = nodeKey;

      canvas.querySelectorAll('[data-node]').forEach((n) => n.classList.remove('active'));
      node.classList.add('active');

      const detailTitle = document.getElementById('detailTitle');
      const detailBody = document.getElementById('detailBody');
      const detailTags = document.getElementById('detailTags');

      if (detailTitle) detailTitle.textContent = nodeInfo.title;
      if (detailBody) detailBody.textContent = nodeInfo.body;

      if (detailTags && nodeInfo.tags) {
        detailTags.innerHTML = nodeInfo.tags
          .map((tag) => `<span>${tag}</span>`)
          .join('');
      }

      showToast(`Layer: ${nodeInfo.title}`);
    });
  }

  // --- 02. Profile Projections (Event Delegation) ---
  function initProfileProjections() {
    const list = document.querySelector('.projection-list');
    if (!list) return;

    list.addEventListener('click', (e) => {
      const btn = e.target.closest('.projection[data-view]');
      if (!btn) return;
      e.preventDefault();

      const viewKey = btn.getAttribute('data-view');
      const viewData = projectionsData[viewKey];
      if (!viewData) return;

      state.selectedView = viewKey;

      list.querySelectorAll('.projection[data-view]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const projTitle = document.getElementById('projTitle') || document.querySelector('#projectionOutput .output-title');
      const projDesc = document.getElementById('projDesc') || document.querySelector('#projectionOutput .output-copy');
      const projCode = document.getElementById('projCode') || document.querySelector('#projectionOutput .output-code');

      if (projTitle) projTitle.textContent = viewData.title;
      if (projDesc) projDesc.textContent = viewData.desc;
      if (projCode) projCode.innerHTML = viewData.code.replace(/\n/g, '<br>');

      showToast(`Projection: ${viewKey.toUpperCase()}`);
    });
  }

  // --- 03. Demo Tabs (Event Delegation) ---
  function initDemoTabs() {
    const tabContainer = document.querySelector('.demo-tabs');
    const demoPanels = document.querySelectorAll('.demo-panel[data-panel]');
    if (!tabContainer || !demoPanels.length) return;

    tabContainer.addEventListener('click', (e) => {
      const tab = e.target.closest('.demo-tab[data-demo]');
      if (!tab) return;
      e.preventDefault();

      const demoKey = tab.getAttribute('data-demo');
      state.selectedDemoTab = demoKey;

      tabContainer.querySelectorAll('.demo-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      demoPanels.forEach((panel) => {
        if (panel.getAttribute('data-panel') === demoKey) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });
    });
  }

  // --- 03A. MCP Simulator ---
  function initMcpSimulator() {
    const toolList = document.querySelector('.tool-list');
    const runBtn = document.getElementById('runMcp');
    const chatBubble = document.querySelector('.chat-bubble');
    const terminalStatus = document.querySelector('#mcpTerminal .terminal-status');
    const terminalCode = document.querySelector('#mcpTerminal pre code');

    if (toolList) {
      toolList.addEventListener('click', (e) => {
        const span = e.target.closest('span');
        if (!span) return;

        toolList.querySelectorAll('span').forEach((s) => s.classList.remove('selected'));
        span.classList.add('selected');

        const toolName = span.textContent.trim();
        state.selectedMcpTool = toolName;

        const toolDef = mcpToolDefinitions[toolName];
        if (toolDef && chatBubble) {
          chatBubble.textContent = toolDef.prompt;
        }
      });
    }

    if (runBtn && terminalCode) {
      runBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (state.isMcpExecuting) return;
        state.isMcpExecuting = true;

        const toolDef = mcpToolDefinitions[state.selectedMcpTool] || mcpToolDefinitions.get_profile_view;

        if (terminalStatus) terminalStatus.textContent = 'EXECUTING...';
        terminalCode.innerHTML = `<span class="muted">$</span> Calling MCP tool: <span class="cyan">${state.selectedMcpTool}</span>\n<span class="muted">$</span> Validating schema & guardrails...`;

        setTimeout(() => {
          if (terminalStatus) terminalStatus.textContent = '200 OK';
          const formattedResponse = JSON.stringify(toolDef.response, null, 2);

          terminalCode.innerHTML = `<span class="muted">$</span> MCP call completed (latency: ${toolDef.response.result.latency_ms || 8.2}ms)\n<span class="green">✔</span> Validation: PASSED\n\n<span class="cyan">${escapeHtml(formattedResponse)}</span>`;

          state.isMcpExecuting = false;
          showToast(`MCP ${state.selectedMcpTool} executed`);
        }, 400);
      });
    }
  }

  // --- 03B. REST Explorer (Event Delegation) ---
  function initRestExplorer() {
    const list = document.querySelector('.endpoint-list');
    if (!list) return;

    list.addEventListener('click', (e) => {
      const btn = e.target.closest('.endpoint[data-endpoint]');
      if (!btn) return;
      e.preventDefault();

      list.querySelectorAll('.endpoint[data-endpoint]').forEach((ep) => ep.classList.remove('active'));
      btn.classList.add('active');

      const endpointKey = btn.getAttribute('data-endpoint');
      state.selectedEndpoint = endpointKey;

      const data = restEndpointsData[endpointKey];
      if (data) {
        const responseHead = document.querySelector('#apiResponse .response-head');
        const apiCode = document.querySelector('#apiResponse pre code');
        if (responseHead) {
          responseHead.innerHTML = `<span>${data.status}</span><span>application/json</span>`;
        }
        if (apiCode) {
          apiCode.innerHTML = formatJsonHighlight(data.json);
        }
        showToast(`REST: ${btn.querySelector('span:nth-child(2)').textContent}`);
      }
    });
  }

  // --- 03C. Diff Simulator ---
  function initDiffSimulator() {
    const runDiffBtn = document.getElementById('runDiff');
    const proposalState = document.getElementById('proposalState');

    if (!runDiffBtn || !proposalState) return;

    runDiffBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (state.isDiffProcessing) return;
      state.isDiffProcessing = true;

      proposalState.innerHTML = `
        <span class="cyan">⚡ Step 1/3:</span> AI Agent drafting change proposal <code>PROP_DEMO_08</code> (+ Kafka Event Benchmark)...
      `;

      setTimeout(() => {
        proposalState.innerHTML = `
          <span class="green">✔ Step 2/3:</span> Automated guardrails passed. Truth bounds check: OK.
          <div style="margin-top: 8px;">
            <button id="approveCommitBtn" class="run-button" style="margin: 4px auto 0; padding: 6px 16px; font-size: 0.8rem; display: block;">
              Confirm & Commit Revision 43
            </button>
          </div>
        `;

        const approveBtn = document.getElementById('approveCommitBtn');
        if (approveBtn) {
          approveBtn.addEventListener('click', () => {
            state.currentRevision = 43;
            proposalState.innerHTML = `
              <span class="green" style="color: var(--emerald-bright); font-weight: 700;">✔ Step 3/3: REV 43 Committed!</span> Downstream consumers (Jobs, Network, Resume) updated.
            `;
            showToast('Revision 43 committed to Profile Core!');
            state.isDiffProcessing = false;
          });
        }
      }, 700);
    });
  }

  // --- 03D. Job Pipeline Simulator ---
  function initJobPipeline() {
    const runJobBtn = document.getElementById('runJob');
    const traceSteps = document.querySelectorAll('#jobTrace .trace-step');

    if (!runJobBtn || !traceSteps.length) return;

    runJobBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (state.isJobExecuting) return;
      state.isJobExecuting = true;

      traceSteps.forEach((step) => {
        step.classList.remove('running', 'complete');
      });

      let stepIndex = 0;

      function runNextStep() {
        if (stepIndex < traceSteps.length) {
          const currentStep = traceSteps[stepIndex];
          currentStep.classList.add('running');

          setTimeout(() => {
            currentStep.classList.remove('running');
            currentStep.classList.add('complete');
            stepIndex++;
            runNextStep();
          }, 350);
        } else {
          state.isJobExecuting = false;
          showToast('Job processed: 96% fit · Context locked');
        }
      }

      runNextStep();
    });
  }

  // --- 04. Story Stepper (Event Delegation) ---
  function initStoryStepper() {
    const rail = document.querySelector('.flow-rail');
    if (!rail) return;

    rail.addEventListener('click', (e) => {
      const node = e.target.closest('.flow-node');
      if (!node) return;

      const allNodes = Array.from(rail.querySelectorAll('.flow-node'));
      const index = allNodes.indexOf(node);
      const stepNum = index + 1;
      const stage = storyStages[stepNum];
      if (!stage) return;

      state.activeStoryStep = stepNum;

      allNodes.forEach((n) => n.classList.remove('active'));
      node.classList.add('active');

      const stageLabel = document.querySelector('.story-label');
      const stageHeading = document.querySelector('.story-main h3');
      const stageDesc = document.querySelector('.story-main p');
      const matrixCells = document.querySelectorAll('.story-matrix div strong');

      if (stageLabel) stageLabel.textContent = stage.label;
      if (stageHeading) stageHeading.innerHTML = stage.heading;
      if (stageDesc) stageDesc.textContent = stage.desc;

      if (matrixCells.length >= 4) {
        matrixCells[0].textContent = stage.rev;
        matrixCells[1].textContent = stage.view;
        matrixCells[2].textContent = stage.resume;
        matrixCells[3].textContent = stage.status;
      }

      showToast(`Timeline: Stage ${stepNum}`);
    });
  }

  // --- 05. Hero Visual Core Trigger ---
  function initHeroCoreTrigger() {
    const heroCore = document.querySelector('.hero-core');
    if (!heroCore) return;

    heroCore.style.cursor = 'pointer';
    heroCore.addEventListener('click', () => {
      const coreSection = document.getElementById('profile-core');
      if (coreSection) {
        coreSection.scrollIntoView({ behavior: 'smooth' });
        showToast('Navigated to Profile Core');
      }
    });
  }

  // --- 06. Scroll Reveal Observer ---
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  // --- Utilities ---
  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatJsonHighlight(jsonStr) {
    return jsonStr
      .replace(/"(.*?)":/g, '<span class="key">"$1"</span>:')
      .replace(/: "(.*?)"/g, ': <span class="str">"$1"</span>')
      .replace(/: (\d+)/g, ': <span class="num">$1</span>')
      .replace(/: (true|false)/g, ': <span class="bool">$1</span>');
  }

  // --- Bootstrap Function ---
  function initApp() {
    initArchitectureCanvas();
    initProfileProjections();
    initDemoTabs();
    initMcpSimulator();
    initRestExplorer();
    initDiffSimulator();
    initJobPipeline();
    initStoryStepper();
    initHeroCoreTrigger();
    initScrollReveal();

    console.log("Rishav's Career OS initialized successfully.");
  }

  // Safe execution regardless of load timing
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
