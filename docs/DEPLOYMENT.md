# Deployment

## Local

```bash
npm install
npm run dev
```

## Vercel

1. Import GitHub repository.
2. Framework preset: Next.js.
3. No environment variables are required for MVP 0.1.
4. Deploy.

## Replit / VPS

```bash
npm install
npm run build
npm start
```

The app listens on the Next.js default port unless the host provides `PORT`.

## Docker

```bash
docker build -t productionboard .
docker run -p 3000:3000 productionboard
```

## Phase 2 environment variables

Copy `.env.example` and supply PostgreSQL + object-storage credentials. Never commit secrets.

## Production checklist

- branch protection on `main`
- build check required before merge
- database backup policy
- versioned object storage
- CORS restricted to production domains
- private assets use signed URLs
- server-side authorization on approval / lock actions
