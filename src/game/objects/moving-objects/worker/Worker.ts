import { Physics } from "phaser";
import { Animator } from "../../../jetpack-joyride/Animator";
import { GameManager } from "../../../jetpack-joyride/GameManager";
import { GameScene } from "../../../jetpack-joyride/scenes/GameScene";
import { DashState } from "../../../jetpack-joyride/scenes/GameState/DashState";
import { Player } from "../../player/Player";
import { WorkerSprite } from "./WorkerSprite";

export class Worker extends Phaser.GameObjects.Container implements JetpackJoyride.IWorker {
    workerSprite: WorkerSprite;
    offset: number = 1;
    player: Player;
    dead: boolean = false;
    speed: number = 0;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.workerSprite = new WorkerSprite(this);
        this.add(this.workerSprite);
        this.scene.add.existing(this);
        this.scale = 0.5;
        this.setupBody();
        this.move();
        this.player = (this.scene as GameScene).player;

        if (this.body) this.workerSprite.flip(this.body?.velocity.x < 0, false);
    }
    private setupBody() {
        this.scene.physics.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body).setSize(70, 128).setOffset(0, -64);
        this.scene.physics.add.collider(this, (this.scene as GameScene).bot);
    }

    public move(): void {
        if (this.dead || (this.scene as GameScene).currentState instanceof DashState) {
            // Dead workers fall with gravity only
            (this.body as Phaser.Physics.Arcade.Body).setVelocityX(-GameManager.speed);
            return;
        }

        (this.body as Phaser.Physics.Arcade.Body).setVelocityX(this.offset * this.speed);
    }
    public rest() {
        const spawnLeft = Phaser.Math.Between(0, 1) === 0;

        if (spawnLeft) {
            this.x = Phaser.Math.Between(-300, -50);
            this.offset = 1; // đi sang phải
        } else {
            this.x = Phaser.Math.Between(
                this.scene.cameras.main.width + 50,
                this.scene.cameras.main.width + 300
            );
            this.offset = -1; // đi sang trái
        }

        (this.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);
        this.dead = false;
        this.setRotation(0);
        this.workerSprite.start();
        this.speed = Phaser.Math.Between(100, 300);
        if (this.offset < 0)
            this.speed = Phaser.Math.Between(300 + GameManager.speed, GameManager.speed + 400);
    }

    update() {
        if (this.x < -400 || this.x > this.scene.cameras.main.width + 400) {
            this.rest();
        }

        if (this.dead) {
            this.setRotation(Phaser.Math.DegToRad(90));
            Animator.playAnim(this.workerSprite, "dead");
        }

        this.move();
        if (this.body) this.workerSprite.flip(this.offset < 0, false);

        (this.body as Physics.Arcade.Body).setGravity(
            0,
            Math.abs(this.scene.physics.world.gravity.y)
        );

        if (this.x > 2000) {
            this.x = -100;
            this.workerSprite.start();
            this.move();
        }
    }

    public hitByBullet(): void {
        if (!this.dead) {
            this.dead = true;
        }
    }
}
