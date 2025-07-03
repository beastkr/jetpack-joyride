import { Animator } from "../../../../jetpack-joyride/Animator";
import { GameScene } from "../../../../jetpack-joyride/scenes/GameScene";
import { Obstacle } from "../Obstacle";
export class Zap extends Obstacle {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.zapAnim();
        Animator.play(this, "zapFX");
        this.setScale(1, 0.8);

        this.scene.physics.add.overlap(this, (this.scene as GameScene).player, () => {
            let player = (this.scene as GameScene).player;
            if (!player.isdead) player.switchState("deadbyzap");
        });
    }
    private zapAnim() {
        Animator.createAnim(this.scene, "zapFX", "zapFX", 0, 31);
    }
}
