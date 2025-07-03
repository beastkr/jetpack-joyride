import { GameManager } from "../../../jetpack-joyride/GameManager";
import { MovingObject } from "../MovingObject";

export class Obstacle extends MovingObject {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body)?.setAllowGravity(false);
        this.speed = GameManager.speed;
        this.move();
        // this.scene.physics.add.overlap(this, (this.scene as GameScene).player, () => {
        //     this.parentContainer?.destroy();
        // });
    }

    public move(): void {
        this.speed = GameManager.speed;
        (this.body as Phaser.Physics.Arcade.Body).setVelocityX(-this.speed);
    }
}
