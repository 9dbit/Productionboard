# Architecture

## MVP 0.1

Next.js App Router + TypeScript. Data is seeded in `lib/data.ts`; this keeps the first milestone deployable without infrastructure and lets the team validate the production UX first.

```text
app/
  episodes/[episodeId]/
  shots/[shotId]/
  assets/
  generation/
  review/
  api/export/[shotId]/
components/
lib/
public/seed/
db/schema.sql
```

## Phase 2 target

```text
Browser
  ↓
Next.js web app
  ↓
Application / API layer
  ├── PostgreSQL metadata
  └── Object storage (R2 / S3 / Supabase Storage)
```

Do not store image/video binaries in PostgreSQL. Database rows store metadata, stable Asset IDs and object storage keys.

## Identity model

Recommended roles:

- `ADMIN / DIRECTOR` — edit everything, approve, lock
- `EDITOR` — upload versions, comment, request revision, approve
- `AI_OPERATOR` — generation queue + download reference package + upload generated version
- `VIEWER` — read/download only

## Object storage convention

```text
productionboard/
  projects/CASA/
    characters/CHR-ARGA-01/
    environments/ENV-001-B/
    vehicles/VEH-ARGA-01/
    episodes/EP001/SC06/SH01/
      references/
      generated/v001.mp4
      generated/v002.mp4
      approved/v003.mp4
```

## Versioning

Never overwrite a generated video. `shot_versions` keeps `v001`, `v002`, etc. `shots.current_version` points to the current candidate. Locking a shot records approval against an exact version.

## Stable IDs

IDs are contracts. A high-resolution image can replace a seed image, but its Asset ID stays stable. This prevents prompts and shot references from drifting.

## Future integrations

- BytePlus generation adapters
- automatic ZIP generation package
- FFmpeg proxy / thumbnail pipeline
- NLE export (EDL / FCPXML / Premiere-friendly metadata)
- AI face / wardrobe / environment comparison
- SSO and audit history
