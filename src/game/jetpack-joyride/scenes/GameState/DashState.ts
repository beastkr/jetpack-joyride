import { Physics } from "phaser";
import { Animator } from "../../Animator";
import { GameManager } from "../../GameManager";
import { GameScene } from "../GameScene";
import { GameState } from "./GameState";
export class DashState extends GameState {
    Aura: Phaser.GameObjects.Sprite;
    Trail: Phaser.GameObjects.Sprite;
    headstart_start: Phaser.Sound.BaseSound;
    headstart_mid: Phaser.Sound.BaseSound;
    headstart_lp: Phaser.Sound.BaseSound;
    headstart_stop: Phaser.Sound.BaseSound;
    constructor(scene: GameScene) {
        super(scene);
        Animator.createAnim(this.scene, "aura", "speedup", 0, 7);
        Animator.createAnim(this.scene, "trail", "speedup", 8, 15);
        this.Aura = this.scene.add.sprite(0, 0, "speedup").setVisible(false).setScale(2, 2);
        this.Trail = this.scene.add.sprite(0, 0, "speedup").setVisible(false).setScale(2, 2);

        this.headstart_start = this.scene.sound.add("headstart_start");
        this.headstart_start.on("complete", () => {
            this.headstart_lp.play();
        });
        this.headstart_mid = this.scene.sound.add("headstart_mid");
        this.headstart_mid.on("complete", () => {
            this.headstart_start.play();
        });
        this.headstart_lp = this.scene.sound.add("headstart_lp", { loop: true });
        this.headstart_stop = this.scene.sound.add("headstart_stop");
    }
    public onEnter(): void {
        this.scene.worker.forEach((element) => {
            element.rest();
        });
        this.headstart_start.play();
        this.scene.player.setY(500);
        (this.scene.player.body as Physics.Arcade.Body).setAllowGravity(false).setVelocity(0, 0);
        GameManager.speed = 4000;
        this.Aura.setVisible(true).setPosition(this.scene.player.x + 50, this.scene.player.y);
        Animator.play(this.Aura, "aura");
        this.Trail.setVisible(true).setPosition(
            this.scene.player.x - 50 - 126,
            this.scene.player.y
        );
        Animator.play(this.Trail, "trail");
        this.scene.player.switchState("hold");
        Animator.playAnim(this.scene.player.playerSprite, "flydown");
    }
    public onUpdate(time: number, delta: number): void {
        GameManager.score += Math.round((GameManager.speed * delta) / 1000);
        // this.scene.bg.update();
        GameManager.speed -= (700 * delta) / 1000;
        if (GameManager.speed < 300) this.change();
        // this.scene.worker.forEach((element) => {
        //     element.update();
        // });
    }

    public onExit(): void {
        this.Aura.setVisible(false);
        this.Trail.setVisible(false);
    }
    private change() {
        GameManager.speed = 300;
        (this.scene.player.body as Physics.Arcade.Body).setAllowGravity(true);
        this.scene.switchState("playing");
        this.headstart_lp.stop();
        this.headstart_stop.play();
    }
}
