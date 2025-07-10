export class BulletShell
    extends Phaser.Physics.Arcade.Sprite
    implements JetpackJoyride.IBulletShell
{
    private lifespan: number = 5000; // ms
    private startTime: number = 0;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "bulletshell");

        scene.physics.add.existing(this);
        scene.add.existing(this);

        if (this.body) {
            (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(true);
        }

        this.setScale(0.5);
        this.setActive(false);
        this.setVisible(false);
    }

    public eject(x: number, y: number): void {
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.startTime = this.scene.time.now;

        const rotation = Phaser.Math.Between(0, 360);

        this.setVelocity(-100, 300);
        this.setAcceleration(-1000, 600);
        this.setRotation(Phaser.Math.DegToRad(rotation));
        this.setAngularVelocity(Phaser.Math.Between(-500, 500));
    }

    public preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);

        if (!this.active) return;

        if (time - this.startTime > this.lifespan) {
            this.deactivate();
            return;
        }

        if (this.x < -500 || this.y > this.scene.cameras.main.height + 200) {
            this.deactivate();
        }
    }

    public deactivate(): void {
        this.setActive(false);
        this.setVisible(false);
        this.body?.stop();
        this.setAcceleration(0, 0);
        this.setAngularVelocity(0);
        this.setPosition(-1000, -1000);
    }
}
