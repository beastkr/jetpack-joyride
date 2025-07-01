import { Animator } from "../../Animator";
import { WalkingState } from "../../player-state/WalkingState";
import { BackGround } from "../background/BackGround";
import { Coin } from "./objects/Coin";
import { CoinSpawner } from "./objects/CoinSpawner";
import { Ground } from "./objects/Ground";
import { Player } from "./objects/Player";

export class GameScene extends Phaser.Scene {
    shadow: Phaser.GameObjects.Sprite;
    player: Player;
    ground: Ground;
    background: BackGround[];
    ceiling: Ground;
    progress: number = 0;
    safe: number = 0;
    coin: Coin;
    speed: number = 200;

    constructor() {
        super("GameScene");
    }

    preload() {
        this.load.image("room1", "assets/Levels/Room1/room1FG_1_TVOS.png");
        this.load.image("playerSprite", "assets/player.png");
        this.load.image("player_shadow", "assets/Characters/effect_shadow.png");
        this.load.spritesheet("coin", "assets/Entities/coin1_TVOS.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet(
            "player_body",
            "assets/Characters/Barry/defaultBody.png",
            {
                frameWidth: 32,
                frameHeight: 32,
            }
        );
        this.load.spritesheet(
            "player_head",
            "assets/Characters/Barry/defaultHead.png",
            {
                frameWidth: 32,
                frameHeight: 32,
            }
        );
        this.load.spritesheet(
            "player_jetpack",
            "assets/Characters/Jetpacks/jetpackDefault.png",
            {
                frameWidth: 32,
                frameHeight: 44,
            }
        );
    }

    create() {
        this.background = [];
        Animator.init(this);
        this.background.push(new BackGround(this, 0, 512, "room1"));
        this.background.push(new BackGround(this, 768, 512, "room1"));
        this.background.push(new BackGround(this, 1536, 512, "room1"));
        this.background.push(new BackGround(this, 2304, 512, "room1"));
        console.log(this.background);
        this.shadow = this.add.sprite(320, 780, "player_shadow");
        this.shadow.scale = 2.5;
        this.ground = new Ground(this, 400, 800, 800, 40);
        this.player = new Player(this, 300, 300);
        this.player.scale = 0.8;
        this.ceiling = new Ground(this, 400, 275, 800, 40);
        this.physics.add.collider(this.player, this.ground, () => {
            if (!(this.player.currentState instanceof WalkingState))
                this.player.switchState("walking");
        });
        this.physics.add.collider(this.player, this.ceiling);
        this.coin = new Coin(this, 100, 100);
        CoinSpawner.test(this);
    }
    public update(time: number, delta: number): void {
        super.update(time, delta);
        this.progress += delta;
        this.player.update();
        this.shadow.scale = (500 - 780 - this.player.y) / 350;
        if (this.progress / 10000 > this.safe) {
            this.background.forEach((element) => {
                element.speed += 10;
                this.speed = element.speed;
            });
            this.safe++;
        }
        this.background.forEach((element) => {
            element.update(time, delta);
        });
        for (var i = 0; i < this.background.length; i++) {
            if (this.background[i].x < -512) {
                this.background[i].x =
                    this.background[(i + 1) % this.background.length].x + 2304;
                break;
            }
        }
        this.input.keyboard?.on("keydown-F", () => {
            if (!this.scale.isFullscreen) {
                this.scale.startFullscreen();
            } else {
                this.scale.stopFullscreen();
            }
        });
    }
}
