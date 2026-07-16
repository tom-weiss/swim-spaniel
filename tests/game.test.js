import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { URL } from 'node:url';
import { PixelRenderer, SwimSpanielGame } from '../dist/game.js';

function rngFrom(values) {
  let index = 0;
  return () => {
    const value = values[index] !== undefined ? values[index] : 0;
    index += 1;
    return value;
  };
}

test('player movement is lane-limited and avoids side corals', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  for (let i = 0; i < 20; i += 1) {
    game.step(150, { left: true, right: false });
  }
  assert.equal(game.snapshot().playerX, 66.6);

  for (let i = 0; i < 20; i += 1) {
    game.step(150, { left: false, right: true });
  }
  assert.equal(game.snapshot().playerX, 216.6);
});

test('spawned moving obstacles stay in playable lanes', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.99, 0.2, 0.99, 0.2]), 10);
  game.step(540, { left: false, right: false });
  game.step(540, { left: false, right: false });

  const lanes = game.snapshot().entities.map((entity) => entity.lane);
  assert.ok(lanes.every((lane) => lane >= 2 && lane <= 7));
});

test('rescuing spaniel produces score, animation effect, and rescue-bubbles obstacle', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  game.forceSpawn({ type: 'spaniel', x: 122, y: 366, width: 16, height: 16, speed: 0, lane: 5, laneSwitchCooldownMs: 999 });
  game.step(16, { left: false, right: false });

  const snap = game.snapshot();
  assert.equal(snap.score, 100);
  assert.equal(snap.spanielsRescued, 1);
  assert.ok(snap.effects.some((effect) => effect.kind === 'spaniel-rescue'));
  const coinEffect = snap.effects.find((effect) => effect.kind === 'rescue-pop');
  assert.ok(coinEffect);
  assert.ok(snap.entities.some((entity) => entity.type === 'rescue-bubbles'));

  game.step(16, { left: false, right: false });
  const movedCoin = game.snapshot().effects.find((effect) => effect.kind === 'rescue-pop');
  assert.ok(movedCoin.x > coinEffect.x);

  game.step(320, { left: false, right: false });
  assert.equal(game.snapshot().effects.length, 0);
});

test('black spaniel awards double points and still advances spaniel counters', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  game.forceSpawn({ type: 'black-spaniel', x: 122, y: 366, width: 16, height: 16, speed: 0, lane: 5, laneSwitchCooldownMs: 999 });
  game.step(16, { left: false, right: false });

  const snap = game.snapshot();
  assert.equal(snap.score, 200);
  assert.equal(snap.spanielsRescued, 1);
  assert.equal(snap.levelSpanielsRescued, 1);
  assert.ok(snap.entities.some((entity) => entity.type === 'rescue-bubbles'));
});

test('new obstacle templates are level-gated and kelp beds stay in the standard pool', () => {
  const levelOne = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  const levelOneRare = levelOne.templatesForTier('rare');
  assert.equal(levelOneRare.some((template) => template.type === 'black-spaniel'), false);
  assert.equal(levelOneRare.some((template) => template.type === 'reef-trench'), false);
  assert.equal(levelOneRare.some((template) => template.type === 'fish-school-leader'), false);
  assert.ok(levelOne.templatesForTier('standard').some((template) => template.type === 'kelp-bed'));

  const levelTwo = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  levelTwo.speedLevel = 2;
  const levelTwoRare = levelTwo.templatesForTier('rare');
  assert.ok(levelTwoRare.some((template) => template.type === 'black-spaniel'));
  assert.ok(levelTwoRare.some((template) => template.type === 'reef-trench'));
  assert.equal(levelTwoRare.some((template) => template.type === 'fish-school-leader'), false);

  const levelThree = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  levelThree.speedLevel = 3;
  assert.ok(levelThree.templatesForTier('rare').some((template) => template.type === 'fish-school-leader'));
  assert.equal(levelThree.templatesForTier('super-rare').some((template) => template.type === 'jellyfish'), false);

  const levelFour = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  levelFour.speedLevel = 4;
  assert.ok(levelFour.templatesForTier('super-rare').some((template) => template.type === 'jellyfish'));
  assert.ok(levelFour.templatesForTier('standard').some((template) => template.type === 'kelp-bed'));
});

test('reef trench requires a boost to avoid damage', () => {
  const grounded = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  grounded.playerImmortalMs = 0;
  grounded.forceSpawn({ type: 'reef-trench', obstacleId: 'reef-trench', jumpRule: 'high', x: 122, y: 366, width: 46, height: 24, speed: 0, lane: 5 });
  grounded.step(16, { left: false, right: false, jump: false });
  assert.equal(grounded.snapshot().airTanks, 2);

  const jumping = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  jumping.playerImmortalMs = 0;
  jumping.forceSpawn({ type: 'reef-trench', obstacleId: 'reef-trench', jumpRule: 'high', x: 122, y: 366, width: 46, height: 24, speed: 0, lane: 5 });
  jumping.step(16, { left: false, right: false, jump: true });
  assert.equal(jumping.snapshot().airTanks, 3);
});

test('fish school spawn scales followers by level and supports debug override count', () => {
  const levelThree = new SwimSpanielGame(300, 600, rngFrom([0.2, 0.3, 0.4]), 10);
  levelThree.speedLevel = 3;
  levelThree.spawnFishSchoolDebug();
  let school = levelThree.snapshot().entities.filter((entity) => entity.type === 'fish-school-leader' || entity.type === 'fish-school-follower');
  assert.equal(school.filter((entity) => entity.type === 'fish-school-leader').length, 1);
  assert.equal(school.filter((entity) => entity.type === 'fish-school-follower').length, 3);
  const leader = school.find((entity) => entity.type === 'fish-school-leader');
  const followers = school.filter((entity) => entity.type === 'fish-school-follower');
  assert.ok(leader);
  assert.ok(followers.every((entity) => entity.y > leader.y));
  assert.ok(school.every((entity) => entity.obstacleId === 'fish-school'));
  assert.ok(new Set(school.map((entity) => entity.lane)).size >= 2);

  const beforeLanes = school.map((entity) => entity.lane);
  levelThree.step(320, { left: false, right: false });
  school = levelThree.snapshot().entities.filter((entity) => entity.type === 'fish-school-leader' || entity.type === 'fish-school-follower');
  assert.equal(school.filter((entity) => entity.type === 'fish-school-leader').length, 1);
  assert.equal(school.filter((entity) => entity.type === 'fish-school-follower').length, 3);
  assert.ok(school.some((entity, index) => entity.lane !== beforeLanes[index]));

  const levelSix = new SwimSpanielGame(300, 600, rngFrom([0.2, 0.3, 0.4]), 10);
  levelSix.speedLevel = 6;
  levelSix.spawnFishSchoolDebug();
  const longSchool = levelSix.snapshot().entities.filter((entity) => entity.type === 'fish-school-leader' || entity.type === 'fish-school-follower');
  assert.equal(longSchool.filter((entity) => entity.type === 'fish-school-follower').length, 9);
  assert.ok(longSchool.every((entity) => entity.behaviorState?.kind !== 'fishSchool' || entity.behaviorState.laneSpan === 1));

  const debugOverride = new SwimSpanielGame(300, 600, rngFrom([0.2, 0.3, 0.4]), 10);
  debugOverride.spawnFishSchoolDebug(4);
  const overrideSchool = debugOverride.snapshot().entities.filter((entity) => entity.type === 'fish-school-leader' || entity.type === 'fish-school-follower');
  assert.equal(overrideSchool.filter((entity) => entity.type === 'fish-school-leader').length, 1);
  assert.equal(overrideSchool.filter((entity) => entity.type === 'fish-school-follower').length, 4);
  debugOverride.step(32, { left: false, right: false });
  const overrideAfterStep = debugOverride.snapshot().entities.filter((entity) => entity.type === 'fish-school-leader' || entity.type === 'fish-school-follower');
  assert.equal(overrideAfterStep.filter((entity) => entity.type === 'fish-school-leader').length, 1);
  assert.equal(overrideAfterStep.filter((entity) => entity.type === 'fish-school-follower').length, 4);

  const clampedMinimum = new SwimSpanielGame(300, 600, rngFrom([0.2, 0.3, 0.4]), 10);
  clampedMinimum.spawnFishSchoolDebug(1);
  const minSchool = clampedMinimum.snapshot().entities.filter((entity) => entity.type === 'fish-school-leader' || entity.type === 'fish-school-follower');
  assert.equal(minSchool.filter((entity) => entity.type === 'fish-school-leader').length, 1);
  assert.equal(minSchool.filter((entity) => entity.type === 'fish-school-follower').length, 3);
});

