import { Player } from "../Player";

export abstract class PlayerState implements JetpackJoyride.IPlayerState, JetpackJoyride.IState {
    protected player: Player;
    constructor(player: Player) {
        this.player = player;
        this.animInit();
    }

    public abstract onEnter(): void;
    public abstract onUpdate(time: number, delta: number, ...args: any[]): void;
    public abstract onExit(): void;
    protected abstract animInit(): void;
}
