# Production Media Validation

This document records the media contract used by the Produxion MVP after the standalone-media migration.

## Casablanca cover

- Runtime URL: `/production-assets/real/casablanca-cover.webp`
- Source is a normal binary WebP generated from the locked production poster source.
- The generated standalone copy also lives under `/production-assets/individual/cover/`.

## Character locks

The browser must not crop the character contact-sheet atlas for the six available locked angles.

Each locked character uses six standalone WebP files:

- FRONT
- BACK
- LEFT PROFILE
- RIGHT PROFILE
- 3/4 LEFT
- 3/4 RIGHT

Generated character canvas: **600 × 800 (3:4)**.

Characters covered:

- Arga
- Sari
- Pak Harun
- Bowo
- Dimas
- Penumpang Tanpa Wajah

Total standalone character images: **36**.

## EP001 storyboard

EP001 contains 8 scenes × 2 shots = **16 standalone storyboard images**.

Generated storyboard canvas: **720 × 1280 (9:16 vertical)**.

The application maps database IDs such as `EP001-SC01-SH01` through `EP001-SC08-SH02` to the flattened generated media files `SH01.webp` through `SH16.webp`.

Both the Episode Storyboard page and Shot Inspector must render these standalone files directly. They must not use browser-side atlas cropping for the master storyboard frame.

## Validation gate

Before Replit pulls this branch:

- GitHub asset generation completes.
- Cover binary exists at the runtime URL.
- Six standalone angle files exist for every locked character.
- SH01–SH16 exist under the EP001 storyboard directory.
- TypeScript typecheck passes.
- Next.js production build passes.
