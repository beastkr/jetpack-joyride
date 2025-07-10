import { Tilemaps } from "phaser";
import { GameManager } from "../../../jetpack-joyride/GameManager";

export class Room1 implements JetpackJoyride.IBackGround {
    scene: Phaser.Scene;
    map: Phaser.Tilemaps.Tilemap;
    maplayer: Phaser.Tilemaps.TilemapLayer;
    mapBG: Phaser.Tilemaps.TilemapLayer;
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.map = this.scene.make.tilemap({
            key: "room1_map",
            tileHeight: 256,
            tileWidth: 256,
        });
        const tileset = this.map.addTilesetImage("room1_1", "room1");
        this.maplayer = this.map.createLayer(
            "front",
            tileset as Tilemaps.Tileset,
            0,
            0
        ) as Phaser.Tilemaps.TilemapLayer;
        this.maplayer.y = -256;
        this.maplayer.x = -256;
    }
    update(time: number, delta: number): void {
        this.maplayer.x -= (GameManager.speed * delta) / 1000;
    }
    moveTo(x: number) {
        this.maplayer.x = x;
    }
}
