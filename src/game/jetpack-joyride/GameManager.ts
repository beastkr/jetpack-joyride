export class GameManager {
    static speed: number = 300;
    static coin: number = 0;
    static collectCoin() {
        this.coin++;
        console.log(this.coin);
    }
}
