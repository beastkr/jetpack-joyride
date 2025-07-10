import { Elec } from "./Elec";

export class ElecPool extends Phaser.GameObjects.Group implements JetpackJoyride.IElecPool {
    constructor(scene: Phaser.Scene) {
        super(scene);

        // Don't use createMultiple for Elec objects since they need specific constructor parameters
        // Instead, we'll create them on-demand in getElec method
    }

    getElec(
        scene: Phaser.Scene,
        x: number,
        y: number,
        lenx: number,
        leny: number,
        verticle = false,
        horizontal = false
    ): Elec {
        // Look for an inactive Elec object in the pool
        let elec = this.getFirstDead(false) as Elec;

        if (elec) {
            // Reuse existing Elec object
            elec.setActive(true);
            elec.setVisible(true);
            elec.reset(x, y, lenx, leny, verticle, horizontal);
        } else {
            // Create new Elec object if pool is empty
            elec = new Elec(scene, x, y, lenx, leny, verticle, horizontal);
            this.add(elec);
        }
        return elec;
    }

    returnElec(elec: Elec) {
        elec.deactivate();
        elec.setActive(false);
        elec.setVisible(false);
    }

    update() {
        // Update all active Elec objects
        this.getChildren().forEach((element) => {
            const elec = element as Elec;
            if (elec.active) {
                elec.update();
            }
        });
    }

    disableAll() {
        this.getChildren().forEach((element) => {
            this.returnElec(element as Elec);
        });
    }
}
