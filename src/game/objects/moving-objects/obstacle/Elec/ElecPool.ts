import { Elec } from "./Elec";

export class ElecPool extends Phaser.GameObjects.Group {
    constructor(scene: Phaser.Scene) {
        super(scene);

        this.createMultiple({
            classType: Elec,
            key: "elec",
            frameQuantity: 5,
            active: false,
            visible: false,
        });
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
            console.log("aaa");
            elec.setActive(true);
            elec.setVisible(true);
            elec.reset(x, y, lenx, leny, verticle, horizontal);
        } else {
            elec = new Elec(scene, x, y, lenx, leny, verticle, horizontal);
            this.add(elec);
            console.log("stupid");
        }
        return elec;
    }

    returnElec(elec: Elec) {
        elec.deactivate();
        elec.setActive(false);
        elec.setVisible(false);
    }
    disableAll() {
        this.getChildren().forEach((element) => {
            this.returnElec(element as Elec);
        });
    }
}
