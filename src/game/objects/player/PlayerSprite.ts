import { GameObjects } from "phaser";

export class PlayerSprite extends Phaser.GameObjects.Container {
    playerHead: Phaser.GameObjects.Sprite;
    playerBody: Phaser.GameObjects.Sprite;
    playerJetpack: Phaser.GameObjects.Sprite;
    constructor(container: Phaser.GameObjects.Container) {
        super(container.scene);
        this.scene = container.scene;
        this.addHead();
        this.addBody();
        this.addJetPack();
        container.add(this);
        this.scale = 4;
    }

    public flip(x: boolean, y: boolean) {
        this.list.forEach((element) => {
            (element as GameObjects.Sprite).setFlip(x, y);
        });
    }

    public showAll(head: boolean = true, body: boolean = true, jetpack: boolean = true) {
        this.playerHead.setVisible(head);
        this.playerBody.setVisible(body);
        this.playerJetpack.setVisible(jetpack);
    }
    private addBody() {
        this.playerBody = this.scene.add.sprite(10, 5, "player_body");
        this.add(this.playerBody);
        this.playerBody.setName("body");
    }

    private addHead() {
        this.playerHead = this.scene.add.sprite(10, -8, "player_head");
        this.add(this.playerHead);
        this.playerHead.setName("head");
    }

    private addJetPack() {
        this.playerJetpack = this.scene.add.sprite(0, 5, "player_jetpack");
        this.add(this.playerJetpack);
        this.playerJetpack.setName("jetpack");
    }
}
