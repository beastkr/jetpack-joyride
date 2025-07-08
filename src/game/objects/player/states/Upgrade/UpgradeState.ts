import { PlayerState } from "../PlayerState";
import { GravitySuit } from "./GravitySuit";
import { Jetpack } from "./Jetpack";
import { Vehicle } from "./Vehicle";

export class UpgradeState extends PlayerState {
    vehicles: Vehicle[];
    currentVehicle: Vehicle;
    public onEnter(): void {
        this.player.scene.cameras.main.shake(250, 0.01, true, () => {
            this.player.scene.cameras.main.shake(250, 0.01);
        });
        const body = this.player.body as Phaser.Physics.Arcade.Body;
        body.setAcceleration(0, 0);
        this.player.playerSprite.showAll(false, false, false);
        this.vehicleInit();
        this.currentVehicle = this.vehicles[1];
        this.player.playerSprite.add(this.currentVehicle);
        this.player.vehicle = this.currentVehicle;
        this.player.scene.cameras.main.flash(500, 255, 255, 255); // duration, r, g, b
    }

    public onUpdate(time: number, delta: number): void {}

    protected animInit(): void {}
    public onExit(): void {}
    private vehicleInit() {
        if (this.vehicles) return;
        this.vehicles = [];
        this.vehicles.push(new Jetpack(this.player.scene, this.player));
        this.vehicles.push(new GravitySuit(this.player.scene, this.player));
    }
}
