import { AUDIO, SPRITESHEET } from "../../../../assets";
import { Animator } from "../../../jetpack-joyride/Animator";
import { GameManager } from "../../../jetpack-joyride/GameManager";
import { MovingObject } from "../MovingObject";

export class Upgrade extends MovingObject {
    upgradesound: Phaser.Sound.BaseSound;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, SPRITESHEET.UPGRADE.KEY);
        this.createUpgradeAnim();
        this.upgradesound = this.scene.sound.add(AUDIO.POWERUP.KEY);
        Animator.play(this, "upgrade");
        this.scene.physics.add.overlap(this, (this.scene as any).player, () => {
            if (!(this.scene as any).player.isdead) this.onCollect();
        });
        this.scale = 0.8;
        // this.move();
        console.log("Upgrade created at", x, y);
    }
    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);
        // this.move();
        if (this.x < -1000) this.disableBody(true, true).setVisible(false);
    }
    public move(): void {
        this.speed = GameManager.speed;
        (this.body as Phaser.Physics.Arcade.Body).setVelocityX(-this.speed);
    }

    private createUpgradeAnim() {
        Animator.createAnim(this.scene, "upgrade", SPRITESHEET.UPGRADE.KEY, 0, 7);
    }
    private onCollect() {
        this.upgradesound.play();
        this.disableBody(true, true).setVisible(false);
        (this.scene as any).player.switchState("upgrade");
    }
    private create(x: number, y: number) {
        this.setVisible(true);
        this.enableBody(true, x, y, true, true);
        Animator.play(this, "upgrade");
        this.move();
    }
}
