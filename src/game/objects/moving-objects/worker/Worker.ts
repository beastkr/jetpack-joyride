import { Physics } from "phaser";
import { GameManager } from "../../../jetpack-joyride/GameManager";
import { GameScene } from "../../../jetpack-joyride/scenes/GameScene";
import { WorkerSprite } from "./WorkerSprite";

export class Worker extends Phaser.GameObjects.Container {
    workerSprite: WorkerSprite;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.workerSprite = new WorkerSprite(this);
        this.add(this.workerSprite);
        this.scene.add.existing(this);
        this.scale = 0.5;
        this.setupBody();
        this.move();

        if (this.body) this.workerSprite.flip(this.body?.velocity.x < 0, false);
    }
    private setupBody() {
        this.scene.physics.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body).setSize(70, 128).setOffset(0, -64);
        this.scene.physics.add.collider(this, (this.scene as GameScene).bot);
    }
    public move(): void {
        let speed = Phaser.Math.Between(GameManager.speed / 4, GameManager.speed);

        (this.body as Phaser.Physics.Arcade.Body).setVelocityX(speed);
    }
    public rest() {
        this.x = -100;
        (this.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);
    }
    update() {
        (this.body as Physics.Arcade.Body).setGravity(0, 900);
        if (this.x > 2000) {
            this.x = -100;
            this.workerSprite.start();
            this.move();
        }
    }
}
