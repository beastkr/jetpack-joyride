// assets.ts

export const IMAGES = {
    SPLASH: { KEY: "splash", PATH: "assets/Splash/loading_screen.png" },
    SHADOW: { KEY: "shadow", PATH: "assets/Characters/effect_shadow.png" },
    BULLET: { KEY: "bullet", PATH: "assets/Characters/Effects/effect_smgbullet.png" },
    BULLETSHELL: { KEY: "bulletshell", PATH: "assets/Characters/Effects/shell.png" },
    AQUARIUM: { KEY: "aquarium", PATH: "assets/atlas/aquarium_assets.png" },
    HALL: { KEY: "hall", PATH: "assets/atlas/warehouse_assets.png" },
    ROOM1: { KEY: "room1", PATH: "assets/Levels/Room1/room1_1.png" },
    JETLOGO: { KEY: "jetlogo", PATH: "assets/Levels/Title/Objects/title_small.png" },
    CONTAINER_EDGE: { KEY: "containerEdge", PATH: "assets/UI/container/edge.png" },
    CONTAINER_FILLER: { KEY: "containerFiller", PATH: "assets/UI/container/filler.png" },
    CONTAINER_LEFT: { KEY: "containerLeft", PATH: "assets/UI/container/left.png" },
    CONTAINER_TOP: { KEY: "containerTop", PATH: "assets/UI/container/top.png" },
    REVIVE: { KEY: "revive", PATH: "assets/new/reviveIcon_TVOS.png" },
    BOOSTER: { KEY: "booster", PATH: "assets/new/skip.png" },
    GS_HEAD: { KEY: "gs_head", PATH: "assets/new_feature/fragment gravity suit/gs_head.png" },
    GS_BODY: { KEY: "gs_body", PATH: "assets/new_feature/fragment gravity suit/gs_body.png" },
    GS_FRAG1: {
        KEY: "gs_frag1",
        PATH: "assets/new_feature/fragment gravity suit/gravitysuitfrag1.png",
    },
    GS_FRAG2: {
        KEY: "gs_frag2",
        PATH: "assets/new_feature/fragment gravity suit/gravitysuitfrag2.png",
    },
    GS_FRAG3: {
        KEY: "gs_frag3",
        PATH: "assets/new_feature/fragment gravity suit/gravitysuitfrag3.png",
    },
    GS_FRAG4: {
        KEY: "gs_frag4",
        PATH: "assets/new_feature/fragment gravity suit/gravitysuitfrag4.png",
    },
    GS_FRAG5: {
        KEY: "gs_frag5",
        PATH: "assets/new_feature/fragment gravity suit/gravitysuitfrag5.png",
    },
    GS_FRAG6: {
        KEY: "gs_frag6",
        PATH: "assets/new_feature/fragment gravity suit/gravitysuitfrag6.png",
    },
    LAZER_WARNING: { KEY: "lazerwarning", PATH: "assets/Obstacles/Laser/laserWarning.png" },
    DUST: { KEY: "dust", PATH: "assets/particles/dust.png" },
};

export const SPRITESHEET = {
    PLAYER_BODY: {
        KEY: "player_body",
        PATH: "assets/Characters/Barry/defaultBody.png",
        FRAME_W: 32,
        FRAME_H: 32,
    },
    WORKER_BODY: {
        KEY: "worker_body",
        PATH: "assets/workers/worker1Body.png",
        FRAME_W: 32,
        FRAME_H: 32,
    },
    PLAYER_HEAD: {
        KEY: "player_head",
        PATH: "assets/Characters/Barry/defaultHead.png",
        FRAME_W: 32,
        FRAME_H: 32,
    },
    WORKER_HEAD: {
        KEY: "worker_head",
        PATH: "assets/workers/worker1Head.png",
        FRAME_W: 32,
        FRAME_H: 32,
    },
    PLAYER_JETPACK: {
        KEY: "player_jetpack",
        PATH: "assets/Characters/Jetpacks/jetpackDefault.png",
        FRAME_W: 32,
        FRAME_H: 44,
    },
    JET_FX: {
        KEY: "jet_fx",
        PATH: "assets/Characters/Effects/jetfx.png",
        FRAME_W: 64,
        FRAME_H: 64,
    },
    BULLET_FX: {
        KEY: "bullet_fx",
        PATH: "assets/Characters/Effects/bulletfx.png",
        FRAME_W: 64,
        FRAME_H: 64,
    },
    COIN: {
        KEY: "coin",
        PATH: "assets/Entities/coin_sheet.png",
        FRAME_W: 32,
        FRAME_H: 32,
    },
    BIG_COIN: {
        KEY: "bigcoin",
        PATH: "assets/new_feature/coinAlt.png",
        FRAME_W: 32,
        FRAME_H: 32,
    },
    ELEC_ON: {
        KEY: "elecOn",
        PATH: "assets/Obstacles/Zapper/orbAnim.png",
        FRAME_W: 62,
        FRAME_H: 42,
    },
    ELEC_ON_GLOW: {
        KEY: "elecOnGlow",
        PATH: "assets/Obstacles/Zapper/RegularZappers/glow.png",
        FRAME_W: 128,
        FRAME_H: 128,
    },
    ZAP_FX: {
        KEY: "zapFX",
        PATH: "assets/Obstacles/Zapper/RegularZappers/zapEffect.png",
        FRAME_W: 32,
        FRAME_H: 117,
    },
    ROCKET: {
        KEY: "rocket",
        PATH: "assets/Obstacles/Missile/missile.png",
        FRAME_W: 32,
        FRAME_H: 32,
    },
    WARNING: {
        KEY: "warning",
        PATH: "assets/Obstacles/Missile/missileAlert.png",
        FRAME_W: 64,
        FRAME_H: 64,
    },
    EXPLOSION: {
        KEY: "explosion",
        PATH: "assets/Obstacles/Missile/missileExplosion.png",
        FRAME_W: 64,
        FRAME_H: 64,
    },
    UPGRADE: {
        KEY: "upgrade",
        PATH: "assets/Pickup/pickup.png",
        FRAME_W: 128,
        FRAME_H: 128,
    },
    GRAVITY_SUIT: {
        KEY: "gravitysuit",
        PATH: "assets/new_feature/vehicleGravitysuit.png",
        FRAME_W: 42,
        FRAME_H: 42,
    },
    ROCKET_FIRE: {
        KEY: "rocketfire",
        PATH: "assets/Obstacles/Missile/missileEffects.png",
        FRAME_W: 64,
        FRAME_H: 64,
    },
    SPEEDUP: {
        KEY: "speedup",
        PATH: "assets/new/spdup.png",
        FRAME_W: 128,
        FRAME_H: 128,
    },
    LAZER_HEAD: {
        KEY: "lazerhead",
        PATH: "assets/Obstacles/Laser/laser.png",
        FRAME_W: 128,
        FRAME_H: 128,
    },
    LASER: {
        KEY: "laser",
        PATH: "assets/Obstacles/Laser/laserPower.png",
        FRAME_W: 64,
        FRAME_H: 64,
    },
};

