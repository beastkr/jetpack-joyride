import { Physics } from "phaser";
import { Player } from "../../Player";
import { Vehicle } from "./Vehicle";

export class Jetpack extends Vehicle {
    constructor(scene: Phaser.Scene, player: Player) {
        super(scene, "", player);
    }
    public control() {
        this.player.controller.jetLaunch();
        if ((this.player.body as Physics.Arcade.Body).velocity.y < 0) {
            this.player.switchState("flying");
        }
    }
}
