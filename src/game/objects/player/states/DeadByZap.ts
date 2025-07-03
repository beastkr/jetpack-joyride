import { Physics } from "phaser";
import { Animator } from "../../../jetpack-joyride/Animator";
import { PlayerState } from "./PlayerState";

export class DeadByZap extends PlayerState {
    progress: number = 0;
    public onEnter(): void {
        this.progress = 0;
        this.player.playerSprite.playerJetpack.setVisible(false);
        this.player.isdead = true;

        Animator.playAnim(this.player.playerSprite, "deadzap", () => {
            this.player.switchState("dead");
        });
    }
    public onUpdate(...args: any[]): void {
        if ((this.player.body as Physics.Arcade.Body).velocity.y < 0)
            (this.player.body as Physics.Arcade.Body).setVelocityY(0);
    }
    public onExit(): void {}
    protected animInit(): void {
        this.createZapDeadAnim();
    }

    private createZapDeadAnim() {
        Animator.createAnim(this.player.scene, "deadzap_head", "player_head", 16, 19, 12, false);
        Animator.createAnim(this.player.scene, "deadzap_body", "player_body", 16, 19, 12, false);
    }
}