test('komodo boss appears after spaniel threshold and jump defeat levels up with bonus', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.4, 0.2, 0.2]), 10);
  for (let i = 0; i < 12; i += 1) {
    game.forceSpawn({ type: 'spaniel', x: 122, y: 366, width: 16, height: 16, speed: 0, lane: 5, laneSwitchCooldownMs: 999 });
    game.step(16, { left: false, right: false });
  }

  const withBoss = game.snapshot();
  assert.equal(withBoss.score, 1200);
  assert.equal(withBoss.speedLevel, 1);
  assert.equal(withBoss.levelSpanielsRescued, 12);
  assert.equal(withBoss.isBossActive, true);

  const runtimeBoss = game.entities.find((entity) => entity.type === 'komodo' && entity.behaviorState?.kind === 'komodoBoss');
  assert.ok(runtimeBoss);
  runtimeBoss.behaviorState.phase = 'hovering';
  runtimeBoss.behaviorState.phaseMs = 4000;
  runtimeBoss.y = 366;
  runtimeBoss.speed = 0;
  runtimeBoss.lane = 5;

  game.step(16, { left: false, right: false, jump: true });
  const afterDefeat = game.snapshot();
  assert.equal(afterDefeat.isBossActive, false);
  assert.equal(afterDefeat.speedLevel, 2);
  assert.equal(afterDefeat.airTanks, 5);
  assert.equal(afterDefeat.levelSpanielsRescued, 0);
  assert.ok(afterDefeat.levelUpBannerMs > 0);
  assert.equal(afterDefeat.score, 3000);
});

test('boss completion advances levels beyond six toward the level ten finale', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  game.speedLevel = 6;
  game.levelSpanielsRescued = game.nextBossRescueGoal;
  game.komodoBossActive = true;
  game.forceSpawn({
    type: 'komodo',
    obstacleId: 'komodo-boss',
    jumpRule: 'high',
    behaviorState: { kind: 'komodoBoss', phase: 'hovering', phaseMs: 4000, throwCooldownMs: 9999 },
    x: 122,
    y: 366,
    width: 28,
    height: 34,
    speed: 0,
    lane: 5,
    laneSwitchCooldownMs: 0
  });

  game.step(16, { left: false, right: false, jump: true });
  const snap = game.snapshot();
  assert.equal(snap.speedLevel, 7);
  assert.equal(snap.airTanks, 5);
  assert.equal(snap.levelSpanielsRescued, 0);
  assert.ok(snap.levelUpBannerMs > 0);
  assert.equal(snap.nextBossRescueGoal <= 14, true);
});

test('defeating level ten boss triggers victory state', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  game.speedLevel = 10;
  game.komodoBossActive = true;
  game.forceSpawn({
    type: 'komodo',
    obstacleId: 'komodo-boss',
    jumpRule: 'high',
    behaviorState: { kind: 'komodoBoss', phase: 'hovering', phaseMs: 2000, throwCooldownMs: 9999 },
    x: 122,
    y: 366,
    width: 28,
    height: 34,
    speed: 0,
    lane: 5,
    laneSwitchCooldownMs: 0
  });

  game.step(16, { left: false, right: false, jump: true });
  const snap = game.snapshot();
  assert.equal(snap.isVictory, true);
  assert.equal(snap.isGameOver, true);
  assert.equal(snap.speedLevel, 10);
});

test('moving obstacles only convert when colliding with lethal obstacles', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  game.forceSpawn({ type: 'shark', x: 122, y: 120, width: 20, height: 20, speed: 0, lane: 5, laneSwitchCooldownMs: 999 });
  game.forceSpawn({ type: 'spaniel', x: 122, y: 120, width: 20, height: 20, speed: 0, lane: 5, laneSwitchCooldownMs: 999 });

  game.step(16, { left: false, right: false });
  const collided = game.snapshot();
  const rescueBubbles = collided.entities.filter((entity) => entity.type === 'rescue-bubbles');
  assert.equal(rescueBubbles.length, 1);
  assert.ok(collided.entities.some((entity) => entity.type === 'shark'));
  assert.equal(collided.entities.some((entity) => entity.type === 'spaniel'), false);
  assert.ok(collided.effects.some((effect) => effect.kind === 'spaniel-rescue'));
});

test('rescue bubbles do not transform sharks or spaniels on overlap', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  game.forceSpawn({ type: 'rescue-bubbles', x: 122, y: 120, width: 20, height: 18, speed: 0, lane: 5 });
  game.forceSpawn({ type: 'shark', x: 122, y: 120, width: 20, height: 20, speed: 0, lane: 5, laneSwitchCooldownMs: 999 });
  game.forceSpawn({ type: 'rescue-bubbles', x: 152, y: 200, width: 20, height: 18, speed: 0, lane: 6 });
  game.forceSpawn({ type: 'spaniel', x: 152, y: 200, width: 20, height: 20, speed: 0, lane: 6, laneSwitchCooldownMs: 999 });

  game.step(16, { left: false, right: false });
  const snap = game.snapshot();
  assert.ok(snap.entities.some((entity) => entity.type === 'shark'));
  assert.ok(snap.entities.some((entity) => entity.type === 'spaniel'));
  assert.equal(snap.entities.filter((entity) => entity.type === 'rescue-bubbles').length, 2);
});

test('silt, current, and anchor telegraph do not transform moving obstacles on overlap', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  game.forceSpawn({ type: 'silt-patch', x: 122, y: 120, width: 20, height: 20, speed: 0, lane: 5 });
  game.forceSpawn({ type: 'shark', x: 122, y: 120, width: 20, height: 20, speed: 0, lane: 5, laneSwitchCooldownMs: 999 });
  game.forceSpawn({ type: 'current-stream', x: 152, y: 120, width: 20, height: 20, speed: 0, lane: 6 });
  game.forceSpawn({ type: 'spaniel', x: 152, y: 120, width: 20, height: 20, speed: 0, lane: 6, laneSwitchCooldownMs: 999 });
  game.forceSpawn({
    type: 'falling-anchor',
    obstacleId: 'falling-anchor',
    behaviorState: { kind: 'anchorFall', phase: 'telegraph', phaseMs: 650 },
    x: 182,
    y: 120,
    width: 20,
    height: 20,
    speed: 0,
    lane: 7
  });
  game.forceSpawn({ type: 'manta-current', x: 182, y: 120, width: 20, height: 20, speed: 0, lane: 7, laneSwitchCooldownMs: 999 });

  game.step(16, { left: false, right: false });
  const snap = game.snapshot();
  assert.ok(snap.entities.some((entity) => entity.type === 'shark'));
  assert.ok(snap.entities.some((entity) => entity.type === 'spaniel'));
  assert.ok(snap.entities.some((entity) => entity.type === 'manta-current'));
  assert.equal(snap.entities.filter((entity) => entity.type === 'rescue-bubbles').length, 0);
});


