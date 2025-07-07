export class GameManager {
    static speed: number = 300;
    static coin: number = 0;
    static maxCoin: number;
    static collectCoin() {
        this.coin++;
        this.maxCoin++;
        localStorage.setItem("coin", String(this.maxCoin));
    }
    static init() {
        this.maxCoin = Number(localStorage.getItem("coin")) ?? 0;
    }
}
