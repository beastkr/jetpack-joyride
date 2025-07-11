import { Scene } from "phaser";
import { AUDIO, IMAGES, JSON_DATA, SPRITESHEET, TILEMAP } from "../../../assets";
import { CointileLoader } from "../../objects/moving-objects/coins/CoinTileLoader";
import { GameManager } from "../GameManager";

export class Preloader extends Scene {
    constructor() {
        super("Preloader");
    }

    init() {
        //  A simple progress bar. This is the outline of the bar.
        this.add
            .rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, 468, 32)
            .setStrokeStyle(5, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(
            this.cameras.main.width / 2 - 468 / 2 + 1,
            this.cameras.main.height / 2,
            4,
            28,
            0xffffff
        );

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on("progress", (progress: number) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + 460 * progress;
        });
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.loadAssets();
    }

    create() {
        GameManager.init();
        CointileLoader.init();

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start("MainMenu");
    }
    loadAssets() {
        Object.values(IMAGES).forEach((asset) => this.load.image(asset.KEY, asset.PATH));

        Object.values(SPRITESHEET).forEach((sheet) =>
            this.load.spritesheet(sheet.KEY, sheet.PATH, {
                frameWidth: sheet.FRAME_W,
                frameHeight: sheet.FRAME_H,
            })
        );

        Object.values(AUDIO).forEach((audio) => this.load.audio(audio.KEY, audio.PATH));

        Object.values(JSON_DATA).forEach((json) => this.load.json(json.KEY, json.PATH));

        Object.values(TILEMAP).forEach((tilemap) =>
            this.load.tilemapTiledJSON(tilemap.KEY, tilemap.PATH)
        );
    }
}