test('entity collision marks second moving obstacle index', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  game.forceSpawn({ type: 'coral', x: 122, y: 120, width: 20, height: 20, speed: 0, lane: 5 });
  game.forceSpawn({ type: 'shark', x: 122, y: 120, width: 20, height: 20, speed: 0, lane: 5, laneSwitchCooldownMs: 999 });

  game.step(16, { left: false, right: false });
  assert.ok(game.snapshot().entities.some((entity) => entity.type === 'rescue-bubbles'));
});

test('obstacle collision rescue bubbles keep no obstacle metadata and do not hurt player', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  game.forceSpawn({ type: 'coral', x: 122, y: 120, width: 20, height: 20, speed: 0, lane: 5 });
  game.forceSpawn({ type: 'shark', jumpRule: 'none', x: 122, y: 120, width: 20, height: 20, speed: 0, lane: 5, laneSwitchCooldownMs: 999 });

  game.step(16, { left: false, right: false });
  const debrisRescueBubbles = game.snapshot().entities.find((entity) => entity.type === 'rescue-bubbles');
  assert.ok(debrisRescueBubbles);
  assert.equal(debrisRescueBubbles.jumpRule, undefined);
  assert.equal(debrisRescueBubbles.obstacleId, undefined);

  const runtimeRescueBubbles = game.entities.find((entity) => entity.type === 'rescue-bubbles');
  assert.ok(runtimeRescueBubbles);
  runtimeRescueBubbles.y = 366;
  runtimeRescueBubbles.speed = 0;
  runtimeRescueBubbles.lane = 5;
  runtimeRescueBubbles.direction = 1;

  const livesBefore = game.snapshot().airTanks;
  game.step(16, { left: false, right: false, jump: false });
  assert.equal(game.snapshot().airTanks, livesBefore);
});

test('non-spaniel collisions remove air tanks and game over freezes state updates', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  game.playerImmortalMs = 0;
  game.forceSpawn({ type: 'coral', x: 122, y: 366, width: 30, height: 30, speed: 0, lane: 5 });
  game.step(16, { left: false, right: false });
  game.step(700, { left: false, right: false });
  game.playerImmortalMs = 0;
  game.forceSpawn({ type: 'reef-rock', x: 122, y: 366, width: 30, height: 30, speed: 0, lane: 5 });
  game.step(16, { left: false, right: false });
  game.step(700, { left: false, right: false });
  game.playerImmortalMs = 0;
  game.forceSpawn({ type: 'komodo', x: 122, y: 366, width: 30, height: 30, speed: 0, lane: 5, laneSwitchCooldownMs: 999 });
  game.step(16, { left: false, right: false });

  assert.equal(game.snapshot().isGameOver, true);
  const before = game.snapshot().entities.length;
  game.step(1000, { left: false, right: false });
  assert.equal(game.snapshot().entities.length, before);
});

test('spawn lane fallback chooses nearest clear lane', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.3, 0.1]), 10);
  game.forceSpawn({ type: 'coral', x: 100, y: 0, width: 10, height: 10, speed: 2.2, lane: 3 });
  game.forceSpawn({ type: 'reef-rock', x: 130, y: 0, width: 10, height: 10, speed: 2.2, lane: 4 });
  game.step(540, { left: false, right: false });

  const spawned = game.snapshot().entities.at(-1);
  assert.equal(spawned.lane, 2);
});



test('forceSpawn computes lane from x-position when lane is omitted', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  game.forceSpawn({ type: 'coral', x: 154, y: 40, width: 10, height: 10, speed: 0 });

  const spawned = game.snapshot().entities[0];
  assert.equal(spawned.lane, 5);
  assert.equal(spawned.x, 156.6);
});

test('restart resets game and clears effects', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.8]), 10);
  game.forceSpawn({ type: 'spaniel', x: 122, y: 366, width: 30, height: 30, speed: 0, lane: 5, laneSwitchCooldownMs: 999 });
  game.step(16, { left: false, right: false });
  game.forceSpawn({ type: 'silt-patch', obstacleId: 'silt-patch', x: 122, y: 366, width: 24, height: 24, speed: 0, lane: 5, laneSwitchCooldownMs: 999 });
  game.step(16, { left: false, right: false });
  assert.ok(game.snapshot().activeEffects.siltSlowMs > 0);

  game.restart();
  const snap = game.snapshot();
  assert.equal(snap.score, 0);
  assert.equal(snap.airTanks, 3);
  assert.equal(snap.effects.length, 0);
  assert.equal(snap.entities.length, 0);
  assert.equal(snap.activeEffects.siltSlowMs, 0);
  assert.equal(snap.activeEffects.currentBoostMs, 0);
});

test('level one does not start with invulnerability but level-up still grants it', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  assert.equal(game.snapshot().isPlayerImmortal, false);

  game.komodoBossActive = true;
  game.forceSpawn({
    type: 'komodo',
    obstacleId: 'komodo-boss',
    jumpRule: 'high',
    behaviorState: { kind: 'komodoBoss', phase: 'exiting', phaseMs: 0, throwCooldownMs: 9999 },
    x: 122,
    y: 660,
    width: 28,
    height: 34,
    speed: 0,
    lane: 5
  });

  game.step(16, { left: false, right: false });
  assert.equal(game.snapshot().speedLevel, 2);
  assert.equal(game.snapshot().isPlayerImmortal, true);

  game.restart();
  assert.equal(game.snapshot().isPlayerImmortal, false);
});

test('respawn invulnerability starts when crash freeze ends and movement resumes', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  game.playerImmortalMs = 0;
  game.forceSpawn({ type: 'coral', x: 122, y: 366, width: 30, height: 30, speed: 0, lane: 5 });

  game.step(16, { left: false, right: false });
  const afterCrash = game.snapshot();
  assert.equal(afterCrash.isCrashActive, true);
  assert.equal(afterCrash.isPlayerImmortal, true);
  const respawnImmortalMs = afterCrash.playerImmortalMs;
  const frozenX = afterCrash.playerX;

  game.step(640, { left: true, right: false });
  const stillFrozen = game.snapshot();
  assert.equal(stillFrozen.isCrashActive, true);
  assert.equal(stillFrozen.playerImmortalMs, respawnImmortalMs);
  assert.equal(stillFrozen.playerX, frozenX);

  game.step(16, { left: true, right: false });
  const resumed = game.snapshot();
  assert.equal(resumed.isCrashActive, false);
  assert.equal(resumed.isPlayerImmortal, true);
  assert.equal(resumed.playerImmortalMs, respawnImmortalMs);
  assert.notEqual(resumed.playerX, frozenX);
});

test('snapshot returns copied entities and effects', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  game.forceSpawn({ type: 'spaniel', x: 122, y: 366, width: 16, height: 16, speed: 0, lane: 5, laneSwitchCooldownMs: 999 });
  game.step(16, { left: false, right: false });

  const snap1 = game.snapshot();
  snap1.entities[0].x = 999;
  snap1.effects[0].x = 999;
  const snap2 = game.snapshot();
  assert.notEqual(snap2.entities[0].x, 999);
  assert.notEqual(snap2.effects[0].x, 999);
});

