import { Physics } from "phaser";
import { Player } from "./Player";
import { GravitySuit } from "./states/Upgrade/GravitySuit";

export class PlayerController {
    player: Player;
    scene: Phaser.Scene;
    private spaceBar?: Phaser.Input.Keyboard.Key;

    constructor(scene: Phaser.Scene, player: Player) {
        this.player = player;
        this.scene = scene;
        this.spaceBar = scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            if (player.vehicle instanceof GravitySuit)
                if (pointer.leftButtonDown()) {
                    this.gravChange(false);
                    this.player.playerSprite.flip(false, this.scene.physics.world.gravity.y < 0);
                }
        });
    }

    public jetLaunch() {
        if (this.player.isdead) return;

        const pointer = this.scene.input.activePointer;
        const isPressing = pointer.isDown || this.spaceBar?.isDown;

        const body = this.player.body as Physics.Arcade.Body;
        body.setAccelerationY(isPressing ? -3000 : 0);
    }

    public gravChange(press: boolean): boolean {
        if (this.player.isdead) return false;
        if (this.spaceBar) {
            if (press) {
                const justPressed = Phaser.Input.Keyboard.JustDown(this.spaceBar);
                if (justPressed) {
                    const gravity = this.scene.physics.world.gravity.y;
                    this.scene.physics.world.gravity.y = -gravity;
                    this.player.playerSprite.flip(false, this.scene.physics.world.gravity.y < 0);
                    return true;
                }
            } else {
                const gravity = this.scene.physics.world.gravity.y;
                this.scene.physics.world.gravity.y = -gravity;
                return true;
            }
        }

        return false;
    }

    public toggleGravity() {
        if (this.player.isdead) return;

        const gravity = this.scene.physics.world.gravity.y;
        this.scene.physics.world.gravity.y = -gravity;
    }
}
