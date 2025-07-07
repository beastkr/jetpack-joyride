import { AUTO } from "phaser";
import { Boot } from "./jetpack-joyride/scenes/Boot";
import { GameScene } from "./jetpack-joyride/scenes/GameScene";
import { MainMenu } from "./jetpack-joyride/scenes/MainMenu";
import { Preloader } from "./jetpack-joyride/scenes/Preloader";

export const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: innerWidth,
    height: innerHeight,
    parent: "game-container",
    backgroundColor: "#000000",
    scale: {
        mode: Phaser.Scale.EXPAND, // or RESIZE
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    render: {
        antialias: false,
        pixelArt: true,
        roundPixels: true,
    },
    audio: {
        disableWebAudio: false,
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
