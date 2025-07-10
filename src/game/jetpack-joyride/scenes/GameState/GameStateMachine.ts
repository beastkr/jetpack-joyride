import { StateMachine } from "../../../common/StateMachine";
import { GameState } from "./GameState";

export class GameStateMachine extends StateMachine<GameState> {
    constructor() {
        super();
    }

    protected onStateChanged(newStateName: string): void {
        console.log(`Game state changed to: ${newStateName}`);
    }
}
