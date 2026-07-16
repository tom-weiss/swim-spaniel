# Swim, Spaniel!

## Intro Story

Spaniels are stranded in the reefs around the Komodo Islands. Swim through the current, rescue the dogs, and drive away the giant Komodo dragon guarding each route.

## Obstacle Behavior

`obstacleId` selects catalog artwork only; it does not change collisions, scoring, spawning, or movement. Runtime mechanics remain keyed by `entity.type` and, for timed or pulsed behaviors, `behaviorState`. Version `2.0.1` preserves the complete ten-level predecessor mechanics while replacing its setting, characters, effects, terminology, and sprite silhouettes.

| Picture | Entity Type | Frequency | Movement | Diver Collision | Boost Interaction | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| ![coral](docs/images/obstacles/coral.svg) | `coral` | Standard through mythic | Drifts down with the reef; no lane switching. | Removes 1 air tank and triggers a `650ms` tangled freeze unless boost-clear applies. | Clearable only when boost is active and `jumpRule` is `low` or `high`. | `obstacleId` selects staghorn, fire, pinnacle, wall, table, gate, or shipwreck art without changing mechanics. |
| ![reef rock](docs/images/obstacles/reef-rock.svg) | `reef-rock` | Standard through mythic | Drifts vertically; no lane switching. | Removes 1 air tank and triggers tangled freeze unless boost-clear applies. | Always clearable during an active boost. | `obstacleId` selects volcanic cluster, blue hole, shell bed, lava, anchor field, or volcanic vent art without changing mechanics. |
| ![shark](docs/images/obstacles/shark.svg) | `shark` | Standard (`level 2+`), rare (`level 3+`), mythic | Moving hazard with random lane-change attempts and cooldown. | Removes 1 air tank unless boost-clear or invulnerability applies. | Uses the template's low, high, or no-clear rule. | Catalog variants include reef, hammerhead, tiger, and ghost sharks. |
| ![fish school](docs/images/obstacles/fish-school.svg) | `fish-school-leader` + `fish-school-follower` | Rare (`level 3+`) | A leader and followers weave laterally as one school. | Contact damages the diver unless protected. | All members use `jumpRule: low`. | Starts with 3 followers, adds 2 per level after level 3, and caps at 16. Members of the school do not collide with one another. |
| ![jellyfish](docs/images/obstacles/jellyfish.svg) | `jellyfish` | Super-rare (`level 4+`) | Moving, lane-changing hazard. | Removes 1 air tank unless cleared or protected. | Uses `jumpRule: low`. | Rare high-level marine hazard. |
| ![spaniel](docs/images/obstacles/spaniel.svg) | `spaniel` | Standard, rare, mythic | Moving rescue target with random lane changes. | Rescues the dog, awards `+100`, emits bubbles, and removes the target safely. | Rescue collision takes priority over boost-clear rules. | Life ring, rope, tangled, and golden-harness variants are visual only; paddling and tail wag do not affect collision. |
| ![black spaniel](docs/images/obstacles/black-spaniel.svg) | `black-spaniel` | Rare (`level 2+`) | Same moving behavior as a brown spaniel. | Rescues the dog and awards `+200`. | Rescue collision takes priority. | Counts normally toward the boss rescue goal. |
| ![kelp bed](docs/images/obstacles/kelp-bed.svg) | `kelp-bed` | Standard | Static lane hazard. | Applies a stackable `900ms` silt-style slowdown without removing air. | Boosting over it avoids slowdown. | Non-lethal during moving-entity collision checks. |
| ![reef trench](docs/images/obstacles/reef-trench.svg) | `reef-trench` | Rare (`level 2+`) | Static, wide, multi-lane hazard. | Removes 1 air tank unless boost-clear applies. | Intended high-boost obstacle. | Wider than a normal lane obstacle. |
| ![komodo dragon](docs/images/obstacles/komodo.svg) | `komodo` | Boss encounter | Swims in, holds the route for about `20s`, tracks the diver, then exits. | Direct contact removes 1 air tank. Boosting into it drives it away for `+1800` and `+2` air tanks. | Boss victory requires an active boost during overlap. | Throws venom clouds and switches music into boss mode. |
| ![venom cloud](docs/images/obstacles/venom-cloud.svg) | `venom-cloud` | Boss-driven | Travels down the diver's lane; later levels can fan across lanes. | Toxic splash removes 1 air tank unless protected. | Cannot be boost-cleared. | Throw cadence scales through level 6 and then stays capped. |
| ![rescue bubbles](docs/images/obstacles/rescue-bubbles.svg) | `rescue-bubbles` | Event-driven | Drifts vertically with the reef. | Harmless and ignored by damage checks. | Not applicable. | Marks a rescue or a creature safely leaving after an obstacle collision. |
| ![silt patch](docs/images/obstacles/silt-patch.svg) | `silt-patch` | Rare (`level 2+`) | Static patch. | Applies stackable `900ms` slowdown. | Boosting avoids the effect. | Persists after contact and is non-lethal to moving creatures. |
| ![current stream](docs/images/obstacles/current-stream.svg) | `current-stream` | Standard (`level 2+`) | Static stream. | Applies a stackable `1400ms` speed boost. | Boosting over it avoids the effect. | Persists after contact and is non-lethal to moving creatures. |
| ![falling anchor](docs/images/obstacles/falling-anchor.svg) | `falling-anchor` | Rare (`level 3+`) | Begins as a warning marker, then falls through the route. | Warning is harmless; the falling anchor damages the diver. | Falling phase uses `jumpRule: low`. | Warning duration is `650ms`. |
| ![manta current](docs/images/obstacles/manta-current.svg) | `manta-current` | Super-rare (`level 3+`) | Moving manta with lateral current pulses. | Current pushes the diver; direct body collision still damages. | Uses `jumpRule: none`. | Pushes every `180ms` while its current band overlaps the diver. |

