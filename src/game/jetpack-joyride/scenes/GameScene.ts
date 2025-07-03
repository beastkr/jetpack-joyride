import { BackGroundLoop } from "../../objects/moving-objects/background/BackGroundLoop";
import { CoinPool } from "../../objects/moving-objects/coins/CoinPool";
import { Elec } from "../../objects/moving-objects/obstacle/Elec/Elec";
import { Player } from "../../objects/player/Player";
import { GameManager } from "../GameManager";

export class GameScene extends Phaser.Scene {
    bg: BackGroundLoop;
    player: Player;
    progress: number = 0;
    bot: Phaser.GameObjects.Rectangle;
    coinManager: CoinPool;
    obstacle: Phaser.GameObjects.GameObject[];
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
        this.load.image("shadow", "assets/Characters/effect_shadow.png");
        this.load.image("bullet", "assets/Characters/Effects/effect_smgbullet.png");
    }
    create() {
        this.obstacle = [];
        this.cameras.main.setViewport(0, -128, 1920, 1024); // cuts 100px from top and bottom
        GameManager.speed = 300;
        this.bg = new BackGroundLoop(this);
        this.player = new Player(this, 100, 500);
        this.createBot();
        this.createTop();
        this.coinManager = new CoinPool(this);
        this.coinManager.test(this);
    }
    update(time: number, delta: number) {
        this.coinManager.update();
        this.bg.update();
        this.player.update();
        this.progress += delta;
        this.obstacle.forEach((element) => {
            element.update();
        });
        this.obstacle = this.obstacle.filter((ob) => ob.active);
        if (this.progress >= 2000) {
            GameManager.speed += this.player.isdead ? -100 : 5;
            GameManager.speed = GameManager.speed < 0 ? 0 : GameManager.speed;
            this.progress = 0;
            if (!this.player.isdead) {
                this.coinManager.test(this);
                this.obstacle.push(
                    new Elec(
                        this,
                        2000,
                        500,
                        Phaser.Math.Between(100, 200),
                        Phaser.Math.Between(0, 1) === 0
                            ? Phaser.Math.Between(-200, -100)
                            : Phaser.Math.Between(100, 100)
                    )
                );
                console.log(this.obstacle);
            }
        }
    }

    private createBot() {
        this.bot = new Phaser.GameObjects.Rectangle(this, 400, 1000, 800, 500);

        this.physics.add.existing(this.bot);
        this.physics.add.collider(this.bot, this.player, () => {
            this.player.switchState("walking");
        });
        (this.bot.body as Phaser.Physics.Arcade.Body).setImmovable(true).setAllowGravity(false);
        this.add.existing(this.bot);
    }

    private createTop() {
        let top = new Phaser.GameObjects.Rectangle(this, 400, 20, 800, 500);

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
    }
}
