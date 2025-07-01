import { Animator } from "../Animator";
import { PlayerState } from "./PlayerState";

export class FlyingState extends PlayerState {
    private falling: boolean = false;
    public onEnter(): void {}
    public onUpdate(): void {
        this.checkFall();
        if (!this.falling) {
            Animator.play(this.player.head, "head2");
            Animator.play(this.player.jetpack, "jetpack2");
            Animator.play(this.player.playerbody, "fly");
        }
    }

    public onExit(): void {}

    private checkFall() {
        const body = this.player.body as Phaser.Physics.Arcade.Body;
        if (body.velocity.y >= 10 && !this.falling) {
            this.falling = true;
            Animator.play(this.player.head, "head3");
            Animator.play(this.player.playerbody, "fall");

            Animator.play(this.player.jetpack, "jetpack3");
        }
        if (body.velocity.y <= 0) this.falling = false;
    }
}
