import { IMAGES } from "../../../assets";

export class UiContainer extends Phaser.GameObjects.Container {
    border: Phaser.GameObjects.Sprite[][] = [[]];
    constructor(scene: Phaser.Scene, x: number, y: number, sizeX: number, sizeY: number) {
        super(scene, x, y);
        this.scene.add.existing(this);
        this.border[0].push(
            this.scene.add.sprite(-sizeX / 2 - 7.5, -sizeY / 2 - 7.5, IMAGES.CONTAINER_EDGE.KEY)
        );
        this.border[0].push(
            this.scene.add
                .sprite(0, -sizeY / 2 - 7.5, IMAGES.CONTAINER_TOP.KEY)
                .setScale(sizeX / 34, 1)
        );
        this.border[0].push(
            this.scene.add
                .sprite(sizeX / 2 + 7.5, -sizeY / 2 - 7.5, IMAGES.CONTAINER_EDGE.KEY)
                .setFlipX(true)
        );
        this.border.push([]);

        this.border[1].push(
            this.scene.add
                .sprite(-sizeX / 2 - 7.5, 0, IMAGES.CONTAINER_LEFT.KEY)
                .setScale(1, sizeY / 34)
        );
        this.border[1].push(
            this.scene.add.sprite(0, 0, IMAGES.CONTAINER_FILLER.KEY).setScale(sizeX, sizeY)
        );
        this.border[1].push(
            this.scene.add
                .sprite(sizeX / 2 + 7.5, 0, IMAGES.CONTAINER_LEFT.KEY)
                .setScale(1, sizeY / 34)
                .setFlipX(true)
        );
        this.border.push([]);
        this.border[2].push(
            this.scene.add
                .sprite(-sizeX / 2 - 7.5, sizeY / 2 + 7.5, IMAGES.CONTAINER_EDGE.KEY)
                .setFlip(false, true)
        );
        this.border[2].push(
            this.scene.add
                .sprite(0, sizeY / 2 + 7.5, IMAGES.CONTAINER_TOP.KEY)
                .setScale(sizeX / 34, 1)
                .setFlip(false, true)
        );
        this.border[2].push(
            this.scene.add
                .sprite(sizeX / 2 + 7.5, sizeY / 2 + 7.5, IMAGES.CONTAINER_EDGE.KEY)
                .setFlip(true, true)
        );

        this.border.forEach((element) => {
            element.forEach((e) => {
                this.add(e);
            });
        });
    }
}
