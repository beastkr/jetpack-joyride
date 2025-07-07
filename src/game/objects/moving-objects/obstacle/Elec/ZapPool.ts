import { Zap } from "./Zap";

export class ZapPool extends Phaser.GameObjects.Group {
    constructor(scene: Phaser.Scene) {
        super(scene);

        this.createMultiple({
            classType: Zap,
            key: "zap", // sprite key
            frameQuantity: 10, // adjust to max needed
            active: false,
            visible: false,
            setXY: { x: -1000, y: -1000 }, // offscreen
        });
    }

    getZap(scene: Phaser.Scene, x: number, y: number): Zap {
        const zap = this.getFirstDead(false) as Zap;
        if (zap) {
            zap.setActive(true);
            zap.setVisible(true);
            zap.setPosition(x, y);
            scene.physics.world.enable(zap);
            return zap;
        } else {
            // fallback if pool is exhausted (optional)
            const fallback = new Zap(scene, x, y, "");
            this.add(fallback);
            return fallback;
        }
    }

    returnZap(zap: Zap) {
        zap.setActive(false);
        zap.setVisible(false);
        zap.body?.stop();
        zap.body?.reset(-1000, -1000); // send offscreen
    }
}
