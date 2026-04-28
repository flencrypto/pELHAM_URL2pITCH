# Pelham Prospecting Engine

An internal sales intelligence tool for Pelham Interiors that converts a company website URL into a structured seller brief, pitch deck, and outreach assets.

## What it does

Paste a company website → the engine analyses the signals and returns:

- **Seller brief** — target, reason, trigger, angle, contact strategy, next steps
- **Outreach messages** — LinkedIn opener, email opener, call script, discovery questions, objections
- **Pitch deck** — 12-slide deck personalised to the target company
- **Confidence and attractiveness scores** — so sellers know how strong the signals are

## Stack

- [Next.js](https://nextjs.org) 16 App Router
- TypeScript
- Tailwind CSS 4
- [Zustand](https://zustand-demo.pmnd.rs/) for client state (with `localStorage` persistence)
- Radix UI primitives + lucide-react icons

## Getting started

```bash
cd pelham-engine
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Description |
|---|---|
| `/` | Intake form — paste a website, select mode and project type |
| `/analysis/[id]` | Seller brief — 8 collapsible cards + utility panel |
| `/analysis/[id]/deck` | Pitch deck builder — 12 slides with mode/tone/density controls |
| `/analysis/[id]/outreach` | Outreach assets — all ready-to-copy messages |
| `/saved` | Saved analyses (persisted in localStorage) |
| `/settings` | Default deck mode, tone preferences |

## Output modes

| Mode | Behaviour |
|---|---|
| `seller_brief` | Navigates to seller brief page after analysis |
| `customer_pitch` | Navigates straight to deck builder after analysis |
| `internal_deck` | Navigates straight to deck builder after analysis |
| `quote_stage` | Navigates straight to deck builder after analysis |

## Project structure

```
pelham-engine/
  app/              Next.js App Router pages
  components/
    shell/          AppShell, SidebarNav, UtilityPanel, Toast
    intake/         AnalysisIntakeForm
    seller/         ProspectHeader, SummaryStrip, SellerBriefCard, CopyActionButton
    deck/           DeckToolbar, SlideNavigator, SlidePreviewPane
    outreach/       MessageAssetCard, DiscoveryQuestionsCard, ObjectionsCard
  lib/
    types.ts        All TypeScript types
    analysis-engine.ts  Mock analysis runner + slide generator
    store.ts        Zustand store
    mock-data.ts    Sample data arrays
    formatters.ts   URL/domain/sector utilities
    scoring.ts      Attractiveness/confidence colour helpers
```

## Also included

`index.html` — a self-contained single-file proof-of-concept that runs without a build step. Useful for demos and offline use.

## Notes

All analysis currently runs client-side using the mock engine. It can be wired to a real LLM backend when available.

## Deployment

The app is a standard Next.js 16 application with both static and SSR routes (`/analysis/[id]` and friends are server-rendered). It is **not** a static export — both target platforms run it on a Node serverless runtime.

### Vercel

A `vercel.json` is included with the framework, build commands and security headers.

1. Import the repo into Vercel.
2. **Set the Project's Root Directory to `pelham-engine`** (Project → Settings → General → Root Directory). This is required because the Next.js app lives in a subfolder.
3. Vercel will auto-detect Next.js and deploy. No environment variables are needed.

### Netlify

A `netlify.toml` at the repo root tells Netlify to build from `pelham-engine/` using the official `@netlify/plugin-nextjs` adapter, which handles SSR routes.

1. Connect the repo to Netlify — accept the defaults (config is read from `netlify.toml`).
2. Netlify auto-installs `@netlify/plugin-nextjs` on first build.
3. No environment variables are needed.

### Node version

Both platforms pin to Node 20 (LTS) via `pelham-engine/.nvmrc` and `NODE_VERSION` in `netlify.toml`.
