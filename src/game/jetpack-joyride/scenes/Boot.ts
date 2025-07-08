import { Scene } from "phaser";

export class Boot extends Scene {
    constructor() {
        super("Boot");
    }

    preload() {}

    create() {
        this.scene.start("Preloader");
        this.scale.on("resize", this.resize, this);
    }

    resize(gameSize: Phaser.Structs.Size) {
        const width = gameSize.width;
        const height = gameSize.height;
        // Reposition UI here if needed
    }
}
