import { GameScene } from "../../jetpack-joyride/scenes/GameScene";
import { Player } from "./Player";
import { BulletPool } from "./bullets/BulletPool";
import { BulletShellPool } from "./bullets/BulletShellPool";
import { ExplosionPool } from "./bullets/ExplosionPool";

export class Bullets extends Phaser.GameObjects.Container implements JetpackJoyride.IBullets {
    private bulletPool: BulletPool;
    private explosionPool: ExplosionPool;
    private bulletShellPool: BulletShellPool;
    private player: Player;
    private isFiring: boolean = false;
    private fireRate: number = 50; // ms between bullets
    private lastFireTime: number = 0;

    constructor(scene: Phaser.Scene, player: Player) {
        super(scene);
        this.player = player;
        this.bulletPool = new BulletPool(scene);
        this.explosionPool = new ExplosionPool(scene);
        this.bulletShellPool = new BulletShellPool(scene);
        this.player.add(this);
    }

    public stop(): void {
        this.isFiring = false;
    }

    public start(): void {
        this.isFiring = true;
    }

    public update(time: number, delta: number, shouldFire: boolean = false): void {
        // Update all pools
        this.bulletPool.update(time, delta);
        this.bulletShellPool.update(time, delta);

        // Fire bullets only when input is pressed and enough time has passed
        if (shouldFire && this.isFiring && time - this.lastFireTime > this.fireRate) {
            this.fireBullet();
            this.lastFireTime = time;
        }
    }

    private fireBullet(): void {
        // Fire a bullet from player position
        this.bulletPool.fireBullet(this.player.x, this.player.y);

        // Eject a shell
        this.bulletShellPool.ejectShell(this.player.x, this.player.y + 50);
    }

    public kill(): void {
        // Check bullet collisions with the ground/obstacles
        const gameScene = this.player.scene as GameScene;

        // Check bullet shell collisions with ground
        const hitShells = this.bulletShellPool.checkCollisions(
            gameScene.bot.body as Phaser.Physics.Arcade.Body
        );
        hitShells.forEach((shell) => {
            this.bulletShellPool.returnShell(shell);
        });

        // Check bullet collisions with ground
        const hitBullets = this.bulletPool.checkCollisions(
            gameScene.bot.body as Phaser.Physics.Arcade.Body
        );
        hitBullets.forEach((bullet) => {
            // Create explosion at bullet position
            this.explosionPool.createExplosion(bullet.x, bullet.y);

            // Eject shell at player position
            this.bulletShellPool.ejectShell(this.player.x, this.player.y + 50);

            // Remove bullet
            this.bulletPool.returnBullet(bullet);
        });

        // Check bullet collisions with workers
        this.checkWorkerCollisions();
    }

    private checkWorkerCollisions(): void {
        const gameScene = this.player.scene as GameScene;

        // Check each active bullet against all workers
        this.bulletPool.getChildren().forEach((bulletObj) => {
            const bullet = bulletObj as any; // Cast to access properties
            if (bullet.active && bullet.body) {
                gameScene.worker.forEach((worker) => {
                    if (
                        !worker.dead &&
                        worker.body &&
                        this.player.scene.physics.overlap(bullet, worker)
                    ) {
                        // Worker hit by bullet
                        worker.hitByBullet();

                        // Create explosion at bullet position
                        this.explosionPool.createExplosion(bullet.x, bullet.y);

                        // Remove bullet
                        this.bulletPool.returnBullet(bullet);
                    }
                });
            }
        });
    }

    public disableAll(): void {
        this.bulletPool.disableAll();
        this.explosionPool.disableAll();
        this.bulletShellPool.disableAll();
        this.isFiring = false;
    }
}
