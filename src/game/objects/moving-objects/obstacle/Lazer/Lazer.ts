import { Physics } from "phaser";
import { Animator } from "../../../../jetpack-joyride/Animator";
import { GameScene } from "../../../../jetpack-joyride/scenes/GameScene";

export class Lazer extends Phaser.GameObjects.Container {
    head: Phaser.GameObjects.Sprite;
    tail: Phaser.GameObjects.Sprite;
    warning: Phaser.GameObjects.Sprite;
    laser: Phaser.Physics.Arcade.Sprite;
    constructor(scene: Phaser.Scene, y: number) {
        super(scene, 0, y);
        this.animinit();
        this.head = this.scene.add.sprite(100, 0, "lazerhead");
        this.tail = this.scene.add
            .sprite(this.scene.cameras.main.width - 100, 0, "lazerhead")
            .setFlip(true, false);
        this.laser = this.scene.physics.add.sprite(this.scene.cameras.main.width / 2, 0, "laser");
        (this.laser.body as Physics.Arcade.Body).setAllowGravity(false);
        this.laser.setScale((this.scene.cameras.main.width - 200) / 64, 0.5);
        this.scene.physics.add.overlap(this.laser, (this.scene as GameScene).player, () => {
            (this.scene as GameScene).player.switchState("deadbyrocket");
            this.turnOff();
        });
        this.warning = this.scene.add.sprite(this.scene.cameras.main.width / 2, 0, "lazerwarning");
        this.warning.setScale((this.scene.cameras.main.width - 200) / 256, 0.5);
        this.add([this.warning, this.laser, this.head, this.tail]);
        this.scene.add.existing(this);
        this.head.setScale(0.8);
        this.tail.setScale(0.8);
    }

    turnOn() {
        this.warning.setVisible(true);
        this.head.setVisible(true);
        this.tail.setVisible(true);
        this.laser.disableBody().setVisible(false);

        this.scene.tweens.add({
            targets: this.warning,
            alpha: { from: 0, to: 1 },
            duration: 500,
            yoyo: true,
            loop: 1,
            onComplete: () => {
                console.log("complete");
                this.shot();
            },
        });
    }

    shot() {
        this.warning.setVisible(false);

        Animator.play(this.head, "headrotate");
        Animator.play(this.tail, "headrotate");

        this.head.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.laser.enableBody().setVisible(true);
            Animator.play(this.laser, "laser_shot");
        });

        this.laser.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.turnOff();
        });
    }
    turnOff() {
        this.laser.disableBody().setVisible(false);
        this.head.setVisible(false);
        this.tail.setVisible(false);
        this.warning.setVisible(false);
    }

    animinit() {
        Animator.createAnim(this.scene, "laser_shot", "laser", 8, 15, 24, false);
        Animator.createAnim(this.scene, "headrotate", "lazerhead", 0, 11, 24, false);
    }
}
