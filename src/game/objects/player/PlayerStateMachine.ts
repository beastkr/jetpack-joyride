import { StateMachine } from "../../common/StateMachine";
import { PlayerState } from "./states/PlayerState";

export class PlayerStateMachine extends StateMachine<PlayerState> {
    constructor() {
        super();
    }

    protected onStateChanged(newStateName: string): void {
        console.log(`Player state changed to: ${newStateName}`);
    }

    // Player-specific helper methods
    public canSwitchToState(stateName: string): boolean {
        // Special logic for player state transitions
        if (stateName === "walking" && this.isPlayerDead()) {
            return false;
        }
        return this.hasState(stateName);
    }

    private isPlayerDead(): boolean {
        const currentStateName = this.getCurrentStateName();
        return currentStateName?.includes("dead") || false;
    }

    // Override switchState to add player-specific validation
    public switchState(key: string): void {
        if (!this.canSwitchToState(key)) {
            console.warn(`Cannot switch to state '${key}' - transition not allowed`);
            return;
        }
        super.switchState(key);
    }
}
