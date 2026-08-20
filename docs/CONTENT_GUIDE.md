# Content & Production Data Guide

## ID convention

- Project: `CASA`
- Episode: `EP001`
- Scene: `EP001-SC01`
- Shot: `EP001-SC01-SH01`
- Environment: `ENV-015-A`
- Character: `CHR-ARGA-01`
- Vehicle: `VEH-ARGA-01`
- Prop: `PROP-PHONE-01`
- Audio: `AUD-HORN-01`

## Two clocks

Every shot may have two different clocks:

1. **Video timecode** — position inside the episode, e.g. `01:02–01:07`.
2. **Story clock** — time inside the fictional world, e.g. `03:12:58`.

Never substitute one for the other. Signature events such as **03:13** depend on story-clock continuity.

## Asset metadata minimum

- stable Asset ID
- kind
- name
- original file / storage key
- dimensions + MIME type
- status
- site when environment-related
- description
- usage count / affected shots

## Reference priority for generation

1. character face lock
2. vehicle / recurring set
3. environment
4. wardrobe
5. prop
6. lighting / mood

Mood must never override a face, vehicle, wardrobe or geometry lock.

## Horror scale

- `H0` normal
- `H1` uneasy
- `H2` anomaly
- `H3` threat
- `H4` supernatural
- `H5` peak horror

## Global negative prompt

`no cartoon, no anime, no fantasy architecture, no European city, no American freeway, no futuristic city, no incorrect Indonesian traffic direction, no face changes, no wardrobe changes, no vehicle changes, no excessive fog, no random ghost appearance, no exaggerated horror makeup unless explicitly required`

## QC gate before LOCKED

- face correct
- hair correct
- wardrobe correct
- environment / Site ID correct
- story clock correct
- episode timecode correct
- weather continuity correct
- vehicle correct
- props correct
- camera correct
- horror level correct
- no unintended AI objects
- traffic direction correct
- dialogue / audio timing correct
- previous-shot continuity correct
- next-shot handoff valid
