import { FlyingState } from "../../../player-state/FlyingState";
import { PlayerState } from "../../../player-state/PlayerState";
import { WalkingState } from "../../../player-state/WalkingState";

export class Player extends Phaser.GameObjects.Container {
    private sceneRef: Phaser.Scene;
    public head: Phaser.GameObjects.Sprite;
    public playerbody: Phaser.GameObjects.Sprite;
    public jetpack: Phaser.GameObjects.Sprite;
    private keyW: Phaser.Input.Keyboard.Key;

    private physicsBody: Phaser.Physics.Arcade.Body;
    private states: { [key: string]: PlayerState };
    public currentState: PlayerState;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.sceneRef = scene;
        this.sceneRef.add.existing(this);
        this.sceneRef.physics.add.existing(this);
        // Tạo các phần thân
        this.head = scene.add.sprite(30, -15, "player_head");
        this.playerbody = scene.add.sprite(40, 25, "player_body");
        this.jetpack = scene.add.sprite(0, 20, "player_jetpack");
        // Scale và add vào container
        [this.head, this.playerbody, this.jetpack].forEach(
            (p) => ((p as Phaser.GameObjects.Sprite).scale = 3)
        );
        this.add([this.playerbody, this.head, this.jetpack]);

        // Set physics cho container
        this.physicsBody = this.body as Phaser.Physics.Arcade.Body;
        this.physicsBody.setCollideWorldBounds(true);

        // Input
        this.keyW = scene.input.keyboard!.addKey(
            Phaser.Input.Keyboard.KeyCodes.W
        );

        // State machine
        this.states = {
            walking: new WalkingState(this),
            flying: new FlyingState(this),
        };
        this.switchState("flying");
    }

    update() {
        this.currentState.onUpdate();
        this.jetLaunch();
    }

    public switchState(name: string) {
        if (this.currentState) this.currentState.onExit();
        this.currentState = this.states[name];
        this.currentState.onEnter();
    }

    public jetLaunch() {
        if (this.keyW.isDown) {
            this.physicsBody?.setAccelerationY(-3000);
        } else {
            this.physicsBody?.setAccelerationY(0);
        }
    }
}
