import { Animator } from "../Animator";
import { Player } from "../scenes/jetpack-joyride/objects/Player";
import { PlayerState } from "./PlayerState";

export class WalkingState extends PlayerState {
    constructor(player: Player) {
        super(player);
    }
    public onEnter(): void {
        Animator.play(this.player.playerbody, "land");
        Animator.play(this.player.head, "head4");
        Animator.play(this.player.jetpack, "jetpack4");
        this.player.playerbody.on(
            "animationcomplete",
            (
                animation: Phaser.Animations.Animation,
                frame: Phaser.Animations.AnimationFrame
            ) => {
                if (animation.key === "land") {
                    Animator.play(this.player.playerbody, "walk");
                    Animator.play(this.player.jetpack, "jetpack");
                    Animator.play(this.player.head, "head");
                }
            }
        );
    }
    public onUpdate(): void {
        if ((this.player.body as Phaser.Physics.Arcade.Body)?.velocity.y < 0) {
            this.player.switchState("flying");
        }
    }

    public onExit(): void {}
}
