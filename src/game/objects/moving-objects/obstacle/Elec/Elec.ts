import { Animator } from "../../../../jetpack-joyride/Animator";
import { GameManager } from "../../../../jetpack-joyride/GameManager";
import { ElecHead } from "./ElecHead";
import { Zap } from "./Zap";
import { ZapPool } from "./ZapPool";

export class Elec extends Phaser.GameObjects.Container implements JetpackJoyride.IMovingObject {
    head: ElecHead;
    tail: ElecHead;
    zapfx: ZapPool;
    headfx: Phaser.GameObjects.Sprite;
    tailfx: Phaser.GameObjects.Sprite;
    public speed: number;
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
        this.speed = GameManager.speed;
        this.zapfx = new ZapPool(this.scene);
        if (horizontal) leny = 0;
        if (verticle) lenx = 0;

        this.animInit();

        this.head = new ElecHead(scene, 0, 0, "", true);
        this.tail = new ElecHead(scene, lenx, leny, "", true);

        this.fxSetup(lenx, leny);

        this.add([this.headfx, this.tailfx]);

        const zapComponents = this.calcZaps(lenx, leny);

        this.add(zapComponents);

        this.add([this.head, this.tail]);

        this.rotateOrb();

        scene.add.existing(this);

        scene.physics.add.existing(this);
        if (this.body) {
            (this.body as Phaser.Physics.Arcade.Body).setImmovable(true).setAllowGravity(false);
        }

        this.move();
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

    public move(): void {
        this.speed = GameManager.speed;
        if (this.body) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityX(-this.speed);
        }

        if (this.head.body) {
            (this.head.body as Phaser.Physics.Arcade.Body).setVelocityX(0);
        }
        if (this.tail.body) {
            (this.tail.body as Phaser.Physics.Arcade.Body).setVelocityX(0);
        }
        this.zapfx.getChildren().forEach((element) => {
            const zap = element as Zap;
            if (zap.body) {
                (zap.body as Phaser.Physics.Arcade.Body).setVelocityX(0);
            }
        });
    }
    update() {
        if (!this.active) return;

        this.speed = GameManager.speed;
        if (this.body) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityX(-this.speed);
        }

        if (this.x <= -200) {
            this.deactivate();
        }

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

    private calcZaps(lenx: number, leny: number): Zap[] {
        const segmentLength = 32;

        const distance = Math.sqrt(lenx * lenx + leny * leny);
        const count = Math.floor(distance / segmentLength);

        const angle = Phaser.Math.Angle.Between(0, 0, lenx, leny);
        let temp = leny > 0 ? 1 : -1;
        const dx = Math.cos(angle) * segmentLength - 1;
        const dy = Math.sin(angle) * segmentLength - temp;

        // Collect all zap components before adding them to container
        const zapComponents: Zap[] = [];

        for (let i = 0; i <= count; i++) {
            const x = dx * i;
            const y = dy * i;

            const zap = this.zapfx.getZap(this.scene, x, y);
            zap.setAngle(Phaser.Math.RadToDeg(angle));

            // Remove zap from scene since it will be part of container
            this.scene.children.remove(zap);

            if (zap.body instanceof Phaser.Physics.Arcade.Body) {
                zap.body.setAllowGravity(false);
                // Stop individual movement - container will handle it
                zap.body.setVelocityX(0);

                const w = zap.width;
                const h = zap.height;

                // If moving horizontally, make the collider thin vertically
                zap.body.setSize(w, h / 4);
                zap.body.setOffset(0, h / 2 - h / 8);
            }

            Animator.play(zap, "zapFX", i % 32);
            zapComponents.push(zap);
        }

        return zapComponents;
    }
    reset(x: number, y: number, lenx: number, leny: number, verticle = false, horizontal = false) {
        this.head.enableBody();
        this.tail.enableBody();
        this.setActive(true);
        this.setVisible(true);
        this.setPosition(x, y);

        if (horizontal) leny = 0;
        if (verticle) lenx = 0;

        // Reset head and tail positions
        this.head.setPosition(0, 0);
        this.tail.setPosition(lenx, leny);
        this.headfx.setPosition(this.head.x, this.head.y);
        this.tailfx.setPosition(this.tail.x, this.tail.y);

        // Clear existing zaps from container and return to pool
        this.zapfx.getChildren().forEach((element) => {
            this.remove(element);
            this.zapfx.returnZap(element as Zap);
        });

        // Recalculate and add new zaps with proper layering
        const zapComponents = this.calcZaps(lenx, leny);

        // Insert zaps before head and tail to maintain proper layer order
        // Remove head and tail temporarily
        this.remove([this.head, this.tail]);

        // Add zaps
        this.add(zapComponents);

        // Add head and tail back on top
        this.add([this.head, this.tail]);

        this.rotateOrb();

        // Restart movement
        this.move();
    }

    deactivate() {
        // Stop container movement
        if (this.body) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityX(0);
        }

        // Disable head and tail bodies
        this.head.disableBody();
        this.tail.disableBody();

        // Remove and return all zap components
        this.zapfx.getChildren().forEach((element) => {
            this.remove(element);
            this.zapfx.returnZap(element as Zap);
        });

        this.setActive(false).setVisible(false);
    }
}
