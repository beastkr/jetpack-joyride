import { Lazer } from "./Lazer";

export class LazerManager {
    Lazers: Lazer[] = [];
    constructor(scene: Phaser.Scene) {
        for (var i = 0; i < 5; i++) {
            this.Lazers.push(new Lazer(scene, 300 + i * 100));
        }
        this.rest();
    }
    shot() {
        let shoot = [0, 0, 0, 0, 0];
        let num = Phaser.Math.Between(1, 3);
        for (var i = 0; i < num; i++) {
            shoot[i] = 1;
        }
        for (var i = 0; i < 5; i++) {
            let t = shoot[i];
            let rand = Phaser.Math.Between(0, 4);
            shoot[i] = shoot[rand];
            shoot[rand] = t;
        }
        for (var i = 0; i < 5; i++) {
            if (shoot[i] == 1) {
                this.Lazers[i].turnOn();
            }
        }
    }
    rest() {
        this.Lazers.forEach((element) => {
            element.turnOff();
        });
    }
}
