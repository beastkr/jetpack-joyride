import { GameScene } from "../GameScene";

export abstract class GameState {
    protected scene: GameScene;
    constructor(scene: GameScene) {
        this.scene = scene;
    }
    public abstract onEnter(): void;
    public abstract onUpdate(time: number, delta: number): void;
    public abstract onExit(): void;
}
