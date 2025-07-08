import { Physics } from "phaser";
import { Animator } from "../../../jetpack-joyride/Animator";
import { Player } from "../Player";
import { PlayerState } from "./PlayerState";

export class WalkingState extends PlayerState {
    runsound: Phaser.Sound.BaseSound[] = [];
    public constructor(player: Player) {
        super(player);
        for (let i = 1; i < 5; i++) {
            this.runsound[i] = this.player.scene.sound.add("run_" + String(i));
            this.runsound[i].on("complete", () => {
                if (!this.runsound[i == 4 ? 1 : i + 1].isPlaying)
                    this.runsound[i == 4 ? 1 : i + 1].play();
            });
        }
    }
    public onEnter(): void {
        Animator.playAnim(this.player.playerSprite, "landing", () => {
            if (this.player.body?.velocity.y == 0)
                Animator.playAnim(this.player.playerSprite, "walking");
        });
        this.runsound[1].play();
    }

    public onUpdate(...args: any[]): void {
        if (this.player.vehicle === null) {
            console.log("aaa");
            this.player.controller.jetLaunch();
            if ((this.player.body as Physics.Arcade.Body).velocity.y < 0) {
                this.player.switchState("flying");
            }
        } else {
            this.player.vehicle.control();
            console.log("control;");
        }
    }
    public onExit(): void {
        this.runsound.forEach((element) => {
            (element as Phaser.Sound.BaseSound).stop();
        });
    }

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
