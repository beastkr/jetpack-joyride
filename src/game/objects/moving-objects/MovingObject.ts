import { GameManager } from "../../jetpack-joyride/GameManager";

export abstract class MovingObject extends Phaser.Physics.Arcade.Sprite {
    protected speed: number;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body)?.setImmovable(true).setAllowGravity(false);
        this.speed = GameManager.speed;
        this.move();
    }

    public abstract move(): void;
}
