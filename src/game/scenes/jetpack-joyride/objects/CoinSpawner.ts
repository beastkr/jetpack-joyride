import { heartPattern } from "../../../tile-pattern/tilemap";
import { Coin } from "./Coin";

export class CoinSpawner {
    static test(scene: Phaser.Scene) {
        const pattern = heartPattern;
        this.spawnFromPattern(scene, pattern, 500, 300, 32);
    }

    static spawnFromPattern(
        scene: Phaser.Scene,
        pattern: number[][],
        startX: number,
        startY: number,
        tileSize: number = 64
    ) {
        for (let row = 0; row < pattern.length; row++) {
            for (let col = 0; col < pattern[row].length; col++) {
                if (pattern[row][col] === 1) {
                    const x = startX + col * tileSize;
                    const y = startY + row * tileSize;
                    const coin = new Coin(scene, x, y);
                    scene.add.existing(coin);
                }
            }
        }
    }
}