export const AUDIO = {
    SHOOTING: { KEY: "shooting", PATH: "assets/SFX/Jetpack/jetpack_fireLP.mp3" },
    STOP_SHOOTING: { KEY: "stopshooting", PATH: "assets/SFX/Jetpack/Jetpack_stop.mp3" },
    PLAYING_BGM: { KEY: "playingBGM", PATH: "assets/BGM/Music_Level.mp3" },
    MENU_BGM: { KEY: "menuBGM", PATH: "assets/BGM/Music_Menu.mp3" },
    POWERUP: { KEY: "powerup", PATH: "assets/SFX/Effects/game.mp3" },
    COINSOUND: { KEY: "coinsound", PATH: "assets/SFX/Obstacle/Coin/coin_pickup_1.mp3" },
    SMASH: { KEY: "smash", PATH: "assets/SFX/Environtment/window_smash.mp3" },
    PLAYER_ELEC: { KEY: "playerelec", PATH: "assets/SFX/Barry/Player_bones.mp3" },
    PLAYER_HURT: { KEY: "playerhurt", PATH: "assets/SFX/Barry/Player_hurt_2.mp3" },
    HEADSTART_START: { KEY: "headstart_start", PATH: "assets/new/audio/headstart_start.mp3" },
    HEADSTART_STOP: { KEY: "headstart_stop", PATH: "assets/new/audio/headstart_stop.mp3" },
    HEADSTART_MID: { KEY: "headstart_mid", PATH: "assets/new/audio/headstart_build.mp3" },
    HEADSTART_LOOP: { KEY: "headstart_lp", PATH: "assets/new/audio/headstart_lp.mp3" },
    ROCKET_WARNING: {
        KEY: "rocketwarning",
        PATH: "assets/SFX/Obstacle/Missile/missile_warning.mp3",
    },
    ROCKET_LAUNCH: { KEY: "rocketlaunch", PATH: "assets/SFX/Obstacle/Missile/missile_launch.mp3" },
    ROCKET_EXPLODE: {
        KEY: "rocketexplode",
        PATH: "assets/SFX/Obstacle/Missile/rocket_explode_1.mp3",
    },
    HIT: { KEY: "hit", PATH: "assets/new/audio/pickupShieldHit.mp3" },
    RUN_1: { KEY: "run_1", PATH: "assets/SFX/Barry/run_metal_left_1.mp3" },
    RUN_2: { KEY: "run_2", PATH: "assets/SFX/Barry/run_metal_left_2.mp3" },
    RUN_3: { KEY: "run_3", PATH: "assets/SFX/Barry/run_metal_left_3.mp3" },
    RUN_4: { KEY: "run_4", PATH: "assets/SFX/Barry/run_metal_left_4.mp3" },
};

export const JSON_DATA = {
    COIN1: { KEY: "coin1", PATH: "assets/tile/coin1.json" },
};

export const TILEMAP = {
    AQUARIUM: { KEY: "aquarium_map", PATH: "assets/tile/aquariumtile.json" },
    HALL: { KEY: "hall_map", PATH: "assets/tile/hall.json" },
    ROOM1: { KEY: "room1_map", PATH: "assets/tile/window.json" },
};
