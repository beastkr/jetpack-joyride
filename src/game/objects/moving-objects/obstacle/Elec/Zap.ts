import { Animator } from "../../../../jetpack-joyride/Animator";
import { Obstacle } from "../Obstacle";

export class Zap extends Obstacle {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.zapAnim();
        Animator.play(this, "zapFX");
    }
    private zapAnim() {
        Animator.createAnim(this.scene, "zapFX", "zapFX", 0, 3);
    }
    public setHeadTail(lenx: number, leny: number) {
        // console.log(lenx, leny);
        // if (lenx == 0) this.body?.setSize(1, leny);
        // else if (leny == 0) this.body?.setSize(lenx / 2, 1);
        // else this.body?.setSize(lenx / 2, leny);
        // let distance = Math.sqrt(lenx * lenx + leny * leny);
        // let ratio = distance / 256;
        // this.setScale(ratio, 1);
    }
}
