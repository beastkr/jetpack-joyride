export class Animator {
    static createAnim(
        scene: Phaser.Scene,
        key: string,
        source: string,
        start: number,
        end: number,
        frameRate: number = 12,
        repeat: boolean = true
    ) {
        if (scene.anims.get(key)) return;
        scene.anims.create({
            key: key,
            frames: scene.anims.generateFrameNumbers(source, {
                start: start,
                end: end,
            }),
            frameRate: frameRate,
            repeat: repeat ? -1 : 0,
        });
    }

    static play(sprite: Phaser.GameObjects.Sprite, key: string) {
        sprite.anims.play(key, true);
    }

    static playAnim(container: Phaser.GameObjects.Container, key: string, func?: () => void) {
        container.list.forEach((part) => {
            Animator.play(part as Phaser.GameObjects.Sprite, key + "_" + part.name);
        });
        if (func) container.list[0].once("animationcomplete-" + key + "_head", () => func());
    }
}
