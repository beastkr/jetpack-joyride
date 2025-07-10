// Animator implements IAnimator interface through static methods
export class Animator {
    static createAnim(
        scene: Phaser.Scene,
        key: string,
        source: string,
        start: number,
        end: number,
        frameRate: number = 12,
        repeat: boolean = true,
        repeatTime: number = -1
    ) {
        if (scene.anims.get(key)) return;
        scene.anims.create({
            key: key,
            frames: scene.anims.generateFrameNumbers(source, {
                start: start,
                end: end,
            }),
            frameRate: frameRate,
            repeat: repeat ? repeatTime : 0,
        });
    }

    static play(sprite: Phaser.GameObjects.Sprite, key: string, startFrame?: number) {
        sprite.anims.play(key, true);
        if (!startFrame) return;
        const animation = sprite.anims.currentAnim;

        if (animation && startFrame >= 0 && startFrame < animation.frames.length) {
            const frame = animation.frames[startFrame];
            sprite.anims.setCurrentFrame(frame);
        }
    }

    static playAnim(container: Phaser.GameObjects.Container, key: string, func?: () => void) {
        container.list.forEach((part) => {
            if (container.scene.anims.get(key + "_" + part.name))
                Animator.play(part as Phaser.GameObjects.Sprite, key + "_" + part.name);
        });
        if (func) container.list[0].once("animationcomplete-" + key + "_head", () => func());
    }
}
