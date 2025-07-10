import { Physics } from "phaser";
import { Animator } from "../../../jetpack-joyride/Animator";
import { GameScene } from "../../../jetpack-joyride/scenes/GameScene";
import { PlayerState } from "./PlayerState";

export class DeadByZap extends PlayerState {
    progress: number = 0;
    sound: Phaser.Sound.BaseSound;
    public onEnter(): void {
        if (!this.sound) this.sound = this.player.scene.sound.add("playerelec");
        if (this.player.vehicle != null) {
            this.player.vehicle = null;
            this.player.switchState("reborn");
            console.log("pppp");
            (this.player.scene as GameScene).zapManager.disableAll();
            (this.player.scene as GameScene).rockets.disableAll();
            (this.player.scene as GameScene).lasers.rest();
            return;
        }
        this.progress = 0;
        this.player.playerSprite.playerJetpack.setVisible(false);
        this.player.isdead = true;
        this.player.scene.cameras.main.shake(250, 0.01);
        this.sound.play();
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