## Level and Survival Flow

- Level 1 starts with slower spawning and favors spaniel rescue targets.
- Brown spaniels appear immediately; black spaniels and reef trenches unlock at level 2; jellyfish unlock at level 4.
- Fish schools unlock at level 3 and scale from 3 to 16 followers.
- Spawn cadence and base scroll speed increase through level 6, then stay at level-6 tuning through level 10.
- A Komodo encounter begins after rescuing the level target, which ranges from 10 to 14 and starts at 12.
- Driving away the dragon or allowing it to leave advances the route. Driving it away awards `+1800` and `+2` air tanks.
- Clearing the level-10 dragon encounter ends the run in victory.
- Air tanks do not reset between levels and are uncapped.
- Level transitions grant `2.6s` invulnerability and a short spawn-and-scroll burst.
- Non-terminal damage freezes play for `650ms`, followed by `2.2s` invulnerability once movement resumes.
- Silt and current effects stack up to their existing caps and modify both controls and world speed.
- Mythic spawns unlock after 25 total rescues.

## Controls

- Keyboard: left/right arrows move; up arrow or space activates boost.
- Touch: use the left, BOOST, and right controls.
- Mobile controls suppress long-press, double-tap zoom, and gesture zoom while playing.
- Debug/testing: press `p` during the first second of a run to spawn a fish school with exactly 4 followers.

## Audio

- Procedural underwater music begins after user interaction.
- Boss encounters switch to a faster, heavier motif without restarting audio setup.
- Rescues play an ascending chime; game over uses a bark; victory combines a fanfare with rescue chimes.
- Mute state is stored under the Swim Spaniel-specific local-storage key.

## Web App and Deployment

- SEO, Open Graph, and Twitter metadata describe the Komodo rescue game.
- `site.webmanifest` supports standalone portrait installation with dedicated Swim Spaniel icons.
- `sw.js` caches the app shell for offline repeat play.
- Asset, manifest, and service-worker paths are relative to the deployment scope, so GitHub project Pages such as `/swim-spaniel/` work without stealing the origin root.
- GitHub Actions builds TypeScript and deploys the repository to GitHub Pages on pushes to `main`.

Tier cadence remains mechanically unchanged: standard spawning starts near `540ms` on level 1, tightens by about `50ms` per level to roughly `290ms` at level 6, and then stays capped. Rare spawns occur around every `10-20s`, super-rare around every `60-600s`, and mythic around every `30-90s` after unlock.
