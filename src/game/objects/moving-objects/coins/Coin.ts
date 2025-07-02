import { Animator } from "../../../jetpack-joyride/Animator";
import { GameScene } from "../../../jetpack-joyride/scenes/GameScene";
import { MovingObject } from "../MovingObject";

export class Coin extends MovingObject {
    destroyed: boolean = false;
    constructor(scene: GameScene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.CoinAnimInit();
        Animator.play(this, "coin_flip");
        scene.physics.add.overlap(this, scene.player, () => {
            this.destroy();
        });
    }
    public update(time: number, delta: number) {
        if (this.x <= -20) {
            this.destroy();
            this.destroyed = true;
        }
    }

    public move(): void {
        this.setVelocityX(-this.speed);
    }
    private CoinAnimInit() {
        Animator.createAnim(this.scene, "coin_flip", "coin", 0, 7, 12);
    }
    public moveTo(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
