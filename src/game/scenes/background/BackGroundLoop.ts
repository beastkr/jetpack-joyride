import { BackGround } from "./BackGround";

export class BackGroundLoop extends Phaser.GameObjects.Container {
    BGs: BackGround[];
    size: number;
    constructor(scene: Phaser.Scene, size: number) {
        super(scene, 0, 0);
        this.BGs = [];
        this.size = size;
        for (var i = 0; i < size; i++) {
            this.BGs.push(new BackGround(this.scene, 0, 512 * i, "room1"));
            this.add(this.BGs[this.BGs.length]);
        }
    }
    update(time: number, delta: number): void {
        this.BGs.forEach((element) => {
            element.update(time, delta);
        });
    }
}
