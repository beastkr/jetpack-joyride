import { Player } from "../Player";

export abstract class PlayerState {
    protected player: Player;
    constructor(player: Player) {
        this.player = player;
        this.animInit();
    }

    public abstract onEnter(): void;
    public abstract onUpdate(...args: any[]): void;
    public abstract onExit(): void;
    protected abstract animInit(): void;
}
