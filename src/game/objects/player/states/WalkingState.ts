import { Physics } from "phaser";
import { Animator } from "../../../jetpack-joyride/Animator";
import { Player } from "../Player";
import { PlayerState } from "./PlayerState";

export class WalkingState extends PlayerState {
    public constructor(player: Player) {
        super(player);
    }
    public onEnter(): void {
        Animator.playAnim(this.player.playerSprite, "landing", () => {
            Animator.playAnim(this.player.playerSprite, "walking");
        });
    }

    public onUpdate(...args: any[]): void {
        this.player.controller.jetLaunch();
        if ((this.player.body as Physics.Arcade.Body).velocity.y < 0) {
            this.player.switchState("flying");
        }
    }
    public onExit(): void {}

    protected animInit(): void {
        this.landingInit();
        this.walkingAnimInit();
    }

    private walkingAnimInit() {
        Animator.createAnim(this.player.scene, "walking_head", "player_head", 0, 3);
        Animator.createAnim(this.player.scene, "walking_body", "player_body", 0, 3);
        Animator.createAnim(this.player.scene, "walking_jetpack", "player_jetpack", 0, 3);
    }
    private landingInit() {
        Animator.createAnim(this.player.scene, "landing_head", "player_head", 12, 15, 12, false);
        Animator.createAnim(this.player.scene, "landing_body", "player_body", 12, 15, 12, false);
        Animator.createAnim(
            this.player.scene,
            "landing_jetpack",
            "player_jetpack",
            12,
            15,
            12,
            false
        );
    }
}
