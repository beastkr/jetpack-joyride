import { Rocket } from "./Rocket";

export class RocketPool extends Phaser.GameObjects.Group implements JetpackJoyride.IRocketPool {
    constructor(scene: Phaser.Scene) {
        super(scene);

        this.createMultiple({
            classType: Rocket,
            key: "rocket",
            frameQuantity: 5,
            active: false,
            visible: false,
        });
    }

    getRocket(scene: Phaser.Scene): Rocket {
        let rocket = this.getFirstDead(false) as Rocket;
        console.log(rocket);
        if (rocket) {
            rocket.pending();
        } else {
            rocket = new Rocket(scene, 0, 0);
            this.add(rocket);
            rocket.pending();
        }
        return rocket;
    }
    update(time: number, delta: number) {
        this.getChildren().forEach((element) => {
            element.update();
        });
    }

    returnRocket(rocket: Rocket) {
        rocket.reset();
        rocket.setActive(false);
        rocket.setVisible(false);
    }
    disableAll() {
        this.getChildren().forEach((element) => {
            this.returnRocket(element as Rocket);
        });
    }
}
