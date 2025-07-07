import { GameManager } from "../../GameManager";
import { GameState } from "./GameState";
export class OverState extends GameState {
    public onEnter(): void {
        this.scene.input.once("pointerdown", () => {
            this.scene.scene.restart();
        });
        console.log("ppp");
    }
    public onUpdate(time: number, delta: number): void {
        GameManager.speed = 0;
    }
    public onExit(): void {
        GameManager.speed = 300;
    }
}
