import { BulletShell } from "./BulletShell";

export class BulletShellPool
    extends Phaser.GameObjects.Group
    implements JetpackJoyride.IBulletShellPool
{
    constructor(scene: Phaser.Scene) {
        super(scene);

        // Create multiple bullet shell instances
        this.createMultiple({
            classType: BulletShell,
            key: "bulletshell",
            frameQuantity: 30, // Pool size
            active: false,
            visible: false,
        });
    }

    public ejectShell(x: number, y: number): BulletShell | null {
        const shell = this.getFirstDead(false) as BulletShell;

        if (shell) {
            shell.eject(x, y);
            return shell;
        } else {
            // Pool exhausted, create new shell (fallback)
            const newShell = new BulletShell(this.scene, x, y);
            this.add(newShell);
            newShell.eject(x, y);
            return newShell;
        }
    }

    public returnShell(shell: BulletShell): void {
        shell.deactivate();
    }

    public update(time: number, delta: number): void {
        this.getChildren().forEach((shell) => {
            if (shell.active) {
                (shell as BulletShell).preUpdate(time, delta);
            }
        });
    }

    public disableAll(): void {
        this.getChildren().forEach((shell) => {
            this.returnShell(shell as BulletShell);
        });
    }

    public checkCollisions(target: Phaser.Physics.Arcade.Body): BulletShell[] {
        const hitShells: BulletShell[] = [];

        this.getChildren().forEach((shell) => {
            if (shell.active && shell.body) {
                // Check overlap with target
                if (this.scene.physics.overlap(shell, target)) {
                    hitShells.push(shell as BulletShell);
                }
            }
        });

        return hitShells;
    }
}