test('pixel renderer paints HUD, effects, crash panel, and end states', () => {
  const calls = [];
  const ctx = {
    fillStyle: '',
    font: '',
    fillRect: (...args) => calls.push(['fillRect', ...args]),
    fillText: (...args) => calls.push(['fillText', ...args])
  };

  const renderer = new PixelRenderer(ctx, 300, 600);
  renderer.render({
    airTanks: 1,
    score: 200,
    speedLevel: 3,
    spanielsRescued: 12,
    isGameOver: true,
    playerX: 120,
    playerY: 366,
    playerJumpOffset: 0,
    isCrashActive: true,
    sideObstacleOffsetY: 32,
    entities: [
      { type: 'coral', x: 10, y: 10, width: 20, height: 20, speed: 1 },
      { type: 'reef-rock', x: 40, y: 40, width: 20, height: 20, speed: 1, crashAnimationMs: 200 },
      { type: 'shark', x: 70, y: 70, width: 20, height: 20, speed: 1 },
      { type: 'spaniel', x: 100, y: 100, width: 20, height: 20, speed: 1 },
      { type: 'rescue-bubbles', x: 110, y: 90, width: 20, height: 20, speed: 1 },
      { type: 'komodo', x: 130, y: 130, width: 20, height: 20, speed: 1 }
    ],
    effects: [
      { kind: 'creature-stunned', x: 90, y: 90, ttlMs: 100, maxTtlMs: 300 },
      { kind: 'rescue-pop', x: 105, y: 95, ttlMs: 120, maxTtlMs: 300 }
    ]
  });

    assert.ok(calls.some((entry) => entry[0] === 'fillText' && String(entry[1]).includes('Final Score 200')));

  renderer.render({
    airTanks: 2,
    score: 20,
    speedLevel: 1,
    spanielsRescued: 0,
    isGameOver: false,
    playerX: 120,
    playerY: 366,
    playerJumpOffset: 0,
    isCrashActive: true,
    sideObstacleOffsetY: 0,
    entities: [],
    effects: []
  });
  assert.ok(calls.some((entry) => entry[0] === 'fillText' && String(entry[1]).includes('TANGLED!')));
  assert.ok(calls.some((entry) => entry[0] === 'fillRect'));

  renderer.render({
    airTanks: 3,
    score: 0,
    speedLevel: 1,
    spanielsRescued: 0,
    isGameOver: false,
    playerX: 100,
    playerY: 300,
    playerJumpOffset: 12,
    isCrashActive: false,
    sideObstacleOffsetY: 8,
    entities: [],
    effects: []
  });
});

test('pixel renderer draws force field around player while immortal', () => {
  const makeCtx = () => {
    const calls = [];
    const ctx = {
      fillStyle: '#000',
      font: '16px monospace',
      fillRect: (...args) => calls.push(args),
      fillText: () => {}
    };
    return { ctx, calls };
  };

  const onCase = makeCtx();
  const onRenderer = new PixelRenderer(onCase.ctx, 300, 600);
  onRenderer.render({
    airTanks: 3,
    score: 0,
    speedLevel: 1,
    spanielsRescued: 0,
    isGameOver: false,
    playerX: 100,
    playerY: 300,
    playerJumpOffset: 0,
    isPlayerImmortal: true,
    playerImmortalMs: 40,
    isCrashActive: false,
    sideObstacleOffsetY: 0,
    entities: [],
    effects: []
  });

  assert.ok(onCase.calls.some((entry) => entry[0] === 100 && entry[1] === 302 && entry[2] === 24 && entry[3] === 1));

  const offCase = makeCtx();
  const offRenderer = new PixelRenderer(offCase.ctx, 300, 600);
  offRenderer.render({
    airTanks: 3,
    score: 0,
    speedLevel: 1,
    spanielsRescued: 0,
    isGameOver: false,
    playerX: 100,
    playerY: 300,
    playerJumpOffset: 0,
    isPlayerImmortal: true,
    playerImmortalMs: 140,
    isCrashActive: false,
    sideObstacleOffsetY: 0,
    entities: [],
    effects: []
  });
  assert.equal(offCase.calls.some((entry) => entry[0] === 100 && entry[1] === 302 && entry[2] === 24 && entry[3] === 1), false);
});

test('pixel renderer draws a coral fish leader and followers in varied colors', () => {
  const calls = [];
  let activeFillStyle = '#000';
  const ctx = {
    font: '16px monospace',
    get fillStyle() {
      return activeFillStyle;
    },
    set fillStyle(value) {
      activeFillStyle = value;
    },
    fillRect: (...args) => calls.push({ args, fillStyle: activeFillStyle }),
    fillText: () => {}
  };
  const renderer = new PixelRenderer(ctx, 360, 640);
  renderer.render({
    airTanks: 3,
    score: 0,
    speedLevel: 3,
    spanielsRescued: 0,
    isGameOver: false,
    playerX: 120,
    playerY: 366,
    playerJumpOffset: 0,
    isCrashActive: false,
    sideObstacleOffsetY: 0,
    entities: [
      {
        type: 'fish-school-leader',
        obstacleId: 'fish-school',
        jumpRule: 'low',
        behaviorState: { kind: 'fishSchool', anchorLane: 5, laneSpan: 1, phaseMs: 0, phaseOffsetMs: 0, wavePeriodMs: 1080, paletteIndex: 0 },
        x: 122,
        y: 120,
        width: 18,
        height: 30,
        speed: 1.3,
        lane: 5,
        direction: 1
      },
      {
        type: 'fish-school-follower',
        obstacleId: 'fish-school',
        jumpRule: 'low',
        behaviorState: { kind: 'fishSchool', anchorLane: 5, laneSpan: 1, phaseMs: 0, phaseOffsetMs: 170, wavePeriodMs: 1080, paletteIndex: 0 },
        x: 122,
        y: 104,
        width: 16,
        height: 28,
        speed: 1.3,
        lane: 5,
        direction: 1
      },
      {
        type: 'fish-school-follower',
        obstacleId: 'fish-school',
        jumpRule: 'low',
        behaviorState: { kind: 'fishSchool', anchorLane: 5, laneSpan: 1, phaseMs: 0, phaseOffsetMs: 340, wavePeriodMs: 1080, paletteIndex: 1 },
        x: 122,
        y: 88,
        width: 16,
        height: 28,
        speed: 1.3,
        lane: 5,
        direction: 1
      }
    ],
    effects: []
  });
  assert.ok(calls.some((entry) => entry.fillStyle === '#fb7185'));
  assert.ok(calls.some((entry) => entry.fillStyle === '#2563eb'));
  assert.ok(calls.some((entry) => entry.fillStyle === '#16a34a'));
  assert.ok(calls.some((entry) => entry.fillStyle === '#2563eb' && entry.args[2] === 12 && entry.args[3] === 8));
});

