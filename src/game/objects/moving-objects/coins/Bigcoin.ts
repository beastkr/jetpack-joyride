import { Animator } from "../../../jetpack-joyride/Animator";
import { GameScene } from "../../../jetpack-joyride/scenes/GameScene";
import { Coin } from "./Coin";

export class Bigcoin extends Coin {
    constructor(scene: GameScene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.bigCoinAnimInit();
        this.point = 2;
    }
    public override preUpdate(time: number, delta: number) {
        if (!this.visible) return;
        this.move();
        Animator.play(this, "big_coin_flip");
        this.flipped = true;
        if (this.x <= -20) {
            this.kill();
        }
    }

    private bigCoinAnimInit() {
        Animator.createAnim(this.scene, "big_coin_flip", "bigcoin", 0, 7);
    }
}
