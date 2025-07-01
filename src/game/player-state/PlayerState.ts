import { Player } from "../scenes/jetpack-joyride/objects/Player";

export abstract class PlayerState {
    protected player: Player;
    constructor(player: Player) {
        this.player = player;
    }

    public abstract onUpdate(): void;
    public abstract onEnter(): void;
    public abstract onExit(): void;
}
