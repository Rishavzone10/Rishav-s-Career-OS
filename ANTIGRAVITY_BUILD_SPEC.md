# Antigravity Build / Maintenance Specification — Rishav's Career OS

## Product identity

**Name:** Rishav's Career OS

**Purpose:** A recruiter-facing interactive flagship project showcase for an AI-powered career operating system.

The website should feel like a product/engineering case study, not a conventional portfolio.

## Core narrative

> I built a Career OS that treats my professional profile like an API.

The central architectural concept is a canonical Career Profile Core. AI clients consume it through MCP, deterministic systems consume it through REST/internal APIs, and downstream career engines request current role-specific projections instead of maintaining competing sources of truth.

## Important public-site rule

Do not expose private production data, secrets, API keys, credentials, real application records, private contacts, inbox content, or production database access.

All interactive demos must use synthetic/demo data.

## Architecture to represent

```text
                         GPT / Gemini / Claude
                                  |
                                 MCP
                                  |
                                  v
                     +--------------------------+
                     |    CAREER PROFILE CORE   |
                     | canonical profile        |
                     | revisions / diffs        |
                     | validation / guardrails  |
                     | profile views             |
                     | evidence / provenance    |
                     +------------+-------------+
                                  |
                            REST / API
                                  |
            +---------------------+----------------------+
            |                     |                      |
            v                     v                      v
       Network Engine        Job Intelligence      Resume / Lifecycle
            |                     |                      |
            +---------------------+----------------------+
                                  |
                                  v
                           HUMAN REVIEW / ACTION
```

## Profile Core concepts

Demonstrate these as interactive system nodes:

- canonical profile
- identity / positioning
- experiences
- projects
- skills
- education
- certifications
- achievements
- publications
- preferences / goals
- links
- evidence / provenance
- current revision
- profile changes
- change proposals
- profile validation
- purpose-built views

## MCP demo surface

Represent these tools visually as simulated calls:

- get_profile
- get_profile_section
- get_profile_view
- get_profile_revision
- get_changes_since_revision
- update_identity
- add_experience
- add_project
- add_skill
- update_experience
- update_project
- update_skill
- propose_change
- preview_change
- apply_change
- get_revision_diff
- validate_profile

The visual should show:

```text
AI request
  -> MCP tool
  -> Profile Core
  -> validation
  -> revision
  -> structured response
```

## REST demo surface

Use the site to show representative deterministic API calls such as:

```http
GET /v1/profile
GET /v1/profile/views/backend
GET /v1/revisions/changes
POST /v1/proposals
GET /v1/revisions/{revision_number}/diff
```

Do not claim that these endpoints are publicly reachable from the website. The public experience is a simulation.

## Profile projection demo

Show one canonical profile producing multiple views:

- Backend
- Full Stack
- AI / Agentic
- ML
- Resume
- Public

The interaction should make the point that these are derived views, not separate master records.

## Change / versioning demo

Use a synthetic revision sequence, e.g.:

```text
REV 41
  Java / Spring Boot
  6 projects

AI proposes change
  + Career OS flagship project
  + MCP positioning

Preview diff
  -> validation
  -> approval

REV 42
```

The animation should emphasize that all consumers can now request the latest revision.

## Career OS engines

### Engine A — networking graph

Show:

```text
Target company
  -> discovery
  -> search provider chain
  -> quality gate
  -> affinity / priority scoring
  -> AI outreach note
  -> human review
  -> relationship state
```

Show that search results can be cached and that outreach actions remain reviewable.

### Engine B — job intelligence

Show:

```text
job source
 -> canonicalize
 -> fingerprint / deduplicate
 -> verify careers / ATS evidence
 -> extract JD
 -> evaluate job validity
 -> evaluate profile fit
 -> actionable opportunity
```

Keep job verification and profile fit visually separate.

### Engine C — lifecycle

Show:

```text
application
 -> incoming signal
 -> classify
 -> match to application
 -> retrieve exact context
 -> interview preparation
```

The recruiter-facing narrative is that the system remembers the career narrative used for an application.

### Engine D — lab / proof of work

Show:

```text
high-value opportunity
 -> company research
 -> challenge hypothesis
 -> proof-of-work ideas
 -> selected artifact
 -> network outreach
```

## Recruiter-facing sections

The public site should contain these primary sections:

1. Hero — "I built a Career OS that treats my professional profile like an API."
2. System Architecture
3. Profile Core
4. Interactive MCP / REST / Diff / Job demo
5. End-to-end Job Story
6. Engineering Takeaways
7. Architecture Evolution
8. Final CTA / GitHub / Portfolio

## Design system

Use:

- near-black / off-white base
- one cyan accent
- restrained green for success
- very limited violet only for system differentiation
- subtle 1px borders
- no gradients except extremely subtle ambient lighting
- DM Sans / Inter-like primary typeface
- JetBrains Mono / monospace for technical labels
- rounded 18–28px containers
- generous whitespace
- thin data-flow lines
- soft node pulsing
- restrained motion

Avoid:

- rainbow gradients
- oversized icons
- crowded dashboards
- generic SaaS illustrations
- stock photos
- excessive animations
- fake testimonials
- fake metrics

## Interaction principles

Every animation should communicate a system concept.

Good examples:

- data pulse moving from AI client -> MCP -> Profile Core
- current revision propagating to role-specific projections
- diff appearing line-by-line
- API response rendering into a terminal
- job trace lighting each subsystem in sequence
- architecture node expansion showing implementation details

Avoid decorative motion that does not teach anything.

## Public data policy

Use placeholders or synthetic examples such as:

- REV_042
- PROP_DEMO_7
- Backend Engineer · Distributed Systems
- synthetic company / job records
- synthetic contacts
- demo profile numbers

Never place real API keys or production URLs in frontend JavaScript.

## Technical implementation

The current reference implementation is intentionally static:

- `index.html`
- `styles.css`
- `app.js`

No backend is needed for the showcase.

A future implementation may migrate this into Next.js + TypeScript + Tailwind + Framer Motion + React Flow, while preserving the same information architecture and interaction model.

## Update strategy

When Career OS evolves:

1. Preserve the Profile Core as the visual center.
2. Add new consumers as new branches rather than redesigning the whole site.
3. Add a small architecture node and a dedicated demo if the new capability is recruiter-relevant.
4. Keep the public data synthetic.
5. Keep all claims tied to the actual system documentation and source code.
6. Preserve the recruiter-first sequence: what problem, architecture, interaction, engineering choices, evidence.

## Success criterion

A technical recruiter should be able to understand the project in under five minutes and answer:

- What did Rishav build?
- What is the central architectural idea?
- Where does AI fit?
- How does the profile stay consistent?
- How does MCP fit into a real software system?
- How are changes validated and versioned?
- How do the job and networking engines consume the profile?
- What engineering decisions did Rishav make?
