import { Physics } from "phaser";
import { Animator } from "../../../../jetpack-joyride/Animator";
import { GameManager } from "../../../../jetpack-joyride/GameManager";
import { ElecHead } from "./ElecHead";
import { Zap } from "./Zap";

export class Elec extends Phaser.GameObjects.Container {
    head: ElecHead;
    tail: ElecHead;
    zapfx: Zap[] = [];
    headfx: Phaser.Physics.Arcade.Sprite;
    tailfx: Phaser.Physics.Arcade.Sprite;
    constructor(scene: Phaser.Scene, x: number, y: number, lenx: number, leny: number) {
        super(scene, x, y);
        this.animInit();
        this.head = new ElecHead(scene, 0, 0, "");
        this.tail = new ElecHead(scene, lenx, leny, "");
        this.calc(lenx, leny);
        this.fxSetup(lenx, leny);
        this.add([this.headfx, this.tailfx, ...this.zapfx, this.head, this.tail]);
        this.rotateOrb();
        scene.add.existing(this);
    }

    private rotateOrb() {
        const angle = Phaser.Math.Angle.Between(this.head.x, this.head.y, this.tail.x, this.tail.y);
        const degrees = Phaser.Math.RadToDeg(angle);
        this.head.setAngle(degrees + 90);
        this.tail.setAngle(degrees + 180 + 90);
        this.zapfx.forEach((element) => {
            element.setAngle(degrees);
        });
    }
    update() {
        if (this.tail.x <= -100 - this.x) {
            this.setActive(false);
        }
    }

    animInit() {
        Animator.createAnim(this.scene, "elecglow", "elecOnGlow", 0, 15);
    }
    private fxSetup(lenx: number, leny: number) {
        this.headfx = this.scene.physics.add.sprite(0, 0, "");
        this.tailfx = this.scene.physics.add.sprite(lenx, leny, "");
        (this.headfx.body as Physics.Arcade.Body).setAllowGravity(false);
        (this.tailfx.body as Physics.Arcade.Body).setAllowGravity(false);
        Animator.play(this.headfx, "elecglow");
        Animator.play(this.tailfx, "elecglow");
        (this.headfx.body as Physics.Arcade.Body).setVelocityX(-GameManager.speed);
        (this.tailfx.body as Physics.Arcade.Body).setVelocityX(-GameManager.speed);
    }

    private calc(lenx: number, leny: number) {
        const distance = Math.sqrt(lenx * lenx + leny * leny);
        const segmentLength = 32; // match your zap texture width
        const count = Math.floor(distance / segmentLength);

        const angle = Phaser.Math.Angle.Between(0, 0, lenx, leny); // relative from head to tail
        const dx = Math.cos(angle) * segmentLength - 1;
        const dy = Math.sin(angle) * segmentLength - leny / Math.abs(leny);

        for (let i = 0; i <= count + 1; i++) {
            const x = dx * i;
            const y = dy * i;

            const zap = new Zap(this.scene, x, y, "");
            zap.setAngle(Phaser.Math.RadToDeg(angle));

            // Optional: if using Arcade physics
            if (zap.body instanceof Phaser.Physics.Arcade.Body) {
                zap.body.setAllowGravity(false);
                zap.body.setVelocityX(-GameManager.speed);

                // Fix offset and size if needed
                const w = zap.width;
                const h = zap.height;

                // Example: narrow horizontal line
                zap.body.setSize(w, h / 4); // thin collider
                zap.body.setOffset(0, h / 2 - h / 8); // center the collider vertically
            }
            Animator.play(zap, "zapFX", i % 32);
            this.zapfx.push(zap);
        }
    }
}
