import { AUDIO, SPRITESHEET } from "../../../../assets";
import { Animator } from "../../../jetpack-joyride/Animator";
import { GameManager } from "../../../jetpack-joyride/GameManager";
import { GameScene } from "../../../jetpack-joyride/scenes/GameScene";
import { MovingObject } from "../MovingObject";

export class Coin extends MovingObject implements JetpackJoyride.ICoin {
    flipped: boolean = false;
    using: boolean = false;
    point: number = 1;
    coinsound: Phaser.Sound.BaseSound;
    constructor(scene: GameScene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);

        this.CoinAnimInit();
        this.coinsound = this.scene.sound.add(AUDIO.COINSOUND.KEY);
        scene.physics.add.overlap(this, scene.player, () => {
            GameManager.collectCoin(this.point);
            this.kill();
            if (!this.coinsound.isPlaying) this.coinsound.play();
        });
    }
    public update() {
        if (!this.active) return;
        this.move();
        if (!this.flipped && this.x <= 1000 && this.using) {
            Animator.play(this, "coin_flip");
            this.flipped = true;
        }
        if (this.x <= -20) {
            this.kill();
        }
    }

    public move(): void {
        this.setVelocityX(-this.speed);
    }
    protected CoinAnimInit() {
        Animator.createAnim(this.scene, "coin_flip", SPRITESHEET.COIN.KEY, 0, 7, 12, false);
    }
    public moveTo(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    protected kill() {
        this.using = false;
        this.flipped = false;
        this.body?.stop(); // Ensure velocity is stopped
        this.setVelocity(0); // Remove any movement
        this.disableBody(true, true); // Disable body + hide + deactivate
    }
    public reuse(x: number, y: number) {
        this.speed = GameManager.speed;
        this.moveTo(x, y);
        this.flipped = false;
        this.using = true;
        this.setActive(true).setVisible(true);
        this.enableBody(true, x, y, true, true);
        this.move();
    }
}
