# EP001 Storyboard V5 Validation Gate

This gate controls promotion of the 16 final storyboard masters for **03:13 CASABLANCA / EP001 — Order Terakhir**.

Source of truth: `public/production-assets/v5/storyboards/EP001/manifest.json`.

## Current state

- V5 storyboard package: **SOURCE_REQUIRED**
- Required masters: **16 PNG files** (`SH01.png` … `SH16.png`)
- Required source resolution: **1080 × 1920**
- Aspect ratio: **9:16 vertical**
- Runtime targets: `/production-assets/individual/storyboards/EP001/SH01.webp` … `SH16.webp`
- Existing runtime storyboard WebPs remain **INTERIM** until this gate is approved.

## Automatic checks

All checks below must pass before an image can be proposed for lock:

- exactly 16 source PNG files exist;
- every source decodes as PNG;
- every source is exactly 1080 × 1920;
- filenames map one-to-one to SH01–SH16;
- no missing shot IDs;
- no duplicate binary hashes across different shots;
- each runtime conversion decodes as WebP at 1080 × 1920;
- stable runtime filenames are preserved;
- TypeScript typecheck passes;
- Next.js production build passes.

## Visual / continuity checks

These are approval checks, not merely file-format checks.

### Character identity

- Arga must match the locked V5 Arga identity whenever visible.
- Sari must match the locked V5 Sari identity whenever visible.
- Face, hair, apparent age, body proportions, and identity-defining wardrobe cannot drift between shots.
- Do not substitute look-alike actors.

### Vehicle continuity

- Same hero vehicle in all applicable shots.
- Same dashboard, seats, mirror, phone holder, and cabin geometry.
- Indonesian right-hand-drive layout must remain correct.

### Environment continuity

- Kuningan, pickup zone, Casablanca approach, and Casablanca core must follow their assigned environment/site IDs.
- Jakarta night geography must remain believable.
- Wet pavement/rain continuity must not reset randomly.
- Do not introduce unrelated architecture or a generic foreign city.

### Story and clock continuity

- Camera composition and action must match the V5 manifest for each shot.
- Story clock must progress according to the manifest.
- Supernatural signature transition begins at exactly **03:13**.
- H0 shots contain no supernatural element.
- H1 is a restrained anomaly.
- H2 creates supernatural pressure without a full reveal.
- H3 is a controlled reveal, not an unrelated horror escalation.

### UI/text accuracy

- Phone/dashboard content requested by the shot must be readable.
- Names, fare, destination state, messages, and time must match the manifest exactly.
- No random generated text, watermark, fake brand, or extraneous UI labels.

## Approval checklist

For each SH01–SH16 review:

- [ ] Shot ID and filename correct
- [ ] 1080 × 1920 source confirmed
- [ ] Camera/framing matches shot contract
- [ ] Character identity matches locks
- [ ] Vehicle continuity passes
- [ ] Environment/site continuity passes
- [ ] Story clock / UI text passes
- [ ] Horror level passes
- [ ] No unwanted extra person/ghost/object
- [ ] Approved for runtime promotion

The episode package may become `LOCKED` only when **all 16 shots** are approved.

## Promotion rule

Promotion must convert approved PNG masters to WebP and overwrite only the stable runtime files `SH01.webp` … `SH16.webp`. Database IDs, application routes, and runtime URLs must not change.

After promotion, update both application and machine-readable media manifests from `INTERIM` to `LOCKED`, then run the final CI gate before Replit synchronization.
