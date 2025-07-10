import { Explosion } from "./Explosion";

export class ExplosionPool
    extends Phaser.GameObjects.Group
    implements JetpackJoyride.IExplosionPool
{
    constructor(scene: Phaser.Scene) {
        super(scene);

        // Create multiple explosion instances
        this.createMultiple({
            classType: Explosion,
            key: "bullet_fx",
            frameQuantity: 10, // Pool size
            active: false,
            visible: false,
        });
    }

    public createExplosion(x: number, y: number): Explosion | null {
        const explosion = this.getFirstDead(false) as Explosion;

        if (explosion) {
            explosion.explode(x, y);
            return explosion;
        } else {
            // Pool exhausted, create new explosion (fallback)
            const newExplosion = new Explosion(this.scene, x, y);
            this.add(newExplosion);
            newExplosion.explode(x, y);
            return newExplosion;
        }
    }

    public returnExplosion(explosion: Explosion): void {
        explosion.deactivate();
    }

    public disableAll(): void {
        this.getChildren().forEach((explosion) => {
            this.returnExplosion(explosion as Explosion);
        });
    }
}
