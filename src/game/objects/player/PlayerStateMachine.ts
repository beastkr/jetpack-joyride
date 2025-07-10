import { StateMachine } from "../../common/StateMachine";
import { PlayerState } from "./states/PlayerState";

export class PlayerStateMachine extends StateMachine<PlayerState> {
    constructor() {
        super();
    }

    protected onStateChanged(newStateName: string): void {
        console.log(`Player state changed to: ${newStateName}`);
    }

    public canSwitchToState(stateName: string): boolean {
        if (stateName === "walking" && this.isPlayerDead()) {
            return false;
        }
        return this.hasState(stateName);
    }

    private isPlayerDead(): boolean {
        const currentStateName = this.getCurrentStateName();
        return currentStateName?.includes("dead") || false;
    }

    public switchState(key: string): void {
        if (!this.canSwitchToState(key)) {
            console.warn(`Cannot switch to state '${key}' - transition not allowed`);
            return;
        }
        super.switchState(key);
    }
}
