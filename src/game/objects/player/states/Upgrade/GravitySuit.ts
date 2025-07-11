import { SPRITESHEET } from "../../../../../assets";
import { Animator } from "../../../../jetpack-joyride/Animator";
import { Player } from "../../Player";
import { Vehicle } from "./Vehicle";

export class GravitySuit extends Vehicle {
    constructor(scene: Phaser.Scene, player: Player) {
        super(scene, SPRITESHEET.GRAVITY_SUIT.KEY, player);
        this.setName(SPRITESHEET.GRAVITY_SUIT.KEY);
    }
    protected animInit(): void {
        Animator.createAnim(this.scene, "walking_gravitysuit", SPRITESHEET.GRAVITY_SUIT.KEY, 0, 5);
        Animator.createAnim(
            this.scene,
            "landing_gravitysuit",
            SPRITESHEET.GRAVITY_SUIT.KEY,
            18,
            21,
            12,
            false
        );
        Animator.createAnim(
            this.scene,
            "flip_gravitysuit",
            SPRITESHEET.GRAVITY_SUIT.KEY,
            6,
            17,
            12,
            true
        );
    }
    public control() {
        this.player.controller.gravChange(true);
        if ((this.player.body as any).velocity.y != 0) {
            this.player.switchState("hold");
            Animator.play(this, "flip_gravitysuit");
        }
    }
}
