import { BGLoop } from "../../objects/moving-objects/background/BGLoop";
import { CoinPool } from "../../objects/moving-objects/coins/CoinPool";
import { ElecPool } from "../../objects/moving-objects/obstacle/Elec/ElecPool";
import { LazerManager } from "../../objects/moving-objects/obstacle/Lazer/LazerManager";
import { RocketPool } from "../../objects/moving-objects/obstacle/Rocket/RocketPool";
import { Worker } from "../../objects/moving-objects/worker/Worker";
import { Player } from "../../objects/player/Player";
import { GravitySuit } from "../../objects/player/states/Upgrade/GravitySuit";
import { GameManager } from "../GameManager";
import { StartGameOverlay } from "../UI/StartGameOverlay";
import { DashState } from "./GameState/DashState";
import { GameState } from "./GameState/GameState";
import { GameStateMachine } from "./GameState/GameStateMachine";
import { OverState } from "./GameState/OverState";
import { PendingState } from "./GameState/PendingState";
import { PlayingState } from "./GameState/PlayingState";

export class GameScene extends Phaser.Scene implements JetpackJoyride.IGameScene {
    worker: Worker[] = [];
    played: boolean = false;
    player: Player;
    progress: number = 0;
    bot: Phaser.GameObjects.Rectangle;
    coinManager: CoinPool;
    private stateMachine: GameStateMachine;
    bg: BGLoop;
    // Legacy properties for backward compatibility
    currentState: GameState;
    states: { [key: string]: GameState };
    zapManager: ElecPool;
    rockets: RocketPool;
    startOverlay: StartGameOverlay;
    lasers: LazerManager;
    dieOnce: boolean = false;
    constructor() {
        super("GameScene");
        this.stateMachine = new GameStateMachine();
    }
    preload() {}
    create() {
        this.played = false;
        this.cameras.main.setViewport(0, -128, 1720, 1080);
        GameManager.speed = 300;
        this.bg = new BGLoop(this);

        this.player = new Player(this, -500, 500);

        this.createBot();
        this.createTop();
        this.coinManager = new CoinPool(this);
        this.lasers = new LazerManager(this);
        for (var i = 0; i < 5; i++) this.worker.push(new Worker(this, 2000, 600));
        this.worker.forEach((element) => {
            (element as Worker).rest();
        });
        this.stateInit();
        this.zapManager = new ElecPool(this);
        this.rockets = new RocketPool(this);
        this.switchState("pending");
    }
    public switchState(key: string) {
        // Use state machine for state switching
        this.stateMachine.switchState(key);

        // Update legacy currentState for backward compatibility
        this.currentState = this.stateMachine.currentState!;
    }
    update(time: number, delta: number) {
        // Update state machine
        this.stateMachine.update(time, delta);
        if (this.bg) this.bg.update(time, delta);
        // Update legacy currentState for backward compatibility
        this.currentState = this.stateMachine.currentState!;
    }

    private createBot() {
        this.bot = new Phaser.GameObjects.Rectangle(this, 100, 1000, 7800, 430);

        this.physics.add.existing(this.bot);

        this.physics.add.collider(this.bot, this.player, () => {
            this.player.switchState("walking");
        });
        (this.bot.body as Phaser.Physics.Arcade.Body).setImmovable(true).setAllowGravity(false);
        this.add.existing(this.bot);
    }

    private createTop() {
        let top = new Phaser.GameObjects.Rectangle(this, 400, 20, 3000, 500);

        this.physics.add.existing(top);
        this.physics.add.collider(top, this.player, () => {
            if (this.player.vehicle instanceof GravitySuit) this.player.switchState("walking");
        });
        (top.body as Phaser.Physics.Arcade.Body).setImmovable(true).setAllowGravity(false);
        this.add.existing(top);
    }

    private stateInit() {
        this.states = {
            pending: new PendingState(this),
            playing: new PlayingState(this),
            dashing: new DashState(this),
            over: new OverState(this),
        };

        // Add states to state machine
        Object.entries(this.states).forEach(([key, state]) => {
            this.stateMachine.addState(key, state);
        });
    }

    // LOADING FUNCTION ///
}
