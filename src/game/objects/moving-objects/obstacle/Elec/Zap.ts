import { SPRITESHEET } from "../../../../../assets";
import { Animator } from "../../../../jetpack-joyride/Animator";
import { GameScene } from "../../../../jetpack-joyride/scenes/GameScene";
import { Obstacle } from "../Obstacle";
export class Zap extends Obstacle {
    already: boolean = false;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.setDepth(80);

        this.zapAnim();
        Animator.play(this, "zapFX");
        this.setScale(1, 0.5);

        this.scene.physics.add.overlap(this, (this.scene as GameScene).player, () => {
            let player = (this.scene as GameScene).player;
            if (!player.isdead) player.switchState("deadbyzap");
        });
    }
    public override move(): void {
        (this.body as Phaser.Physics.Arcade.Body).setVelocityX(0);
    }
    add(container: Phaser.GameObjects.Container) {
        if (this.already) return;
        container.add(this);
    }

    private zapAnim() {
        Animator.createAnim(this.scene, "zapFX", SPRITESHEET.ZAP_FX.KEY, 0, 31);
    }
}
