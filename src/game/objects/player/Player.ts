import { PlayerController } from "./PlayerController";
import { PlayerSprite } from "./PlayerSprite";
import { Dead } from "./states/Dead";
import { DeadByRocket } from "./states/DeadByRocket";
import { DeadByZap } from "./states/DeadByZap";
import { FlyingState } from "./states/FlyingStates";
import { HoldingState } from "./states/HoldingState";
import { PlayerState } from "./states/PlayerState";
import { Reborn } from "./states/Reborn";
import { UpgradeState } from "./states/Upgrade/UpgradeState";
import { Vehicle } from "./states/Upgrade/Vehicle";
import { WalkingState } from "./states/WalkingState";

export class Player extends Phaser.GameObjects.Container {
    isdead: boolean = false;
    shadowSprite: Phaser.GameObjects.Sprite;
    playerSprite: PlayerSprite;
    currentState: PlayerState;
    controller: PlayerController;
    states: { [key: string]: PlayerState };
    onGround: boolean = false;
    vehicle: Vehicle | null;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.setupBody();
        this.setUpSprite();
        this.vehicle = null;
        this.stateInit();
        this.controller = new PlayerController(this.scene, this);
        this.scene.add.existing(this);
        this.switchState("walking");
        this.scale = 0.5;
        this.setDepth(111);
    }

    public update(time: number, delta: number): void {
        this.onGround = (this.body as Phaser.Physics.Arcade.Body).blocked.down;
        // console.log(this.currentState);
        super.update(time, delta);
        if (this.body?.velocity.y != 0) this.onGround = false;
        //console.log(this.currentState);
        if (this.currentState) this.currentState.onUpdate(time, delta);
        this.shadowSprite.x = this.x;
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

    public resetBody() {
        (this.body as Phaser.Physics.Arcade.Body).setSize(70, 128).setOffset(0, -64);
    }

    private setupBody() {
        this.scene.physics.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body).setSize(70, 128).setOffset(0, -64);
    }

    private stateInit() {
        this.states = {
            walking: new WalkingState(this),
            flying: new FlyingState(this),
            deadbyzap: new DeadByZap(this),
            deadbyrocket: new DeadByRocket(this),
            dead: new Dead(this),
            upgrade: new UpgradeState(this),
            hold: new HoldingState(this),
            reborn: new Reborn(this),
        };
    }
}
