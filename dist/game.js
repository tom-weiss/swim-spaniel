const STANDARD_OBSTACLES = [
    { type: "spaniel", obstacleId: "floating-life-ring", jumpRule: "low", widthScale: 0.45, height: 18, speed: 1.7, moving: true, minLevel: 1, weight: 1.4 },
    { type: "spaniel", obstacleId: "drifting-rescue-rope", jumpRule: "none", widthScale: 0.5, height: 22, speed: 1.8, moving: true, minLevel: 1, weight: 1.35 },
    { type: "kelp-bed", obstacleId: "kelp-bed", jumpRule: "low", widthScale: 0.48, height: 28, speed: 2.2, moving: false, minLevel: 1, weight: 1.8 },
    { type: "coral", obstacleId: "staghorn-coral", jumpRule: "low", widthScale: 0.5, height: 24, speed: 2.2, moving: false, minLevel: 1, weight: 0.9 },
    { type: "reef-rock", obstacleId: "volcanic-rock-cluster", jumpRule: "low", widthScale: 0.55, height: 22, speed: 2.2, moving: false, minLevel: 1, weight: 0.85 },
    { type: "coral", obstacleId: "fire-coral-pair", jumpRule: "low", widthScale: 0.52, height: 24, speed: 2.2, moving: false, minLevel: 1, weight: 0.75 },
    { type: "current-stream", obstacleId: "current-stream", jumpRule: "none", widthScale: 0.58, height: 20, speed: 2.2, moving: false, minLevel: 2, weight: 0.8 },
    { type: "shark", obstacleId: "reef-shark", jumpRule: "low", widthScale: 0.56, height: 28, speed: 1.6, moving: true, minLevel: 2, weight: 0.7 },
    { type: "coral", obstacleId: "coral-pinnacle", jumpRule: "high", widthScale: 0.58, height: 32, speed: 2.2, moving: false, minLevel: 3, weight: 0.6 },
    { type: "shark", obstacleId: "barracuda-crossing", jumpRule: "none", widthScale: 0.56, height: 30, speed: 1.4, moving: true, minLevel: 3, weight: 0.55 }
];
const RARE_OBSTACLES = [
    { type: "coral", obstacleId: "coral-wall", jumpRule: "high", widthScale: 0.62, height: 36, speed: 2.3, moving: false, minLevel: 1, weight: 0.95 },
    { type: "reef-rock", obstacleId: "blue-hole", jumpRule: "high", widthScale: 0.6, height: 28, speed: 2.3, moving: false, minLevel: 1, weight: 0.9 },
    { type: "spaniel", obstacleId: "tangled-spaniel", jumpRule: "none", widthScale: 0.52, height: 22, speed: 1.7, moving: true, minLevel: 2, weight: 0.8 },
    { type: "black-spaniel", obstacleId: "black-spaniel", jumpRule: "none", widthScale: 0.52, height: 22, speed: 1.75, moving: true, minLevel: 2, weight: 0.36 },
    { type: "fish-school-leader", obstacleId: "fish-school", jumpRule: "low", widthScale: 0.56, height: 30, speed: 1.5, moving: true, minLevel: 3, weight: 0.42 },
    { type: "reef-trench", obstacleId: "reef-trench", jumpRule: "high", widthScale: 1.55, height: 24, speed: 2.25, moving: false, minLevel: 2, weight: 0.42 },
    { type: "silt-patch", obstacleId: "silt-patch", jumpRule: "none", widthScale: 0.52, height: 20, speed: 2.2, moving: false, minLevel: 2, weight: 0.72 },
    { type: "reef-rock", obstacleId: "shell-bed", jumpRule: "low", widthScale: 0.58, height: 22, speed: 2.3, moving: false, minLevel: 2, weight: 0.78 },
    { type: "shark", obstacleId: "hammerhead-shark", jumpRule: "high", widthScale: 0.62, height: 30, speed: 1.5, moving: true, minLevel: 3, weight: 0.64 },
    { type: "falling-anchor", obstacleId: "falling-anchor", jumpRule: "low", widthScale: 0.54, height: 24, speed: 2.1, moving: false, minLevel: 3, weight: 0.5 },
    { type: "shark", obstacleId: "tiger-shark", jumpRule: "none", widthScale: 0.58, height: 32, speed: 2.0, moving: true, minLevel: 3, weight: 0.54 }
];
const SUPER_RARE_OBSTACLES = [
    { type: "coral", obstacleId: "giant-table-coral", jumpRule: "high", widthScale: 0.75, height: 40, speed: 2.5, moving: false, minLevel: 2, weight: 0.9 },
    { type: "reef-rock", obstacleId: "lava-trench", jumpRule: "high", widthScale: 0.76, height: 40, speed: 2.45, moving: false, minLevel: 2, weight: 0.82 },
    { type: "coral", obstacleId: "reef-gate", jumpRule: "none", widthScale: 0.8, height: 38, speed: 2.3, moving: false, minLevel: 3, weight: 0.7 },
    { type: "reef-rock", obstacleId: "ancient-anchor-field", jumpRule: "high", widthScale: 0.72, height: 34, speed: 2.4, moving: false, minLevel: 3, weight: 0.66 },
    { type: "manta-current", obstacleId: "manta-current", jumpRule: "none", widthScale: 0.66, height: 32, speed: 1.8, moving: true, minLevel: 3, weight: 0.58 },
    { type: "jellyfish", obstacleId: "jellyfish", jumpRule: "low", widthScale: 0.58, height: 30, speed: 1.95, moving: true, minLevel: 4, weight: 0.16 }
];
const MYTHIC_OBSTACLES = [
    { type: "shark", obstacleId: "ghost-shark", jumpRule: "none", widthScale: 0.66, height: 32, speed: 1.7, moving: true },
    { type: "spaniel", obstacleId: "golden-harness-spaniel", jumpRule: "low", widthScale: 0.6, height: 20, speed: 1.6, moving: true },
    { type: "coral", obstacleId: "shipwreck-mast", jumpRule: "high", widthScale: 0.7, height: 36, speed: 2.4, moving: false },
    { type: "reef-rock", obstacleId: "volcanic-vent", jumpRule: "high", widthScale: 0.66, height: 30, speed: 2.4, moving: false }
];
export class SwimSpanielGame {
    width;
    height;
    laneCount;
    laneWidth;
    playerLane;
    airTanks = 3;
    score = 0;
    speedLevel = 1;
    spanielsRescued = 0;
    levelSpanielsRescued = 0;
    gameOver = false;
    komodoBossActive = false;
    victory = false;
    entities = [];
    effects = [];
    rng;
    spawnClock = 0;
    rareSpawnClock = 0;
    superRareSpawnClock = 0;
    mythicSpawnClock = 0;
    nextRareSpawnMs = 12000;
    nextSuperRareSpawnMs = 180000;
    nextMythicSpawnMs = 45000;
    laneSwitchCooldownMs = 0;
    jumpCooldownMs = 0;
    jumpTimerMs = 0;
    crashFreezeMs = 0;
    sideObstacleOffsetY = 0;
    mythicUnlocked = false;
    siltSlowMs = 0;
    currentBoostMs = 0;
    playerImmortalMs = 0;
    levelUpBannerMs = 0;
    levelTransitionBoostMs = 0;
    nextBossRescueGoal = 12;
    nextEntityId = 1;
    touchingSurfaceEntityIds = new Set();
    static staticObstacleSpeed = 2.2;
    static movingEntityBaseSpeed = 1.2;
    static jumpDurationMs = 520;
    static siltSlowDurationMs = 900;
    static currentStreamBoostDurationMs = 1400;
    static anchorTelegraphDurationMs = 650;
    static mantaCurrentPushIntervalMs = 180;
    static komodoBossEnterY = 58;
    static komodoBossHoverDurationMs = 20000;
    static komodoBossEnterSpeed = 2.05;
    static komodoBossExitSpeed = 1.95;
    static komodoBossLaneMoveMs = 240;
    static komodoBossThrowMinMs = 820;
    static komodoBossThrowMaxMs = 1500;
    static komodoBossThrowMinFloorMs = 260;
    static komodoBossThrowRangeFloorMs = 180;
    static komodoThrowLevelReductionMs = 60;
    static komodoBossBonusScore = 1800;
    static entityCullMarginPx = 40;
    static levelStartImmortalMs = 2600;
    static respawnImmortalMs = 2200;
    static levelUpBannerDurationMs = 1800;
    static levelTransitionBoostDurationMs = 3800;
    static levelTransitionSpawnIntervalMs = 230;
    static levelTransitionSpawnFloorMs = 150;
    static levelOneBaseSpawnIntervalMs = 540;
    static spawnIntervalLevelStepMs = 50;
    static minSpawnIntervalMs = 160;
    static levelOneStandardSpanielChance = 0.56;
    static levelSpeedStepMultiplier = 0.2;
    static levelTransitionScrollMultiplier = 1.2;
    // Speed/spawn tuning caps at level 6; campaign progression continues to victoryLevel.
    static maxSpeedLevel = 6;
    static venomCloudSpeed = 2.8;
    static venomCloudWidthScale = 0.34;
    static venomCloudHeight = 16;
    static maxSiltStackMs = 5400;
    static maxCurrentStackMs = 5600;
    static maxEffectStacks = 4;
    static defaultLaneSwitchCooldownMs = 140;
    static defaultJumpCooldownMs = 560;
    static siltLaneSwitchCooldownMs = 280;
    static siltJumpCooldownMs = 920;
    static currentLaneSwitchCooldownMs = 80;
    static currentJumpCooldownMs = 360;
    static siltScrollSpeedMultiplier = 0.72;
    static currentScrollSpeedMultiplier = 1.35;
    static fishSchoolObstacleId = "fish-school";
    static fishSchoolMinChildren = 3;
    static fishSchoolBaseChildren = 3;
    static fishSchoolMaxChildren = 16;
    static fishSchoolLeaderWidthScale = 0.56;
    static fishSchoolFollowerWidthScale = 0.5;
    static fishSchoolLeaderHeight = 30;
    static fishSchoolFollowerHeight = 28;
    static fishSchoolSegmentSpacingPx = 16;
    static fishSchoolWavePeriodMs = 1080;
    static fishSchoolWaveOffsetMs = 170;
    static fishSchoolSpeedVariance = 0.16;
    static victoryLevel = 10;
    constructor(width, height, rng = Math.random, laneCount = 20) {
        this.width = width;
        this.height = height;
        this.laneCount = laneCount;
        this.laneWidth = width / laneCount;
        this.rng = rng;
        this.playerLane = this.startingLane();
        this.nextRareSpawnMs = this.rollRareSpawnMs();
        this.nextSuperRareSpawnMs = this.rollSuperRareSpawnMs();
        this.nextMythicSpawnMs = this.rollMythicSpawnMs();
        this.playerImmortalMs = 0;
    }
    step(deltaMs, input) {
        if (this.gameOver) {
            return;
        }
        this.tickEffects(deltaMs);
        this.tickRuntimeTimers(deltaMs);
        if (this.crashFreezeMs > 0) {
            this.crashFreezeMs = Math.max(0, this.crashFreezeMs - deltaMs);
            if (this.crashFreezeMs > 0) {
                return;
            }
        }
        this.handleInput(input, deltaMs);
        this.spawnClock += deltaMs;
        const spawnIntervalMs = this.currentSpawnIntervalMs();
        while (this.spawnClock >= spawnIntervalMs) {
            this.spawnClock -= spawnIntervalMs;
            this.spawnEntity();
        }
        const speedMultiplier = this.currentLevelSpeedMultiplier() * this.currentScrollSpeedMultiplier();
        this.sideObstacleOffsetY += SwimSpanielGame.staticObstacleSpeed * speedMultiplier * (deltaMs / 16.67);
        for (const entity of this.entities) {
            this.tickEntityBehaviorState(entity, deltaMs);
            this.maybeMoveEntityLane(entity, deltaMs);
            entity.y += entity.speed * (entity.direction ?? 1) * speedMultiplier * (deltaMs / 16.67);
            entity.x = this.laneX(this.entityLane(entity));
            entity.crashAnimationMs = Math.max(0, (entity.crashAnimationMs ?? 0) - deltaMs);
            this.maybeCompleteBossFromOffscreenExit(entity);
        }
        this.applyMantaCurrentPushes();
        this.resolveEntityCollisions();
        this.resolveCollisions();
        this.maybeStartBossEncounter();
        this.handleBossExitState();
        this.entities = this.entities.filter((entity) => entity.y < this.height + SwimSpanielGame.entityCullMarginPx && entity.y + entity.height > -SwimSpanielGame.entityCullMarginPx);
    }
    handleInput(input, deltaMs) {
        this.laneSwitchCooldownMs = Math.max(0, this.laneSwitchCooldownMs - deltaMs);
        this.jumpCooldownMs = Math.max(0, this.jumpCooldownMs - deltaMs);
        this.jumpTimerMs = Math.max(0, this.jumpTimerMs - deltaMs);
        const controls = this.currentControlProfile();
        if (input.jump && this.jumpCooldownMs === 0) {
            this.jumpTimerMs = SwimSpanielGame.jumpDurationMs;
            this.jumpCooldownMs = controls.jumpCooldownMs;
        }
        if (this.laneSwitchCooldownMs > 0) {
            return;
        }
        const laneSwitchCooldown = controls.laneSwitchCooldownMs;
        if (input.left && !input.right) {
            this.playerLane = Math.max(this.minPlayableLane(), this.playerLane - 1);
            this.laneSwitchCooldownMs = laneSwitchCooldown;
        }
        if (input.right && !input.left) {
            this.playerLane = Math.min(this.maxPlayableLane(), this.playerLane + 1);
            this.laneSwitchCooldownMs = laneSwitchCooldown;
        }
    }
    currentControlProfile() {
        const siltStacks = this.effectStacks(this.siltSlowMs, SwimSpanielGame.siltSlowDurationMs);
        const currentStacks = this.effectStacks(this.currentBoostMs, SwimSpanielGame.currentStreamBoostDurationMs);
        const laneCooldown = SwimSpanielGame.defaultLaneSwitchCooldownMs
            + siltStacks * (SwimSpanielGame.siltLaneSwitchCooldownMs - SwimSpanielGame.defaultLaneSwitchCooldownMs)
            - currentStacks * (SwimSpanielGame.defaultLaneSwitchCooldownMs - SwimSpanielGame.currentLaneSwitchCooldownMs);
        const jumpCooldown = SwimSpanielGame.defaultJumpCooldownMs
            + siltStacks * (SwimSpanielGame.siltJumpCooldownMs - SwimSpanielGame.defaultJumpCooldownMs)
            - currentStacks * (SwimSpanielGame.defaultJumpCooldownMs - SwimSpanielGame.currentJumpCooldownMs);
        return {
            laneSwitchCooldownMs: Math.max(40, Math.min(520, Math.round(laneCooldown))),
            jumpCooldownMs: Math.max(180, Math.min(1600, Math.round(jumpCooldown)))
        };
    }
    currentScrollSpeedMultiplier() {
        const siltStacks = this.effectStacks(this.siltSlowMs, SwimSpanielGame.siltSlowDurationMs);
        const currentStacks = this.effectStacks(this.currentBoostMs, SwimSpanielGame.currentStreamBoostDurationMs);
        const levelTransition = this.levelTransitionBoostMs > 0 ? SwimSpanielGame.levelTransitionScrollMultiplier : 1;
        const effectSpeed = Math.pow(SwimSpanielGame.siltScrollSpeedMultiplier, siltStacks)
            * Math.pow(SwimSpanielGame.currentScrollSpeedMultiplier, currentStacks);
        return Math.max(0.35, Math.min(2.5, levelTransition * effectSpeed));
    }
    currentLevelSpeedMultiplier() {
        const effectiveLevel = Math.min(this.speedLevel, SwimSpanielGame.maxSpeedLevel);
        return 1 + (effectiveLevel - 1) * SwimSpanielGame.levelSpeedStepMultiplier;
    }
    currentSpawnIntervalMs() {
        const effectiveLevel = Math.min(this.speedLevel, SwimSpanielGame.maxSpeedLevel);
        const baselineSpawnInterval = Math.max(SwimSpanielGame.minSpawnIntervalMs, SwimSpanielGame.levelOneBaseSpawnIntervalMs - (effectiveLevel - 1) * SwimSpanielGame.spawnIntervalLevelStepMs);
        if (this.levelTransitionBoostMs > 0) {
            return Math.max(SwimSpanielGame.levelTransitionSpawnFloorMs, Math.min(SwimSpanielGame.levelTransitionSpawnIntervalMs, baselineSpawnInterval - 80));
        }
        return baselineSpawnInterval;
    }
    effectStacks(ms, durationMs) {
        if (ms <= 0) {
            return 0;
        }
        return Math.min(SwimSpanielGame.maxEffectStacks, Math.ceil(ms / durationMs));
    }
    spawnEntity() {
        const spawnLane = this.pickSpawnLane();
        const spawnX = this.laneX(spawnLane);
        const movingDirection = this.rng() < 0.5 ? 1 : -1;
        const movingSpawnY = movingDirection === 1 ? -26 : this.height + 26;
        const cadenceTickMs = this.currentSpawnIntervalMs();
        this.rareSpawnClock += cadenceTickMs;
        this.superRareSpawnClock += cadenceTickMs;
        this.mythicSpawnClock += cadenceTickMs;
        if (this.mythicUnlocked && this.mythicSpawnClock >= this.nextMythicSpawnMs) {
            this.mythicSpawnClock = 0;
            this.nextMythicSpawnMs = this.rollMythicSpawnMs();
            this.spawnTieredObstacle("mythic", spawnLane, spawnX, movingDirection, movingSpawnY);
            return;
        }
        if (this.superRareSpawnClock >= this.nextSuperRareSpawnMs) {
            this.superRareSpawnClock = 0;
            this.nextSuperRareSpawnMs = this.rollSuperRareSpawnMs();
            this.spawnTieredObstacle("super-rare", spawnLane, spawnX, movingDirection, movingSpawnY);
            return;
        }
        if (this.rareSpawnClock >= this.nextRareSpawnMs) {
            this.rareSpawnClock = 0;
            this.nextRareSpawnMs = this.rollRareSpawnMs();
            this.spawnTieredObstacle("rare", spawnLane, spawnX, movingDirection, movingSpawnY);
            return;
        }
        this.spawnTieredObstacle("standard", spawnLane, spawnX, movingDirection, movingSpawnY);
        const extraSpawnRoll = this.rng();
        if (this.speedLevel >= 4 && extraSpawnRoll < Math.min(0.55, (this.speedLevel - 3) * 0.08)) {
            const bonusLane = this.pickSpawnLane();
            const bonusDirection = this.rng() < 0.5 ? 1 : -1;
            const bonusY = bonusDirection === 1 ? -26 : this.height + 26;
            this.spawnTieredObstacle(this.speedLevel >= 7 && this.rng() < 0.42 ? "rare" : "standard", bonusLane, this.laneX(bonusLane), bonusDirection, bonusY);
        }
    }
    spawnTieredObstacle(tier, spawnLane, spawnX, movingDirection, movingSpawnY) {
        const template = this.pickTemplateForTier(tier);
        if (template.type === "fish-school-leader") {
            this.spawnFishSchool(spawnLane, movingDirection, tier, this.fishSchoolFollowersForLevel());
            return;
        }
        this.entities.push(this.makeEntityFromTemplate(template, tier, spawnLane, spawnX, movingDirection, movingSpawnY));
    }
    templatesForTier(tier) {
        const templates = tier === "standard" ? STANDARD_OBSTACLES : tier === "rare" ? RARE_OBSTACLES : tier === "super-rare" ? SUPER_RARE_OBSTACLES : MYTHIC_OBSTACLES;
        return templates.filter((template) => {
            const minLevel = template.minLevel ?? 1;
            const maxLevel = template.maxLevel ?? Number.POSITIVE_INFINITY;
            return this.speedLevel >= minLevel && this.speedLevel <= maxLevel;
        });
    }
    pickWeightedTemplate(templates) {
        const totalWeight = templates.reduce((sum, template) => sum + Math.max(0.01, template.weight ?? 1), 0);
        let cursor = this.rng() * totalWeight;
        for (const template of templates) {
            cursor -= Math.max(0.01, template.weight ?? 1);
            if (cursor <= 0) {
                return template;
            }
        }
        return templates[templates.length - 1] ?? STANDARD_OBSTACLES[0];
    }
    pickTemplateForTier(tier) {
        let templates = this.templatesForTier(tier);
        if (templates.length === 0 && tier !== "standard") {
            templates = this.templatesForTier("standard");
        }
        if (templates.length === 0) {
            templates = STANDARD_OBSTACLES;
        }
        const roll = this.rng();
        if (tier === "standard" && this.speedLevel === 1) {
            const spanielTemplates = templates.filter((template) => template.type === "spaniel" || template.type === "black-spaniel");
            const nonSpanielTemplates = templates.filter((template) => template.type !== "spaniel" && template.type !== "black-spaniel");
            if (spanielTemplates.length > 0 && nonSpanielTemplates.length > 0) {
                if (roll < SwimSpanielGame.levelOneStandardSpanielChance) {
                    return this.pickWeightedTemplate(spanielTemplates);
                }
                return this.pickWeightedTemplate(nonSpanielTemplates);
            }
        }
        return this.pickWeightedTemplate(templates);
    }
    makeEntityFromTemplate(template, tier, spawnLane, spawnX, movingDirection, movingSpawnY) {
        const behaviorState = this.createBehaviorState(template.type, movingDirection);
        const isLanePatch = template.type === "silt-patch" || template.type === "current-stream";
        const isAnchorTelegraph = behaviorState?.kind === "anchorFall" && behaviorState.phase === "telegraph";
        const isMoving = template.moving && !isLanePatch && !isAnchorTelegraph;
        const speedVariance = isMoving ? this.rng() * 0.35 : 0;
        const staticSpawnY = template.type === "reef-trench" ? -30 : -24;
        return {
            id: this.nextEntityId++,
            type: template.type,
            obstacleId: template.obstacleId,
            obstacleTier: tier,
            jumpRule: template.jumpRule,
            behaviorState,
            x: spawnX,
            y: isAnchorTelegraph ? this.playerY() + 8 : isMoving ? movingSpawnY : staticSpawnY,
            width: this.laneWidth * template.widthScale,
            height: template.height,
            speed: isAnchorTelegraph ? 0 : template.speed + speedVariance,
            lane: spawnLane,
            laneSwitchCooldownMs: 0,
            direction: isMoving ? movingDirection : 1,
            crashAnimationMs: 0
        };
    }
    createBehaviorState(type, movingDirection) {
        if (type === "falling-anchor") {
            return { kind: "anchorFall", phase: "telegraph", phaseMs: SwimSpanielGame.anchorTelegraphDurationMs };
        }
        if (type === "manta-current") {
            return { kind: "mantaCurrent", pushDirection: movingDirection, pushCooldownMs: 0 };
        }
        return undefined;
    }
    fishSchoolFollowersForLevel(level = this.speedLevel) {
        const scaled = SwimSpanielGame.fishSchoolBaseChildren + Math.max(0, level - 3) * 2;
        return Math.max(SwimSpanielGame.fishSchoolMinChildren, Math.min(SwimSpanielGame.fishSchoolMaxChildren, scaled));
    }
    fishSchoolLaneSpanForLevel(level = this.speedLevel) {
        return level >= 7 ? 2 : 1;
    }
    clampFishSchoolAnchorLane(lane, laneSpan) {
        const minAnchor = this.minPlayableLane() + laneSpan;
        const maxAnchor = this.maxPlayableLane() - laneSpan;
        if (minAnchor > maxAnchor) {
            return Math.max(this.minPlayableLane(), Math.min(this.maxPlayableLane(), lane));
        }
        return Math.max(minAnchor, Math.min(maxAnchor, lane));
    }
    computeFishSchoolLane(anchorLane, laneSpan, phaseMs, wavePeriodMs) {
        const normalizedPhaseMs = ((phaseMs % wavePeriodMs) + wavePeriodMs) % wavePeriodMs;
        const theta = (normalizedPhaseMs / wavePeriodMs) * Math.PI * 2;
        const lane = Math.round(anchorLane + Math.sin(theta) * laneSpan);
        return Math.max(this.minPlayableLane(), Math.min(this.maxPlayableLane(), lane));
    }
    spawnFishSchool(spawnLane, movingDirection, tier, followerCount, spawnYOverride) {
        const laneSpan = this.fishSchoolLaneSpanForLevel();
        const anchorLane = this.clampFishSchoolAnchorLane(spawnLane, laneSpan);
        const followerTotal = Math.max(SwimSpanielGame.fishSchoolMinChildren, Math.min(SwimSpanielGame.fishSchoolMaxChildren, Math.floor(followerCount)));
        const baseY = typeof spawnYOverride === "number"
            ? spawnYOverride
            : movingDirection === 1 ? -30 : this.height + 30;
        const waveSeedMs = Math.floor(this.rng() * SwimSpanielGame.fishSchoolWavePeriodMs);
        const baseSpeed = 1.36 + this.rng() * SwimSpanielGame.fishSchoolSpeedVariance;
        const totalFish = followerTotal + 1;
        for (let fishIndex = 0; fishIndex < totalFish; fishIndex += 1) {
            const isLeader = fishIndex === 0;
            const phaseOffsetMs = fishIndex * SwimSpanielGame.fishSchoolWaveOffsetMs;
            const lane = this.computeFishSchoolLane(anchorLane, laneSpan, waveSeedMs + phaseOffsetMs, SwimSpanielGame.fishSchoolWavePeriodMs);
            const verticalOffset = fishIndex * SwimSpanielGame.fishSchoolSegmentSpacingPx;
            this.entities.push({
                id: this.nextEntityId++,
                type: isLeader ? "fish-school-leader" : "fish-school-follower",
                obstacleId: SwimSpanielGame.fishSchoolObstacleId,
                obstacleTier: tier,
                jumpRule: "low",
                behaviorState: {
                    kind: "fishSchool",
                    anchorLane,
                    laneSpan,
                    phaseMs: waveSeedMs,
                    phaseOffsetMs,
                    wavePeriodMs: SwimSpanielGame.fishSchoolWavePeriodMs,
                    paletteIndex: isLeader ? 0 : fishIndex - 1
                },
                x: this.laneX(lane),
                y: baseY + verticalOffset,
                width: this.laneWidth * (isLeader ? SwimSpanielGame.fishSchoolLeaderWidthScale : SwimSpanielGame.fishSchoolFollowerWidthScale),
                height: isLeader ? SwimSpanielGame.fishSchoolLeaderHeight : SwimSpanielGame.fishSchoolFollowerHeight,
                speed: baseSpeed,
                lane,
                laneSwitchCooldownMs: 0,
                direction: movingDirection,
                crashAnimationMs: 0
            });
        }
    }
    spawnKomodoBoss() {
        const spawnLane = this.minPlayableLane() + Math.floor(this.rng() * (this.maxPlayableLane() - this.minPlayableLane() + 1));
        this.entities.push({
            id: this.nextEntityId++,
            type: "komodo",
            obstacleId: "komodo-boss",
            obstacleTier: "super-rare",
            jumpRule: "high",
            behaviorState: {
                kind: "komodoBoss",
                phase: "entering",
                phaseMs: 0,
                throwCooldownMs: this.rollKomodoThrowCooldownMs()
            },
            x: this.laneX(spawnLane),
            y: -52,
            width: this.laneWidth * 0.8,
            height: 34,
            speed: SwimSpanielGame.movingEntityBaseSpeed,
            lane: spawnLane,
            laneSwitchCooldownMs: 0,
            direction: 1,
            crashAnimationMs: 0
        });
        this.komodoBossActive = true;
    }
    maybeStartBossEncounter() {
        if (this.komodoBossActive) {
            return;
        }
        if (this.levelSpanielsRescued < this.nextBossRescueGoal) {
            return;
        }
        this.spawnKomodoBoss();
    }
    handleBossExitState() {
        if (this.komodoBossActive) {
            return;
        }
        if (this.entities.some((entity) => entity.type === "venom-cloud" || (entity.type === "komodo" && entity.behaviorState?.kind === "komodoBoss"))) {
            this.entities = this.entities.filter((entity) => entity.type !== "venom-cloud" && !(entity.type === "komodo" && entity.behaviorState?.kind === "komodoBoss"));
        }
    }
    completeBossEncounter(defeated) {
        if (!this.komodoBossActive) {
            return;
        }
        this.komodoBossActive = false;
        if (defeated) {
            this.score += SwimSpanielGame.komodoBossBonusScore;
            this.airTanks += 2;
        }
        if (this.speedLevel >= SwimSpanielGame.victoryLevel) {
            this.victory = true;
            this.gameOver = true;
            this.levelUpBannerMs = 0;
            this.levelTransitionBoostMs = 0;
            return;
        }
        const canAdvanceLevel = this.speedLevel < SwimSpanielGame.victoryLevel;
        if (canAdvanceLevel) {
            this.speedLevel += 1;
        }
        this.crashFreezeMs = 0;
        this.levelSpanielsRescued = 0;
        this.nextBossRescueGoal = this.bossRescueGoalForLevel(this.speedLevel);
        this.levelUpBannerMs = canAdvanceLevel ? SwimSpanielGame.levelUpBannerDurationMs : 0;
        this.levelTransitionBoostMs = canAdvanceLevel ? SwimSpanielGame.levelTransitionBoostDurationMs : 0;
        this.playerImmortalMs = Math.max(this.playerImmortalMs, SwimSpanielGame.levelStartImmortalMs);
        this.spawnClock = Math.min(this.spawnClock, this.currentSpawnIntervalMs() - 1);
    }
    spawnKomodoVenomCloud(komodo) {
        const maxSpread = Math.max(0, Math.min(2, Math.floor((this.speedLevel - 3) / 3)));
        const lanes = new Set([this.playerLane]);
        while (lanes.size < 1 + maxSpread) {
            const delta = this.rng() < 0.5 ? -1 : 1;
            const lane = Math.max(this.minPlayableLane(), Math.min(this.maxPlayableLane(), this.playerLane + delta * Math.max(1, Math.floor(this.rng() * 3))));
            lanes.add(lane);
        }
        for (const lane of lanes) {
            this.entities.push({
                id: this.nextEntityId++,
                type: "venom-cloud",
                obstacleId: "komodo-venom-cloud",
                jumpRule: "none",
                x: this.laneX(lane),
                y: komodo.y + komodo.height - 2,
                width: this.laneWidth * SwimSpanielGame.venomCloudWidthScale,
                height: SwimSpanielGame.venomCloudHeight,
                speed: SwimSpanielGame.venomCloudSpeed,
                lane,
                laneSwitchCooldownMs: 0,
                direction: 1,
                crashAnimationMs: 0
            });
        }
    }
    rollRareSpawnMs() { return 10000 + Math.floor(this.rng() * 10001); }
    rollSuperRareSpawnMs() { return 60000 + Math.floor(this.rng() * 540001); }
    rollMythicSpawnMs() { return 30000 + Math.floor(this.rng() * 60001); }
    rollKomodoThrowCooldownMs() {
        const effectiveLevel = Math.min(this.speedLevel, SwimSpanielGame.maxSpeedLevel);
        const reductionMs = (effectiveLevel - 1) * SwimSpanielGame.komodoThrowLevelReductionMs;
        const minThrowMs = Math.max(SwimSpanielGame.komodoBossThrowMinFloorMs, SwimSpanielGame.komodoBossThrowMinMs - reductionMs);
        const maxThrowMs = Math.max(minThrowMs + SwimSpanielGame.komodoBossThrowRangeFloorMs, SwimSpanielGame.komodoBossThrowMaxMs - reductionMs);
        const span = maxThrowMs - minThrowMs;
        return minThrowMs + Math.floor(this.rng() * (span + 1));
    }
    bossRescueGoalForLevel(level) {
        const clampedLevel = Math.max(1, Math.min(SwimSpanielGame.maxSpeedLevel, Math.floor(level)));
        if (clampedLevel === 1) {
            return 12;
        }
        return Math.min(14, 10 + ((clampedLevel - 1) % 6));
    }
    maybeCompleteBossFromOffscreenExit(entity) {
        if (!this.komodoBossActive || entity.type !== "komodo" || entity.behaviorState?.kind !== "komodoBoss") {
            return;
        }
        if (entity.y > this.height + SwimSpanielGame.entityCullMarginPx || entity.y + entity.height < -SwimSpanielGame.entityCullMarginPx) {
            this.completeBossEncounter(false);
        }
    }
    tickRuntimeTimers(deltaMs) {
        this.siltSlowMs = Math.max(0, this.siltSlowMs - deltaMs);
        this.currentBoostMs = Math.max(0, this.currentBoostMs - deltaMs);
        if (this.crashFreezeMs === 0) {
            this.playerImmortalMs = Math.max(0, this.playerImmortalMs - deltaMs);
        }
        this.levelUpBannerMs = Math.max(0, this.levelUpBannerMs - deltaMs);
        this.levelTransitionBoostMs = Math.max(0, this.levelTransitionBoostMs - deltaMs);
    }
    tickEntityBehaviorState(entity, deltaMs) {
        const behavior = entity.behaviorState;
        if (!behavior) {
            return;
        }
        if (behavior.kind === "anchorFall" && behavior.phase === "telegraph") {
            behavior.phaseMs = Math.max(0, behavior.phaseMs - deltaMs);
            if (behavior.phaseMs === 0) {
                behavior.phase = "falling";
                entity.y = -24;
                entity.speed = Math.max(entity.speed, SwimSpanielGame.staticObstacleSpeed + 0.3);
                entity.direction = 1;
            }
            return;
        }
        if (behavior.kind === "mantaCurrent") {
            behavior.pushCooldownMs = Math.max(0, behavior.pushCooldownMs - deltaMs);
            return;
        }
        if (behavior.kind === "fishSchool") {
            behavior.phaseMs = (behavior.phaseMs + deltaMs) % behavior.wavePeriodMs;
            const lane = this.computeFishSchoolLane(behavior.anchorLane, behavior.laneSpan, behavior.phaseMs + behavior.phaseOffsetMs, behavior.wavePeriodMs);
            entity.lane = lane;
            return;
        }
        if (behavior.kind === "komodoBoss") {
            const travelUnit = deltaMs / 16.67;
            behavior.throwCooldownMs = Math.max(0, behavior.throwCooldownMs - deltaMs);
            if (behavior.phase === "entering") {
                entity.speed = 0;
                entity.y += SwimSpanielGame.komodoBossEnterSpeed * travelUnit;
                if (entity.y >= SwimSpanielGame.komodoBossEnterY) {
                    entity.y = SwimSpanielGame.komodoBossEnterY;
                    behavior.phase = "hovering";
                    behavior.phaseMs = SwimSpanielGame.komodoBossHoverDurationMs;
                    behavior.throwCooldownMs = this.rollKomodoThrowCooldownMs();
                }
                return;
            }
            if (behavior.phase === "hovering") {
                entity.speed = 0;
                behavior.phaseMs = Math.max(0, behavior.phaseMs - deltaMs);
                if (behavior.throwCooldownMs === 0) {
                    this.spawnKomodoVenomCloud(entity);
                    behavior.throwCooldownMs = this.rollKomodoThrowCooldownMs();
                }
                if (behavior.phaseMs === 0) {
                    behavior.phase = "exiting";
                    entity.speed = SwimSpanielGame.komodoBossExitSpeed;
                    entity.direction = 1;
                }
                return;
            }
            entity.speed = SwimSpanielGame.komodoBossExitSpeed;
            entity.direction = 1;
        }
    }
    applyMantaCurrentPushes() {
        const playerTop = this.playerY() - this.playerJumpOffset();
        const playerBottom = playerTop + 34;
        for (const entity of this.entities) {
            const behavior = entity.behaviorState;
            if (!behavior || behavior.kind !== "mantaCurrent") {
                continue;
            }
            if (behavior.pushCooldownMs > 0) {
                continue;
            }
            const overlapsBand = entity.y < playerBottom && entity.y + entity.height > playerTop;
            if (!overlapsBand) {
                continue;
            }
            const targetLane = this.playerLane + behavior.pushDirection;
            const clampedLane = Math.max(this.minPlayableLane(), Math.min(this.maxPlayableLane(), targetLane));
            if (clampedLane !== this.playerLane) {
                this.playerLane = clampedLane;
            }
            this.laneSwitchCooldownMs = Math.max(this.laneSwitchCooldownMs, 80);
            behavior.pushCooldownMs = SwimSpanielGame.mantaCurrentPushIntervalMs;
        }
    }
    canClearByJump(entity) {
        if (this.jumpTimerMs <= 0) {
            return false;
        }
        if (entity.type === "reef-rock") {
            return true;
        }
        return entity.jumpRule === "low" || entity.jumpRule === "high";
    }
    resolveCollisions() {
        const player = this.playerCollisionBounds();
        const survivors = [];
        const nextTouchingSurfaceEntityIds = new Set();
        for (const entity of this.entities) {
            if (entity.type === "rescue-bubbles") {
                survivors.push(entity);
                continue;
            }
            if (!intersects(player, this.entityCollisionBounds(entity))) {
                survivors.push(entity);
                continue;
            }
            if (entity.type === "silt-patch") {
                if (this.jumpTimerMs > 0) {
                    survivors.push(entity);
                    continue;
                }
                const id = entity.id ?? -1;
                if (id >= 0) {
                    nextTouchingSurfaceEntityIds.add(id);
                }
                if (id < 0 || !this.touchingSurfaceEntityIds.has(id)) {
                    this.siltSlowMs = Math.min(SwimSpanielGame.maxSiltStackMs, this.siltSlowMs + SwimSpanielGame.siltSlowDurationMs);
                }
                survivors.push(entity);
                continue;
            }
            if (entity.type === "current-stream") {
                if (this.jumpTimerMs > 0) {
                    survivors.push(entity);
                    continue;
                }
                const id = entity.id ?? -1;
                if (id >= 0) {
                    nextTouchingSurfaceEntityIds.add(id);
                }
                if (id < 0 || !this.touchingSurfaceEntityIds.has(id)) {
                    this.currentBoostMs = Math.min(SwimSpanielGame.maxCurrentStackMs, this.currentBoostMs + SwimSpanielGame.currentStreamBoostDurationMs);
                }
                survivors.push(entity);
                continue;
            }
            if (entity.type === "kelp-bed") {
                if (this.jumpTimerMs > 0) {
                    survivors.push(entity);
                    continue;
                }
                const id = entity.id ?? -1;
                if (id >= 0) {
                    nextTouchingSurfaceEntityIds.add(id);
                }
                if (id < 0 || !this.touchingSurfaceEntityIds.has(id)) {
                    this.siltSlowMs = Math.min(SwimSpanielGame.maxSiltStackMs, this.siltSlowMs + SwimSpanielGame.siltSlowDurationMs);
                }
                survivors.push(entity);
                continue;
            }
            if (entity.type === "falling-anchor" && entity.behaviorState?.kind === "anchorFall" && entity.behaviorState.phase === "telegraph") {
                survivors.push(entity);
                continue;
            }
            if (entity.type === "spaniel" || entity.type === "black-spaniel") {
                this.spawnRescueEffect(entity.x, entity.y, "spaniel-rescue");
                this.spawnRescueEffect(entity.x, entity.y, "rescue-pop");
                this.spawnRescueBubbles(entity);
                this.score += entity.type === "black-spaniel" ? 200 : 100;
                this.spanielsRescued += 1;
                this.levelSpanielsRescued += 1;
                this.mythicUnlocked = this.mythicUnlocked || this.spanielsRescued >= 25;
                continue;
            }
            if (entity.type === "komodo" && entity.behaviorState?.kind === "komodoBoss" && this.canClearByJump(entity)) {
                this.spawnRescueEffect(entity.x, entity.y, "spaniel-rescue");
                this.spawnRescueEffect(entity.x, entity.y, "rescue-pop");
                this.completeBossEncounter(true);
                continue;
            }
            if (entity.type === "venom-cloud") {
                this.spawnRescueEffect(entity.x, entity.y, "venom-splash");
                this.damagePlayer();
                continue;
            }
            if (this.canClearByJump(entity)) {
                survivors.push(entity);
                continue;
            }
            if (this.playerImmortalMs > 0) {
                survivors.push(entity);
                continue;
            }
            this.damagePlayer();
            if (entity.type === "komodo") {
                survivors.push(entity);
            }
        }
        this.touchingSurfaceEntityIds = nextTouchingSurfaceEntityIds;
        this.entities = survivors;
    }
    damagePlayer() {
        if (this.playerImmortalMs > 0) {
            return;
        }
        this.airTanks -= 1;
        this.crashFreezeMs = 650;
        if (this.airTanks <= 0) {
            this.gameOver = true;
            return;
        }
        this.playerImmortalMs = SwimSpanielGame.respawnImmortalMs;
    }
    playerCollisionBounds() {
        const x = this.playerX();
        const y = this.playerY() - this.playerJumpOffset();
        const width = this.laneWidth * 0.56;
        const height = 34;
        return {
            x: x + width * 0.08,
            y: y + 2,
            width: width * 0.84,
            height: height - 4
        };
    }
    entityCollisionBounds(entity) {
        const bounds = { x: entity.x, y: entity.y, width: entity.width, height: entity.height };
        if (entity.type === "reef-rock" || entity.type === "falling-anchor") {
            return {
                x: bounds.x + bounds.width * 0.12,
                y: bounds.y + bounds.height * 0.18,
                width: bounds.width * 0.76,
                height: bounds.height * 0.58
            };
        }
        if (entity.type === "venom-cloud") {
            return {
                x: bounds.x + bounds.width * 0.18,
                y: bounds.y + bounds.height * 0.18,
                width: bounds.width * 0.64,
                height: bounds.height * 0.64
            };
        }
        if (entity.type === "kelp-bed") {
            return {
                x: bounds.x + bounds.width * 0.28,
                y: bounds.y + bounds.height * 0.05,
                width: bounds.width * 0.44,
                height: bounds.height * 0.92
            };
        }
        if (entity.type === "reef-trench") {
            return {
                x: bounds.x + bounds.width * 0.05,
                y: bounds.y + bounds.height * 0.2,
                width: bounds.width * 0.9,
                height: bounds.height * 0.72
            };
        }
        if (entity.type === "coral") {
            return {
                x: bounds.x + bounds.width * 0.06,
                y: bounds.y + bounds.height * 0.1,
                width: bounds.width * 0.88,
                height: bounds.height * 0.86
            };
        }
        return bounds;
    }
    resolveEntityCollisions() {
        const indicesToTransform = new Set();
        for (let i = 0; i < this.entities.length; i += 1) {
            for (let j = i + 1; j < this.entities.length; j += 1) {
                const first = this.entities[i];
                const second = this.entities[j];
                if (first.type === "komodo" || second.type === "komodo" || first.type === "venom-cloud" || second.type === "venom-cloud") {
                    continue;
                }
                if (this.isSameFishSchoolGroup(first, second)) {
                    continue;
                }
                if (!intersects(first, second)) {
                    continue;
                }
                if (this.isMovingObstacle(first) && this.isLethalForMovingObstacleCollision(second)) {
                    indicesToTransform.add(i);
                }
                if (this.isMovingObstacle(second) && this.isLethalForMovingObstacleCollision(first)) {
                    indicesToTransform.add(j);
                }
            }
        }
        for (const index of indicesToTransform) {
            const entity = this.entities[index];
            this.spawnRescueEffect(entity.x, entity.y, (entity.type === "spaniel" || entity.type === "black-spaniel") ? "spaniel-rescue" : "creature-stunned");
            this.entities[index] = {
                ...entity,
                id: this.nextEntityId++,
                type: "rescue-bubbles",
                obstacleId: undefined,
                obstacleTier: undefined,
                jumpRule: undefined,
                behaviorState: undefined,
                y: entity.y + entity.height + 4,
                width: this.laneWidth * 0.55,
                height: 18,
                speed: SwimSpanielGame.staticObstacleSpeed,
                direction: 1,
                laneSwitchCooldownMs: 0,
                crashAnimationMs: 0
            };
        }
    }
    isMovingObstacle(entity) {
        return entity.type === "shark"
            || entity.type === "fish-school-leader"
            || entity.type === "fish-school-follower"
            || entity.type === "jellyfish"
            || entity.type === "spaniel"
            || entity.type === "black-spaniel"
            || entity.type === "manta-current";
    }
    isFishSchoolEntity(entity) {
        return entity.type === "fish-school-leader" || entity.type === "fish-school-follower";
    }
    isSameFishSchoolGroup(first, second) {
        if (!this.isFishSchoolEntity(first) || !this.isFishSchoolEntity(second)) {
            return false;
        }
        return first.obstacleId === SwimSpanielGame.fishSchoolObstacleId
            && second.obstacleId === SwimSpanielGame.fishSchoolObstacleId;
    }
    isLethalForMovingObstacleCollision(entity) {
        if (entity.type === "rescue-bubbles"
            || entity.type === "silt-patch"
            || entity.type === "kelp-bed"
            || entity.type === "current-stream"
            || entity.type === "spaniel"
            || entity.type === "black-spaniel") {
            return false;
        }
        if (entity.type === "falling-anchor" && entity.behaviorState?.kind === "anchorFall" && entity.behaviorState.phase === "telegraph") {
            return false;
        }
        return true;
    }
    spawnRescueEffect(x, y, kind) { this.effects.push({ kind, x, y, ttlMs: 300, maxTtlMs: 300 }); }
    spawnRescueBubbles(entity) {
        this.entities.push({ id: this.nextEntityId++, type: "rescue-bubbles", x: this.laneX(this.entityLane(entity)), y: entity.y + entity.height + 4, width: this.laneWidth * 0.55, height: 18, speed: SwimSpanielGame.staticObstacleSpeed, lane: this.entityLane(entity), laneSwitchCooldownMs: 0, direction: 1, crashAnimationMs: 0 });
    }
    tickEffects(deltaMs) {
        this.effects = this.effects.map((effect) => {
            const ttlMs = Math.max(0, effect.ttlMs - deltaMs);
            if (effect.kind !== "rescue-pop") {
                return { ...effect, ttlMs };
            }
            const travelUnit = deltaMs / 16.67;
            return { ...effect, ttlMs, x: effect.x + 3 * travelUnit, y: effect.y - 0.8 * travelUnit };
        }).filter((effect) => effect.ttlMs > 0);
    }
    forceSpawn(entity) {
        if (!entity.behaviorState) {
            entity.behaviorState = this.createBehaviorState(entity.type, entity.direction ?? 1);
        }
        entity.id ??= this.nextEntityId++;
        entity.lane = this.entityLane(entity);
        entity.x = this.laneX(entity.lane);
        entity.laneSwitchCooldownMs ??= 0;
        entity.direction ??= 1;
        entity.crashAnimationMs ??= 0;
        this.entities.push(entity);
    }
    spawnFishSchoolDebug(followerCount) {
        if (this.gameOver) {
            return;
        }
        const spawnLane = this.playerLane;
        const followerTotal = typeof followerCount === "number"
            ? Math.max(SwimSpanielGame.fishSchoolMinChildren, Math.min(SwimSpanielGame.fishSchoolMaxChildren, Math.floor(followerCount)))
            : this.fishSchoolFollowersForLevel();
        this.spawnFishSchool(spawnLane, 1, "rare", followerTotal, 92);
    }
    restart() {
        this.playerLane = this.startingLane();
        this.airTanks = 3;
        this.score = 0;
        this.speedLevel = 1;
        this.spanielsRescued = 0;
        this.levelSpanielsRescued = 0;
        this.gameOver = false;
        this.komodoBossActive = false;
        this.victory = false;
        this.entities = [];
        this.effects = [];
        this.spawnClock = 0;
        this.rareSpawnClock = 0;
        this.superRareSpawnClock = 0;
        this.mythicSpawnClock = 0;
        this.nextRareSpawnMs = this.rollRareSpawnMs();
        this.nextSuperRareSpawnMs = this.rollSuperRareSpawnMs();
        this.nextMythicSpawnMs = this.rollMythicSpawnMs();
        this.laneSwitchCooldownMs = 0;
        this.jumpCooldownMs = 0;
        this.jumpTimerMs = 0;
        this.crashFreezeMs = 0;
        this.sideObstacleOffsetY = 0;
        this.mythicUnlocked = false;
        this.siltSlowMs = 0;
        this.currentBoostMs = 0;
        this.playerImmortalMs = 0;
        this.levelUpBannerMs = 0;
        this.levelTransitionBoostMs = 0;
        this.nextBossRescueGoal = this.bossRescueGoalForLevel(this.speedLevel);
        this.nextEntityId = 1;
        this.touchingSurfaceEntityIds = new Set();
    }
    snapshot() {
        return {
            airTanks: this.airTanks,
            score: this.score,
            speedLevel: this.speedLevel,
            spanielsRescued: this.spanielsRescued,
            levelSpanielsRescued: this.levelSpanielsRescued,
            nextBossRescueGoal: this.nextBossRescueGoal,
            isGameOver: this.gameOver,
            playerX: this.playerX(),
            playerY: this.playerY(),
            playerJumpOffset: this.playerJumpOffset(),
            isPlayerImmortal: this.playerImmortalMs > 0,
            playerImmortalMs: this.playerImmortalMs,
            isCrashActive: this.crashFreezeMs > 0,
            isBossActive: this.komodoBossActive,
            isVictory: this.victory,
            levelUpBannerMs: this.levelUpBannerMs,
            sideObstacleOffsetY: this.sideObstacleOffsetY,
            activeEffects: {
                siltSlowMs: this.siltSlowMs,
                currentBoostMs: this.currentBoostMs
            },
            entities: this.entities.map((entity) => ({ ...entity, behaviorState: entity.behaviorState ? { ...entity.behaviorState } : undefined })),
            effects: this.effects.map((effect) => ({ ...effect }))
        };
    }
    playerJumpOffset() {
        if (this.jumpTimerMs <= 0) {
            return 0;
        }
        const progress = 1 - this.jumpTimerMs / SwimSpanielGame.jumpDurationMs;
        return Math.sin(Math.PI * progress) * 26;
    }
    playerX() { return this.laneX(this.playerLane); }
    playerY() { return this.height - Math.floor(this.height / 3) - 34; }
    startingLane() { return Math.floor(this.laneCount / 2); }
    minPlayableLane() { return Math.min(2, Math.floor((this.laneCount - 1) / 2)); }
    maxPlayableLane() { return Math.max(this.minPlayableLane(), this.laneCount - 1 - this.minPlayableLane()); }
    laneX(lane) { return lane * this.laneWidth + this.laneWidth * 0.22; }
    entityLane(entity) {
        if (typeof entity.lane === "number")
            return Math.max(0, Math.min(this.laneCount - 1, entity.lane));
        const lane = Math.round((entity.x - this.laneWidth * 0.22) / this.laneWidth);
        return Math.max(0, Math.min(this.laneCount - 1, lane));
    }
    maybeMoveEntityLane(entity, deltaMs) {
        if (entity.type !== "shark"
            && entity.type !== "jellyfish"
            && entity.type !== "spaniel"
            && entity.type !== "black-spaniel"
            && entity.type !== "komodo"
            && entity.type !== "manta-current")
            return;
        const currentLane = this.entityLane(entity);
        const cooldown = Math.max(0, (entity.laneSwitchCooldownMs ?? 0) - deltaMs);
        entity.laneSwitchCooldownMs = cooldown;
        if (cooldown > 0) {
            entity.lane = currentLane;
            return;
        }
        let targetLane = currentLane;
        if (entity.type === "komodo" && entity.behaviorState?.kind === "komodoBoss") {
            if (entity.behaviorState.phase === "hovering" || entity.behaviorState.phase === "exiting") {
                if (currentLane < this.playerLane)
                    targetLane = currentLane + 1;
                else if (currentLane > this.playerLane)
                    targetLane = currentLane - 1;
            }
            entity.lane = Math.max(this.minPlayableLane(), Math.min(this.maxPlayableLane(), targetLane));
            entity.laneSwitchCooldownMs = SwimSpanielGame.komodoBossLaneMoveMs;
            return;
        }
        if (entity.type === "komodo") {
            if (currentLane < this.playerLane)
                targetLane = currentLane + 1;
            else if (currentLane > this.playerLane)
                targetLane = currentLane - 1;
        }
        else if (this.rng() < 0.3) {
            targetLane = currentLane + (this.rng() < 0.5 ? -1 : 1);
        }
        if (targetLane < this.minPlayableLane() || targetLane > this.maxPlayableLane()) {
            entity.lane = currentLane;
            entity.laneSwitchCooldownMs = 110;
            return;
        }
        entity.lane = targetLane !== currentLane && this.isLaneClearForEntity(entity, targetLane) ? targetLane : currentLane;
        entity.laneSwitchCooldownMs = 110;
    }
    isLaneClearForEntity(entity, lane) {
        for (const other of this.entities) {
            if (other === entity)
                continue;
            if (this.entityLane(other) !== lane)
                continue;
            if (Math.abs(other.y - entity.y) < Math.max(other.height, entity.height) + 4)
                return false;
        }
        return true;
    }
    pickSpawnLane() {
        const preferred = this.minPlayableLane() + Math.floor(this.rng() * (this.maxPlayableLane() - this.minPlayableLane() + 1));
        if (this.isSpawnLaneClear(preferred))
            return preferred;
        for (let offset = 1; offset < this.laneCount; offset += 1) {
            const left = preferred - offset;
            const right = preferred + offset;
            if (left >= this.minPlayableLane() && this.isSpawnLaneClear(left))
                return left;
            if (right <= this.maxPlayableLane() && this.isSpawnLaneClear(right))
                return right;
        }
        return preferred;
    }
    isSpawnLaneClear(lane) { return !this.entities.some((entity) => this.entityLane(entity) === lane && entity.y < 40); }
}
function intersects(a, b) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}
export class PixelRenderer {
    ctx;
    width;
    height;
    static levelUpAnimationDurationMs = 1800;
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
    }
    render(snapshot) {
        this.ctx.fillStyle = "#075985";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = "#0e7490";
        this.ctx.fillRect(20, 0, this.width - 40, this.height);
        this.ctx.fillStyle = "rgba(103, 232, 249, 0.16)";
        this.ctx.fillRect(20, 0, this.width - 40, 96);
        this.ctx.fillStyle = "rgba(8, 47, 73, 0.18)";
        this.ctx.fillRect(20, this.height - 150, this.width - 40, 150);
        this.drawReefEdges(snapshot.sideObstacleOffsetY);
        const isJumping = !snapshot.isCrashActive && snapshot.playerJumpOffset > 0;
        if (isJumping) {
            drawBoostShadow(this.ctx, snapshot.playerX, snapshot.playerY, snapshot.playerJumpOffset);
        }
        for (const entity of snapshot.entities) {
            if (entity.type === "silt-patch") {
                drawSiltPatch(this.ctx, entity.x, entity.y);
            }
            else if (entity.type === "current-stream") {
                drawCurrentStream(this.ctx, entity.x, entity.y);
            }
            else if (entity.type === "reef-trench") {
                drawReefTrench(this.ctx, entity.x, entity.y, entity.width);
            }
            else if (entity.type === "kelp-bed") {
                drawKelpBed(this.ctx, entity.x, entity.y);
            }
            else if (entity.type === "falling-anchor") {
                if (entity.behaviorState?.kind === "anchorFall" && entity.behaviorState.phase === "telegraph") {
                    drawAnchorTelegraph(this.ctx, entity.x, entity.y);
                }
                else {
                    drawFallingAnchor(this.ctx, entity.x, entity.y);
                }
            }
            else if (entity.type === "manta-current") {
                if (entity.behaviorState?.kind === "mantaCurrent") {
                    drawMantaCurrent(this.ctx, entity.x, entity.y, entity.behaviorState.pushDirection);
                }
                else {
                    drawMantaCurrent(this.ctx, entity.x, entity.y, 1);
                }
            }
            else if (entity.type === "venom-cloud") {
                drawVenomCloud(this.ctx, entity.x, entity.y);
            }
            else if (entity.type === "coral")
                drawCoral(this.ctx, entity.x, entity.y, entity.obstacleId, entity.width);
            else if (entity.type === "reef-rock") {
                if ((entity.crashAnimationMs ?? 0) > 0)
                    drawCrashPulse(this.ctx, entity.x, entity.y, entity.crashAnimationMs ?? 0, "#ffa500");
                drawReefRock(this.ctx, entity.x, entity.y, entity.obstacleId, entity.width);
            }
            else if (entity.type === "shark")
                drawShark(this.ctx, entity.x, entity.y, entity.obstacleId);
            else if (entity.type === "fish-school-leader")
                drawFish(this.ctx, entity.x, entity.y, "#fb7185", "#fecdd3");
            else if (entity.type === "fish-school-follower") {
                const paletteIndex = entity.behaviorState?.kind === "fishSchool" ? entity.behaviorState.paletteIndex : 0;
                drawFishSchoolFollower(this.ctx, entity.x, entity.y, paletteIndex);
            }
            else if (entity.type === "jellyfish")
                drawJellyfish(this.ctx, entity.x, entity.y);
            else if (entity.type === "spaniel")
                drawSpaniel(this.ctx, entity.x, entity.y, snapshot.sideObstacleOffsetY + entity.x, "brown", entity.obstacleId);
            else if (entity.type === "black-spaniel")
                drawSpaniel(this.ctx, entity.x, entity.y, snapshot.sideObstacleOffsetY + entity.x, "black", entity.obstacleId);
            else if (entity.type === "rescue-bubbles")
                drawRescueBubbles(this.ctx, entity.x, entity.y);
            else {
                drawKomodoShadow(this.ctx, entity.x, entity.y, snapshot.sideObstacleOffsetY + entity.x);
                drawKomodo(this.ctx, entity.x, entity.y, snapshot.sideObstacleOffsetY + entity.x);
            }
        }
        const playerRenderY = snapshot.isCrashActive ? snapshot.playerY : snapshot.playerY - snapshot.playerJumpOffset;
        if (snapshot.isPlayerImmortal && !snapshot.isCrashActive) {
            drawRescueShield(this.ctx, snapshot.playerX, playerRenderY, snapshot.playerImmortalMs ?? 0);
        }
        if (snapshot.isCrashActive) {
            drawStunnedDiver(this.ctx, snapshot.playerX, snapshot.playerY);
        }
        else {
            drawDiver(this.ctx, snapshot.playerX, snapshot.playerY - snapshot.playerJumpOffset, snapshot.sideObstacleOffsetY, snapshot.playerJumpOffset);
        }
        for (const effect of snapshot.effects)
            drawRescueEffect(this.ctx, effect);
        this.ctx.fillStyle = "#1a1a1a";
        this.ctx.font = "16px monospace";
        if (snapshot.isCrashActive && !snapshot.isGameOver) {
            this.ctx.fillStyle = "rgba(12, 18, 31, 0.9)";
            this.ctx.fillRect(this.width / 2 - 120, 78, 240, 56);
            this.ctx.fillStyle = "#ff6b6b";
            this.ctx.fillText("TANGLED!", this.width / 2 - 42, 100);
            this.ctx.fillStyle = "#f8fafc";
            this.ctx.fillText(`Air Tanks ${snapshot.airTanks}`, this.width / 2 - 72, 120);
        }
        if ((snapshot.levelUpBannerMs ?? 0) > 0 && !snapshot.isGameOver) {
            this.drawLevelUpCelebration(snapshot.levelUpBannerMs ?? 0);
            const pulse = 0.7 + Math.abs(Math.sin((snapshot.levelUpBannerMs ?? 0) / 90)) * 0.3;
            const bannerWidth = Math.round(214 + pulse * 18);
            const bannerX = Math.round(this.width / 2 - bannerWidth / 2);
            this.ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
            this.ctx.fillRect(bannerX, 132, bannerWidth, 40);
            this.ctx.fillStyle = "#fef08a";
            this.ctx.fillRect(bannerX + 6, 136, bannerWidth - 12, 2);
            this.ctx.fillStyle = "#86efac";
            this.ctx.fillText(`LEVEL ${snapshot.speedLevel}!`, this.width / 2 - 66, 158);
        }
        if (snapshot.isVictory) {
            this.drawVictoryFireworks();
            this.ctx.fillStyle = "rgba(3, 7, 18, 0.58)";
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.fillStyle = "#fef08a";
            this.ctx.fillText("CONGRATULATIONS", this.width / 2 - 86, this.height / 2 - 10);
            this.ctx.fillStyle = "#dcfce7";
            this.ctx.fillText("All spaniels are safe", this.width / 2 - 82, this.height / 2 + 14);
            this.ctx.fillStyle = "#fff";
            this.ctx.fillText(`Final Score ${snapshot.score}`, this.width / 2 - 78, this.height / 2 + 38);
        }
        else if (snapshot.isGameOver) {
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.fillStyle = "#fff";
            this.ctx.fillText("GAME OVER", this.width / 2 - 56, this.height / 2);
            this.ctx.fillText(`Final Score ${snapshot.score}`, this.width / 2 - 78, this.height / 2 + 24);
            this.ctx.fillText("Tap Restart below", this.width / 2 - 70, this.height / 2 + 48);
        }
    }
    drawReefEdges(offsetY) {
        const placements = this.computeReefEdgeDecorations(offsetY);
        for (const placement of placements) {
            if (placement.kind === "coral") {
                drawCoral(this.ctx, placement.x, placement.y, "edge-coral");
            }
            else {
                drawReefRock(this.ctx, placement.x, placement.y, "edge-rock");
            }
        }
    }
    drawVictoryFireworks() {
        const bursts = 8;
        for (let burst = 0; burst < bursts; burst += 1) {
            const burstX = 48 + burst * ((this.width - 96) / (bursts - 1));
            const burstY = 66 + (burst % 3) * 34;
            const hue = (burst * 47) % 360;
            for (let spark = 0; spark < 14; spark += 1) {
                const angle = (Math.PI * 2 * spark) / 14;
                const radius = 10 + (spark % 4) * 6;
                const x = burstX + Math.cos(angle) * radius;
                const y = burstY + Math.sin(angle) * radius;
                this.ctx.fillStyle = `hsl(${hue + spark * 4} 95% 66%)`;
                this.ctx.fillRect(Math.round(x), Math.round(y), 3, 3);
            }
        }
    }
    drawLevelUpCelebration(levelUpBannerMs) {
        const clampedMs = Math.max(0, Math.min(PixelRenderer.levelUpAnimationDurationMs, levelUpBannerMs));
        const progress = 1 - clampedMs / PixelRenderer.levelUpAnimationDurationMs;
        const centerX = this.width / 2;
        const centerY = 152;
        const ringRadius = 12 + progress * 74;
        const sparkleRadius = 20 + progress * 52;
        const glowAlpha = Math.max(0.18, 0.7 - progress * 0.46);
        const sparkleAlpha = Math.max(0.16, 0.64 - progress * 0.34);
        this.ctx.fillStyle = `rgba(134, 239, 172, ${glowAlpha.toFixed(2)})`;
        this.ctx.fillRect(Math.round(centerX - ringRadius), centerY - 2, Math.round(ringRadius * 2), 4);
        this.ctx.fillRect(Math.round(centerX - 2), Math.round(centerY - ringRadius), 4, Math.round(ringRadius * 2));
        this.ctx.fillStyle = `rgba(250, 204, 21, ${sparkleAlpha.toFixed(2)})`;
        for (let index = 0; index < 8; index += 1) {
            const angle = progress * 2.4 + (Math.PI * 2 * index) / 8;
            const sparkleX = centerX + Math.cos(angle) * sparkleRadius;
            const sparkleY = centerY + Math.sin(angle) * sparkleRadius;
            this.ctx.fillRect(Math.round(sparkleX) - 1, Math.round(sparkleY) - 1, 3, 3);
        }
    }
    computeReefEdgeDecorations(offsetY) {
        const coralSpacing = 54;
        const rockSpacing = 170;
        const coralStart = -16 + (offsetY % coralSpacing);
        const rockStart = 45 + (offsetY % rockSpacing);
        const placements = [];
        const tryPlace = (kind, x, y) => {
            const bounds = this.sideDecorationBounds(kind, x, y);
            if (placements.some((placement) => intersects(placement.bounds, bounds))) {
                return;
            }
            placements.push({ kind, x, y, bounds });
        };
        for (let y = rockStart - rockSpacing; y < this.height + 24; y += rockSpacing) {
            tryPlace("reef-rock", 6, y);
            tryPlace("reef-rock", this.width - 26, y + 80);
        }
        for (let y = coralStart - coralSpacing; y < this.height + 24; y += coralSpacing) {
            tryPlace("coral", 2, y);
            tryPlace("coral", this.width - 24, y + 20);
        }
        return placements;
    }
    sideDecorationBounds(kind, x, y) {
        if (kind === "coral") {
            return { x, y, width: 20, height: 30 };
        }
        return { x: x + 2, y: y + 2, width: 16, height: 12 };
    }
}
function drawCoral(ctx, x, y, obstacleId = "staghorn-coral", width = 22) {
    if (obstacleId === "fire-coral-pair") {
        ctx.fillStyle = "#9f1239";
        ctx.fillRect(x + 3, y + 12, 3, 16);
        ctx.fillRect(x + 15, y + 10, 3, 18);
        ctx.fillStyle = "#fb7185";
        ctx.fillRect(x, y + 8, 8, 6);
        ctx.fillRect(x + 12, y + 5, 9, 7);
        ctx.fillStyle = "#fde047";
        ctx.fillRect(x + 2, y + 9, 4, 2);
        ctx.fillRect(x + 15, y + 7, 4, 2);
    }
    else if (obstacleId === "coral-pinnacle") {
        ctx.fillStyle = "#7c2d12";
        ctx.fillRect(x + 7, y + 5, 9, 25);
        ctx.fillStyle = "#f97316";
        ctx.fillRect(x + 4, y + 8, 15, 5);
        ctx.fillRect(x + 2, y + 16, 19, 6);
        ctx.fillStyle = "#fdba74";
        ctx.fillRect(x + 7, y + 7, 8, 2);
        ctx.fillRect(x + 5, y + 17, 11, 2);
    }
    else if (obstacleId === "coral-wall" || obstacleId === "reef-gate") {
        const span = Math.max(22, Math.round(width));
        ctx.fillStyle = "#9f1239";
        ctx.fillRect(x, y + 18, span, 10);
        ctx.fillStyle = "#e11d48";
        for (let offset = 2; offset < span - 2; offset += 7) {
            ctx.fillRect(x + offset, y + 7 + (offset % 3), 4, 14);
            ctx.fillRect(x + offset - 1, y + 5 + (offset % 3), 6, 4);
        }
        if (obstacleId === "reef-gate") {
            ctx.fillStyle = "#083344";
            ctx.fillRect(x + Math.floor(span / 2) - 4, y + 18, 8, 10);
        }
    }
    else if (obstacleId === "giant-table-coral") {
        const span = Math.max(26, Math.round(width));
        ctx.fillStyle = "#7c3aed";
        ctx.fillRect(x + Math.floor(span / 2) - 3, y + 13, 6, 17);
        ctx.fillStyle = "#c084fc";
        ctx.fillRect(x + 2, y + 8, span - 4, 7);
        ctx.fillRect(x + 6, y + 5, span - 12, 4);
        ctx.fillStyle = "#f5d0fe";
        ctx.fillRect(x + 7, y + 7, span - 14, 2);
    }
    else if (obstacleId === "shipwreck-mast") {
        ctx.fillStyle = "#78350f";
        ctx.fillRect(x + 9, y + 1, 4, 29);
        ctx.fillRect(x + 3, y + 8, 17, 3);
        ctx.fillStyle = "#fef3c7";
        ctx.fillRect(x + 13, y + 11, 7, 8);
        ctx.fillStyle = "#d6d3d1";
        ctx.fillRect(x + 2, y + 25, 18, 3);
    }
    else {
        ctx.fillStyle = "#be123c";
        ctx.fillRect(x + 9, y + 10, 4, 20);
        ctx.fillRect(x + 4, y + 15, 4, 13);
        ctx.fillRect(x + 14, y + 8, 4, 20);
        ctx.fillRect(x + 1, y + 20, 4, 8);
        ctx.fillStyle = "#fb7185";
        ctx.fillRect(x + 10, y + 3, 3, 10);
        ctx.fillRect(x + 5, y + 9, 3, 9);
        ctx.fillRect(x + 15, y + 1, 3, 10);
        ctx.fillRect(x + 2, y + 14, 3, 9);
        ctx.fillStyle = "#fecdd3";
        ctx.fillRect(x + 10, y + 2, 3, 2);
        ctx.fillRect(x + 5, y + 8, 3, 2);
        ctx.fillRect(x + 15, y, 3, 2);
    }
    ctx.fillStyle = "#713f12";
    ctx.fillRect(x + 2, y + 28, Math.max(17, Math.round(width) - 4), 2);
}
function drawReefRock(ctx, x, y, obstacleId = "volcanic-rock-cluster", width = 22) {
    const span = Math.max(20, Math.round(width));
    if (obstacleId === "blue-hole") {
        ctx.fillStyle = "#155e75";
        ctx.fillRect(x + 2, y + 5, span - 4, 15);
        ctx.fillRect(x, y + 9, span, 8);
        ctx.fillStyle = "#020617";
        ctx.fillRect(x + 5, y + 8, span - 10, 9);
        ctx.fillStyle = "#22d3ee";
        ctx.fillRect(x + 6, y + 7, span - 12, 2);
    }
    else if (obstacleId === "shell-bed") {
        ctx.fillStyle = "#ca8a04";
        ctx.fillRect(x + 1, y + 14, span - 2, 7);
        ctx.fillStyle = "#fef3c7";
        ctx.fillRect(x + 3, y + 10, 5, 5);
        ctx.fillRect(x + 12, y + 12, 6, 4);
        ctx.fillStyle = "#fb7185";
        ctx.fillRect(x + 4, y + 11, 3, 1);
        ctx.fillRect(x + 14, y + 13, 3, 1);
    }
    else if (obstacleId === "lava-trench") {
        ctx.fillStyle = "#1c1917";
        ctx.fillRect(x, y + 7, span, 16);
        ctx.fillStyle = "#7c2d12";
        ctx.fillRect(x + 3, y + 12, span - 6, 7);
        ctx.fillStyle = "#f97316";
        ctx.fillRect(x + 4, y + 14, 6, 2);
        ctx.fillRect(x + 13, y + 17, Math.max(4, span - 17), 2);
        ctx.fillStyle = "#facc15";
        ctx.fillRect(x + 7, y + 15, 4, 1);
    }
    else if (obstacleId === "ancient-anchor-field") {
        ctx.fillStyle = "#475569";
        ctx.fillRect(x + 4, y + 4, 3, 18);
        ctx.fillRect(x + 1, y + 17, 10, 3);
        ctx.fillRect(x + 15, y + 7, 3, 16);
        ctx.fillRect(x + 12, y + 18, 10, 3);
        ctx.fillStyle = "#a16207";
        ctx.fillRect(x + 2, y + 22, span - 4, 4);
    }
    else if (obstacleId === "volcanic-vent") {
        ctx.fillStyle = "#292524";
        ctx.fillRect(x + 2, y + 13, span - 4, 11);
        ctx.fillRect(x + 6, y + 8, span - 12, 7);
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(x + 8, y + 8, span - 16, 3);
        ctx.fillStyle = "#a5f3fc";
        ctx.fillRect(x + 7, y + 3, 3, 3);
        ctx.fillRect(x + 14, y, 2, 2);
    }
    else {
        ctx.fillStyle = "#292524";
        ctx.fillRect(x + 1, y + 10, 7, 10);
        ctx.fillRect(x + 7, y + 5, 8, 15);
        ctx.fillRect(x + 14, y + 9, 7, 11);
        ctx.fillStyle = "#57534e";
        ctx.fillRect(x + 4, y + 9, 4, 3);
        ctx.fillRect(x + 9, y + 6, 4, 3);
        ctx.fillRect(x + 15, y + 10, 3, 2);
        ctx.fillStyle = "#f97316";
        ctx.fillRect(x + 10, y + 15, 2, 4);
    }
}
function drawRescueBubbles(ctx, x, y) {
    ctx.fillStyle = "rgba(207, 250, 254, 0.85)";
    ctx.fillRect(x + 3, y + 12, 5, 5);
    ctx.fillRect(x + 12, y + 8, 4, 4);
    ctx.fillRect(x + 17, y + 3, 3, 3);
    ctx.fillRect(x + 8, y + 2, 2, 2);
    ctx.fillStyle = "rgba(8, 145, 178, 0.9)";
    ctx.fillRect(x + 4, y + 13, 3, 3);
    ctx.fillRect(x + 13, y + 9, 2, 2);
    ctx.fillRect(x + 18, y + 4, 1, 1);
}
function drawSpaniel(ctx, x, y, animationSeed = 0, coat = "brown", obstacleId = "floating-life-ring") {
    const wagFrame = Math.floor(animationSeed / 5) % 4;
    const tailOffsetX = wagFrame < 2 ? -1 : 0;
    const tailOffsetY = wagFrame === 1 || wagFrame === 2 ? -1 : 0;
    const paddleOffset = wagFrame % 2;
    const baseCoat = coat === "black" ? "#1f2937" : "#8b5e3c";
    const highlightCoat = coat === "black" ? "#4b5563" : "#c58f63";
    const shadowCoat = coat === "black" ? "#111827" : "#6b3f2a";
    const harnessColor = obstacleId === "golden-harness-spaniel" ? "#facc15" : "#f97316";
    if (obstacleId === "floating-life-ring") {
        ctx.fillStyle = "#f8fafc";
        ctx.fillRect(x + 2, y + 10, 19, 7);
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(x + 2, y + 10, 5, 7);
        ctx.fillRect(x + 16, y + 10, 5, 7);
        ctx.fillStyle = "#0e7490";
        ctx.fillRect(x + 7, y + 12, 9, 3);
    }
    ctx.fillStyle = baseCoat;
    ctx.fillRect(x + 3, y + 8, 12, 8);
    ctx.fillRect(x + 14, y + 10, 4, 5);
    ctx.fillRect(x + 15, y + 7, 5, 5);
    ctx.fillRect(x + 19, y + 9, 3, 2);
    ctx.fillRect(x + 1 + tailOffsetX, y + 8 + tailOffsetY, 3, 2);
    ctx.fillStyle = highlightCoat;
    ctx.fillRect(x + 5, y + 10, 7, 2);
    ctx.fillRect(x + 16, y + 9, 3, 2);
    ctx.fillRect(x + 20, y + 10, 2, 1);
    ctx.fillRect(x + 2 + tailOffsetX, y + 8 + tailOffsetY, 1, 1);
    ctx.fillStyle = shadowCoat;
    ctx.fillRect(x + 15, y + 8, 1, 5);
    ctx.fillRect(x + 18, y + 8, 1, 5);
    ctx.fillRect(x + 5, y + 16 + paddleOffset, 3, 2);
    ctx.fillRect(x + 11, y + 17 - paddleOffset, 3, 2);
    ctx.fillRect(x + 16, y + 15 + paddleOffset, 2, 3);
    ctx.fillStyle = harnessColor;
    ctx.fillRect(x + 6, y + 8, 3, 8);
    ctx.fillRect(x + 12, y + 8, 3, 8);
    ctx.fillRect(x + 7, y + 10, 7, 3);
    ctx.fillStyle = "#fef3c7";
    ctx.fillRect(x + 9, y + 10, 3, 1);
    if (obstacleId === "drifting-rescue-rope" || obstacleId === "tangled-spaniel") {
        ctx.fillStyle = obstacleId === "tangled-spaniel" ? "#a3e635" : "#fde047";
        ctx.fillRect(x, y + 4, 2, 14);
        ctx.fillRect(x + 1, y + 4, 6, 2);
        if (obstacleId === "tangled-spaniel")
            ctx.fillRect(x + 2, y + 17, 12, 2);
    }
    ctx.fillStyle = "#111827";
    ctx.fillRect(x + 18, y + 9, 1, 1);
    ctx.fillRect(x + 21, y + 10, 1, 1);
}
function drawSiltPatch(ctx, x, y) {
    ctx.fillStyle = "rgba(120, 53, 15, 0.78)";
    ctx.fillRect(x + 2, y + 9, 8, 8);
    ctx.fillRect(x + 8, y + 6, 9, 11);
    ctx.fillRect(x + 15, y + 10, 7, 7);
    ctx.fillStyle = "rgba(217, 119, 6, 0.75)";
    ctx.fillRect(x + 5, y + 7, 4, 3);
    ctx.fillRect(x + 12, y + 9, 5, 4);
    ctx.fillStyle = "#fde68a";
    ctx.fillRect(x + 1, y + 5, 2, 2);
    ctx.fillRect(x + 19, y + 7, 2, 2);
    ctx.fillRect(x + 9, y + 3, 1, 1);
    ctx.fillRect(x + 14, y + 18, 2, 1);
}
function drawCurrentStream(ctx, x, y) {
    ctx.fillStyle = "rgba(34, 211, 238, 0.35)";
    ctx.fillRect(x, y + 3, 22, 17);
    ctx.fillStyle = "#a5f3fc";
    ctx.fillRect(x + 1, y + 6, 13, 2);
    ctx.fillRect(x + 6, y + 12, 14, 2);
    ctx.fillRect(x + 2, y + 18, 11, 1);
    ctx.fillStyle = "#0891b2";
    ctx.fillRect(x + 14, y + 4, 3, 6);
    ctx.fillRect(x + 17, y + 6, 4, 2);
    ctx.fillRect(x + 20, y + 5, 2, 4);
    ctx.fillRect(x + 13, y + 10, 3, 6);
    ctx.fillRect(x + 16, y + 12, 4, 2);
    ctx.fillRect(x + 19, y + 11, 2, 4);
}
function drawKelpBed(ctx, x, y) {
    ctx.fillStyle = "#14532d";
    ctx.fillRect(x + 5, y + 6, 3, 19);
    ctx.fillRect(x + 13, y + 3, 3, 22);
    ctx.fillStyle = "#22c55e";
    ctx.fillRect(x + 3, y + 8, 4, 3);
    ctx.fillRect(x + 7, y + 13, 4, 3);
    ctx.fillRect(x + 11, y + 6, 4, 3);
    ctx.fillRect(x + 15, y + 12, 4, 3);
    ctx.fillStyle = "#a3e635";
    ctx.fillRect(x + 4, y + 8, 2, 1);
    ctx.fillRect(x + 8, y + 13, 2, 1);
    ctx.fillRect(x + 12, y + 6, 2, 1);
    ctx.fillRect(x + 16, y + 12, 2, 1);
    ctx.fillStyle = "#78350f";
    ctx.fillRect(x + 3, y + 24, 15, 2);
}
function drawReefTrench(ctx, x, y, width) {
    const totalWidth = Math.max(24, Math.round(width));
    const roundedX = Math.round(x);
    ctx.fillStyle = "#164e63";
    ctx.fillRect(roundedX, y + 6, totalWidth, 16);
    ctx.fillStyle = "#020617";
    ctx.fillRect(roundedX + 3, y + 9, totalWidth - 6, 11);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(roundedX + 6, y + 11, totalWidth - 12, 9);
    ctx.fillStyle = "#f97316";
    for (let offset = 2; offset < totalWidth - 2; offset += 9) {
        ctx.fillRect(roundedX + offset, y + 4 + (offset % 2), 3, 5);
        ctx.fillRect(roundedX + offset + 1, y + 20, 2, 4);
    }
    ctx.fillStyle = "#67e8f9";
    ctx.fillRect(roundedX + 4, y + 8, totalWidth - 8, 1);
}
function drawAnchorTelegraph(ctx, x, y) {
    ctx.fillStyle = "rgba(239, 68, 68, 0.75)";
    ctx.fillRect(x + 3, y + 11, 14, 2);
    ctx.fillRect(x + 9, y + 6, 2, 12);
    ctx.fillStyle = "rgba(248, 113, 113, 0.55)";
    ctx.fillRect(x + 1, y + 9, 18, 1);
    ctx.fillRect(x + 1, y + 15, 18, 1);
}
function drawFallingAnchor(ctx, x, y) {
    ctx.fillStyle = "#334155";
    ctx.fillRect(x + 9, y + 2, 3, 15);
    ctx.fillRect(x + 5, y + 7, 11, 3);
    ctx.fillRect(x + 3, y + 16, 5, 3);
    ctx.fillRect(x + 14, y + 16, 5, 3);
    ctx.fillRect(x + 6, y + 14, 10, 3);
    ctx.fillStyle = "#94a3b8";
    ctx.fillRect(x + 10, y + 3, 1, 12);
    ctx.fillRect(x + 6, y + 8, 9, 1);
}
function drawVenomCloud(ctx, x, y) {
    ctx.fillStyle = "rgba(20, 83, 45, 0.88)";
    ctx.fillRect(x + 2, y + 8, 8, 8);
    ctx.fillRect(x + 7, y + 4, 9, 12);
    ctx.fillRect(x + 14, y + 7, 7, 8);
    ctx.fillStyle = "#22c55e";
    ctx.fillRect(x + 5, y + 10, 5, 4);
    ctx.fillRect(x + 10, y + 6, 5, 5);
    ctx.fillRect(x + 15, y + 9, 4, 4);
    ctx.fillStyle = "#bef264";
    ctx.fillRect(x + 4, y + 5, 2, 2);
    ctx.fillRect(x + 18, y + 3, 2, 2);
    ctx.fillRect(x + 12, y + 17, 2, 2);
    ctx.fillStyle = "#052e16";
    ctx.fillRect(x + 8, y + 11, 2, 2);
    ctx.fillRect(x + 15, y + 8, 1, 1);
}
function drawDiver(ctx, x, y, animationSeed = 0, boostOffset = 0) {
    const boosted = boostOffset > 0;
    const kickFrame = Math.floor(animationSeed / 6) % 2;
    const bodyY = y + 10;
    const finLift = kickFrame === 0 ? 0 : 3;
    // Horizontal swimmer silhouette: fins left, mask and bubbles right.
    ctx.fillStyle = "#facc15";
    ctx.fillRect(x, bodyY + 1 - finLift, 7, 4);
    ctx.fillRect(x, bodyY + 8 + finLift, 7, 4);
    ctx.fillRect(x + 5, bodyY + 3, 5, 7);
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(x + 5, bodyY + 3, 7, 3);
    ctx.fillRect(x + 5, bodyY + 8, 7, 3);
    ctx.fillStyle = "#f97316";
    ctx.fillRect(x + 9, bodyY + 2, 9, 9);
    ctx.fillRect(x + 16, bodyY + 4, 4, 5);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(x + 8, bodyY, 9, 3);
    ctx.fillRect(x + 8, bodyY + 11, 9, 3);
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(x + 9, bodyY - 2, 8, 3);
    ctx.fillStyle = "#fde047";
    ctx.fillRect(x + 18, bodyY + 2, 6, 9);
    ctx.fillStyle = "#cffafe";
    ctx.fillRect(x + 20, bodyY + 3, 4, 5);
    ctx.fillStyle = "#0891b2";
    ctx.fillRect(x + 21, bodyY + 4, 3, 2);
    ctx.fillStyle = "#fb923c";
    ctx.fillRect(x + 13, bodyY + 5, 7, 2);
    ctx.fillRect(x + 12, bodyY + 9, 6, 2);
    ctx.fillStyle = "#22d3ee";
    ctx.fillRect(x + 25, bodyY + 3, 2, 2);
    ctx.fillRect(x + 28, bodyY, 2, 2);
    if (boosted)
        ctx.fillRect(x - 3, bodyY + 6, 5, 2);
}
function drawShark(ctx, x, y, obstacleId = "reef-shark") {
    const isGhost = obstacleId === "ghost-shark";
    const isTiger = obstacleId === "tiger-shark";
    const isHammerhead = obstacleId === "hammerhead-shark";
    const isBarracuda = obstacleId === "barracuda-crossing";
    ctx.fillStyle = isGhost ? "rgba(186, 230, 253, 0.72)" : isTiger ? "#92400e" : isBarracuda ? "#64748b" : "#334155";
    ctx.fillRect(x + 3, y + 10, 16, 9);
    ctx.fillRect(x + 18, y + (isHammerhead ? 9 : 12), isHammerhead ? 3 : 5, isHammerhead ? 11 : 5);
    ctx.fillRect(x, y + 7, 5, 14);
    if (isHammerhead)
        ctx.fillRect(x + 17, y + 8, 7, 3);
    ctx.fillStyle = isGhost ? "rgba(224, 242, 254, 0.72)" : "#64748b";
    ctx.fillRect(x + 6, y + 8, 9, 3);
    ctx.fillRect(x + 9, y + 5, 5, 4);
    ctx.fillRect(x + 8, y + 18, 6, 4);
    if (isTiger) {
        ctx.fillStyle = "#451a03";
        ctx.fillRect(x + 7, y + 10, 2, 6);
        ctx.fillRect(x + 12, y + 10, 2, 7);
    }
    if (isBarracuda) {
        ctx.fillStyle = "#cbd5e1";
        ctx.fillRect(x + 5, y + 13, 13, 2);
    }
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(x + 18, y + 15, 4, 2);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(x + 18, y + 12, 1, 1);
    ctx.fillRect(x + 21, y + 14, 2, 1);
}
function drawFish(ctx, x, y, bodyColor, highlightColor) {
    ctx.fillStyle = bodyColor;
    ctx.fillRect(x + 5, y + 10, 12, 8);
    ctx.fillRect(x + 16, y + 12, 4, 4);
    ctx.fillRect(x + 1, y + 8, 5, 12);
    ctx.fillStyle = highlightColor;
    ctx.fillRect(x + 7, y + 11, 8, 2);
    ctx.fillRect(x + 10, y + 8, 4, 3);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(x + 17, y + 12, 1, 1);
}
const FISH_SCHOOL_COLORS = [
    { body: "#2563eb", helmet: "#bfdbfe" },
    { body: "#16a34a", helmet: "#dcfce7" },
    { body: "#7c3aed", helmet: "#ddd6fe" },
    { body: "#d97706", helmet: "#fde68a" },
    { body: "#0f766e", helmet: "#99f6e4" }
];
function drawFishSchoolFollower(ctx, x, y, paletteIndex) {
    const palette = FISH_SCHOOL_COLORS[((paletteIndex % FISH_SCHOOL_COLORS.length) + FISH_SCHOOL_COLORS.length) % FISH_SCHOOL_COLORS.length];
    drawFish(ctx, x, y, palette.body, palette.helmet);
}
function drawJellyfish(ctx, x, y) {
    ctx.fillStyle = "#c084fc";
    ctx.fillRect(x + 5, y + 7, 13, 8);
    ctx.fillRect(x + 7, y + 4, 9, 4);
    ctx.fillStyle = "#e9d5ff";
    ctx.fillRect(x + 8, y + 6, 6, 3);
    ctx.fillStyle = "#7e22ce";
    ctx.fillRect(x + 7, y + 15, 2, 11);
    ctx.fillRect(x + 11, y + 15, 2, 9);
    ctx.fillRect(x + 15, y + 15, 2, 12);
    ctx.fillStyle = "#f0abfc";
    ctx.fillRect(x + 8, y + 17, 1, 7);
    ctx.fillRect(x + 12, y + 17, 1, 5);
    ctx.fillRect(x + 16, y + 17, 1, 8);
}
function drawMantaCurrent(ctx, x, y, pushDirection) {
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(x + 7, y + 7, 10, 9);
    ctx.fillRect(x + 2, y + 9, 7, 5);
    ctx.fillRect(x + 15, y + 9, 7, 5);
    ctx.fillRect(x, y + 11, 4, 2);
    ctx.fillRect(x + 20, y + 11, 4, 2);
    ctx.fillRect(x + 11, y + 15, 2, 8);
    ctx.fillStyle = "#64748b";
    ctx.fillRect(x + 8, y + 8, 8, 4);
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(x + 9, y + 10, 2, 1);
    ctx.fillRect(x + 14, y + 10, 2, 1);
    const gustBaseX = pushDirection === 1 ? x + 16 : x + 4;
    ctx.fillStyle = "rgba(56, 189, 248, 0.75)";
    ctx.fillRect(gustBaseX, y + 14, 2, 4);
    ctx.fillRect(gustBaseX + 2 * pushDirection, y + 17, 2, 5);
    ctx.fillRect(gustBaseX + 4 * pushDirection, y + 20, 2, 3);
    const arrowX = gustBaseX + 6 * pushDirection;
    ctx.fillRect(arrowX, y + 21, 1, 1);
    ctx.fillRect(arrowX + pushDirection, y + 20, 1, 3);
    ctx.fillStyle = "rgba(125, 211, 252, 0.85)";
    ctx.fillRect(gustBaseX + pushDirection, y + 15, 1, 1);
    ctx.fillRect(gustBaseX + 3 * pushDirection, y + 18, 1, 1);
    ctx.fillRect(gustBaseX + 5 * pushDirection, y + 21, 1, 1);
}
function drawKomodoShadow(ctx, x, y, animationSeed = 0) {
    const pulse = Math.floor(animationSeed / 8) % 3;
    const width = 14 + pulse;
    const shadowX = x + 11 - Math.floor(width / 2);
    const shadowY = y + 31;
    ctx.fillStyle = "rgba(15, 23, 42, 0.22)";
    ctx.fillRect(shadowX, shadowY, width, 2);
    ctx.fillStyle = "rgba(15, 23, 42, 0.15)";
    ctx.fillRect(shadowX + 2, shadowY + 2, Math.max(6, width - 4), 1);
}
function drawKomodo(ctx, x, y, animationSeed = 0) {
    const trailFrame = Math.floor(animationSeed / 6) % 3;
    ctx.fillStyle = "#365314";
    ctx.fillRect(x + 3, y + 11, 17, 11);
    ctx.fillRect(x + 18, y + 8, 8, 9);
    ctx.fillRect(x, y + 15, 7, 5);
    ctx.fillRect(x - 4, y + 17, 6, 3);
    ctx.fillStyle = "#65a30d";
    ctx.fillRect(x + 6, y + 9, 12, 5);
    ctx.fillRect(x + 20, y + 9, 5, 4);
    ctx.fillStyle = "#bef264";
    ctx.fillRect(x + 8, y + 11, 8, 2);
    ctx.fillRect(x + 21, y + 10, 2, 1);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(x + 23, y + 9, 1, 1);
    ctx.fillStyle = "#f87171";
    ctx.fillRect(x + 25, y + 14, 4, 1);
    ctx.fillStyle = "#3f6212";
    ctx.fillRect(x + 5, y + 21, 4, 5);
    ctx.fillRect(x + 15, y + 21, 4, 5);
    ctx.fillStyle = trailFrame === 0 ? "rgba(125, 211, 252, 0.65)" : "rgba(56, 189, 248, 0.55)";
    ctx.fillRect(x + 2, y + 25, 2, 2);
    ctx.fillRect(x + 10, y + 27 + (trailFrame === 1 ? 1 : 0), 2, 2);
    ctx.fillRect(x + 20, y + 24 + (trailFrame === 2 ? 1 : 0), 2, 2);
    ctx.fillStyle = "rgba(186, 230, 253, 0.6)";
    ctx.fillRect(x + 7, y + 29, 10, 1);
}
function drawStunnedDiver(ctx, x, y) {
    ctx.fillStyle = "rgba(15, 23, 42, 0.24)";
    ctx.fillRect(x + 2, y + 30, 22, 2);
    ctx.fillStyle = "#facc15";
    ctx.fillRect(x, y + 17, 8, 4);
    ctx.fillRect(x + 2, y + 24, 8, 4);
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(x + 6, y + 17, 7, 3);
    ctx.fillRect(x + 8, y + 23, 6, 3);
    ctx.fillStyle = "#f97316";
    ctx.fillRect(x + 10, y + 16, 10, 10);
    ctx.fillStyle = "#fde047";
    ctx.fillRect(x + 18, y + 11, 7, 9);
    ctx.fillStyle = "#cffafe";
    ctx.fillRect(x + 20, y + 13, 5, 4);
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(x + 10, y + 13, 8, 3);
    ctx.fillStyle = "#67e8f9";
    ctx.fillRect(x + 25, y + 9, 3, 3);
    ctx.fillRect(x + 29, y + 5, 2, 2);
}
function drawBoostShadow(ctx, x, y, jumpOffset) {
    const lift = Math.max(0, Math.min(28, jumpOffset));
    const bodyShadowWidth = Math.max(4, Math.round(8 - lift / 6));
    const bodyShadowX = x + 11 - Math.floor(bodyShadowWidth / 2);
    const bodyShadowY = y + 25;
    const finShadowWidth = Math.max(2, Math.round(4 - lift / 10));
    const finSpread = Math.min(4, Math.floor(lift / 8));
    const alphaBody = Math.max(0.12, 0.28 - lift * 0.005);
    const alphaFins = Math.max(0.08, 0.22 - lift * 0.004);
    ctx.fillStyle = `rgba(15, 23, 42, ${alphaBody.toFixed(2)})`;
    ctx.fillRect(bodyShadowX, bodyShadowY, bodyShadowWidth, 2);
    ctx.fillStyle = `rgba(15, 23, 42, ${alphaFins.toFixed(2)})`;
    ctx.fillRect(x + 7 - finSpread, bodyShadowY + 2, finShadowWidth, 1);
    ctx.fillRect(x + 16 + finSpread - finShadowWidth + 1, bodyShadowY + 2, finShadowWidth, 1);
    ctx.fillRect(x + 6 - finSpread, bodyShadowY + 1, 1, 1);
    ctx.fillRect(x + 17 + finSpread, bodyShadowY + 1, 1, 1);
}
function drawRescueShield(ctx, x, y, immortalMs) {
    const flashOn = Math.floor(immortalMs / 110) % 2 === 0;
    if (!flashOn) {
        return;
    }
    // Align to the slim diver sprite bounds (including tank/fins) with even padding.
    const fieldX = x - 2;
    const fieldY = y + 2;
    const fieldWidth = 28;
    const fieldHeight = 34;
    const pulse = Math.floor(immortalMs / 220) % 2;
    ctx.fillStyle = pulse === 0 ? "rgba(34, 197, 94, 0.14)" : "rgba(74, 222, 128, 0.24)";
    ctx.fillRect(fieldX + 4, fieldY + 4, fieldWidth - 8, fieldHeight - 8);
    ctx.fillStyle = pulse === 0 ? "rgba(22, 163, 74, 0.42)" : "rgba(74, 222, 128, 0.8)";
    ctx.fillRect(fieldX + 2, fieldY, fieldWidth - 4, 1);
    ctx.fillRect(fieldX + 2, fieldY + fieldHeight - 1, fieldWidth - 4, 1);
    ctx.fillRect(fieldX, fieldY + 2, 1, fieldHeight - 4);
    ctx.fillRect(fieldX + fieldWidth - 1, fieldY + 2, 1, fieldHeight - 4);
    ctx.fillRect(fieldX + 1, fieldY + 1, 1, 1);
    ctx.fillRect(fieldX + fieldWidth - 2, fieldY + 1, 1, 1);
    ctx.fillRect(fieldX + 1, fieldY + fieldHeight - 2, 1, 1);
    ctx.fillRect(fieldX + fieldWidth - 2, fieldY + fieldHeight - 2, 1, 1);
    const nodePhase = Math.floor(immortalMs / 70) % 4;
    const sparkNodes = [
        [fieldX + 5, fieldY + 1],
        [fieldX + fieldWidth - 7, fieldY + 2],
        [fieldX + fieldWidth - 3, fieldY + 16],
        [fieldX + fieldWidth - 11, fieldY + fieldHeight - 3],
        [fieldX + 8, fieldY + fieldHeight - 2],
        [fieldX + 1, fieldY + 19]
    ];
    ctx.fillStyle = pulse === 0 ? "rgba(187, 247, 208, 0.7)" : "rgba(240, 253, 244, 0.95)";
    for (let index = 0; index < 3; index += 1) {
        const [sparkX, sparkY] = sparkNodes[(nodePhase + index * 2) % sparkNodes.length] ?? sparkNodes[0];
        ctx.fillRect(sparkX, sparkY, 2, 2);
    }
}
function drawRescueEffect(ctx, effect) {
    if (effect.kind === "rescue-pop") {
        const progress = 1 - effect.ttlMs / effect.maxTtlMs;
        const shimmer = progress > 0.45 && progress < 0.7;
        ctx.fillStyle = shimmer ? "#f0fdfa" : "#2dd4bf";
        ctx.fillRect(effect.x + 16, effect.y + 4, 6, 6);
        ctx.fillStyle = "#ec4899";
        ctx.fillRect(effect.x + 17, effect.y + 5, 4, 4);
        return;
    }
    const progress = 1 - effect.ttlMs / effect.maxTtlMs;
    const radius = Math.floor(progress * 10) + 2;
    const color = effect.kind === "spaniel-rescue" ? "#67e8f9" : effect.kind === "venom-splash" ? "#65a30d" : "#f97316";
    ctx.fillStyle = color;
    ctx.fillRect(effect.x + 8 - radius, effect.y + 8 - radius, radius, radius);
    ctx.fillRect(effect.x + 8 + radius / 2, effect.y + 5, radius, radius);
    ctx.fillRect(effect.x + 4, effect.y + 12 + radius / 2, radius, radius);
    if (effect.kind === "venom-splash") {
        ctx.fillStyle = "#365314";
        const centerSize = Math.max(2, Math.floor(radius * 0.6));
        ctx.fillRect(effect.x + 8 - Math.floor(centerSize / 2), effect.y + 8 - Math.floor(centerSize / 2), centerSize, centerSize);
    }
}
function drawCrashPulse(ctx, x, y, crashAnimationMs, color) {
    const intensity = Math.max(0.2, crashAnimationMs / 260);
    ctx.fillStyle = color;
    ctx.fillRect(x - 1, y + 2, 22 * intensity, 3);
}
