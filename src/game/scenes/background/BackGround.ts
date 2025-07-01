export class BackGround extends Phaser.GameObjects.Sprite {
    speed: number = 200;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.add.existing(this); // important!
    }

    update(time: number, delta: number) {
        const dt = delta / 1000; // convert ms to seconds
        this.x -= this.speed * dt;
    }
}
