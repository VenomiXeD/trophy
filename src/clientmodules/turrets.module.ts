import { BindingManager, ModuleBase } from "common/modulebase";
import { $print } from "rbxts-transform-debug";
import { Vehicle } from "vehicle.module";

class TurretModule extends ModuleBase {
	GetModuleName(): string {
		return "TurretModule";
	}
	VehicleConstructing(Vehicle: Vehicle): void {}
	VehhicleDeconstructing(Vehicle: Vehicle): void {}
	VehicleEnter(Vehicle: Vehicle, Player: Player): void {}
	VehicleLeave(Vehicle: Vehicle, Player: Player): void {}
	Initialize(): void {}
	RegisterKeys(bindManager: BindingManager): boolean {
		return true;
	}
}

export = new TurretModule();
