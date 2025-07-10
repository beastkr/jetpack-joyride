import { BGLoop } from "../../objects/moving-objects/background/BGLoop";
import { CoinPool } from "../../objects/moving-objects/coins/CoinPool";
import { ElecPool } from "../../objects/moving-objects/obstacle/Elec/ElecPool";
import { RocketPool } from "../../objects/moving-objects/obstacle/Rocket/RocketPool";
import { Worker } from "../../objects/moving-objects/worker/Worker";
import { Player } from "../../objects/player/Player";
import { GravitySuit } from "../../objects/player/states/Upgrade/GravitySuit";
import { GameManager } from "../GameManager";
import { StartGameOverlay } from "../UI/StartGameOverlay";
import { DashState } from "./GameState/DashState";
import { GameState } from "./GameState/GameState";
import { GameStateMachine } from "./GameState/GameStateMachine";
import { OverState } from "./GameState/OverState";
import { PendingState } from "./GameState/PendingState";
import { PlayingState } from "./GameState/PlayingState";

export class GameScene extends Phaser.Scene implements JetpackJoyride.IGameScene {
    worker: Worker[] = [];
    played: boolean = false;
    player: Player;
    progress: number = 0;
    bot: Phaser.GameObjects.Rectangle;
    coinManager: CoinPool;
    private stateMachine: GameStateMachine;
    bg: BGLoop;
    // Legacy properties for backward compatibility
    currentState: GameState;
    states: { [key: string]: GameState };
    zapManager: ElecPool;
    rockets: RocketPool;
    startOverlay: StartGameOverlay;
    dieOnce: boolean = false;
    constructor() {
        super("GameScene");
        this.stateMachine = new GameStateMachine();
    }
    preload() {
        this.LoadBodySprite();
        this.LoadHeadSprite();
        this.LoadJetPack();
        this.LoadCoin();
        this.LoadElec();
        this.LoadUI();
        this.LoadAudio();
        this.LoadUpgrade();
        this.LoadUpgradeComponents();
        this.LoadParticle();
        this.LoadBackGround();
        this.load.image("room1", "assets/Levels/Room1/room1_1.png");
        this.load.image("shadow", "assets/Characters/effect_shadow.png");
        this.load.image("bullet", "assets/Characters/Effects/effect_smgbullet.png");
        this.load.image("bulletshell", "assets/Characters/Effects/shell.png");
    }
    create() {
        this.played = false;
        this.cameras.main.setViewport(0, -128, 1720, 1080);
        GameManager.speed = 300;
        this.bg = new BGLoop(this);

        this.player = new Player(this, -500, 500);

        this.createBot();
        this.createTop();
        this.coinManager = new CoinPool(this);
        for (var i = 0; i < 5; i++) this.worker.push(new Worker(this, 2000, 600));
        this.worker.forEach((element) => {
            (element as Worker).rest();
        });
        this.stateInit();
        this.zapManager = new ElecPool(this);
        this.rockets = new RocketPool(this);
        this.switchState("pending");
    }
    public switchState(key: string) {
        // Use state machine for state switching
        this.stateMachine.switchState(key);

        // Update legacy currentState for backward compatibility
        this.currentState = this.stateMachine.currentState!;
    }
    update(time: number, delta: number) {
        // Update state machine
        this.stateMachine.update(time, delta);
        if (this.bg) this.bg.update(time, delta);
        // Update legacy currentState for backward compatibility
        this.currentState = this.stateMachine.currentState!;
    }

    private createBot() {
        this.bot = new Phaser.GameObjects.Rectangle(this, 100, 1000, 8000, 500);

        this.physics.add.existing(this.bot);

        this.physics.add.collider(this.bot, this.player, () => {
            this.player.switchState("walking");
        });
        (this.bot.body as Phaser.Physics.Arcade.Body).setImmovable(true).setAllowGravity(false);
        this.add.existing(this.bot);
    }

    private createTop() {
        let top = new Phaser.GameObjects.Rectangle(this, 400, 20, 3000, 500);

        this.physics.add.existing(top);
        this.physics.add.collider(top, this.player, () => {
            if (this.player.vehicle instanceof GravitySuit) this.player.switchState("walking");
        });
        (top.body as Phaser.Physics.Arcade.Body).setImmovable(true).setAllowGravity(false);
        this.add.existing(top);
    }

    private stateInit() {
        this.states = {
            pending: new PendingState(this),
            playing: new PlayingState(this),
            dashing: new DashState(this),
            over: new OverState(this),
        };

        // Add states to state machine
        Object.entries(this.states).forEach(([key, state]) => {
            this.stateMachine.addState(key, state);
        });
    }

    // LOADING FUNCTION ///

    private LoadBackGround() {
        this.load.image("aquarium", "assets/atlas/aquarium_assets.png");
        this.load.tilemapTiledJSON("aquarium_map", "assets/tile/aquariumtile.json");
        this.load.image("hall", "assets/atlas/warehouse_assets.png");
        this.load.tilemapTiledJSON("hall_map", "assets/tile/hall.json");
        this.load.image("room1", "assets/Levels/Room1/room1_1.png");
        this.load.tilemapTiledJSON("room1_map", "assets/tile/window.json");
    }

