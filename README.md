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

This UI is ready for Git-based deployment using your GitHub repository.

### Fast deployment via Vercel

1. Go to [vercel.com](https://vercel.com) and sign in.
2. Import the repository: `3B-worklabs/realtyassistant`.
3. Use the default settings for Next.js.
4. Set the root directory to `/`.
5. Deploy the app.

### Configure your subdomain

Your subdomain is `realtyassistant.owsdigital.in`.

1. In your DNS provider, add a CNAME record:
   - Name: `realtyassistant`
   - Type: `CNAME`
   - Value: `<your-vercel-app>.vercel.app`
2. Back in Vercel, add `realtyassistant.owsdigital.in` as a custom domain.
3. Wait for DNS propagation and SSL issuance.

### VPS deployment on `145.223.19.243`

DNS currently points `realtyassistant.owsdigital.in` to `145.223.19.243`. If you are deploying on that VPS instead of Vercel, the server must run this app on its own port and nginx must route this hostname to that port.

Example server commands:

```bash
cd /var/www
git clone https://github.com/3B-worklabs/realtyassistant.git
cd realtyassistant
HOST_PORT=3010 docker compose up --build -d
```

Or use the included VPS deployment script:

```bash
cd /var/www/realtyassistant
chmod +x deploy/vps-deploy.sh
./deploy/vps-deploy.sh
```

Example nginx site:

```nginx
deploy/nginx/realtyassistant.conf
```

Enable SSL after nginx serves the correct app:

```bash
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d realtyassistant.owsdigital.in
```

### If you prefer Netlify

1. Go to [netlify.com](https://www.netlify.com/).
2. Create a new site from Git.
3. Connect GitHub and choose `3B-worklabs/realtyassistant`.
4. Deploy.
5. Add `realtyassistant.owsdigital.in` as a custom domain in Netlify.

### Local preview

Use this for immediate client demos:

```bash
HOST_PORT=3010 docker compose up --build -d
```

Then open:

```bash
http://localhost:3010
```

## Notes

- The UI currently includes routing placeholders for the full CRM surface.
- Use the local Docker preview at `http://localhost:3010` for client demos.
- If you need a production-ready deployment file for a specific host, I can add it.
