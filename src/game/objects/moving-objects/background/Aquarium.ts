import { Physics, Tilemaps } from "phaser";
import { GameManager } from "../../../jetpack-joyride/GameManager";

export class Aquarium implements JetpackJoyride.IBackGround {
    scene: Phaser.Scene;
    map: Phaser.Tilemaps.Tilemap;
    maplayer: Phaser.Tilemaps.TilemapLayer;
    mapBG: Phaser.Tilemaps.TilemapLayer;
    mapBody: Phaser.Physics.Arcade.Body;
    bgBody: Physics.Arcade.Body;
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.map = this.scene.make.tilemap({
            key: "aquarium_map",
            tileHeight: 256,
            tileWidth: 256,
        });
        const tileset = this.map.addTilesetImage("aquarium_assets", "aquarium");
        this.mapBG = this.map.createLayer(
            "water",
            tileset as Tilemaps.Tileset,
            0,
            0
        ) as Phaser.Tilemaps.TilemapLayer;
        this.maplayer = this.map.createLayer(
            "tube",
            tileset as Tilemaps.Tileset,
            0,
            0
        ) as Phaser.Tilemaps.TilemapLayer;
        this.mapBG.setScale(1, 2);
        this.scene.physics.add.existing(this.maplayer);
        this.mapBody = this.maplayer.body as Physics.Arcade.Body;
        this.mapBody.setAllowGravity(false);
        this.scene.physics.add.existing(this.mapBG);
        this.bgBody = this.mapBG.body as Physics.Arcade.Body;
        this.bgBody.setAllowGravity(false);
    }
    update(time: number, delta: number): void {
        this.mapBody.setVelocityX(-GameManager.speed);
        this.bgBody.setVelocityX(-GameManager.speed);
    }
    moveTo(x: number) {
        this.maplayer.x = x;
        this.mapBG.x = x;
    }
}
