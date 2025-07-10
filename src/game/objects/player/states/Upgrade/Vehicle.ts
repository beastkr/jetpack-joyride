import { Player } from "../../Player";

export class Vehicle extends Phaser.GameObjects.Sprite implements JetpackJoyride.IVehicle {
    player: Player;
    constructor(scene: Phaser.Scene, texture: string, player: Player) {
        super(scene, 0, 0, texture);
        this.animInit();
        this.player = player;
        player.playerSprite.add(this);
        player.scene.add.existing(this);
    }
    protected animInit() {}
    public control() {}
}
