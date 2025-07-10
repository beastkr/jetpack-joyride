import { Bullet } from "./Bullet";

export class BulletPool extends Phaser.GameObjects.Group implements JetpackJoyride.IBulletPool {
    constructor(scene: Phaser.Scene) {
        super(scene);

        // Create multiple bullet instances
        this.createMultiple({
            classType: Bullet,
            key: "bullet",
            frameQuantity: 30, // Pool size
            active: false,
            visible: false,
        });
    }

    public fireBullet(x: number, y: number): Bullet | null {
        const bullet = this.getFirstDead(false) as Bullet;

        if (bullet) {
            bullet.fire(x, y);
            return bullet;
        } else {
            return null;
            // // Pool exhausted, create new bullet (fallback)
            // const newBullet = new Bullet(this.scene, x, y);
            // this.add(newBullet);
            // newBullet.fire(x, y);
            // return newBullet;
        }
    }

    public returnBullet(bullet: Bullet): void {
        bullet.deactivate();
    }

    public update(time: number, delta: number): void {
        this.getChildren().forEach((bullet) => {
            if (bullet.active) {
                (bullet as Bullet).preUpdate(time, delta);
            }
        });
    }

    public disableAll(): void {
        this.getChildren().forEach((bullet) => {
            this.returnBullet(bullet as Bullet);
        });
    }

    public checkCollisions(target: Phaser.Physics.Arcade.Body): Bullet[] {
        const hitBullets: Bullet[] = [];

        this.getChildren().forEach((bullet) => {
            if (bullet.active && bullet.body) {
                // Check overlap with target
                if (this.scene.physics.overlap(bullet, target)) {
                    hitBullets.push(bullet as Bullet);
                }
            }
        });

        return hitBullets;
    }
}
