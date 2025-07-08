import { Physics } from "phaser";
import { Animator } from "../../../jetpack-joyride/Animator";
import { GameManager } from "../../../jetpack-joyride/GameManager";
import { GameScene } from "../../../jetpack-joyride/scenes/GameScene";
import { PlayerState } from "./PlayerState";

export class Dead extends PlayerState {
    progress: number = 0;
    public onEnter(): void {
        Animator.playAnim(this.player.playerSprite, "dead");
        GameManager.speed = 200;
        this.player.playerSprite.setRotation(Phaser.Math.DegToRad(-90));
        this.player.playerSprite.y += 50;
        (this.player.body as Physics.Arcade.Body).setAcceleration(0, 0);
        (this.player.scene as GameScene).zapManager.disableAll();
        (this.player.scene as GameScene).rockets.disableAll();
    }
    public onUpdate(...args: any[]): void {
        if (GameManager.speed < 100) {
            this.player.scene.scene.restart();
        }
    }
    public onExit(): void {
        this.player.playerSprite.y -= 30;
        this.player.playerSprite.setRotation(Phaser.Math.DegToRad(0));
    }
    protected animInit(): void {
        this.createDeadAnim();
    }

    private createDeadAnim() {
        Animator.createAnim(this.player.scene, "dead_head", "player_head", 24, 31, 12, false);
        Animator.createAnim(this.player.scene, "dead_body", "player_body", 24, 31, 12, false);
    }
}
