# Production Media Validation

This document records the production-media contract used by the Produxion MVP.

## Casablanca cover

- Stable runtime URL: `/production-assets/individual/cover/casablanca-cover.webp`.
- Required final contract: **1080 × 1920 minimum, 9:16**.
- Current application state: **INTERIM**.
- Do not mark the cover `LOCKED` until an approved native-resolution master replaces the interim runtime file.

## Character locks

The browser must never crop a contact-sheet atlas as the production character master.

Each locked character uses six standalone WebP files:

- FRONT
- BACK
- LEFT PROFILE
- RIGHT PROFILE
- 3/4 LEFT
- 3/4 RIGHT

Current locked V5 runtime canvas: **1200 × 1600 (3:4)**.

Characters covered:

- Arga
- Sari
- Pak Harun
- Bowo
- Dimas
- Penumpang Tanpa Wajah

Total locked runtime character images: **36**.

The approved PNG masters live under `public/production-assets/v5/characters/` and are promoted in-place to the stable runtime WebP paths under `public/production-assets/individual/characters/`.

## EP001 storyboard

EP001 contains 8 scenes × 2 shots = **16 standalone storyboard images**.

Existing runtime storyboard files live at:

`/production-assets/individual/storyboards/EP001/SH01.webp` … `SH16.webp`.

Those existing 720 × 1280 WebPs remain **INTERIM**.

The V5 final storyboard contract is:

- 16 one-shot-one-file PNG masters;
- **1080 × 1920** each;
- 9:16 vertical;
- exact SH01–SH16 mapping;
- locked character identity and vehicle/environment continuity;
- explicit per-shot approval before promotion.

V5 storyboard source of truth:

`public/production-assets/v5/storyboards/EP001/manifest.json`

Review gate:

`docs/EP001_STORYBOARD_V5_GATE.md`

The Episode Storyboard page and Shot Inspector must continue rendering the stable standalone runtime paths directly. They must not use browser-side atlas cropping for master storyboard frames.

## Validation gate

Before Replit pulls the branch:

- character V5 package remains complete and locked;
- six runtime angle files exist for every locked character at 1200 × 1600;
- cover state is represented truthfully;
- SH01–SH16 runtime files exist;
- storyboard V5 is not marked `LOCKED` before all 16 approved 1080 × 1920 masters exist;
- TypeScript typecheck passes;
- Next.js production build passes.
