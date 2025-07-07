import { Animator } from "../../../../jetpack-joyride/Animator";
import { GameManager } from "../../../../jetpack-joyride/GameManager";
import { ElecHead } from "./ElecHead";
import { Zap } from "./Zap";
import { ZapPool } from "./ZapPool";

export class Elec extends Phaser.GameObjects.Container {
    head: ElecHead;
    tail: ElecHead;
    zapfx: ZapPool;
    headfx: Phaser.GameObjects.Sprite;
    tailfx: Phaser.GameObjects.Sprite;
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        lenx: number,
        leny: number,
        verticle: boolean = false,
        horizontal: boolean = false
    ) {
        super(scene, x, y);
        this.zapfx = new ZapPool(this.scene);
        if (horizontal) leny = 0;
        if (verticle) lenx = 0;
        this.animInit();
        this.head = new ElecHead(scene, 0, 0, "");
        this.tail = new ElecHead(scene, lenx, leny, "");
        this.calc(lenx, leny);
        this.fxSetup(lenx, leny);
        this.add([this.headfx, this.tailfx, ...this.zapfx.getChildren(), this.head, this.tail]);
        this.rotateOrb();
        scene.add.existing(this);
    }

    private rotateOrb() {
        const angle = Phaser.Math.Angle.Between(this.head.x, this.head.y, this.tail.x, this.tail.y);
        const degrees = Phaser.Math.RadToDeg(angle);
        this.head.setAngle(degrees + 90);
        this.tail.setAngle(degrees + 180 + 90);
        this.zapfx.getChildren().forEach((element) => {
            (element as Zap).setAngle(degrees);
        });
    }

    move() {
        this.head.move();
        this.tail.move();
        this.zapfx.getChildren().forEach((element) => {
            (element as Zap).move();
        });
    }
    update() {
        this.move();
        if (!this.active) return;
        if (this.tail.x <= -10 - this.x) {
            this.deactivate();
        }
        this.list.forEach((element) => {
            element.update();
        });
        this.headfx.setPosition(this.head.x, this.head.y);
        this.tailfx.setPosition(this.tail.x, this.tail.y);
    }

    animInit() {
        Animator.createAnim(this.scene, "elecglow", "elecOnGlow", 0, 15);
    }
    private fxSetup(lenx: number, leny: number) {
        this.headfx = this.scene.add.sprite(0, 0, "");
        this.tailfx = this.scene.add.sprite(lenx, leny, "");
        Animator.play(this.headfx, "elecglow");
        Animator.play(this.tailfx, "elecglow");
    }

    private calc(lenx: number, leny: number) {
        const segmentLength = 32;

        const distance = Math.sqrt(lenx * lenx + leny * leny);
        const count = Math.floor(distance / segmentLength);

        const angle = Phaser.Math.Angle.Between(0, 0, lenx, leny);
        let temp = leny > 0 ? 1 : -1;
        const dx = Math.cos(angle) * segmentLength - 1;
        const dy = Math.sin(angle) * segmentLength - temp;

        for (let i = 0; i <= count; i++) {
            const x = dx * i;
            const y = dy * i;

            const zap = this.zapfx.getZap(this.scene, x, y);
            zap.setAngle(Phaser.Math.RadToDeg(angle));

            if (zap.body instanceof Phaser.Physics.Arcade.Body) {
                zap.body.setAllowGravity(false);
                zap.body.setVelocityX(-GameManager.speed);

                const w = zap.width;
                const h = zap.height;

                // If moving horizontally, make the collider thin vertically
                zap.body.setSize(w, h / 4);
                zap.body.setOffset(0, h / 2 - h / 8);
            }

            Animator.play(zap, "zapFX", i % 32);
        }
    }
    reset(x: number, y: number, lenx: number, leny: number, verticle = false, horizontal = false) {
        this.head.enableBody();
        this.tail.enableBody();
        this.setActive(true);
        this.setPosition(x, y);
        if (horizontal) leny = 0;
        if (verticle) lenx = 0;

        this.head.setPosition(0, 0);
        this.tail.setPosition(lenx, leny);
        this.headfx.setPosition(this.head.x, this.head.y);
        this.tailfx.setPosition(this.tail.x, this.tail.x);
        this.calc(lenx + x - this.x, leny + y - this.y);
        this.rotateOrb();
    }

    deactivate() {
        this.head.disableBody();
        this.tail.disableBody();
        this.zapfx.getChildren().forEach((element) => {
            this.zapfx.returnZap(element as Zap);
        });

        this.setActive(false).setVisible(false);
    }
}
