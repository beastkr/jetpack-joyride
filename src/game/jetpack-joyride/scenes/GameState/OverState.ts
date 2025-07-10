import { Physics } from "phaser";
import { GameManager } from "../../GameManager";
import { GameState } from "./GameState";

export class OverState extends GameState {
    rescueOverlay: Phaser.GameObjects.Sprite;
    rescueCostText: Phaser.GameObjects.Text;

    public onEnter(): void {
        (this.scene.player.body as Physics.Arcade.Body).setAllowGravity(false);
        this.scene.zapManager.disableAll();
        this.scene.rockets.disableAll();
        this.scene.coinManager.disableAll();
        this.scene.worker.forEach((element) => {
            element.rest();
        });
        this.scene.player.rest();

        if (this.scene.dieOnce || GameManager.maxCoin < 1000) {
            this.hideRescueOverlay();
            this.transitionToPending();
            return;
        }
        this.scene.dieOnce = true;
        this.ensureRescueOverlay();
        this.showRescueOverlay();
        this.animateRescueOverlay();
    }

    private transitionToPending(delay: number = 100): void {
        this.scene.time.delayedCall(delay, () => {
            this.scene.player.setVisible(true);
            this.scene.player.setPosition(-500, 500);
            this.scene.switchState("pending");
        });
    }

    private ensureRescueOverlay(): void {
        if (this.rescueOverlay) return;

        const centerX = this.scene.cameras.main.centerX;
        const centerY = 500;

        this.rescueOverlay = this.scene.add
            .sprite(centerX, centerY, "revive")
            .setInteractive()
            .setAlpha(0);

        this.rescueOverlay.on("pointerdown", () => {
            this.scene.switchState("playing");
            this.scene.player.switchState("flying");
            GameManager.speed = 300;
            GameManager.payCoin(1000);
            this.scene.cameras.main.flash(500, 255, 255, 255);
            this.scene.cameras.main.shake(250, 0.01);
            this.hideRescueOverlay();
            this.scene.tweens.killTweensOf(this.rescueOverlay!);
        });

        this.rescueCostText = this.scene.add
            .text(this.scene.cameras.main.width / 2, 550, "1000\n", {
                fontSize: "40px",
                fontFamily: "Courier",
                color: "#ffff00",
                align: "center",
                fontStyle: "bold",
                stroke: "#000000",
                strokeThickness: 5,
            })
            .setOrigin(0.5);
    }

    private showRescueOverlay(): void {
        this.rescueOverlay?.setActive(true).setVisible(true);
        this.rescueCostText?.setActive(true).setVisible(true);
    }

    private hideRescueOverlay(): void {
        this.rescueOverlay?.setActive(false).setVisible(false);
        this.rescueCostText?.setActive(false).setVisible(false);
    }

    private animateRescueOverlay(): void {
        if (!this.rescueOverlay || !this.rescueCostText) return;

        this.scene.tweens.killTweensOf([this.rescueOverlay, this.rescueCostText]);

        this.scene.tweens.add({
            targets: [this.rescueOverlay],
            alpha: { from: 0, to: 1 },
            duration: 1000,
            yoyo: true,
            loop: 2,
            onComplete: () => {
                this.hideRescueOverlay();
                this.transitionToPending();
            },
        });
    }

    public onUpdate(time: number, delta: number): void {}
    public onExit(): void {
        (this.scene.player.body as Physics.Arcade.Body).setAllowGravity(true);
    }
}
