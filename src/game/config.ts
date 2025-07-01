import { AUTO } from "phaser";
import { Boot } from "./scenes/Boot";
import { GameScene } from "./scenes/jetpack-joyride/GameScene";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";

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
    scene: [Boot, MainMenu, Preloader, GameScene],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 900 },
            debug: true,
        },
    },
};