test('pixel renderer draws a horizontal scuba swimmer with a tank and animated flippers', () => {
  const calls = [];
  let activeFillStyle = '#000';
  const ctx = {
    font: '16px monospace',
    get fillStyle() {
      return activeFillStyle;
    },
    set fillStyle(value) {
      activeFillStyle = value;
    },
    fillRect: (...args) => calls.push({ args, fillStyle: activeFillStyle }),
    fillText: () => {}
  };

  const renderer = new PixelRenderer(ctx, 300, 600);
  renderer.render({
    airTanks: 3,
    score: 0,
    speedLevel: 1,
    spanielsRescued: 0,
    isGameOver: false,
    playerX: 100,
    playerY: 300,
    playerJumpOffset: 0,
    isCrashActive: false,
    sideObstacleOffsetY: 0,
    entities: [],
    effects: []
  });

  assert.ok(calls.some((entry) => entry.fillStyle === '#e2e8f0' && entry.args[0] === 109 && entry.args[1] === 308 && entry.args[2] === 8 && entry.args[3] === 3));
  assert.ok(calls.some((entry) => entry.fillStyle === '#facc15' && entry.args[0] === 100 && entry.args[1] === 311 && entry.args[2] === 7 && entry.args[3] === 4));
  assert.ok(calls.some((entry) => entry.fillStyle === '#facc15' && entry.args[0] === 100 && entry.args[1] === 318 && entry.args[2] === 7 && entry.args[3] === 4));
});

test('obstacle catalog ids select distinct coral, reef, shark, and rescue-target art', () => {
  const calls = [];
  let activeFillStyle = '#000';
  const ctx = {
    font: '16px monospace',
    get fillStyle() { return activeFillStyle; },
    set fillStyle(value) { activeFillStyle = value; },
    fillRect: (...args) => calls.push({ args, fillStyle: activeFillStyle }),
    fillText: () => {}
  };
  const renderer = new PixelRenderer(ctx, 360, 640);
  renderer.render({
    airTanks: 3,
    score: 0,
    speedLevel: 4,
    spanielsRescued: 0,
    isGameOver: false,
    playerX: 120,
    playerY: 366,
    playerJumpOffset: 0,
    isCrashActive: false,
    sideObstacleOffsetY: 0,
    entities: [
      { type: 'coral', obstacleId: 'fire-coral-pair', x: 50, y: 100, width: 24, height: 24, speed: 0 },
      { type: 'coral', obstacleId: 'giant-table-coral', x: 90, y: 100, width: 36, height: 40, speed: 0 },
      { type: 'reef-rock', obstacleId: 'blue-hole', x: 140, y: 100, width: 30, height: 28, speed: 0 },
      { type: 'reef-rock', obstacleId: 'lava-trench', x: 180, y: 100, width: 38, height: 40, speed: 0 },
      { type: 'shark', obstacleId: 'tiger-shark', x: 230, y: 100, width: 24, height: 32, speed: 0 },
      { type: 'spaniel', obstacleId: 'golden-harness-spaniel', x: 270, y: 100, width: 24, height: 20, speed: 0 }
    ],
    effects: []
  });

  assert.ok(calls.some((entry) => entry.fillStyle === '#fde047'));
  assert.ok(calls.some((entry) => entry.fillStyle === '#c084fc'));
  assert.ok(calls.some((entry) => entry.fillStyle === '#020617'));
  assert.ok(calls.some((entry) => entry.fillStyle === '#7c2d12'));
  assert.ok(calls.some((entry) => entry.fillStyle === '#451a03'));
  assert.ok(calls.some((entry) => entry.fillStyle === '#facc15' && entry.args[2] === 3 && entry.args[3] === 8));
});

test('spaniel sprite tail wags across animation phases', () => {
  const makeCalls = (sideObstacleOffsetY) => {
    const calls = [];
    const ctx = {
      fillStyle: '#000',
      font: '16px monospace',
      fillRect: (...args) => calls.push(args),
      fillText: () => {}
    };
    const renderer = new PixelRenderer(ctx, 300, 600);
    renderer.render({
      airTanks: 3,
      score: 0,
      speedLevel: 1,
      spanielsRescued: 0,
      isGameOver: false,
      playerX: 40,
      playerY: 300,
      playerJumpOffset: 0,
      isCrashActive: false,
      sideObstacleOffsetY,
      entities: [
        { type: 'spaniel', x: 100, y: 200, width: 20, height: 20, speed: 0 }
      ],
      effects: []
    });
    return calls;
  };

  const wagLeftCalls = makeCalls(0);
  const wagRightCalls = makeCalls(10);
  assert.ok(wagLeftCalls.some((entry) => entry[0] === 100 && entry[1] === 208 && entry[2] === 3 && entry[3] === 2));
  assert.ok(wagRightCalls.some((entry) => entry[0] === 101 && entry[1] === 207 && entry[2] === 3 && entry[3] === 2));
});

test('venom splash effect renders toxic green tones', () => {
  const calls = [];
  let activeFillStyle = '#000';
  const ctx = {
    font: '16px monospace',
    get fillStyle() {
      return activeFillStyle;
    },
    set fillStyle(value) {
      activeFillStyle = value;
    },
    fillRect: (...args) => calls.push({ args, fillStyle: activeFillStyle }),
    fillText: () => {}
  };

  const renderer = new PixelRenderer(ctx, 300, 600);
  renderer.render({
    airTanks: 3,
    score: 0,
    speedLevel: 1,
    spanielsRescued: 0,
    isGameOver: false,
    playerX: 100,
    playerY: 300,
    playerJumpOffset: 0,
    isCrashActive: false,
    sideObstacleOffsetY: 0,
    entities: [],
    effects: [
      { kind: 'venom-splash', x: 120, y: 160, ttlMs: 150, maxTtlMs: 300 }
    ]
  });

  assert.ok(calls.some((entry) => entry.fillStyle === '#65a30d'));
  assert.ok(calls.some((entry) => entry.fillStyle === '#365314'));
});



test('corals cannot be cleared by jump', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  game.playerImmortalMs = 0;
  game.forceSpawn({ type: 'coral', obstacleTier: 'standard', jumpRule: 'none', x: 122, y: 366, width: 30, height: 30, speed: 0, lane: 5 });
  game.step(16, { left: false, right: false, jump: true });
  assert.equal(game.snapshot().airTanks, 2);
});

test('spawn branches include obstacle ids from brainstorming catalog', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2, 0.2, 0.2, 0.6, 0.2]), 10);
  game.step(540, { left: false, right: false });

  const first = game.snapshot().entities[0];
  assert.ok(first.obstacleId);
  assert.ok(first.obstacleId.includes('-'));
  assert.ok(['standard', 'rare', 'super-rare', 'mythic'].includes(first.obstacleTier));
});

test('input cooldown blocks repeated turns and ignores opposing keys', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  game.step(16, { left: true, right: false });
  const afterFirstMove = game.snapshot().playerX;

  game.step(16, { left: true, right: false });
  assert.equal(game.snapshot().playerX, afterFirstMove);

  game.step(200, { left: true, right: true });
  assert.equal(game.snapshot().playerX, afterFirstMove);
});

test('silt patch collision applies slow timer and longer turn cooldown', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  game.forceSpawn({ type: 'silt-patch', obstacleId: 'silt-patch', x: 122, y: 366, width: 24, height: 24, speed: 0, lane: 5, laneSwitchCooldownMs: 999 });

  game.step(16, { left: false, right: false });
  const afterHit = game.snapshot();
  assert.equal(afterHit.airTanks, 3);
  assert.ok(afterHit.activeEffects.siltSlowMs > 0);
  assert.ok(afterHit.entities.some((entity) => entity.type === 'silt-patch'));

  game.step(16, { left: true, right: false });
  const afterMove = game.snapshot().playerX;
  game.step(150, { left: true, right: false });
  assert.equal(game.snapshot().playerX, afterMove);
  game.step(140, { left: true, right: false });
  assert.notEqual(game.snapshot().playerX, afterMove);
});

