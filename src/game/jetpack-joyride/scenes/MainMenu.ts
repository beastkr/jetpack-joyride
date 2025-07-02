import { GameObjects, Scene } from "phaser";

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;

    constructor() {
        super("MainMenu");
    }

    preload() {
        this.load.image("splash", "assets/Splash/loading_screen.png");
    }

    create() {
        const { width, height } = this.scale;

        this.background = this.add.image(width / 2, height / 2, "splash");
        const bgWidth = this.background.width;
        const bgHeight = this.background.height;

        const scaleX = this.scale.width / bgWidth;
        const scaleY = this.scale.height / bgHeight;
        const scale = Math.max(scaleX, scaleY);

        this.background.setScale(scale);
        this.background.setScrollFactor(0); // keeps it fixed if camera moves

        this.input.once("pointerdown", () => {
            this.scene.start("GameScene");
        });
    }
}
