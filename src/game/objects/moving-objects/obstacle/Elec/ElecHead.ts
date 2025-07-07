import { Animator } from "../../../../jetpack-joyride/Animator";
import { GameScene } from "../../../../jetpack-joyride/scenes/GameScene";
import { Obstacle } from "../Obstacle";

export class ElecHead extends Obstacle {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.headAnimCreate();
        Animator.play(this, "elechead");
        this.scale = 1;

        this.scene.physics.add.overlap(this, (this.scene as GameScene).player, () => {
            (this.scene as GameScene).player.switchState("deadbyzap");
        });
    }
    private headAnimCreate() {
        Animator.createAnim(this.scene, "elechead", "elecOn", 0, 3);
    }
}
