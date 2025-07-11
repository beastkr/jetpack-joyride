import { GameObjects, Scene } from "phaser";
import { IMAGES } from "../../../assets";

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;

    constructor() {
        super("MainMenu");
    }

    preload() {}

    create() {
        const { width, height } = this.scale;

        // Add background image at center
        this.background = this.add.image(width / 2, height / 2, IMAGES.SPLASH.KEY);

        // Get the original image dimensions
        const bgWidth = this.background.width;
        const bgHeight = this.background.height;

        // Calculate scale to fit the screen (cover the entire screen)
        const scaleX = width / bgWidth;
        const scaleY = height / bgHeight;

        // Apply the scale
        this.background.setScale(scaleX, scaleY);
        this.background.setScrollFactor(0); // Keep it fixed if camera moves

        this.input.once("pointerdown", () => {
            this.scene.start("GameScene");
            this.scale.startFullscreen();
        });
    }
}
