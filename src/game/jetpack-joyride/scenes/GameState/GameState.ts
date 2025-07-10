import { GameScene } from "../GameScene";

export abstract class GameState implements JetpackJoyride.IGameState, JetpackJoyride.IState {
    protected scene: GameScene;
    constructor(scene: GameScene) {
        this.scene = scene;
    }
    public abstract onEnter(): void;
    public abstract onUpdate(time: number, delta: number): void;
    public onExit(): void {}
}
