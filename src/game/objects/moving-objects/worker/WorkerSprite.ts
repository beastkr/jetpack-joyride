import { GameObjects } from "phaser";
import { Animator } from "../../../jetpack-joyride/Animator";

export class WorkerSprite extends Phaser.GameObjects.Container {
    workerHead: Phaser.GameObjects.Sprite;
    workerBody: Phaser.GameObjects.Sprite;
    workerJetpack: Phaser.GameObjects.Sprite;
    constructor(container: Phaser.GameObjects.Container) {
        super(container.scene);
        this.AnimInit();
        this.scene = container.scene;
        this.addHead();
        this.addBody();
        container.add(this);
        this.scale = 4;
        this.start();
    }

    public flip(x: boolean, y: boolean) {
        this.list.forEach((element) => {
            (element as GameObjects.Sprite).setFlip(x, y);
        });
    }
    public start() {
        let rand = Phaser.Math.Between(0, 1);
        switch (rand) {
            case 0: {
                Animator.playAnim(this, "walking");
                break;
            }
            case 1: {
                Animator.playAnim(this, "running");
            }
        }
    }

    public showAll(head: boolean = true, body: boolean = true, jetpack: boolean = true) {
        this.workerHead.setVisible(head);
        this.workerBody.setVisible(body);
        this.workerJetpack.setVisible(jetpack);
    }
    private addBody() {
        this.workerBody = this.scene.add.sprite(10, 5, "worker_body");
        this.add(this.workerBody);
        this.workerBody.setName("workerbody");
    }

    private addHead() {
        this.workerHead = this.scene.add.sprite(10, -8, "worker_head");
        this.add(this.workerHead);
        this.workerHead.setName("workerhead");
    }

    private AnimInit() {
        Animator.createAnim(this.scene, "walking_workerhead", "worker_head", 0, 3);
        Animator.createAnim(this.scene, "walking_workerbody", "worker_body", 0, 3);
        Animator.createAnim(this.scene, "running_workerhead", "worker_head", 4, 7);
        Animator.createAnim(this.scene, "running_workerbody", "worker_body", 4, 7);
        Animator.createAnim(this.scene, "dead_workerhead", "worker_head", 0, 0);
        Animator.createAnim(this.scene, "dead_workerbody", "worker_body", 0, 0);
    }
}
