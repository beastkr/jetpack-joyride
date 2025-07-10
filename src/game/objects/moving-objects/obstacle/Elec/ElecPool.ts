import { Elec } from "./Elec";

export class ElecPool extends Phaser.GameObjects.Group implements JetpackJoyride.IElecPool {
    constructor(scene: Phaser.Scene) {
        super(scene);
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
        let elec = this.getFirstDead(false) as Elec;

        if (elec) {
            elec.setActive(true);
            elec.setVisible(true);
            elec.reset(x, y, lenx, leny, verticle, horizontal);
        } else {
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
