# Ready-to-use implementation prompt — Produxion Media V2

Use this exact scope when an implementation agent is asked to continue the Produxion media migration.

---

Update the existing **Produxion / Productionboard** application only. Do not redesign unrelated pages, do not alter story logic, do not rename Asset IDs, and do not change the active branch.

The source of truth is:
- `docs/PRODUXION_MEDIA_V2_IMPLEMENTATION_BRIEF.md`
- `public/media/manifest.json`
- `lib/media-manifest.ts`

## Required outcome
Convert the active Casablanca production UI to a strict standalone-media architecture.

### Cover
- Use only the static Casablanca cover path defined in the manifest.
- Do not use Base64Image, data URLs, dynamic media endpoints, or broken-placeholder files.
- Cover must be native vertical 9:16 and minimum 1080×1920 before it can be marked LOCKED.

### Character locks
For each of these IDs:
- CHR-ARGA-01
- CHR-SARI-01
- CHR-HARUN-01
- CHR-BOWO-01
- CHR-DIMAS-01
- CHR-ENTITY-01

There must be six standalone files:
- front
- back
- left-profile
- right-profile
- three-quarter-left
- three-quarter-right

Rules:
- One slot = one physical image file.
- Never crop a contact sheet in CSS or JavaScript.
- Never enlarge a tiny crop and call it HD.
- Final source target is 1200×1600 or larger, 3:4 portrait, neutral/clean background, consistent face/hair/wardrobe/body proportions.
- Existing generated 600×800 files may be shown only as INTERIM.
- Replacing an interim file must preserve the exact path and Asset ID.
- Top/bottom/high/low angles stay SOURCE REQUIRED until a real source is provided.

### EP001 storyboard
- SH01 through SH16 must each be a standalone physical image.
- Runtime path comes from `lib/media-manifest.ts`.
- Final storyboard target is native 1080×1920 or larger, 9:16.
- Never use an environment image, landscape image, atlas tile, or contact-sheet crop as a fake storyboard master.
- Episode Storyboard and Shot Inspector must display the exact same file for a given Shot ID.
- Download must download the exact displayed file.

### Environment/reference assets
- Existing atlas rendering may remain temporarily only for supporting site/environment/reference panels.
- Do not use atlas media as the final cover, character lock, or storyboard master.

### UI behavior
- No broken browser image icons.
- Missing source must render a designed `SOURCE REQUIRED` state.
- INTERIM media must be visibly labeled INTERIM.
- Character cards use 3:4 contain rendering; the source image itself must already be framed correctly.
- Storyboard uses 9:16 contain rendering.
- Movie cover uses 9:16 cover rendering.

## Validation gate
Before declaring complete:
1. Confirm Casablanca cover loads on Home and Movie Workspace.
2. Confirm all six character slots for every locked character resolve to standalone file paths.
3. Confirm no character card includes neighboring poses, title strips, or contact-sheet text.
4. Confirm SH01–SH16 all resolve.
5. Confirm Episode Storyboard and Shot Inspector use the same media path per shot.
6. Run TypeScript typecheck.
7. Run Next.js production build.
8. Review desktop and iPhone layouts.
9. Do not merge PR until visual QA is approved.

If any native HD source is unavailable, do not fabricate completion. Leave the item INTERIM or SOURCE REQUIRED and report exactly which media source still needs replacement.

---
