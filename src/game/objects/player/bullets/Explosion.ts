import { Animator } from "../../../jetpack-joyride/Animator";

export class Explosion extends Phaser.GameObjects.Sprite implements JetpackJoyride.IExplosion {
    private lifespan: number = 200; // ms

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "bullet_fx");

        scene.add.existing(this);
        this.setScale(1.2);
        this.setActive(false);
        this.setVisible(false);

        // Create explosion animation
        this.createExplosionAnim();
    }

    private createExplosionAnim(): void {
        Animator.createAnim(this.scene, "explosion", "bullet_fx", 0, 3, 24, false);
    }

    public explode(x: number, y: number): void {
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);

        // Play explosion animation
        Animator.play(this, "explosion");

        // Auto-deactivate after animation
        this.scene.time.delayedCall(this.lifespan, () => {
            this.deactivate();
        });
    }

    public deactivate(): void {
        this.setActive(false);
        this.setVisible(false);
        this.setPosition(-1000, -1000);
        this.stop(); // Stop animation
    }
}
