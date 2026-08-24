# Productionboard

Web-based **AI movie production operating system**. The pilot project is **03:13 CASABLANCA** and the MVP turns the production bible into a living workspace for episode → scene → shot → asset → prompt → generation → review → lock.

## MVP included

- 80-episode project dashboard
- EP001 **Order Terakhir** fully seeded with 8 scenes and 16 shots
- High-resolution / downloadable asset library structure
- Shot inspector with timecode, story clock, camera, action, audio, horror level, reference assets and BytePlus-ready prompt
- Generation queue
- Editor review queue
- Local review controls for MVP UX validation
- Shot JSON export endpoint
- Seed character, environment, vehicle, prop and unique shot reference SVGs
- PostgreSQL Phase 2 reference schema
- CI build workflow and deployment guides

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Useful routes:

- `/` — project dashboard
- `/episodes/EP001` — episode storyboard / timeline
- `/shots/EP001-SC06-SH01` — shot inspector
- `/assets` — asset library
- `/generation` — generation queue
- `/review` — editor review queue
- `/api/health` — health check
- `/api/export/EP001-SC06-SH01` — downloadable shot package JSON

## Production hierarchy

```text
PROJECT
└── EPISODE
    └── SCENE
        └── SHOT
            ├── ASSETS
            ├── PROMPT
            ├── AUDIO
            ├── VERSIONS
            ├── COMMENTS
            └── APPROVALS
```

Golden rule: **no shot generation without Shot ID + timecode + story clock + location + environment + character reference + continuity state.**

## MVP architecture

The current MVP is intentionally data-seeded and frontend-first so the team can validate UX before adding persistence. Phase 2 is designed for PostgreSQL + object storage (Cloudflare R2 / S3-compatible / Supabase Storage). See `docs/ARCHITECTURE.md` and `db/schema.sql`.

## Asset note

The repository contains vector **seed references** so the interface works immediately. They are placeholders for workflow validation, not final movie artwork. Replace them with locked production JPG/PNG/WebP/MP4 assets through object storage in Phase 2 while preserving the Asset IDs.

## Docs

- `docs/MVP_SPEC.md`
- `docs/ARCHITECTURE.md`
- `docs/CONTENT_GUIDE.md`
- `docs/BYTEPLUS_WORKFLOW.md`
- `docs/DEPLOYMENT.md`
- `docs/ROADMAP.md`

## Branch

Initial MVP implementation is developed on `agent/mvp-production-board`.
