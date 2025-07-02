import { AUTO } from "phaser";
import { Boot } from "./jetpack-joyride/scenes/Boot";
import { GameScene } from "./jetpack-joyride/scenes/GameScene";
import { MainMenu } from "./jetpack-joyride/scenes/MainMenu";
import { Preloader } from "./jetpack-joyride/scenes/Preloader";

export const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1920,
    height: 1024,
    parent: "game-container",
    backgroundColor: "#028af8",
    scale: {
        mode: Phaser.Scale.FIT, // or RESIZE
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    render: {
        antialias: false,
        pixelArt: true,
        roundPixels: true,
    },
    scene: [Boot, Preloader, MainMenu, GameScene],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 900 },
            debug: true,
        },
    },
};
