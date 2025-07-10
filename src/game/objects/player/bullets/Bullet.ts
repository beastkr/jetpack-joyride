export class Bullet extends Phaser.Physics.Arcade.Sprite implements JetpackJoyride.IBullet {
    private lifespan: number = 1000; // ms
    private startTime: number = 0;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "bullet");

        // Setup physics
        scene.physics.add.existing(this);
        scene.add.existing(this);

        if (this.body) {
            (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
        }

        this.setScale(2);
        this.setActive(false);
        this.setVisible(false);
    }

    public fire(x: number, y: number): void {
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.startTime = this.scene.time.now;

        // Set bullet velocity (angled between 70-110 degrees, speed 2000)
        const angle = Phaser.Math.DegToRad(Phaser.Math.Between(70, 110));
        const speed = 2000;
        this.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
    }

    public preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);

        if (!this.active) return;

        // Check lifespan
        if (time - this.startTime > this.lifespan) {
            this.deactivate();
            return;
        }

        // Check if bullet is off-screen
        if (
            this.x > this.scene.cameras.main.width + 100 ||
            this.y > this.scene.cameras.main.height + 100 ||
            this.y < -100
        ) {
            this.deactivate();
        }
    }

    public deactivate(): void {
        this.setActive(false);
        this.setVisible(false);
        this.body?.stop();
        this.setPosition(-1000, -1000);
    }

    public explode(): void {
        // This will be called when bullet hits something
        this.deactivate();
    }
}
