export class GameManager {
    static speed: number = 300;
    static coin: number = 0;
    static maxCoin: number;
    static score: number = 0;
    static maxScore: number = 0;
    static collectCoin(point: number) {
        this.coin += point;
        this.maxCoin += point;
        localStorage.setItem("coin", String(this.maxCoin));
    }
    static init() {
        this.maxCoin = Number(localStorage.getItem("coin")) ?? 0;
        this.maxScore = Number(localStorage.getItem("score")) ?? 0;
    }
    static setHighScore() {
        this.maxScore = this.score;
        localStorage.setItem("score", String(this.score));
    }
    static payCoin(n: number) {
        this.maxCoin -= n;
        localStorage.setItem("coin", String(this.maxCoin));
    }
}
