import { GameObjects, Physics } from "phaser";
import { AUDIO, SPRITESHEET } from "../../../../../assets";
import { Animator } from "../../../../jetpack-joyride/Animator";
import { GameManager } from "../../../../jetpack-joyride/GameManager";
import { GameScene } from "../../../../jetpack-joyride/scenes/GameScene";

export class Rocket extends Physics.Arcade.Sprite {
    warning: GameObjects.Sprite;
    waiting: boolean;
    explode: GameObjects.Sprite;
    rocketfire: GameObjects.Sprite;
    rockethead: GameObjects.Sprite;

    warningsound: Phaser.Sound.BaseSound;
    rocketexplodesound: Phaser.Sound.BaseSound;
    missilelaunch: Phaser.Sound.BaseSound;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, SPRITESHEET.ROCKET.KEY);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init(scene);
        this.setupAnimations(scene);
        this.setupPhysics(scene);
    }

    private init(scene: Phaser.Scene) {
        this.setScale(2);
        // this.setDepth(100);
        this.setVisible(false);
        this.disableBody(true, true);

        this.warning = scene.add.sprite(
            this.scene.cameras.main.width - 50,
            300,
            SPRITESHEET.WARNING.KEY
        );
        this.warning.setVisible(false);
        this.warning.scale = 1.5;

        this.explode = scene.add.sprite(
            this.scene.cameras.main.width + 100,
            300,
            SPRITESHEET.EXPLOSION.KEY
        );
        this.explode.setVisible(false);
        this.explode.scale = 1.5;

        this.rocketfire = scene.add.sprite(1450, 300, SPRITESHEET.ROCKET_FIRE.KEY);
        this.rocketfire.setVisible(false);
        this.rocketfire.scale = 1.5;
        this.scene.physics.add.existing(this.rocketfire);
        (this.rocketfire.body as Physics.Arcade.Body).setAllowGravity(false).setVelocity(0, 0);

        this.rockethead = scene.add.sprite(
            this.scene.cameras.main.width + 100,
            300,
            SPRITESHEET.ROCKET_FIRE.KEY
        );
        this.rockethead.setVisible(false);
        this.rockethead.scale = 1.5;
        this.scene.physics.add.existing(this.rockethead);
        (this.rockethead.body as Physics.Arcade.Body).setAllowGravity(false).setVelocity(0, 0);

        this.missilelaunch = this.scene.sound.add(AUDIO.ROCKET_LAUNCH.KEY);
        this.warningsound = this.scene.sound.add(AUDIO.ROCKET_WARNING.KEY);
        this.rocketexplodesound = this.scene.sound.add(AUDIO.ROCKET_EXPLODE.KEY);
        this.rocketfire.setVisible(false);
        this.rockethead.setVisible(false);
    }

    private setupAnimations(scene: Phaser.Scene) {
        Animator.createAnim(scene, "rocket", SPRITESHEET.ROCKET.KEY, 0, 3);
        Animator.createAnim(scene, "warning", SPRITESHEET.WARNING.KEY, 0, 3, 12, true, 2);
        Animator.createAnim(scene, "warning2", SPRITESHEET.WARNING.KEY, 4, 7, 12, true, 2);
        Animator.createAnim(scene, "explode", SPRITESHEET.EXPLOSION.KEY, 0, 7, 12, false);
        Animator.createAnim(scene, "fire", SPRITESHEET.ROCKET_FIRE.KEY, 0, 3);
        Animator.createAnim(scene, "rockethead", SPRITESHEET.ROCKET_FIRE.KEY, 4, 7);
        Animator.play(this, "rocket");
        Animator.play(this.rocketfire, "fire");
        Animator.play(this.rockethead, "rockethead");
    }

    private setupPhysics(scene: Phaser.Scene) {
        (this.body as Physics.Arcade.Body).setAllowGravity(false);
        scene.physics.add.overlap(this, (scene as GameScene).player, () => {
            this.explosion();
            (scene as GameScene).player.switchState("deadbyrocket");
        });
    }

    private explosion() {
        this.rocketexplodesound.play();
        let p = (this.scene as GameScene).player;
        this.explode.setPosition(p.x, p.y);
        this.explode.setVisible(true);
        Animator.play(this.explode, "explode");
        this.explode.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.explode.setVisible(false);
        });
        this.reset();
    }
    public pending() {
        this.reset();
        this.waiting = true;
        this.enableBody(true, 1200, 500, true, true).setVisible(true);
        this.setVelocityX(0);
        this.x = 2000;

        this.warning.setVisible(true);
        Animator.play(this.warning, "warning");

        // When the warning animation finishes, launch the rocket
        this.warning.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            Animator.play(this.warning, "warning2");
            this.warningsound.play();
            this.warning.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.waiting = false;
                this.scene.time.delayedCall(
                    0,
                    () => {
                        this.shot();
                    },
                    [],
                    this
                );
            });
        });
    }

    public shot() {
        this.y = this.warning.y;
        this.missilelaunch.play();
        this.setVelocityX(-1200 - GameManager.speed);
        this.warning.setVisible(false);
        this.setVisible(true);
        this.rocketfire.setVisible(true);
        this.rockethead.setVisible(true);
        this.rocketfire.setPosition(this.x + 32, this.y);
        this.rockethead.setPosition(this.x - 16, this.y);
        (this.rockethead.body as Physics.Arcade.Body).setVelocityX(-1200 - GameManager.speed);
        (this.rocketfire.body as Physics.Arcade.Body).setVelocityX(-1200 - GameManager.speed);
    }

    public update(time: number, delta: number): void {
        if (!this.visible) return;
        this.rocketfire.setVisible(this.visible);
        this.rockethead.setVisible(this.visible);
        if (this.waiting) this.warning.y = (this.scene as GameScene).player.y;
        if (this.x < -100) {
            this.reset();
        }
    }

    public reset() {
        this.setPosition(this.scene.cameras.main.width + 100, 500);
        this.setVelocityX(0);
        (this.rockethead.body as Physics.Arcade.Body).setVelocityX(0);
        (this.rocketfire.body as Physics.Arcade.Body).setVelocityX(0);
        this.setVisible(false);
        this.disableBody(true, true);
        this.rocketfire.setVisible(false);
        this.rockethead.setVisible(false);
        this.rocketfire.setPosition(this.x + 32, this.y);
        this.rockethead.setPosition(this.x - 16, this.y);
    }
}
