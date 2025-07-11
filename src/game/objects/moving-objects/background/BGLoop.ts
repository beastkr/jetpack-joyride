import { GameManager } from "../../../jetpack-joyride/GameManager";
import { Aquarium } from "./Aquarium";
import { Hall } from "./Hall";
import { Room1 } from "./Room1";

export class BGLoop {
    BGList: JetpackJoyride.IBackGround[];
    BeginBG: JetpackJoyride.IBackGround;
    currentBG: JetpackJoyride.IBackGround;
    prevBG: JetpackJoyride.IBackGround | null;
    curr: number;
    constructor(scene: Phaser.Scene) {
        this.BGList = [];
        this.BGList.push(new Aquarium(scene));
        this.BGList.push(new Hall(scene));
        this.BGList.push(new Room1(scene));

        this.BeginBG = new Room1(scene);

        this.currentBG = this.BeginBG;
        this.curr = -1;
        this.BGList.forEach((element) => {
            element.moveTo(300000);
        });
    }

    maintain() {
        if (GameManager.speed > 600 && this.prevBG)
            this.currentBG.moveTo(this.prevBG.maplayer.x + 4846);
        this.currentBG.maplayer.setDepth(-10);
        this.currentBG.mapBG?.setDepth(-19);
        this.prevBG?.maplayer.setDepth(-9);
        this.prevBG?.mapBG?.setDepth(-20);
    }

    update(time: number, delta: number) {
        if (this.prevBG != null) this.prevBG.update(time, delta);
        this.currentBG.update(time, delta);
        if (this.currentBG.maplayer.x <= -3000) {
            this.curr = (this.curr + 1) % 3;
            this.prevBG = this.currentBG;
            this.currentBG = this.BGList[this.curr];
            this.currentBG.moveTo(this.prevBG.maplayer.x + 4846);
        }
        this.maintain();
    }
    rest() {
        this.BeginBG.moveTo(-256);
        this.currentBG = this.BeginBG;
        this.curr = -1;
        this.prevBG = null;
        this.BGList.forEach((element) => {
            (element as JetpackJoyride.IBackGround).moveTo(-10000);
        });
    }
}