test('current patch collision applies speed-boost timer and faster turn cadence', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  game.forceSpawn({ type: 'current-stream', obstacleId: 'current-stream', x: 122, y: 366, width: 24, height: 24, speed: 0, lane: 5, laneSwitchCooldownMs: 999 });

  game.step(16, { left: false, right: false });
  const afterHit = game.snapshot();
  assert.ok(afterHit.activeEffects.currentBoostMs > 0);
  assert.ok(afterHit.entities.some((entity) => entity.type === 'current-stream'));

  const startX = afterHit.playerX;
  game.step(16, { left: true, right: false });
  const afterFirstTurn = game.snapshot().playerX;
  assert.notEqual(afterFirstTurn, startX);

  game.step(90, { left: true, right: false });
  assert.notEqual(game.snapshot().playerX, afterFirstTurn);
});

test('jumping over silt and current patches does not apply surface effects', () => {
  const siltGame = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  siltGame.forceSpawn({ type: 'silt-patch', obstacleId: 'silt-patch', x: 122, y: 366, width: 24, height: 24, speed: 0, lane: 5 });
  siltGame.step(16, { left: false, right: false, jump: true });
  assert.equal(siltGame.snapshot().activeEffects.siltSlowMs, 0);

  const currentGame = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  currentGame.forceSpawn({ type: 'current-stream', obstacleId: 'current-stream', x: 122, y: 366, width: 24, height: 24, speed: 0, lane: 5 });
  currentGame.step(16, { left: false, right: false, jump: true });
  assert.equal(currentGame.snapshot().activeEffects.currentBoostMs, 0);
});

test('kelp beds slow like silt instead of removing air tanks', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  game.forceSpawn({ type: 'kelp-bed', obstacleId: 'kelp-bed', x: 122, y: 366, width: 24, height: 28, speed: 0, lane: 5 });

  game.step(16, { left: false, right: false });
  const afterHit = game.snapshot();
  assert.equal(afterHit.airTanks, 3);
  assert.ok(afterHit.activeEffects.siltSlowMs > 0);
  assert.ok(afterHit.entities.some((entity) => entity.type === 'kelp-bed'));
});

test('silt and current effects stack when hitting multiple patches', () => {
  const slowGame = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  slowGame.forceSpawn({ type: 'silt-patch', obstacleId: 'silt-patch', x: 122, y: 366, width: 24, height: 24, speed: 0, lane: 5 });
  slowGame.forceSpawn({ type: 'silt-patch', obstacleId: 'silt-patch', x: 122, y: 366, width: 24, height: 24, speed: 0, lane: 5 });
  slowGame.step(16, { left: false, right: false });
  assert.ok(slowGame.snapshot().activeEffects.siltSlowMs > 900);

  slowGame.step(16, { left: true, right: false });
  const slowFirstTurn = slowGame.snapshot().playerX;
  slowGame.step(320, { left: true, right: false });
  assert.equal(slowGame.snapshot().playerX, slowFirstTurn);
  slowGame.step(120, { left: true, right: false });
  assert.notEqual(slowGame.snapshot().playerX, slowFirstTurn);

  const fastGame = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  fastGame.forceSpawn({ type: 'current-stream', obstacleId: 'current-stream', x: 122, y: 366, width: 24, height: 24, speed: 0, lane: 5 });
  fastGame.forceSpawn({ type: 'current-stream', obstacleId: 'current-stream', x: 122, y: 366, width: 24, height: 24, speed: 0, lane: 5 });
  fastGame.step(16, { left: false, right: false });
  assert.ok(fastGame.snapshot().activeEffects.currentBoostMs > 1400);

  fastGame.step(16, { left: true, right: false });
  const fastFirstTurn = fastGame.snapshot().playerX;
  fastGame.step(50, { left: true, right: false });
  assert.notEqual(fastGame.snapshot().playerX, fastFirstTurn);
});

test('silt and current effects adjust overall world scrolling speed', () => {
  const base = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  const slow = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  const fast = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);

  slow.siltSlowMs = 900;
  fast.currentBoostMs = 1400;

  base.step(100, { left: false, right: false });
  slow.step(100, { left: false, right: false });
  fast.step(100, { left: false, right: false });

  const baseOffset = base.snapshot().sideObstacleOffsetY;
  const slowOffset = slow.snapshot().sideObstacleOffsetY;
  const fastOffset = fast.snapshot().sideObstacleOffsetY;

  assert.ok(slowOffset < baseOffset);
  assert.ok(fastOffset > baseOffset);
});

test('falling anchor telegraph is harmless then falling phase can deal damage', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  game.forceSpawn({
    type: 'falling-anchor',
    obstacleId: 'falling-anchor',
    behaviorState: { kind: 'anchorFall', phase: 'telegraph', phaseMs: 650 },
    x: 122,
    y: 366,
    width: 24,
    height: 24,
    speed: 0,
    lane: 5
  });

  game.step(16, { left: false, right: false });
  assert.equal(game.snapshot().airTanks, 3);
  assert.equal(game.snapshot().entities.find((entity) => entity.obstacleId === 'falling-anchor')?.behaviorState?.phase, 'telegraph');

  game.spawnClock = -100000;
  game.step(700, { left: false, right: false });
  assert.equal(game.snapshot().entities.find((entity) => entity.obstacleId === 'falling-anchor')?.behaviorState?.phase, 'falling');

  const runtimeAnchor = game.entities.find((entity) => entity.obstacleId === 'falling-anchor');
  assert.ok(runtimeAnchor);
  runtimeAnchor.y = 366;
  runtimeAnchor.speed = 0;
  runtimeAnchor.direction = 1;
  runtimeAnchor.lane = 5;

  game.playerImmortalMs = 0;
  game.step(16, { left: false, right: false });
  assert.equal(game.snapshot().airTanks, 2);
});

test('komodo boss throws venom clouds and level completes when boss exits', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  game.playerImmortalMs = 0;
  game.komodoBossActive = true;
  game.forceSpawn({
    type: 'komodo',
    obstacleId: 'komodo-boss',
    jumpRule: 'high',
    behaviorState: { kind: 'komodoBoss', phase: 'hovering', phaseMs: 2000, throwCooldownMs: 0 },
    x: 122,
    y: 60,
    width: 28,
    height: 34,
    speed: 0,
    lane: 5,
    laneSwitchCooldownMs: 0
  });

  game.step(16, { left: false, right: false });
  const venom = game.entities.filter((entity) => entity.type === 'venom-cloud');
  assert.ok(venom.length >= 1);
  for (const bag of venom) {
    bag.y = 366;
    bag.speed = 0;
    bag.lane = 5;
  }

  game.step(16, { left: false, right: false });
  assert.equal(game.snapshot().airTanks, 2);
  assert.ok(game.snapshot().effects.some((effect) => effect.kind === 'venom-splash'));

  game.step(700, { left: false, right: false });
  const boss = game.entities.find((entity) => entity.type === 'komodo' && entity.behaviorState?.kind === 'komodoBoss');
  assert.ok(boss);
  boss.behaviorState.phase = 'hovering';
  boss.y = 660;

  game.step(16, { left: false, right: false });
  const afterExit = game.snapshot();
  assert.equal(afterExit.isBossActive, false);
  assert.equal(afterExit.speedLevel, 2);
  assert.equal(afterExit.airTanks, 2);
  assert.ok(afterExit.levelUpBannerMs > 0);
});

