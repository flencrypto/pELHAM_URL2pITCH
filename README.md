# pELHAM_URL2pITCH

The deployable application is the Next.js app in [`pelham-engine/`](./pelham-engine). The `index.html` at the repo root is a self-contained, build-free proof-of-concept used for offline demos.

## Deploy

- **Vercel** — import the repo and set the project's **Root Directory to `pelham-engine`**. Configuration is in [`pelham-engine/vercel.json`](./pelham-engine/vercel.json).
- **Netlify** — connect the repo and accept defaults. Configuration is in [`netlify.toml`](./netlify.toml) (build base is `pelham-engine`, uses `@netlify/plugin-nextjs`).

See [`pelham-engine/README.md`](./pelham-engine/README.md) for full app docs and local development.
