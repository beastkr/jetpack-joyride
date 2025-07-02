import { PlayerController } from "./PlayerController";
import { PlayerSprite } from "./PlayerSprite";
import { FlyingState } from "./states/FlyingStates";
import { PlayerState } from "./states/PlayerState";
import { WalkingState } from "./states/WalkingState";

export class Player extends Phaser.GameObjects.Container {
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
        this.scale = 0.8;
    }

    public update(...args: any[]): void {
        super.update(args);
        if (this.currentState) this.currentState.onUpdate(args);
    }

    public switchState(key: string) {
        if (this.currentState === this.states[key]) return;
        if (this.currentState) this.currentState.onExit();
        this.currentState = this.states[key];
        this.currentState.onEnter();
    }

    private setUpSprite() {
        this.playerSprite = new PlayerSprite(this);
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
        };
    }
}
