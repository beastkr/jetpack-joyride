import { SPRITESHEET } from "../../../../assets";
import { Animator } from "../../../jetpack-joyride/Animator";
import { GameScene } from "../../../jetpack-joyride/scenes/GameScene";
import { Coin } from "./Coin";

export class Bigcoin extends Coin {
    constructor(scene: GameScene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.bigCoinAnimInit();
        this.point = 2;
    }
    public override update() {
        if (!this.visible) return;
        Animator.play(this, "big_coin_flip");
        this.flipped = true;
        if (this.x <= -20) {
            this.kill();
        }
    }

    private bigCoinAnimInit() {
        Animator.createAnim(this.scene, "big_coin_flip", SPRITESHEET.BIG_COIN.KEY, 0, 7);
    }
}
