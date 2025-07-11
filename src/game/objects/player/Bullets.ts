import { IMAGES, SPRITESHEET } from "../../../assets";
import { GameScene } from "../../jetpack-joyride/scenes/GameScene";
import { Player } from "./Player";

export class Bullets extends Phaser.GameObjects.Container {
    private bulletParticle: Phaser.GameObjects.Particles.ParticleEmitter;
    private explode: Phaser.GameObjects.Particles.ParticleEmitter;
    private bulletshell: Phaser.GameObjects.Particles.ParticleEmitter;
    private player: Player;
    constructor(scene: Phaser.Scene, player: Player) {
        super(scene);
        this.player = player;
        this.createParticle();
        this.createExplode();
        this.createShell();
        this.player.add(this);
        // this.scene.add.existing(this);
    }
    private createParticle() {
        this.bulletParticle = this.scene.add.particles(0, 0, IMAGES.BULLET.KEY, {
            follow: this.player,
            angle: { min: 70, max: 110 }, // movement direction
            speed: 2000,
            scale: { start: 2, end: 2 },
            alpha: { start: 1, end: 1 },
            lifespan: 1000,
            frequency: 50,
            quantity: 1,
            emitting: true,
        });
    }
    public stop() {
        this.bulletParticle.stop();
        this.bulletshell.stop();
    }

    public start() {
        this.bulletParticle.start();
        this.bulletshell.start();
    }
    public kill() {
        const p = this.bulletshell.overlap(
            (this.player.scene as GameScene).bot.body as Phaser.Physics.Arcade.Body
        );
        if (p.length > 0) {
            p.forEach((particle) => {
                particle.kill();
            });
        }

        const particles = this.bulletParticle.overlap(
            (this.player.scene as GameScene).bot.body as Phaser.Physics.Arcade.Body
        );
        if (particles.length > 0) {
            particles.forEach((particle) => {
                this.explode.emitParticleAt(particle.x, particle.y);
                this.bulletshell.emitParticleAt(this.player.x, this.player.y + 50);
                particle.kill();
            });
        }
    }

    private createExplode() {
        this.explode = this.scene.add.particles(0, 0, SPRITESHEET.BULLET_FX.KEY, {
            frame: [0, 1, 2, 3],
            emitting: false,
            speed: 0,
            scale: 1.2,
            quantity: 1,
            lifespan: 50,
        });
    }
    private createShell() {
        this.bulletshell = this.scene.add.particles(0, 0, IMAGES.BULLETSHELL.KEY, {
            emitting: true,
            angle: { min: 110, max: 150 }, // movement direction
            rotate: { min: 0, max: 360 },
            scale: 0.5,
            speedX: -100,
            speedY: 300,
            accelerationX: -1000,
            accelerationY: 600,
            quantity: 1,
            lifespan: 5000,
        });
    }
}
