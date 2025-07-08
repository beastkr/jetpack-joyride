import { PlayerState } from "./PlayerState";

export class Reborn extends PlayerState {
    hit: Phaser.Sound.BaseSound;
    public onEnter(): void {
        if (!this.hit) this.hit = this.player.scene.sound.add("hit");
        this.player.playerSprite.flip(false, false);
        this.player.scene.physics.world.gravity.y = 900;
        this.player.scene.cameras.main.shake(500, 0.02);
        this.player.scene.cameras.main.flash(500, 255, 255, 255); // duration, r, g, b
        this.hit.play();

        this.player.playerSprite.showAll();
        this.player.playerSprite.list.pop();
    }
    public onUpdate(...args: any[]): void {}
    public onExit(): void {}
    protected animInit(): void {}
}
