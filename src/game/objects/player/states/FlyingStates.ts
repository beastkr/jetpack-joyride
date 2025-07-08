import { Animator } from "../../../jetpack-joyride/Animator";
import { Bullets } from "../Bullets";
import { Player } from "../Player";
import { PlayerState } from "./PlayerState";

export class FlyingState extends PlayerState {
    private falling: boolean = false;
    private jetFX: Phaser.GameObjects.Sprite;
    private bulletParticle: Bullets;
    private shootingsound;
    private stopsound;
    constructor(player: Player) {
        super(player);
        if (!this.bulletParticle) this.bulletParticle = new Bullets(this.player.scene, this.player);
        this.shootingsound = this.player.scene.sound.add("shooting", { loop: true });
        this.stopsound = this.player.scene.sound.add("stopshooting");
        this.bulletParticle.stop();
    }
    public onEnter(): void {
        if (!this.jetFX) this.createJetFX();
        this.player.scene.tweens.add({
            targets: this.jetFX,
            alpha: { from: 1, to: 0 },
            loop: -1,
            duration: 100,
        });
        this.flyup();
    }
    public onUpdate(...args: any[]): void {
        this.player.controller.jetLaunch();
        this.checkFall();
        if (!this.falling) {
            this.flyup();
        }
        this.bulletParticle.kill();
        // console.log(this.player.y, this.bulletParticle.y);
    }

    private setFXVisible(visible: boolean) {
        this.jetFX.setVisible(visible);
    }
    private flyup() {
        if (!this.shootingsound.isPlaying) this.shootingsound.play();
        this.setFXVisible(true);
        Animator.playAnim(this.player.playerSprite, "flyup");
        // this.bulletParticle.emitParticleAt(this.player.x, this.player.y, 1);

        this.bulletParticle.start();
    }
    public onExit(): void {
        this.setFXVisible(false);
        (this.player.body as Phaser.Physics.Arcade.Body).setVelocityY(0);
        this.bulletParticle.stop();
        this.stopsound.stop();
        this.shootingsound.stop();
    }

    protected animInit() {
        this.flyUpAnimInit();
        this.flyDownAnimInit();
        this.jetFXAnim();
    }
    private flyUpAnimInit() {
        Animator.createAnim(this.player.scene, "flyup_head", "player_head", 4, 7, 24);
        Animator.createAnim(this.player.scene, "flyup_body", "player_body", 4, 7, 24);
        Animator.createAnim(this.player.scene, "flyup_jetpack", "player_jetpack", 4, 7, 24);
    }
    private flyDownAnimInit() {
        Animator.createAnim(this.player.scene, "flydown_head", "player_head", 8, 11, 12, false);
        Animator.createAnim(this.player.scene, "flydown_body", "player_body", 8, 11, 12, false);
        Animator.createAnim(
            this.player.scene,
            "flydown_jetpack",
            "player_jetpack",
            8,
            11,
            12,
            false
        );
    }
    private createJetFX() {
        this.jetFX = this.player.scene.add.sprite(0, 0, "");
        console.log(this.player.list);
        this.player.playerSprite.add(this.jetFX);
        this.jetFX.setName("jetfx");
        this.jetFX.scale = 0.4;
        this.jetFX.y = 24;
    }

    private jetFXAnim() {
        Animator.createAnim(this.player.scene, "flyup_jetfx", "jet_fx", 0, 3, 24);
        Animator.createAnim(this.player.scene, "flyup_bulletfx", "bullet_fx", 0, 3, 24);
    }

    private checkFall() {
        const body = this.player.body as Phaser.Physics.Arcade.Body;
        if (body.velocity.y > 50 && !this.falling) {
            this.falling = true;
            Animator.playAnim(this.player.playerSprite, "flydown");
            this.setFXVisible(false);
            this.bulletParticle.stop();
            this.stopsound.play();
            this.shootingsound.stop();
        }
        if (body.velocity.y <= 50) this.falling = false;
    }
}
