import { PlayerState } from "./PlayerState";

export class Reborn extends PlayerState {
    public onEnter(): void {
        this.player.playerSprite.flip(false, false);
        this.player.scene.physics.world.gravity.y = 900;
        this.player.scene.cameras.main.shake(250, 0.01);
        this.player.scene.cameras.main.flash(500, 255, 255, 255); // duration, r, g, b

        this.player.playerSprite.showAll();
        this.player.playerSprite.list.pop();
    }
    public onUpdate(...args: any[]): void {}
    public onExit(): void {}
    protected animInit(): void {}
}
