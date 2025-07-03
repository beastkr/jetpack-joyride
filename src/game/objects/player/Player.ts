import { PlayerController } from "./PlayerController";
import { PlayerSprite } from "./PlayerSprite";
import { Dead } from "./states/Dead";
import { DeadByZap } from "./states/DeadByZap";
import { FlyingState } from "./states/FlyingStates";
import { PlayerState } from "./states/PlayerState";
import { WalkingState } from "./states/WalkingState";

export class Player extends Phaser.GameObjects.Container {
    isdead: boolean = false;
    shadowSprite: Phaser.GameObjects.Sprite;
    playerSprite: PlayerSprite;
    currentState: PlayerState;
    controller: PlayerController;
    states: { [key: string]: PlayerState };
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.setupBody();
        this.setUpSprite();
        this.stateInit();
        this.controller = new PlayerController(this.scene, this);
        this.scene.add.existing(this);
        this.switchState("flying");
        this.scale = 0.5;
    }

    public update(...args: any[]): void {
        super.update(args);
        if (this.currentState) this.currentState.onUpdate(args);
        this.shadowSprite.scale = (this.y + 300) / 350;
    }

    public switchState(key: string) {
        if (key == "walking" && this.isdead) return;
        if (this.currentState === this.states[key]) return;
        if (this.currentState) this.currentState.onExit();
        this.currentState = this.states[key];
        this.currentState.onEnter();
    }

    private setUpSprite() {
        this.shadowSprite = this.scene.add.sprite(0, 0, "shadow");
        this.playerSprite = new PlayerSprite(this);
        this.shadowSprite.x = this.x + 20;
        this.shadowSprite.y = 750;
        this.shadowSprite.setAlpha(0.5);
    }

    private setupBody() {
        this.scene.physics.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body)
            .setCollideWorldBounds(true)
            .setSize(70, 128)
            .setOffset(0, -64);
    }

    private stateInit() {
        this.states = {
            walking: new WalkingState(this),
            flying: new FlyingState(this),
            deadbyzap: new DeadByZap(this),
            dead: new Dead(this),
        };
    }
}
