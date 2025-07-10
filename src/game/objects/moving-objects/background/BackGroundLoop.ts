import { BackGround } from "./BackGround";

export class BackGroundLoop implements JetpackJoyride.IBackGroundLoop {
    backgrounds: BackGround[] = [];
    currentLast: BackGround;
    constructor(scene: Phaser.Scene) {
        for (var i = 0; i < 7; i++) {
            this.backgrounds.push(new BackGround(scene, i * 764, 512, "room1"));
        }
        this.currentLast = this.backgrounds[this.backgrounds.length - 1];
    }
    public update() {
        for (var i = 0; i < this.backgrounds.length; i++) {
            this.backgrounds[i].move();
            if (this.backgrounds[i].checkReset(this.currentLast)) {
                this.currentLast = this.backgrounds[i];
                return;
            }
        }
    }
}
