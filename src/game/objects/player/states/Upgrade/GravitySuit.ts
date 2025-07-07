import { Animator } from "../../../../jetpack-joyride/Animator";
import { Player } from "../../Player";
import { Vehicle } from "./Vehicle";

export class GravitySuit extends Vehicle {
    constructor(scene: Phaser.Scene, player: Player) {
        super(scene, "gravitysuit", player);
        this.setName("gravitysuit");
    }
    protected animInit(): void {
        Animator.createAnim(this.scene, "walking_gravitysuit", "gravitysuit", 0, 5);
        Animator.createAnim(this.scene, "landing_gravitysuit", "gravitysuit", 18, 21, 12, false);
        Animator.createAnim(this.scene, "flip_gravitysuit", "gravitysuit", 6, 17, 24, true);
    }
    public control() {
        this.player.controller.gravChange(true);
        if ((this.player.body as any).velocity.y != 0) {
            this.player.switchState("hold");
            Animator.play(this, "flip_gravitysuit");
        }
    }
}
