import { Animator } from "../../../../jetpack-joyride/Animator";
import { GameScene } from "../../../../jetpack-joyride/scenes/GameScene";
import { Obstacle } from "../Obstacle";
export class Zap extends Obstacle {
    private isInContainer: boolean = false;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        inContainer: boolean = false
    ) {
        super(scene, x, y, texture);
        this.setDepth(80);
        this.isInContainer = inContainer;

        // Remove from scene if it will be added to a container
        if (inContainer) {
            scene.children.remove(this);
        }

        this.zapAnim();
        Animator.play(this, "zapFX");
        this.setScale(1, 0.5);

        this.scene.physics.add.overlap(this, (this.scene as GameScene).player, () => {
            let player = (this.scene as GameScene).player;
            if (!player.isdead) player.switchState("deadbyzap");
        });
    }

    // Override move to do nothing when part of a container
    public override move(): void {
        if (this.isInContainer) {
            // Don't move independently - let the container handle movement
            if (this.body) {
                (this.body as Phaser.Physics.Arcade.Body).setVelocityX(0);
            }
        } else {
            // Use parent behavior if not in container
            super.move();
        }
    }

    private zapAnim() {
        Animator.createAnim(this.scene, "zapFX", "zapFX", 0, 31);
    }
}
