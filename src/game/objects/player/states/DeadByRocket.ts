import { Physics } from "phaser";
import { SPRITESHEET } from "../../../../assets";
import { Animator } from "../../../jetpack-joyride/Animator";
import { GameScene } from "../../../jetpack-joyride/scenes/GameScene";
import { PlayerState } from "./PlayerState";

export class DeadByRocket extends PlayerState {
    progress: number = 0;
    public onEnter(): void {
        if (this.player.vehicle != null) {
            this.player.vehicle = null;
            this.player.switchState("reborn");
            console.log("pppp");
            (this.player.scene as GameScene).zapManager.disableAll();
            (this.player.scene as GameScene).rockets.disableAll();
            (this.player.scene as GameScene).lasers.rest();
            (this.player.scene as GameScene).coinManager.disableAll();
            return;
        }
        this.progress = 0;
        this.player.playerSprite.playerJetpack.setVisible(false);
        this.player.isdead = true;
        this.player.scene.cameras.main.shake(250, 0.01);

        Animator.playAnim(this.player.playerSprite, "deadrocket", () => {
            this.player.switchState("dead");
        });
    }
    public onUpdate(...args: any[]): void {
        if ((this.player.body as Physics.Arcade.Body).velocity.y < 0)
            (this.player.body as Physics.Arcade.Body).setVelocityY(0);
    }
    public onExit(): void {}
    protected animInit(): void {
        this.createDeadAnim();
    }

    private createDeadAnim() {
        Animator.createAnim(
            this.player.scene,
            "deadrocket_head",
            SPRITESHEET.PLAYER_HEAD.KEY,
            20,
            23,
            12,
            false
        );
        Animator.createAnim(
            this.player.scene,
            "deadrocket_body",
            SPRITESHEET.PLAYER_BODY.KEY,
            20,
            23,
            12,
            false
        );
    }
}
