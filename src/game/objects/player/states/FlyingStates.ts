import { Animator } from "../../../jetpack-joyride/Animator";
import { PlayerState } from "./PlayerState";

export class FlyingState extends PlayerState {
    public onEnter(): void {}
    private falling: boolean = false;

    public onUpdate(...args: any[]): void {
        this.player.controller.jetLaunch();
        this.checkFall();
        if (!this.falling) {
            Animator.playAnim(this.player.playerSprite, "flyup");
        }
    }
    public onExit(): void {}

    protected animInit() {
        this.flyUpAnimInit();
        this.flyDownAnimInit();
    }
    private flyUpAnimInit() {
        Animator.createAnim(this.player.scene, "flyup_head", "player_head", 4, 7);
        Animator.createAnim(this.player.scene, "flyup_body", "player_body", 4, 7);
        Animator.createAnim(this.player.scene, "flyup_jetpack", "player_jetpack", 4, 7);
    }
    private flyDownAnimInit() {
        Animator.createAnim(this.player.scene, "flydown_head", "player_head", 8, 11, 12, false);
        Animator.createAnim(this.player.scene, "flydown_body", "player_body", 8, 11, 12, false);
        Animator.createAnim(
            this.player.scene,
            "flydown_jetpack",
            "player_jetpack",
            8,
            11,
            12,
            false
        );
    }

    private checkFall() {
        const body = this.player.body as Phaser.Physics.Arcade.Body;
        if (body.velocity.y >= 10 && !this.falling) {
            this.falling = true;
            Animator.playAnim(this.player.playerSprite, "flydown");
        }
        if (body.velocity.y <= 0) this.falling = false;
    }
}
