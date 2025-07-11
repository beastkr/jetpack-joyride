import { Physics } from "phaser";
import { SPRITESHEET } from "../../../../assets";
import { Animator } from "../../../jetpack-joyride/Animator";
import { GameManager } from "../../../jetpack-joyride/GameManager";
import { GameScene } from "../../../jetpack-joyride/scenes/GameScene";
import { PlayerState } from "./PlayerState";

export class Dead extends PlayerState {
    progress: number = 0;
    public onEnter(): void {
        Animator.playAnim(this.player.playerSprite, "dead");
        GameManager.speed = 300;
        this.player.playerSprite.setRotation(Phaser.Math.DegToRad(-90));
        this.player.playerSprite.y += 50;
        (this.player.body as Physics.Arcade.Body).setAcceleration(0, 0);
        (this.player.scene as GameScene).zapManager.disableAll();
        (this.player.scene as GameScene).rockets.disableAll();
    }
    public onUpdate(...args: any[]): void {
        if (GameManager.speed < 230) {
            (this.player.scene as GameScene).switchState("over");
        }
    }
    public onExit(): void {
        this.player.playerSprite.y -= 50;
        this.player.playerSprite.setRotation(Phaser.Math.DegToRad(0));
    }
    protected animInit(): void {
        this.createDeadAnim();
    }

    private createDeadAnim() {
        Animator.createAnim(
            this.player.scene,
            "dead_head",
            SPRITESHEET.PLAYER_HEAD.KEY,
            24,
            31,
            12,
            false
        );
        Animator.createAnim(
            this.player.scene,
            "dead_body",
            SPRITESHEET.PLAYER_BODY.KEY,
            24,
            31,
            12,
            false
        );
    }
}
