import { BackGroundLoop } from "../../objects/moving-objects/background/BackGroundLoop";
import { CoinManager } from "../../objects/moving-objects/coins/CoinManager";
import { Elec } from "../../objects/moving-objects/obstacle/Elec/Elec";
import { Player } from "../../objects/player/Player";
import { GameManager } from "../GameManager";

export class GameScene extends Phaser.Scene {
    bg: BackGroundLoop;
    player: Player;
    progress: number = 0;
    constructor() {
        super("GameScene");
    }
    preload() {
        this.LoadBodySprite();
        this.LoadHeadSprite();
        this.LoadJetPack();
        this.LoadCoin();
        this.LoadElec();
        this.load.image("room1", "assets/Levels/Room1/room1_1.png");
    }
    create() {
        this.bg = new BackGroundLoop(this);
        this.player = new Player(this, 100, 300);
        this.createBot();
        this.createTop();
        new Elec(this, 2000, 500, 400, 300);
        CoinManager.test(this);
    }
    update(time: number, delta: number) {
        CoinManager.update(time, delta);
        this.bg.update();
        this.player.update();
        this.progress += delta;
        if (this.progress >= 2000) {
            GameManager.speed += 5;
            this.progress = 0;
            CoinManager.test(this);
        }
    }

    private createBot() {
        let bot = new Phaser.GameObjects.Rectangle(this, 400, 800, 800, 40);

        this.physics.add.existing(bot);
        this.physics.add.collider(bot, this.player, () => {
            this.player.switchState("walking");
        });
        (bot.body as Phaser.Physics.Arcade.Body).setImmovable(true).setAllowGravity(false);
        this.add.existing(bot);
    }

    private createTop() {
        let top = new Phaser.GameObjects.Rectangle(this, 400, 250, 800, 40);

        this.physics.add.existing(top);
        this.physics.add.collider(top, this.player);
        (top.body as Phaser.Physics.Arcade.Body).setImmovable(true).setAllowGravity(false);
        this.add.existing(top);
    }

    // LOADING FUNCTION ///
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
    }
}
