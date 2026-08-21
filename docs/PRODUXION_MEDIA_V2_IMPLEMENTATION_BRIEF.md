# Produxion Media V2 — Implementation Brief

## Goal
Replace all browser-cropped/contact-sheet visuals with explicit standalone media files. Produxion must treat media as production data, not decorative thumbnails.

## Non-negotiable rules
1. One visual slot = one physical image file.
2. Never use CSS/atlas cropping for final cover, character lock, or storyboard master.
3. Cover and storyboard are vertical 9:16.
4. Character lock images are 3:4 and must be individually framed.
5. Static media in `/public` is loaded directly. Do not route static MVP media through a base64/media API endpoint.
6. Stable Asset IDs and runtime paths must survive future source replacement.
7. If an approved native source is missing, show `SOURCE REQUIRED` / `INTERIM`, never a broken browser image.

## Runtime paths
- Cover: `/production-assets/individual/cover/casablanca-cover.webp`
- Character: `/production-assets/individual/characters/<character>/<angle>.webp`
- Storyboard: `/production-assets/individual/storyboards/EP001/SH01.webp` through `SH16.webp`
- Machine-readable contract: `/media/manifest.json`
- Application contract: `lib/media-manifest.ts`

## Target source quality
### Cover
- Native 9:16
- Minimum 1080×1920; preferred 1440×2560+
- No embedded UI chrome

### Character locks
- One file per angle
- Minimum 1200×1600
- 3:4 portrait
- Clean neutral background
- Same face, hair, wardrobe, age, body proportions
- Existing six angles: Front, Back, Left Profile, Right Profile, 3/4 Left, 3/4 Right
- Missing top/bottom/high/low angles remain SOURCE REQUIRED until explicitly generated

### Storyboards
- One file per shot
- Native 9:16
- Minimum 1080×1920
- No landscape image letterboxed into a fake vertical master
- Composition must preserve face, hands, vehicle/interior continuity, and story-critical props

## Exact UX behavior
### Movie Library and Movie Detail
- Casablanca cover reads only from manifest/static path.
- If source is missing, render a designed `SOURCE REQUIRED` card, never an `<img>` broken icon.

### Assets / Characters
- Character summary card must not show the old master contact sheet as the primary image.
- Show six standalone angle cards from the manifest.
- Each card displays Angle, resolution/source state, View, Download.
- Use `object-fit: contain`; source image itself must already be properly framed.

### Episodes / Storyboard
- SH01–SH16 each render their own standalone vertical image.
- Storyboard container remains 9:16.
- No atlas tile, no environment fallback masquerading as storyboard.
- Download points to the same image displayed.

### Shot Inspector
- Uses the exact same storyboard source as Episode Storyboard.
- Reference environment assets may retain native aspect ratio and legacy atlas during migration.

## Replacement workflow
When a new HD source is approved:
1. Export to the exact existing runtime path.
2. Preserve Asset ID and filename.
3. Do not modify page code.
4. Update media state from INTERIM to LOCKED in `lib/media-manifest.ts`.
5. Run TypeScript + Next production build.
6. Visual QA desktop + iPhone before merge.

## Acceptance criteria
- No broken image icons anywhere on Casablanca active-production pages.
- Cover loads on Home and Movie Workspace.
- Six character angles per locked character are standalone files, not CSS crops.
- Every visible angle contains only the intended character/angle. No neighbor pose, title strip, or master-sheet text.
- SH01–SH16 all display and download correctly.
- Storyboards are true 9:16 masters.
- All paths come from one manifest contract.
- TypeScript succeeds.
- Next.js production build succeeds.

## Automation prompt contract
If an automation/agent is ever used, instruct it only to implement this document and `public/media/manifest.json`. It must not redesign unrelated UI, regenerate story logic, alter Asset IDs, rename branch, or substitute contact-sheet crops for missing sources.
