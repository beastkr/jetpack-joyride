import { GameScene } from "../../../jetpack-joyride/scenes/GameScene";
import { Bigcoin } from "./Bigcoin";
import { Coin } from "./Coin";
import { CointileLoader } from "./CoinTileLoader";

export class CoinPool extends Phaser.GameObjects.Group implements JetpackJoyride.ICoinPool {
    bigPool: Phaser.GameObjects.Group;
    constructor(scene: Phaser.Scene) {
        super(scene);
        this.bigPool = scene.add.group();
        this.bigPool.createMultiple({
            frameQuantity: 100,
            key: "bigcoin",
            active: false,
            visible: false,
            classType: Bigcoin,
        });
        this.createMultiple({
            frameQuantity: 100,
            key: "coin",
            active: false,
            visible: false,
            classType: Coin,
        });
    }
    public update() {}

    public test(scene: GameScene) {
        const patterns = CointileLoader.tile;
        const pattern = Phaser.Math.RND.pick(patterns); // random pick
        const y = Math.random() * 300 + 300;
        this.spawnFromPattern(scene, pattern, 2000, y, 32);
    }
    public spawnFromPattern(
        scene: GameScene,
        pattern: number[][],
        startX: number,
        startY: number,
        tileSize: number = 64
    ): void {
        pattern.forEach((rowData, rowIndex) => {
            rowData.forEach((cell, colIndex) => {
                if (cell === 0) return;

                const x = startX + colIndex * tileSize;
                const y = startY + rowIndex * tileSize;

                if (cell === 1) {
                    const coin = this.getFirstDead(false) as Coin | null;
                    if (!coin) return;

                    coin.reuse(x, y);
                } else if (cell === 9) {
                    const bigCoin = this.bigPool.getFirstDead(false) as Bigcoin | null;
                    if (!bigCoin) return;

                    bigCoin.reuse(x, y);
                }
            });
        });
    }
    public disableAll() {
        this.getChildren().forEach((element: any) => {
            if (element.body) {
                element.disableBody(true, true);
            }
            element.setActive(false).setVisible(false);
            element.using = false;
        });

        this.bigPool.getChildren().forEach((element: any) => {
            if (element.body) {
                element.disableBody(true, true);
            }
            element.setActive(false).setVisible(false);
            element.using = false;
        });
    }
}