test('komodo exit crossing cull boundary in same frame still levels up', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  game.komodoBossActive = true;
  game.forceSpawn({
    type: 'komodo',
    obstacleId: 'komodo-boss',
    jumpRule: 'high',
    behaviorState: { kind: 'komodoBoss', phase: 'exiting', phaseMs: 0, throwCooldownMs: 9999 },
    x: 122,
    y: 639,
    width: 28,
    height: 34,
    speed: 0,
    lane: 5,
    laneSwitchCooldownMs: 0
  });

  game.step(16, { left: false, right: false });
  const snap = game.snapshot();
  assert.equal(snap.isBossActive, false);
  assert.equal(snap.speedLevel, 2);
  assert.equal(snap.airTanks, 3);
});

test('level one standard spawns bias toward spaniels and higher levels spawn more entities', () => {
  const levelOne = new SwimSpanielGame(300, 600, rngFrom([0.2, 0.2, 0.2, 0.2]), 10);
  levelOne.step(540, { left: false, right: false });
  const firstSpawn = levelOne.snapshot().entities[0];
  assert.equal(firstSpawn.type, 'spaniel');

  const lowLevel = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  const highLevel = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  highLevel.speedLevel = 8;

  for (let i = 0; i < 20; i += 1) {
    lowLevel.step(120, { left: false, right: false });
    highLevel.step(120, { left: false, right: false });
  }

  assert.ok(highLevel.nextEntityId > lowLevel.nextEntityId);
});

test('manta current pushes the player lane on its pulse interval', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.2]), 10);
  game.forceSpawn({
    type: 'manta-current',
    obstacleId: 'manta-current',
    behaviorState: { kind: 'mantaCurrent', pushDirection: 1, pushCooldownMs: 0 },
    x: 122,
    y: 360,
    width: 24,
    height: 24,
    speed: 0,
    lane: 5,
    laneSwitchCooldownMs: 999
  });

  const startX = game.snapshot().playerX;
  game.step(16, { left: false, right: false });
  const firstPushX = game.snapshot().playerX;
  assert.ok(firstPushX > startX);

  game.step(100, { left: false, right: false });
  assert.equal(game.snapshot().playerX, firstPushX);

  game.step(100, { left: false, right: false });
  assert.ok(game.snapshot().playerX > firstPushX);
});

test('moving entity lane logic covers komodo pursuit, bounds, and blocked lane fallback', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0.9, 0.9, 0.9, 0.9, 0.9]), 10);

  game.forceSpawn({ type: 'komodo', x: 122, y: 200, width: 20, height: 20, speed: 0, lane: 8, direction: -1, laneSwitchCooldownMs: 0 });
  game.step(200, { left: true, right: false }); // player moves to lane 4, komodo pursues by one lane step
  const komodo = game.snapshot().entities.find((entity) => entity.type === 'komodo');
  assert.ok(komodo);
  assert.equal(komodo.lane, 7);

  game.forceSpawn({ type: 'shark', x: 122, y: 230, width: 20, height: 20, speed: 0, lane: 5, laneSwitchCooldownMs: 0 });
  game.forceSpawn({ type: 'coral', x: 122, y: 231, width: 20, height: 20, speed: 0, lane: 6 });
  game.forceSpawn({ type: 'reef-rock', x: 122, y: 230, width: 20, height: 20, speed: 0, lane: 3 });
  game.step(200, { left: false, right: false });
  const shark = game.snapshot().entities.find((entity) => entity.type === 'shark');
  assert.ok(shark);
  assert.equal(shark.lane, 5);
});



test('jumping clears jump-rule obstacles and rare/super-rare cadence spawns expected tiers', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0, 0, 0.2, 0.2, 0.2]), 10);
  game.forceSpawn({ type: 'reef-rock', obstacleTier: 'super-rare', jumpRule: 'high', x: 122, y: 366, width: 30, height: 30, speed: 0, lane: 5 });

  game.step(16, { left: false, right: false, jump: true });
  assert.equal(game.snapshot().airTanks, 3);

  game.step(700, { left: false, right: false, jump: false });
  game.playerImmortalMs = 0;
  game.forceSpawn({ type: 'reef-rock', obstacleTier: 'super-rare', jumpRule: 'high', x: 122, y: 366, width: 30, height: 30, speed: 0, lane: 5 });
  game.step(16, { left: false, right: false, jump: false });
  assert.equal(game.snapshot().airTanks, 2);

  const rareGame = new SwimSpanielGame(300, 600, rngFrom([0.1, 0.1, 0.2, 0.2, 0.2]), 10);
  rareGame.nextRareSpawnMs = 450;
  rareGame.step(540, { left: false, right: false });
  assert.ok(rareGame.snapshot().entities.some((entity) => entity.obstacleTier === 'rare'));

  const superRareGame = new SwimSpanielGame(300, 600, rngFrom([0.1, 0.1, 0.2, 0.2, 0.8]), 10);
  superRareGame.nextSuperRareSpawnMs = 450;
  superRareGame.step(540, { left: false, right: false });
  assert.ok(superRareGame.snapshot().entities.some((entity) => entity.obstacleTier === 'super-rare'));
});

test('tiered spawns hit standard/rare/super-rare/mythic cadence branches', () => {
  const standardGame = new SwimSpanielGame(300, 600, rngFrom([0.1, 0.2, 0.05, 0.2, 0.2]), 10);
  standardGame.step(540, { left: false, right: false });
  assert.ok(standardGame.snapshot().entities.some((entity) => entity.obstacleTier === 'standard'));

  const rareGame = new SwimSpanielGame(300, 600, rngFrom([0.1, 0.1, 0.2, 0.2, 0.2]), 10);
  rareGame.nextRareSpawnMs = 450;
  rareGame.step(540, { left: false, right: false });
  assert.ok(rareGame.snapshot().entities.some((entity) => entity.obstacleTier === 'rare'));

  const superGame = new SwimSpanielGame(300, 600, rngFrom([0.1, 0.1, 0.2, 0.2, 0.2]), 10);
  superGame.nextSuperRareSpawnMs = 450;
  superGame.step(540, { left: false, right: false });
  assert.ok(superGame.snapshot().entities.some((entity) => entity.obstacleTier === 'super-rare'));

  const mythicGame = new SwimSpanielGame(300, 600, rngFrom([0.1, 0.1, 0.2, 0.2, 0.2, 0.2]), 10);
  for (let i = 0; i < 25; i += 1) {
    mythicGame.forceSpawn({ type: 'spaniel', x: 122, y: 366, width: 16, height: 16, speed: 0, lane: 5, laneSwitchCooldownMs: 999 });
    mythicGame.step(16, { left: false, right: false });
  }
  mythicGame.forceSpawn({ type: 'komodo', x: 122, y: 20, width: 16, height: 16, speed: 0, lane: 5, laneSwitchCooldownMs: 999 });
  mythicGame.nextMythicSpawnMs = 450;
  mythicGame.step(540, { left: false, right: false });
  assert.ok(mythicGame.snapshot().entities.some((entity) => entity.obstacleTier === 'mythic'));
});


