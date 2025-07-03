import { GameScene } from "../../../jetpack-joyride/scenes/GameScene";
import { Coin } from "./Coin";
import { heartPattern } from "./coin_tile_pattern";

export class CoinPool extends Phaser.GameObjects.Group {
    constructor(scene: Phaser.Scene) {
        super(scene);
        this.createMultiple({
            frameQuantity: 300,
            key: "coin",
            active: false,
            visible: false,
            classType: Coin,
        });
    }
    public update() {
        this.getChildren().forEach((element) => {
            element.update();
        });
    }

    public test(scene: GameScene) {
        const pattern = heartPattern;
        let y = Math.random() * 300 + 300;
        this.spawnFromPattern(scene, pattern, 3000, y, 32);
        console.log("aa");
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
                if (cell !== 1) return;

                const x = startX + colIndex * tileSize;
                const y = startY + rowIndex * tileSize;
                const coin = this.getFirstDead(false) as Coin | null;

                if (!coin) return;

                coin.moveTo(x, y);
                coin.enableBody(true, x, y, true, true).setVisible(true);
                coin.using = true;
                coin.move();
            });
        });
    }
}