    private LoadUpgrade() {
        this.load.spritesheet("upgrade", "assets/Pickup/pickup.png", {
            frameWidth: 128,
            frameHeight: 128,
        });
        this.load.image("booster", "assets/new/skip.png");
    }

    private LoadBodySprite() {
        this.load.spritesheet("player_body", "assets/Characters/Barry/defaultBody.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("worker_body", "assets/workers/worker1Body.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
    }

    private LoadHeadSprite() {
        this.load.spritesheet("player_head", "assets/Characters/Barry/defaultHead.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("worker_head", "assets/workers/worker1Head.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
    }
    private LoadJetPack() {
        this.load.spritesheet("player_jetpack", "assets/Characters/Jetpacks/jetpackDefault.png", {
            frameWidth: 32,
            frameHeight: 44,
        });
        this.load.spritesheet("jet_fx", "assets/Characters/Effects/jetfx.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet("bullet_fx", "assets/Characters/Effects/bulletfx.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
    }
    private LoadCoin() {
        // Load coin pattern JSON files
        this.load.json("coin1", "assets/tile/coin1.json");
        this.load.json("heart", "assets/tile/heart.json");
        this.load.json("dang", "assets/tile/dang.json");
        this.load.json("star", "assets/tile/star.json");

        this.load.spritesheet("coin", "assets/Entities/coin_sheet.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("bigcoin", "assets/new_feature/coinAlt.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
    }
    private LoadElec() {
        this.load.spritesheet("elecOn", "assets/Obstacles/Zapper/orbAnim.png", {
            frameWidth: 62,
            frameHeight: 42,
        });
        this.load.spritesheet("elecOnGlow", "assets/Obstacles/Zapper/RegularZappers/glow.png", {
            frameWidth: 128,
            frameHeight: 128,
        });
        this.load.spritesheet("zapFX", "assets/Obstacles/Zapper/RegularZappers/zapEffect.png", {
            frameWidth: 32,
            frameHeight: 117,
        });
        this.load.spritesheet("rocket", "assets/Obstacles/Missile/missile.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("warning", "assets/Obstacles/Missile/missileAlert.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet("explosion", "assets/Obstacles/Missile/missileExplosion.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
    }

    private LoadUI() {
        this.load.image("jetlogo", "assets/Levels/Title/Objects/title_small.png");
        this.load.image("containerEdge", "assets/UI/container/edge.png");
        this.load.image("containerFiller", "assets/UI/container/filler.png");
        this.load.image("containerLeft", "assets/UI/container/left.png");
        this.load.image("containerTop", "assets/UI/container/top.png");
        this.load.image("revive", "assets/new/reviveIcon_TVOS.png");
    }
    private LoadAudio() {
        this.load.audio("shooting", "assets/SFX/Jetpack/jetpack_fireLP.mp3");
        this.load.audio("stopshooting", "assets/SFX/Jetpack/Jetpack_stop.mp3");
        for (let i = 1; i < 5; i++) {
            this.load.audio(`run_${i}`, [`assets/SFX/Barry/run_metal_left_${i}.mp3`]);
        }
        this.load.audio("playingBGM", "assets/BGM/Music_Level.mp3");
        this.load.audio("menuBGM", "assets/BGM/Music_Menu.mp3");
        this.load.audio("powerup", "assets/SFX/Effects/game.mp3");
        this.load.audio("coinsound", "assets/SFX/Obstacle/Coin/coin_pickup_1.mp3");
        this.load.audio("smash", "assets/SFX/Environtment/window_smash.mp3");
        this.load.audio("playerelec", "assets/SFX/Barry/Player_bones.mp3");
        this.load.audio("playerhurt", "assets/SFX/Barry/Player_hurt_2.mp3");
        this.load.audio("headstart_start", "assets/new/audio/headstart_start.mp3");
        this.load.audio("headstart_stop", "assets/new/audio/headstart_stop.mp3");
        this.load.audio("headstart_mid", "assets/new/audio/headstart_build.mp3");
        this.load.audio("headstart_lp", "assets/new/audio/headstart_lp.mp3");

        this.load.audio("rocketwarning", "assets/SFX/Obstacle/Missile/missile_warning.mp3");
        this.load.audio("rocketlaunch", "assets/SFX/Obstacle/Missile/missile_launch.mp3");
        this.load.audio("rocketexplode", "assets/SFX/Obstacle/Missile/rocket_explode_1.mp3");
        this.load.audio("hit", "assets/new/audio/pickupShieldHit.mp3");
    }
    private LoadUpgradeComponents() {
        this.load.spritesheet("gravitysuit", "assets/new_feature/vehicleGravitysuit.png", {
            frameWidth: 42,
            frameHeight: 42,
        });
        for (var i = 1; i < 7; i++) {
            this.load.image(
                `gs_frag${i}`,
                `assets/new_feature/fragment gravity suit/gravitysuitfrag${i}.png`
            );
        }
        this.load.image("gs_head", `assets/new_feature/fragment gravity suit/gs_head.png`);
        this.load.image("gs_head", `assets/new_feature/fragment gravity suit/gs_body.png`);
    }
    private LoadParticle() {
        this.load.image("dust", "assets/particles/dust.png");
        this.load.spritesheet("rocketfire", "assets/Obstacles/Missile/missileEffects.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet("speedup", "assets/new/spdup.png", {
            frameWidth: 128,
            frameHeight: 128,
        });
    }
}
