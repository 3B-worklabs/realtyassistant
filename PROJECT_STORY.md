# Realty Assistant — Project Story

## Vision

Realty Assistant is a premium, UI-first enterprise platform for real estate brokers. The core mission is to deliver a polished, modern, and spacious frontend experience that can be shown directly to clients before any backend development begins.

The application should feel:

- premium
- calm
- spacious
- modern
- professional
- easy to use
- desktop-first, with mobile-friendly responsiveness

## Scope

This phase is purely frontend UI. There is:

- no backend
- no APIs
- no authentication
- no database
- no business logic
- no CRUD integration

Everything is built as reusable frontend components and app-shell routing placeholders, ready for the backend to be connected later.

## Tech Stack

- Next.js (latest App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- React Hook Form
- Zod
- PWA-ready architecture

## Theme & Design

The design system is built around a warm, premium palette:

- Background: `#F8F6F1`
- Cards: `#FFFFFF`
- Sidebar: `#0B1F3A`
- Primary accent: `#C89B3C`
- Text: `#1F2933`
- Muted text: `#6B7280`
- Borders: `#E6DFD2`

The UI uses generous spacing, rounded containers, soft shadows, and subtle color contrast to create a calm SaaS dashboard environment.

## Current Project State

### What has been completed

- Full Next.js app scaffold with App Router and TypeScript
- Tailwind CSS and global theme setup
- Reusable UI components for buttons, cards, inputs, selects, tables, badges, modals, drawers, and forms
- Multi-pane dashboard shell with sidebar navigation and search bar
- PWA support via `manifest.json`, service worker, offline page, and install prompt manager
- Docker support with `Dockerfile` and Docker Compose configuration
- Local container preview available at `http://localhost:3010`
- Readme with local usage and Docker instructions

### Folder structure

The project is organized as follows:

```text
/ (project root)
├─ .dockerignore
├─ Dockerfile
├─ README.md
├─ PROJECT_STORY.md
├─ docker-compose.yml
├─ next.config.mjs
├─ package.json
├─ package-lock.json
├─ tailwind.config.js
├─ tsconfig.json
├─ next-env.d.ts
├─ public/
│  ├─ icons/
│  │  ├─ icon-192.png
│  │  ├─ icon-512.png
│  │  └─ icon.svg
│  ├─ manifest.json
│  ├─ offline.html
│  └─ sw.js
├─ app/
│  ├─ globals.css
│  ├─ theme.css
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ not-found.tsx
│  ├─ offline.tsx
│  ├─ marketing/page.tsx
│  ├─ reports/page.tsx
│  ├─ styleguide/page.tsx
│  ├─ accounts/
│  │  └─ banking/page.tsx
│  ├─ administration/
│  │  ├─ settings/page.tsx
│  │  └─ users/page.tsx
│  ├─ dashboard/
│  │  ├─ clients/page.tsx
│  │  ├─ dsr/page.tsx
│  │  ├─ reminders/page.tsx
│  │  ├─ rentals/page.tsx
│  │  └─ sales/page.tsx
│  └─ documents/
│     ├─ booking-forms/page.tsx
│     └─ mou-generator/page.tsx
├─ components/
│  ├─ DashboardShell.tsx
│  ├─ PwaManager.tsx
│  └─ ui/
│     ├─ badge.tsx
│     ├─ button.tsx
│     ├─ card.tsx
│     ├─ drawer.tsx
│     ├─ input.tsx
│     ├─ modal.tsx
│     ├─ select.tsx
│     ├─ table.tsx
│     └─ textarea.tsx
├─ lib/
│  └─ utils.ts
```

### Navigation structure

The app is prepared for all future modules, including:

- Dashboard
- CRM / Clients
- Sales
- Rentals
- DSR
- Reminders
- Booking Forms
- MOU Generator
- Banking
- Marketing
- Reports
- User Management
- Settings

Future screens such as Calendar, Tasks, Campaign history, Income, Expenses, Cash Book, and Notifications can be added to the same shell easily.

## Current notes for handoff

- The application is ready for client preview with realistic UI spacing and structure.
- The current home page is intentionally simplified to ensure build completion while the full dashboard shell is prepared.
- Docker is configured to avoid conflicts on the local machine via overrideable `HOST_PORT`.
- Git deployment instructions were intentionally kept out of the main README until you want to enable them.

## What to do next

If you continue working with another ChatGPT bot or developer, the next deliverables are:

1. complete the remaining module pages with full sample data and charts
2. add interactive forms and dialogs for the CRM and sales flows
3. polish mobile navigation and tablet layout
4. connect the UI to backend APIs once the backend is available

## Usage

### Local preview

Run the project locally with Docker:

```bash
HOST_PORT=3010 docker compose up --build -d
```

Then visit:

```bash
http://localhost:3010
```

---

This document is designed to help the next engineer continue immediately with a clear project story, current state, and intended roadmap.
