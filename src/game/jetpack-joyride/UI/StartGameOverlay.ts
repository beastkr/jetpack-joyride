import { GameManager } from "../GameManager";
import { UiContainer } from "./UIContainter";

export class StartGameOverlay extends Phaser.GameObjects.Container {
    logo: Phaser.GameObjects.Sprite;
    center: { x: number; y: number };
    text: Phaser.GameObjects.Text;
    cointext: Phaser.GameObjects.Text;

    scoretext: Phaser.GameObjects.Text;
    coinLayout: UiContainer;

    constructor(scene: Phaser.Scene) {
        super(scene);
        this.center = {
            x: this.scene.cameras.main.width / 2,
            y: this.scene.cameras.main.height / 2,
        };
        this.addLogo();
        this.addText();
        this.addCoinText();
        this.addScoreText();
        this.addBox();
        this.scene.add.existing(this);
    }

    private addCoinText() {
        let coin = GameManager.maxCoin;
        this.cointext = this.scene.add
            .text(0, -10, String(coin), {
                fontSize: "20px",
                fontFamily: "Courier",
                color: "#ffff00",
                align: "center",
                fontStyle: "bold",
                stroke: "#000000",
                strokeThickness: 5,
            })
            .setOrigin(0.5);
    }
    private addScoreText() {
        let score = GameManager.maxScore;
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
    }
    addBox() {
        this.coinLayout = new UiContainer(
            this.scene,
            this.center.x - 100,
            -this.center.y + 300,
            100,
            50
        );
        this.add(this.coinLayout);
        this.coinLayout.add(this.cointext);
        this.coinLayout.add(this.scoretext);
    }

    private addText() {
        this.text = this.scene.add
            .text(0, 200, "TOUCH ANYWHERE TO PLAY!", {
                fontSize: "30px",
                fontFamily: "Courier",
                color: "#ffffff",
                align: "center",
                fontStyle: "bold",
                stroke: "#000000",
                strokeThickness: 5,
            })
            .setOrigin(0.5);
        this.scene.tweens.add({
            targets: this.text,
            alpha: { from: 0, to: 1 },
            duration: 1000,
            yoyo: true,
            repeat: -1, // infinite fade in/out
        });

        this.add(this.text);
    }

    private addLogo() {
        this.setPosition(this.center.x, this.center.y);
        this.logo = this.scene.add.sprite(0, 0, "jetlogo");
        this.scene.tweens.add({
            targets: this.logo,
            alpha: { from: 0, to: 1 },
            duration: 1000,
        });
        this.add(this.logo);
    }
}
