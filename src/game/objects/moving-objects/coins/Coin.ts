import { Animator } from "../../../jetpack-joyride/Animator";
import { GameManager } from "../../../jetpack-joyride/GameManager";
import { GameScene } from "../../../jetpack-joyride/scenes/GameScene";
import { MovingObject } from "../MovingObject";

export class Coin extends MovingObject {
    flipped: boolean = false;
    using: boolean = false;
    constructor(scene: GameScene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.CoinAnimInit();
        scene.physics.add.overlap(this, scene.player, () => {
            GameManager.collectCoin();
            this.kill();
        });
    }
    public update() {
        this.move();
        if (this.x <= 1500 && !this.flipped && this.using) {
            Animator.play(this, "coin_flip");
            this.flipped = true;
        }
        if (this.x <= -20) {
            this.kill();
        }
    }

    public move(): void {
        this.speed = GameManager.speed;
        this.setVelocityX(-this.speed);
    }
    private CoinAnimInit() {
        Animator.createAnim(this.scene, "coin_flip", "coin", 0, 7, 12, false);
    }
    public moveTo(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    private kill() {
        this.using = false;
        this.flipped = false;
        this.disableBody(true, true);
    }
}
