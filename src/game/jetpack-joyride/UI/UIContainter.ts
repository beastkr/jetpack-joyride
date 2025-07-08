export class UiContainer extends Phaser.GameObjects.Container {
    border: Phaser.GameObjects.Sprite[][] = [[]];
    constructor(scene: Phaser.Scene, x: number, y: number, sizeX: number, sizeY: number) {
        super(scene, x, y);
        this.scene.add.existing(this);
        this.border[0].push(
            this.scene.add.sprite(-sizeX / 2 - 7.5, -sizeY / 2 - 7.5, "containerEdge")
        );
        this.border[0].push(
            this.scene.add.sprite(0, -sizeY / 2 - 7.5, "containerTop").setScale(sizeX / 34, 1)
        );
        this.border[0].push(
            this.scene.add.sprite(sizeX / 2 + 7.5, -sizeY / 2 - 7.5, "containerEdge").setFlipX(true)
        );
        this.border.push([]);

        this.border[1].push(
            this.scene.add.sprite(-sizeX / 2 - 7.5, 0, "containerLeft").setScale(1, sizeY / 34)
        );
        this.border[1].push(this.scene.add.sprite(0, 0, "containerFiller").setScale(sizeX, sizeY));
        this.border[1].push(
            this.scene.add
                .sprite(sizeX / 2 + 7.5, 0, "containerLeft")
                .setScale(1, sizeY / 34)
                .setFlipX(true)
        );
        this.border.push([]);
        this.border[2].push(
            this.scene.add
                .sprite(-sizeX / 2 - 7.5, sizeY / 2 + 7.5, "containerEdge")
                .setFlip(false, true)
        );
        this.border[2].push(
            this.scene.add
                .sprite(0, sizeY / 2 + 7.5, "containerTop")
                .setScale(sizeX / 34, 1)
                .setFlip(false, true)
        );
        this.border[2].push(
            this.scene.add
                .sprite(sizeX / 2 + 7.5, sizeY / 2 + 7.5, "containerEdge")
                .setFlip(true, true)
        );

        this.border.forEach((element) => {
            element.forEach((e) => {
                this.add(e);
                console.log(e);
            });
        });
    }
}
