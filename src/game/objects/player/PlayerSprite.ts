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
