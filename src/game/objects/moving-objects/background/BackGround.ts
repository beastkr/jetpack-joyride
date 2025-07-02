import { GameManager } from "../../../jetpack-joyride/GameManager";
import { MovingObject } from "../MovingObject";

export class BackGround extends MovingObject {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
    }
    public move(): void {
        this.speed = GameManager.speed;
        this.setVelocityX(-this.speed);
    }
    public checkReset(farestPosX: BackGround): boolean {
        if (this.x <= -760) {
            this.x = farestPosX.x + 760;
            return true;
        }
        return false;
    }
}
