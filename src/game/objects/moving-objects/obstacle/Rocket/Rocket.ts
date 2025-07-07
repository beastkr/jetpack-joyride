import { GameObjects, Physics } from "phaser";
import { Animator } from "../../../../jetpack-joyride/Animator";
import { GameScene } from "../../../../jetpack-joyride/scenes/GameScene";

export class Rocket extends Physics.Arcade.Sprite {
    warning: GameObjects.Sprite;
    waiting: boolean;
    explode: GameObjects.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "rocket");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init(scene);
        this.setupAnimations(scene);
        this.setupPhysics(scene);
    }

    private init(scene: Phaser.Scene) {
        this.setScale(2);
        this.setDepth(100);
        this.setVisible(false);
        this.disableBody(true, true);

        this.warning = scene.add.sprite(1450, 300, "warning");
        this.warning.setVisible(false);
        this.warning.scale = 1.5;

        this.explode = scene.add.sprite(1450, 300, "explosion");
        this.explode.setVisible(false);
        this.explode.scale = 1.5;
    }

    private setupAnimations(scene: Phaser.Scene) {
        Animator.createAnim(scene, "rocket", "rocket", 0, 3);
        Animator.createAnim(scene, "warning", "warning", 0, 7, 12, false);
        Animator.createAnim(scene, "explode", "explosion", 0, 7, 12, false);
        Animator.play(this, "rocket");
    }

    private setupPhysics(scene: Phaser.Scene) {
        (this.body as Physics.Arcade.Body).setAllowGravity(false);
        scene.physics.add.overlap(this, (scene as GameScene).player, () => {
            (scene as GameScene).player.switchState("deadbyrocket");
            this.explosion();
        });
    }

    private explosion() {
        let p = (this.scene as GameScene).player;
        this.explode.setPosition(p.x, p.y);
        this.explode.setVisible(true);
        Animator.play(this.explode, "explode");
        this.warning.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.explode.setVisible(false);
        });
        this.reset();
    }
    public pending() {
        this.waiting = true;
        this.enableBody(true, 1200, 500, true, true).setVisible(true);
        this.setVelocityX(0);
        this.x = 2000;

        this.warning.setVisible(true);
        Animator.play(this.warning, "warning");

        // When the warning animation finishes, launch the rocket
        this.warning.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.waiting = false;
            this.scene.time.delayedCall(
                500,
                () => {
                    this.shot();
                },
                [],
                this
            );
        });
    }

    public shot() {
        this.y = this.warning.y;
        this.setVelocityX(-1500);
        this.warning.setVisible(false);
    }

    public preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);

        if (this.waiting) this.warning.y = (this.scene as GameScene).player.y;

        if (this.x < -100) {
            this.reset();
        }
    }

    public reset() {
        this.setPosition(2000, 500);
        this.setVelocityX(0);
        this.setVisible(false);
        this.disableBody(true, true);
        // this.explode.setVisible(false);
    }
}
