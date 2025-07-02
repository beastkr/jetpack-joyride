import { GameScene } from "../../../jetpack-joyride/scenes/GameScene";
import { Coin } from "./Coin";
import { heartPattern } from "./coin_tile_pattern";

export class CoinManager {
    static coinList: Coin[] = [];
    static test(scene: GameScene) {
        const pattern = heartPattern;
        this.spawnFromPattern(scene, pattern, 1500, 300, 32);
    }

    static spawnFromPattern(
        scene: GameScene,
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
                    const coin = new Coin(scene, x, y, "");
                    this.coinList.push(coin);
                }
            }
        }
    }

    static update(time: number, delta: number) {
        CoinManager.coinList = CoinManager.coinList.filter((coin) => coin.destroyed == false);
        this.coinList.forEach((element) => {
            element.update(time, delta);
        });
    }
}
