// Global type definitions for Jetpack Joyride game

declare namespace JetpackJoyride {
    // ===== STATE MACHINE INTERFACES =====

    interface IState {
        onEnter(): void;
        onUpdate(time: number, delta: number, ...args: any[]): void;
        onExit(): void;
    }

    interface IStateMachine<T extends IState> {
        currentState: T | null;
        states: { [key: string]: T };
        switchState(key: string): void;
        update(time: number, delta: number): void;
        addState(key: string, state: T): void;
        removeState(key: string): void;
        hasState(key: string): boolean;
        getCurrentStateName(): string | null;
    }

    // ===== GAME CORE INTERFACES =====

    interface IGameManager {
        speed: number;
        coin: number;
        maxCoin: number;
        score: number;
        maxScore: number;
        collectCoin(point: number): void;
        init(): void;
        setHighScore(): void;
        payCoin(n: number): void;
    }

    interface IGameState {
        onEnter(): void;
        onUpdate(time: number, delta: number): void;
        onExit(): void;
    }

    // ===== PLAYER INTERFACES =====

    interface IPlayerState {
        onEnter(): void;
        onUpdate(...args: any[]): void;
        onExit(): void;
    }

    interface IPlayerController {
        jetLaunch(): boolean;
        gravChange(press: boolean): boolean;
        toggleGravity(): void;
    }

    interface IPlayerSprite {
        flip(x: boolean, y: boolean): void;
        showAll(head?: boolean, body?: boolean, jetpack?: boolean): void;
    }

    interface IPlayer {
        isdead: boolean;
        onGround: boolean;
        vehicle: IVehicle | null;
        currentState: IPlayerState;
        rest(): void;
        switchState(key: string): void;
        resetBody(): void;
    }

    // ===== VEHICLE INTERFACES =====

    interface IVehicle {
        control(): void;
    }

    // ===== MOVING OBJECT INTERFACES =====

    interface IMovingObject {
        speed: number;
        move(): void;
    }

    interface ICoin extends IMovingObject {
        flipped: boolean;
        using: boolean;
        point: number;
        moveTo(x: number, y: number): void;
    }

    interface IObstacle extends IMovingObject {
        move(): void;
    }

    interface IWorker {
        dead: boolean;
        speed: number;
        offset: number;
        rest(): void;
        move(): void;
        hitByBullet(): void;
    }

    // ===== POOL INTERFACES =====

    interface IObjectPool<T> {
        getFirstDead(includeReady?: boolean): T | null;
        disableAll(): void;
        update?(): void;
    }

    interface ICoinPool extends IObjectPool<ICoin> {
        bigPool: Phaser.GameObjects.Group;
        spawnFromPattern(
            scene: any,
            pattern: number[][],
            startX: number,
            startY: number,
            tileSize?: number
        ): void;
        test(scene: any): void;
    }

    interface IElecPool extends IObjectPool<any> {
        getElec(
            scene: Phaser.Scene,
            x: number,
            y: number,
            lenx: number,
            leny: number,
            vertical?: boolean,
            horizontal?: boolean
        ): any;
        returnElec(elec: any): void;
        update(): void;
    }

    interface IZapPool extends IObjectPool<any> {
        getZap(scene: Phaser.Scene, x: number, y: number, inContainer?: boolean): any;
        returnZap(zap: any): void;
    }

    interface IRocketPool extends IObjectPool<any> {
        getRocket(scene: Phaser.Scene): any;
        returnRocket(rocket: any): void;
        update(time: number, delta: number): void;
    }

    // ===== BULLET INTERFACES =====

    interface IBullet {
        fire(x: number, y: number): void;
        deactivate(): void;
        explode(): void;
    }

    interface IBulletPool extends IObjectPool<IBullet> {
        fireBullet(x: number, y: number): IBullet | null;
        returnBullet(bullet: IBullet): void;
        update(time: number, delta: number): void;
    }

    interface IExplosion {
        explode(x: number, y: number): void;
        deactivate(): void;
    }

    interface IExplosionPool extends IObjectPool<IExplosion> {
        createExplosion(x: number, y: number): IExplosion | null;
        returnExplosion(explosion: IExplosion): void;
    }

    interface IBulletShell {
        eject(x: number, y: number): void;
        deactivate(): void;
    }

    interface IBulletShellPool extends IObjectPool<IBulletShell> {
        ejectShell(x: number, y: number): IBulletShell | null;
        returnShell(shell: IBulletShell): void;
        update(time: number, delta: number): void;
        checkCollisions(target: Phaser.Physics.Arcade.Body): IBulletShell[];
    }

    // ===== UI INTERFACES =====

    interface IStartGameOverlay {
        resettext(): void;
    }

    interface IBackGround {
        scene: Phaser.Scene;
        map: Phaser.Tilemaps.Tilemap;
        maplayer: Phaser.Tilemaps.TilemapLayer;
        mapBG: Phaser.Tilemaps.TilemapLayer;
        update(time: number, delta: number): void;
        moveTo(x: number): void;
    }

    interface IGameScene {
        worker: IWorker[];
        player: IPlayer;
        progress: number;
        coinManager: ICoinPool;
        currentState: IGameState;
        states: { [key: string]: IGameState };
        zapManager: IElecPool;
        rockets: IRocketPool;
        startOverlay: IStartGameOverlay;
        dieOnce: boolean;
        switchState(key: string): void;
    }

    // ===== PARTICLE INTERFACES =====

    interface IBullets {
        start(): void;
        stop(): void;
        kill(): void;
        update(time: number, delta: number, shouldFire?: boolean): void;
        disableAll(): void;
    }
}
