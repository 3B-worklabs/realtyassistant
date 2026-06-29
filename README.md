# Realty Assistant UI

Premium enterprise CRM and business management UI built with:

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

This repository contains a UI-first, PWA-ready front-end for Realty Assistant. No backend, API, authentication, or database code is included.

## Local development

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## Docker

### Build and run with Docker Compose

The app is configured to use `HOST_PORT` so it can avoid conflicting ports.

```bash
HOST_PORT=3010 docker compose up --build -d
```

Then open:

```bash
http://localhost:3010
```

### Stop Docker containers

```bash
docker compose down
```

## PWA support

The app includes:

- `public/manifest.json`
- `public/sw.js`
- offline fallback page at `public/offline.html`
- install prompt support via `components/PwaManager.tsx`

## Deployment guidance

This UI is ready for a later Git-based deployment whenever you are ready.
For now, use the local Docker preview at `http://localhost:3010` to show the client.

If you'd like, I can add a deployment workflow and subdomain setup guide later.

## Notes

- The UI currently includes routing placeholders for the full CRM surface.
- Use the local Docker preview at `http://localhost:3010` for client demos.
- If you need a production-ready deployment file for a specific host, I can add it.