test('spawn lane fallback can choose right lane and lane blocking check can reject move', () => {
  const spawnRightGame = new SwimSpanielGame(300, 600, rngFrom([0.1, 0.1, 0.2, 0.2]), 10);
  spawnRightGame.speedLevel = 2;
  spawnRightGame.forceSpawn({ type: 'coral', x: 60, y: 0, width: 10, height: 10, speed: 2.2, lane: 2 });
  spawnRightGame.forceSpawn({ type: 'reef-rock', x: 90, y: 0, width: 10, height: 10, speed: 2.2, lane: 3 });
  assert.equal(spawnRightGame.pickSpawnLane(), 4);

  const laneBlockGame = new SwimSpanielGame(300, 600, rngFrom([0.1, 0.1, 0.9, 0.6]), 10);
  laneBlockGame.forceSpawn({ type: 'spaniel', x: 122, y: 220, width: 20, height: 20, speed: 0, lane: 5, laneSwitchCooldownMs: 0 });
  laneBlockGame.forceSpawn({ type: 'coral', x: 122, y: 221, width: 20, height: 20, speed: 0, lane: 6 });
  laneBlockGame.step(200, { left: false, right: false });
  const mover = laneBlockGame.snapshot().entities.find((entity) => entity.type === 'spaniel');
  assert.equal(mover.lane, 5);
});


test('lane switching and spawn lane fallback exercise left-priority and blocked-lane checks', () => {
  const leftSpawnGame = new SwimSpanielGame(300, 600, rngFrom([0.1, 0.1, 0.3, 0.2]), 10);
  leftSpawnGame.forceSpawn({ type: 'coral', x: 100, y: 0, width: 10, height: 10, speed: 2.2, lane: 3 });
  leftSpawnGame.step(540, { left: false, right: false });
  assert.equal(leftSpawnGame.snapshot().entities.at(-1).lane, 2);

  const blockedLaneGame = new SwimSpanielGame(300, 600, rngFrom([0.1, 0.1, 0.1, 0.1]), 10);
  blockedLaneGame.forceSpawn({ type: 'shark', x: 122, y: 230, width: 20, height: 20, speed: 0, lane: 5, laneSwitchCooldownMs: 0 });
  blockedLaneGame.forceSpawn({ type: 'coral', x: 122, y: 231, width: 20, height: 20, speed: 0, lane: 4 });
  blockedLaneGame.step(200, { left: false, right: false });
  const shark = blockedLaneGame.snapshot().entities.find((entity) => entity.type === 'shark');
  assert.equal(shark.lane, 5);
});
test('spawn lane can return preferred when all lanes are blocked', () => {
  const game = new SwimSpanielGame(300, 600, rngFrom([0, 0.2]), 3);
  game.forceSpawn({ type: 'coral', x: 10, y: 0, width: 10, height: 10, speed: 0, lane: 1 });
  game.step(540, { left: false, right: false });
  const spawned = game.snapshot().entities.at(-1);
  assert.equal(spawned.lane, 1);
});

test('renderer no longer draws text obstacle labels for obstacle ids', () => {
  const calls = [];
  const ctx = {
    fillStyle: '#000',
    font: '16px monospace',
    fillRect: (...args) => calls.push(['fillRect', ...args]),
    fillText: (...args) => calls.push(['fillText', ...args])
  };
  const renderer = new PixelRenderer(ctx, 360, 640);
  renderer.render({
    airTanks: 3,
    score: 0,
    speedLevel: 1,
    spanielsRescued: 0,
    isGameOver: false,
    playerX: 120,
    playerY: 366,
    playerJumpOffset: 0,
    isCrashActive: false,
    sideObstacleOffsetY: 0,
    entities: [
      { type: 'coral', obstacleId: 'staghorn-coral', x: 122, y: 140, width: 20, height: 20, speed: 0 }
    ],
    effects: []
  });

  assert.equal(calls.some((entry) => entry[0] === 'fillText' && String(entry[1]).includes('CRACKED SID')), false);
});

test('jumping player renders in front of obstacles', () => {
  const calls = [];
  const ctx = {
    fillStyle: '#000',
    font: '16px monospace',
    fillRect: (...args) => calls.push(args),
    fillText: () => {}
  };
  const renderer = new PixelRenderer(ctx, 360, 640);
  renderer.render({
    airTanks: 3,
    score: 0,
    speedLevel: 1,
    spanielsRescued: 0,
    isGameOver: false,
    playerX: 100,
    playerY: 300,
    playerJumpOffset: 12,
    isCrashActive: false,
    sideObstacleOffsetY: 0,
    entities: [
      { type: 'coral', x: 10, y: 10, width: 20, height: 20, speed: 0 }
    ],
    effects: []
  });

  const coralBodyIndex = calls.findIndex((entry) => entry[0] === 19 && entry[1] === 20 && entry[2] === 4 && entry[3] === 20);
  const playerBodyIndex = calls.findIndex((entry) => entry[0] === 109 && entry[1] === 300 && entry[2] === 9 && entry[3] === 9);

  assert.ok(coralBodyIndex >= 0);
  assert.ok(playerBodyIndex >= 0);
  assert.ok(playerBodyIndex > coralBodyIndex);
});

test('grounded player renders in front of obstacles', () => {
  const calls = [];
  const ctx = {
    fillStyle: '#000',
    font: '16px monospace',
    fillRect: (...args) => calls.push(args),
    fillText: () => {}
  };
  const renderer = new PixelRenderer(ctx, 360, 640);
  renderer.render({
    airTanks: 3,
    score: 0,
    speedLevel: 1,
    spanielsRescued: 0,
    isGameOver: false,
    playerX: 100,
    playerY: 300,
    playerJumpOffset: 0,
    isCrashActive: false,
    sideObstacleOffsetY: 0,
    entities: [
      { type: 'coral', x: 10, y: 10, width: 20, height: 20, speed: 0 }
    ],
    effects: []
  });

  const coralBodyIndex = calls.findIndex((entry) => entry[0] === 19 && entry[1] === 20 && entry[2] === 4 && entry[3] === 20);
  const playerBodyIndex = calls.findIndex((entry) => entry[0] === 109 && entry[1] === 312 && entry[2] === 9 && entry[3] === 9);

  assert.ok(coralBodyIndex >= 0);
  assert.ok(playerBodyIndex >= 0);
  assert.ok(playerBodyIndex > coralBodyIndex);
});

test('side edge coral and rock decorations never overlap', () => {
  const ctx = {
    fillStyle: '#000',
    font: '16px monospace',
    fillRect: () => {},
    fillText: () => {}
  };
  const renderer = new PixelRenderer(ctx, 360, 640);
  const overlaps = (a, b) => a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;

  for (let offset = 0; offset < 2000; offset += 7) {
    const placements = renderer.computeReefEdgeDecorations(offset);
    for (let i = 0; i < placements.length; i += 1) {
      for (let j = i + 1; j < placements.length; j += 1) {
        assert.equal(
          overlaps(placements[i].bounds, placements[j].bounds),
          false,
          `overlap at offset ${offset}`
        );
      }
    }
  }
});

test('branding and PWA URLs are scoped to the Swim Spaniel deployment', () => {
  const readProjectFile = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
  const index = readProjectFile('index.html');
  const manifest = JSON.parse(readProjectFile('site.webmanifest'));
  const worker = readProjectFile('sw.js');
  const main = readProjectFile('dist/main.js');

  assert.match(index, /Swim, Spaniel!/);
  assert.doesNotMatch(index, /Spaniel Smash|ski slopes|Evil Andy/);
  assert.equal(manifest.name, 'Swim, Spaniel!');
  assert.equal(manifest.start_url, './');
  assert.equal(manifest.scope, './');
  assert.match(worker, /swim-spaniel-v/);
  assert.doesNotMatch(worker, /spaniel-smash-v/);
  assert.match(main, /v2\.0\.1/);
});
