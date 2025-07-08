import { Elec } from "../../../objects/moving-objects/obstacle/Elec/Elec";
import { Upgrade } from "../../../objects/moving-objects/upgrade/Upgrade";
import { Worker } from "../../../objects/moving-objects/worker/Worker";
import { GameManager } from "../../GameManager";
import { UiContainer } from "../../UI/UIContainter";
import { GameScene } from "../GameScene";
import { GameState } from "./GameState";
export class PlayingState extends GameState {
    scoreBox: UiContainer;
    scoretext: Phaser.GameObjects.Text;
    cointext: Phaser.GameObjects.Text;
    worker: Worker[] = [];
    upgrade: Upgrade;
    Booster: Phaser.GameObjects.Sprite;
    price: Phaser.GameObjects.Text;
    constructor(scene: GameScene) {
        super(scene);

        this.playingsound = this.scene.sound.add("playingBGM", { loop: true });
        this.addText();
        this.scoreBox = new UiContainer(this.scene, 100, 200, 100, 50).setVisible(false);
        this.scoreBox.add(this.scoretext);
        this.scoreBox.add(this.cointext);
        this.upgrade = new Upgrade(this.scene, Phaser.Math.Between(5000, 10000), 500);
        for (var i = 0; i < 10; i++) this.worker.push(new Worker(this.scene, 2000, 600));
        this.Booster = this.scene.add.sprite(this.scene.cameras.main.width / 2, 500, "booster");
        this.price = this.scene.add
            .text(this.scene.cameras.main.width / 2, 550, "10000", {
                fontSize: "40px",
                fontFamily: "Courier",
                color: "#ffff00",
                align: "center",
                fontStyle: "bold",
                stroke: "#000000",
                strokeThickness: 5,
            })
            .setOrigin(0.5);
        this.price.setVisible(false);
        this.Booster.once("pointerdown", () => {
            console.log("Booster clicked");
            this.Booster.setActive(false).setVisible(false);
            this.scene.switchState("dashing");
            this.scene.played = true;
            this.price.setVisible(false);
            GameManager.payCoin(10000);
        });
        this.Booster.setActive(false).setVisible(false);
    }
    public onEnter(): void {
        if (!this.playingsound.isPlaying) this.playingsound.play();
        GameManager.coin = 0;
        this.scoreBox.setVisible(true);
        if (!this.scene.played && GameManager.maxCoin >= 10000) {
            this.Booster.setActive(true).setVisible(true).setInteractive();

            this.scene.tweens.add({
                targets: this.Booster,
                alpha: { from: 0, to: 1 },
                yoyo: true,
                duration: 1000,
                loop: 2,
                onComplete: () => {
                    this.Booster.setActive(false).setVisible(false);
                    this.scene.played = true;
                    this.price.setVisible(false);
                },
            });
            this.price.setVisible(true);
        }
        this.scene.played = true;
    }
    elec: Elec[] = [];
    progress: number;
    playingsound: Phaser.Sound.BaseSound;
    public onUpdate(time: number, delta: number): void {
        this.worker.forEach((element) => {
            element.update();
        });
        this.upgrade.move();
        this.scene.coinManager.update();
        this.scoretext.text = String(GameManager.score);
        this.cointext.text = String(GameManager.coin);
        this.scene.bg.update();
        this.scene.player.update(time, delta);
        this.scene.progress += delta;
        this.progress += delta;
        GameManager.score += Math.round((GameManager.speed * delta) / 1000);
        if (GameManager.score > GameManager.maxScore) GameManager.setHighScore();
        if (this.scene.progress >= 2000) {
            GameManager.speed += this.scene.player.isdead ? -100 : 5;
            GameManager.speed = Math.max(0, GameManager.speed);
            this.scene.progress = 0;

            if (!this.scene.player.isdead) {
                const rand = Phaser.Math.Between(0, 2);
                switch (rand) {
                    case 0:
                        this.scene.coinManager.test(this.scene);
                        break;
                    case 1:
                        this.RandomElec();
                        break;
                    case 2:
                        this.scene.rockets.getRocket(this.scene);
                        break;
                }
            }
        }

        this.scene.zapManager.getChildren().forEach((element) => {
            element.update();
        });
        // this.scene.rockets.getChildren().forEach((element) => {
        //     element.update();
        // });
    }

    private RandomElec(): Elec {
        let t = Phaser.Math.Between(0, 2);
        let y = Phaser.Math.Between(
            Math.max(this.scene.player.y - 100, 250),
            Math.min(800, this.scene.player.y + 100)
        );
        if (t == 0) {
            return this.scene.zapManager.getElec(
                this.scene,
                2000,
                y,
                Phaser.Math.Between(100, 200),
                Phaser.Math.Between(0, 1) === 0
                    ? Phaser.Math.Between(-200, -100)
                    : Phaser.Math.Between(100, 200)
            );
        }
        if (t == 1) {
            return this.scene.zapManager.getElec(
                this.scene,
                2000,
                y,
                Phaser.Math.Between(100, 200),
                0
            );
        } else {
            return this.scene.zapManager.getElec(
                this.scene,
                2000,
                y,
                0,
                Phaser.Math.Between(0, 1) === 0
                    ? Phaser.Math.Between(-200, -100)
                    : Phaser.Math.Between(100, 100)
            );
        }
    }
    public onExit(): void {
        // this.worker.forEach((element) => {
        //     element.rest();
        // });
        this.playingsound.stop();
        this.scoreBox.setVisible(false);
        this.scene.coinManager.disableAll();
        this.scene.zapManager.disableAll();
        this.scene.rockets.disableAll();
    }

    private addText() {
        let score = GameManager.score;
        this.scoretext = this.scene.add
            .text(0, 10, String(score), {
                fontSize: "20px",
                fontFamily: "Courier",
                color: "#ffffff",
                align: "center",
                fontStyle: "bold",
                stroke: "#000000",
                strokeThickness: 5,
            })
            .setOrigin(0.5);
        let coin = GameManager.coin;
        this.cointext = this.scene.add
            .text(0, -10, String(coin), {
                fontSize: "20px",
                fontFamily: "Courier",
                color: "#fff000",
                align: "center",
                fontStyle: "bold",
                stroke: "#000000",
                strokeThickness: 5,
            })
            .setOrigin(0.5);
    }
}
