import { GameManager } from "../GameManager";

export class StartGameOverlay extends Phaser.GameObjects.Container {
    logo: Phaser.GameObjects.Sprite;
    center: { x: number; y: number };
    text: Phaser.GameObjects.Text;
    cointext: Phaser.GameObjects.Text;
    constructor(scene: Phaser.Scene) {
        super(scene);
        this.center = {
            x: innerWidth / 2,
            y: innerHeight / 2 + 100,
        };
        this.addLogo();
        this.addText();
        this.addCoinText();
        this.scene.add.existing(this);
        console.log(this);
    }

    private addCoinText() {
        let coin = GameManager.maxCoin;
        this.cointext = this.scene.add.text(
            this.center.x - 200,
            -this.center.y + 200,
            String(coin),
            {
                fontSize: "90px",
                fontFamily: "Courier",
                color: "#ffff00",
                align: "center",
                fontStyle: "bold",
                stroke: "#000000",
                strokeThickness: 5,
            }
        );
        this.add(this.cointext);
    }

    private addText() {
        this.text = this.scene.add.text(0, 200, "TOUCH ANYWHERE TO PLAY!", {
            fontSize: "30px",
            fontFamily: "Courier",
            color: "#ffffff",
            align: "center",
            fontStyle: "bold",
            stroke: "#000000",
            strokeThickness: 5,
        });
        this.text.setOrigin(0.5);
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
