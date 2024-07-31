import type { BindingManager } from "clientmodules/clienthandler.module";
import type { Vehicle } from "vehicle.module";
import { IIBindingManager } from "types/system";

abstract class ModuleBase {
	/**
	 * The module name. The name is used for configuring and firing the methods provided by the ModuleBase.
	 */
	abstract GetModuleName(): string;

	/**
	 * Called when the system fires up for the first time, both server and client
	 */
	abstract Initialize(): void;
	/**
	 * Registers any keys, **only** called on the **client**
	 * @param bindManager The binding manager, passed by the internal system
	 */
	abstract RegisterKeys(bindManager: IIBindingManager): boolean;

	// == Vehicle related == //
	/**
	 * Called when a vehicle is first constructed
	 * @param Vehicle The vehicle being constructed
	 */
	abstract VehicleConstructing(Vehicle: Vehicle): void;
	/**
	 * Called when a vehicle is first constructed
	 * @param Vehicle The vehicle being deconstructed
	 */
	abstract VehhicleDeconstructing(Vehicle: Vehicle): void;

	/**
	 * Called when a player enters a vehicle
	 * @param Vehicle The vehicle that has been entered
	 * @param Player The player that has entered the vehicle
	 */
	abstract VehicleEnter(Vehicle: Vehicle, Player: Player): void;
	/**
	 * Called when a player leaves a vehicle
	 * @param Vehicle The vehicle that has been entered
	 * @param Player The player that has left the vehicle
	 */
	abstract VehicleLeave(Vehicle: Vehicle, Player: Player): void;
}

export { ModuleBase, BindingManager };
