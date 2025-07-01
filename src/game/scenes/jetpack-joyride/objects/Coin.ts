import { Animator } from "../../../Animator";
import { GameScene } from "../GameScene";

export class Coin extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "coin");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        Animator.play(this, "coin_flip");

        this.setVelocityX(-(scene as GameScene).speed);
        this.setImmovable(true);
        (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
        this.scene.physics.add.overlap(
            this,
            (this.scene as GameScene).player,
            () => {
                console.log("scored");
                this.destroy();
            }
        );
    }
}
