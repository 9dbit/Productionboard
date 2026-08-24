# Productionboard MVP Specification

## Goal

Build a web-based production board that lets director, editor and AI operator understand exactly **what must happen in every shot**, which reference assets are allowed, when the shot occurs, and whether the result is approved.

## Pilot scope

Project: **03:13 CASABLANCA**  
Pilot episode: **EP001 — Order Terakhir**  
Duration: **88 seconds**  
Structure: **8 scenes / 16 shots**

## Core jobs to be done

1. Director can see the 80-episode production state.
2. Editor can open an episode and understand scene/shot timing without opening a PDF.
3. AI operator can open one shot and get the prompt + exact references + continuity notes.
4. Asset manager can find the master character/environment/vehicle references and download the original.
5. Reviewer can mark generated shots for revision, approval or lock.

## MVP routes

| Route | Purpose |
| --- | --- |
| `/` | 80-episode cockpit |
| `/episodes/EP001` | timeline + scene storyboard |
| `/shots/[shotId]` | shot inspector |
| `/assets` | master asset library |
| `/generation` | generation queue |
| `/review` | editorial review queue |

## Shot contract

Every shot must have:

- Shot ID
- episode / scene relationship
- video timecode
- story clock
- duration
- location / site
- environment asset
- character assets
- vehicle / prop assets when relevant
- camera framing / movement
- action
- audio cue
- horror intensity
- generation prompt
- continuity note
- review status

## Status lifecycle

`DRAFT → GENERATED → REVIEW → REVISION → APPROVED → LOCKED`

A LOCKED shot is immutable in production. A change creates a new version in Phase 2.

## Non-goals for MVP 0.1

- direct BytePlus API integration
- persistent authentication
- database writes
- video transcoding
- cloud upload
- automatic visual similarity / face QC
- final NLE timeline export

These are intentionally postponed until the EP001 UX is approved.

## Acceptance criteria

- App builds successfully.
- EP001 displays all 8 scenes and 16 shots.
- Every shot opens a dedicated inspector.
- Every inspector exposes prompt and downloadable reference links.
- Shot JSON export works.
- Mobile layout remains usable.
- Seed assets can be replaced later without changing IDs.
