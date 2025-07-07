import { Physics } from "phaser";
import { GameManager } from "../../GameManager";
import { StartGameOverlay } from "../../UI/StartGameOverlay";
import { GameScene } from "../GameScene";
import { GameState } from "./GameState";
export class PendingState extends GameState {
    playingsound: Phaser.Sound.BaseSound;
    startOverlay: StartGameOverlay;
    constructor(scene: GameScene) {
        super(scene);
        this.playingsound = this.scene.sound.add("menuBGM", { loop: true });
    }
    public onEnter(): void {
        this.playingsound.play();
        if (!this.startOverlay) this.startOverlay = new StartGameOverlay(this.scene);
        else this.startOverlay.setActive(true).setVisible(true);
        (this.scene.player.body as Physics.Arcade.Body).setAllowGravity(false);
        GameManager.speed = 0;
        this.scene.input.once("pointerdown", () => {
            (this.scene.player.body as Physics.Arcade.Body).setAllowGravity(true);
            this.scene.cameras.main.shake(250, 0.01);
            (this.scene.player.body as Phaser.Physics.Arcade.Body).setVelocityX(300);

            this.scene.tweens.add({
                targets: this.startOverlay,
                alpha: { from: 1, to: 0 },
                duration: 1000,
                onComplete: () => {
                    this.startOverlay.setActive(false).setVisible(false);
                },
            });
        });
    }
    public onUpdate(time: number, delta: number): void {
        this.scene.bg.update();
        this.startOverlay.update();
        if (this.scene.player.x >= 300) this.scene.switchState("playing");
    }
    public onExit(): void {
        this.playingsound.stop();
        this.startOverlay.setActive(false).setVisible(false);
        GameManager.speed = 300;
        (this.scene.player.body as Phaser.Physics.Arcade.Body).setVelocityX(0);
    }
}
