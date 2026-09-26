# Rishav's Career OS — Public Showcase

A recruiter-facing, public-safe technical showcase for Rishav's Career OS.

## What this site is

This is a standalone static website. It intentionally uses **demo/synthetic data** so it can be shared publicly without exposing private Career OS records, database connections, API keys, emails, or application history.

The interaction model mirrors the Career Profile Core and Career OS architecture:

- canonical profile core
- MCP-facing AI interface
- REST/internal API
- revision history and diffs
- purpose-built profile views
- network engine
- job intelligence engine
- lifecycle / interview context
- human approval boundaries
- free-first architecture

## Run locally

Because the site is static, you can open `index.html` directly or serve the directory with any static server.

```bash
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Deploy

The folder can be deployed directly to GitHub Pages, Vercel, Netlify, Cloudflare Pages, or any static hosting provider. No environment variables are required.

## Updating the public architecture

Keep the public site as the stable narrative layer. New systems should be represented by adding a new architecture node, flow state, or demo tab. The public website should continue to use sanitized/demo records only.

## Safety rule

Never connect this public showcase directly to the production Career Profile Core or any private database. Keep the public demo deterministic and synthetic.
