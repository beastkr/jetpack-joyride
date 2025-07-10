import { Tilemaps } from "phaser";
import { GameManager } from "../../../jetpack-joyride/GameManager";

export class Hall implements JetpackJoyride.IBackGround {
    scene: Phaser.Scene;
    map: Phaser.Tilemaps.Tilemap;
    maplayer: Phaser.Tilemaps.TilemapLayer;
    mapBG: Phaser.Tilemaps.TilemapLayer;
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.map = this.scene.make.tilemap({
            key: "hall_map",
            tileHeight: 256,
            tileWidth: 256,
        });
        const tileset = this.map.addTilesetImage("warehouse_assets", "hall");
        this.mapBG = this.map.createLayer(
            "back",
            tileset as Tilemaps.Tileset,
            0,
            0
        ) as Phaser.Tilemaps.TilemapLayer;
        this.maplayer = this.map.createLayer(
            "front",
            tileset as Tilemaps.Tileset,
            0,
            0
        ) as Phaser.Tilemaps.TilemapLayer;
        this.mapBG.setScale(1, 2);
    }
    update(time: number, delta: number): void {
        this.maplayer.x -= (GameManager.speed * delta) / 1000;
        this.mapBG.x -= (GameManager.speed * delta) / 1000;
    }
    moveTo(x: number) {
        this.maplayer.x = x;
        this.mapBG.x = x;
    }
}
