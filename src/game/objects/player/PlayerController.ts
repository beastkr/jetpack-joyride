import { Physics } from "phaser";
import { Player } from "./Player";

export class PlayerController {
    player: Player;
    scene: Phaser.Scene;
    constructor(scene: Phaser.Scene, player: Player) {
        this.player = player;
        this.scene = scene;
    }
    public jetLaunch() {
        const pointer = this.scene.input.activePointer;
        if (pointer.isDown) {
            (this.player.body as Physics.Arcade.Body).setAccelerationY(-3000);
        } else {
            (this.player.body as Physics.Arcade.Body).setAccelerationY(0);
        }
    }
}
