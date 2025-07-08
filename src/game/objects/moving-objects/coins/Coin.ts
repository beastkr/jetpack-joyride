import { Animator } from "../../../jetpack-joyride/Animator";
import { GameManager } from "../../../jetpack-joyride/GameManager";
import { GameScene } from "../../../jetpack-joyride/scenes/GameScene";
import { MovingObject } from "../MovingObject";

export class Coin extends MovingObject {
    flipped: boolean = false;
    using: boolean = false;
    point: number = 1;
    coinsound: Phaser.Sound.BaseSound;
    constructor(scene: GameScene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);

        this.CoinAnimInit();
        this.coinsound = this.scene.sound.add("coinsound");
        scene.physics.add.overlap(this, scene.player, () => {
            GameManager.collectCoin(this.point);
            this.kill();
            if (!this.coinsound.isPlaying) this.coinsound.play();
        });
    }
    public update() {
        this.move();
        if (this.x <= 1000 && !this.flipped && this.using) {
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
    protected CoinAnimInit() {
        Animator.createAnim(this.scene, "coin_flip", "coin", 0, 7, 12, false);
    }
    public moveTo(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    protected kill() {
        this.using = false;
        this.flipped = false;
        this.disableBody(true, true);
    }
}
