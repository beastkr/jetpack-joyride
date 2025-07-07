import { BackGroundLoop } from "../../objects/moving-objects/background/BackGroundLoop";
import { CoinPool } from "../../objects/moving-objects/coins/CoinPool";
import { ElecPool } from "../../objects/moving-objects/obstacle/Elec/ElecPool";
import { RocketPool } from "../../objects/moving-objects/obstacle/Rocket/RocketPool";
import { Upgrade } from "../../objects/moving-objects/upgrade/Upgrade";
import { Player } from "../../objects/player/Player";
import { GravitySuit } from "../../objects/player/states/Upgrade/GravitySuit";
import { GameManager } from "../GameManager";
import { GameState } from "./GameState/GameState";
import { PendingState } from "./GameState/PendingState";
import { PlayingState } from "./GameState/PlayingState";

export class GameScene extends Phaser.Scene {
    bg: BackGroundLoop;
    player: Player;
    progress: number = 0;
    bot: Phaser.GameObjects.Rectangle;
    coinManager: CoinPool;
    currentState: GameState;
    states: { [key: string]: GameState };
    zapManager: ElecPool;
    rockets: RocketPool;
    constructor() {
        super("GameScene");
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
        this.load.image("room1", "assets/Levels/Room1/room1_1.png");
        this.load.image("shadow", "assets/Characters/effect_shadow.png");
        this.load.image("bullet", "assets/Characters/Effects/effect_smgbullet.png");
        this.load.image("bulletshell", "assets/Characters/Effects/shell.png");
    }
    create() {
        this.cameras.main.setViewport(0, -128, 1920, 1024);
        GameManager.speed = 300;

        this.bg = new BackGroundLoop(this);
        this.player = new Player(this, -500, 500);
        this.createBot();
        this.createTop();
        this.coinManager = new CoinPool(this);
        new Upgrade(this, 1000, 500);
        this.stateInit();
        this.zapManager = new ElecPool(this);
        this.rockets = new RocketPool(this);
    }
    public switchState(key: string) {
        if (this.currentState === this.states[key]) return;
        if (this.currentState) this.currentState.onExit();
        this.currentState = this.states[key];
        this.currentState.onEnter();
    }
    update(time: number, delta: number) {
        this.currentState.onUpdate(time, delta);
    }

    private createBot() {
        this.bot = new Phaser.GameObjects.Rectangle(this, 100, 1000, 3000, 500);

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
        };
        this.switchState("pending");
    }

    // LOADING FUNCTION ///

    private LoadUpgrade() {
        this.load.spritesheet("upgrade", "assets/Pickup/pickup.png", {
            frameWidth: 128,
            frameHeight: 128,
        });
    }

    private LoadBodySprite() {
        this.load.spritesheet("player_body", "assets/Characters/Barry/defaultBody.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
    }

    private LoadHeadSprite() {
        this.load.spritesheet("player_head", "assets/Characters/Barry/defaultHead.png", {
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
        this.load.spritesheet("coin", "assets/Entities/coin_sheet.png", {
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
    }
    private LoadAudio() {
        this.load.audio("shooting", "assets/SFX/Jetpack/jetpack_fireLP.mp3");
        this.load.audio("stopshooting", "assets/SFX/Jetpack/Jetpack_stop.mp3");
        for (let i = 1; i < 5; i++) {
            this.load.audio(`run_${i}`, [`assets/SFX/Barry/run_metal_left_${i}.mp3`]);
        }
        this.load.audio("playingBGM", "assets/BGM/Music_Level.mp3");
        this.load.audio("menuBGM", "assets/BGM/Music_Menu.mp3");
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
}
