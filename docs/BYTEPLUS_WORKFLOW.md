# BytePlus Generation Workflow

Productionboard does not call BytePlus directly in MVP 0.1. It prepares a deterministic shot package so an AI operator has everything needed in one place.

## Operator loop

1. Open `/generation`.
2. Select a DRAFT / REVISION shot.
3. Open Shot Inspector.
4. Download each locked reference asset.
5. Copy the AI prompt.
6. Download shot JSON for metadata / handoff.
7. Generate the clip in BytePlus.
8. Upload generated clip to the future version endpoint / object storage.
9. Editor reviews against the reference package.
10. Revision or Approval.
11. Lock the approved exact version.

## Generation package target

Phase 2 should provide a `Download package` action that returns:

```text
EP001-SC08-SH02/
  CHR-ARGA-01.png
  CHR-SARI-01.png
  VEH-ARGA-01.jpg
  ENV-001-B.jpg
  PROP-MIRROR-01.jpg
  PREVIOUS_FRAME.jpg
  PROMPT.txt
  SHOT.json
```

## Prompt structure

```text
WORLD
[location + environment]

CHARACTER
[locked character IDs]

ACTION
[what happens]

CAMERA
[shot size, angle, movement]

LIGHTING / ATMOSPHERE
[weather, light, horror intensity]

CONTINUITY
[previous and next state]

NEGATIVE
[global + shot-specific exclusions]
```

## Important

Do not generate from a prose sentence alone. A production generation must know **WHO + WHERE + WHEN + WHAT + HOW + WHY + FROM + TO**.
