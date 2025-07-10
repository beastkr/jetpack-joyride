import { Physics } from "phaser";
import { Worker } from "../../../objects/moving-objects/worker/Worker";
import { GameManager } from "../../GameManager";
import { StartGameOverlay } from "../../UI/StartGameOverlay";
import { GameScene } from "../GameScene";
import { GameState } from "./GameState";
export class PendingState extends GameState {
    playingsound: Phaser.Sound.BaseSound;
    startOverlay: StartGameOverlay;
    explode: Phaser.GameObjects.Particles.ParticleEmitter;
    explodesound: Phaser.Sound.BaseSound;
    constructor(scene: GameScene) {
        super(scene);
        this.explodesound = this.scene.sound.add("smash");
        this.playingsound = this.scene.sound.add("menuBGM", { loop: true });
        this.startOverlay = new StartGameOverlay(this.scene);
        this.startOverlay.setVisible(false);
        this.explode = this.scene.add.particles(-15, 700, "dust", {
            angle: { min: -110, max: 110 }, // movement direction
            speed: 300,
            scale: { min: 1, max: 2 },
            rotate: { min: 0, max: 360 },
            alpha: { start: 1, end: 0 },
            lifespan: 1000,
            frequency: 50,
            quantity: 5,
            emitting: false,
        });
        this.scene.tweens.add({
            targets: this.startOverlay,
            alpha: { from: 0, to: 1 },
            duration: 1000,
        });
    }
    public onEnter(): void {
        this.startOverlay.resettext();
        this.scene.dieOnce = false;
        this.scene.played = false;
        this.scene.worker.forEach((element) => {
            (element as Worker).rest();
        });
        if (!this.playingsound.isPlaying) {
            this.playingsound.play();
        }

        (this.scene.player.body as Physics.Arcade.Body).setAllowGravity(false);
        GameManager.speed = 0;
        this.scene.tweens.add({
            targets: this.startOverlay,
            alpha: { from: 0, to: 1 },
            duration: 1000,
        });
        this.startOverlay.setVisible(true);
        this.scene.input.once("pointerdown", () => {
            this.explode.start();
            this.explodesound.play();
            (this.scene.player.body as Physics.Arcade.Body).setAllowGravity(true);
            this.scene.cameras.main.shake(250, 0.01);
            (this.scene.player.body as Phaser.Physics.Arcade.Body).setVelocityX(300);

            this.scene.tweens.add({
                targets: this.startOverlay,
                alpha: { from: 1, to: 0 },
                duration: 1000,
                onComplete: () => {
                    this.explode.stop();
                    this.startOverlay.setVisible(false);
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
        this.startOverlay.setVisible(false);
        GameManager.speed = 300;
        (this.scene.player.body as Phaser.Physics.Arcade.Body).setVelocityX(0);
        GameManager.score = 0;
        GameManager.coin = 0;
    }
}
