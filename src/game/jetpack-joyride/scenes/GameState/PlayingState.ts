import { Elec } from "../../../objects/moving-objects/obstacle/Elec/Elec";
import { GameManager } from "../../GameManager";
import { GameScene } from "../GameScene";
import { GameState } from "./GameState";
export class PlayingState extends GameState {
    constructor(scene: GameScene) {
        super(scene);
        if (!this.playingsound)
            this.playingsound = this.scene.sound.add("playingBGM", { loop: true });
    }
    public onEnter(): void {
        this.playingsound.play();
    }
    elec: Elec[] = [];
    progress: number;
    playingsound: Phaser.Sound.BaseSound;
    public onUpdate(time: number, delta: number): void {
        this.scene.coinManager.update();
        this.scene.bg.update();
        this.scene.player.update(time, delta);
        this.scene.progress += delta;
        this.progress += delta;
        if (this.scene.progress >= 2000) {
            GameManager.speed += this.scene.player.isdead ? -100 : 5;
            GameManager.speed = GameManager.speed < 0 ? 0 : GameManager.speed;
            this.scene.progress = 0;
            if (!this.scene.player.isdead) {
                this.scene.coinManager.test(this.scene);
                this.RandomElec();
                this.scene.rockets.getRocket(this.scene);
            }
        }
        this.scene.zapManager.getChildren().forEach((element) => {
            element.update();
        });
        // this.scene.rockets.getChildren().forEach((element) => {
        //     element.update();
        // });
    }
    private RandomElec(): Elec {
        let t = Phaser.Math.Between(0, 2);
        let y = Phaser.Math.Between(this.scene.player.y - 100, this.scene.player.y + 100);
        if (t == 0) {
            return this.scene.zapManager.getElec(
                this.scene,
                2000,
                y,
                Phaser.Math.Between(100, 200),
                Phaser.Math.Between(0, 1) === 0
                    ? Phaser.Math.Between(-200, -100)
                    : Phaser.Math.Between(100, 200)
            );
        }
        if (t == 1) {
            return this.scene.zapManager.getElec(
                this.scene,
                2000,
                y,
                Phaser.Math.Between(100, 200),
                0
            );
        } else {
            return this.scene.zapManager.getElec(
                this.scene,
                2000,
                y,
                0,
                Phaser.Math.Between(0, 1) === 0
                    ? Phaser.Math.Between(-200, -100)
                    : Phaser.Math.Between(100, 100)
            );
        }
    }
    public onExit(): void {
        this.playingsound.stop();
    }
}
