export class Ground extends Phaser.GameObjects.Rectangle {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number
    ) {
        super(scene, x, y, width, height, 0, 0);
        scene.add.existing(this);
        scene.physics.add.existing(this, true); // true = static body
    }
}
