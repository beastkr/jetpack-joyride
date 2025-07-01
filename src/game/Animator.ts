export class Animator {
    static init(scene: Phaser.Scene) {
        scene.anims.create({
            key: "walk",
            frames: scene.anims.generateFrameNumbers("player_body", {
                start: 0,
                end: 3,
            }),
            frameRate: 12,
            repeat: -1,
        });
        scene.anims.create({
            key: "fly",
            frames: scene.anims.generateFrameNumbers("player_body", {
                start: 4,
                end: 7,
            }),
            frameRate: 12,
            repeat: -1,
        });
        scene.anims.create({
            key: "fall",
            frames: scene.anims.generateFrameNumbers("player_body", {
                start: 9,
                end: 11,
            }),
            frameRate: 12,
            repeat: 0,
        });
        scene.anims.create({
            key: "jetpack",
            frames: scene.anims.generateFrameNumbers("player_jetpack", {
                start: 0,
                end: 3,
            }),
            frameRate: 12,
            repeat: -1,
        });
        scene.anims.create({
            key: "head",
            frames: scene.anims.generateFrameNumbers("player_head", {
                start: 0,
                end: 3,
            }),
            frameRate: 12,
            repeat: -1,
        });
        scene.anims.create({
            key: "jetpack2",
            frames: scene.anims.generateFrameNumbers("player_jetpack", {
                start: 4,
                end: 7,
            }),
            frameRate: 12,
            repeat: 0,
        });
        scene.anims.create({
            key: "head2",
            frames: scene.anims.generateFrameNumbers("player_head", {
                start: 4,
                end: 7,
            }),
            frameRate: 12,
            repeat: 0,
        });
        scene.anims.create({
            key: "jetpack3",
            frames: scene.anims.generateFrameNumbers("player_jetpack", {
                start: 8,
                end: 11,
            }),
            frameRate: 12,
            repeat: 0,
        });
        scene.anims.create({
            key: "head3",
            frames: scene.anims.generateFrameNumbers("player_head", {
                start: 9,
                end: 11,
            }),
            frameRate: 12,
            repeat: 0,
        });
        scene.anims.create({
            key: "jetpack4",
            frames: scene.anims.generateFrameNumbers("player_jetpack", {
                start: 12,
                end: 15,
            }),
            frameRate: 12,
            repeat: 0,
        });
        scene.anims.create({
            key: "head4",
            frames: scene.anims.generateFrameNumbers("player_head", {
                start: 12,
                end: 15,
            }),
            frameRate: 12,
            repeat: 0,
        });
        scene.anims.create({
            key: "land",
            frames: scene.anims.generateFrameNumbers("player_body", {
                start: 12,
                end: 15,
            }),
            frameRate: 12,
            repeat: 0,
        });
        scene.anims.create({
            key: "coin_flip",
            frames: scene.anims.generateFrameNumbers("coin", {
                start: 0,
                end: 7,
            }),
            frameRate: 12,
            repeat: -1,
        });
    }

    static play(sprite: Phaser.GameObjects.Sprite, key: string) {
        sprite.anims.play(key, true);
    }
}
