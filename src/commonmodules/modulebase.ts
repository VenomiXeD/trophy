import type { BindingManager } from "clientmodules/clienthandler.module";
import type { Vehicle } from "vehicle.module";
import { IIBindingManager } from "types/system";
import { ModuleConfiguration } from "types/vehicleconfig";

type ValueBaseInstances = {
	[K in keyof CreatableInstances]: CreatableInstances[K] extends ValueBase ? K : never;
}[keyof CreatableInstances];

const RunService = game.GetService("RunService");
abstract class ModuleBase {
	public IsServer(): boolean {
		return RunService.IsServer();
	}
	public IsClient(): boolean {
		return RunService.IsClient();
	}

	protected CreateValue(
		Parent: Instance,
		Name: string,
		Type: ValueBaseInstances,
		value?:
			| string
			| number
			| boolean
			| Instance
			| Color3
			| Vector3
			| CFrame
			| BrickColor<keyof BrickColorsByNumber>
			| Ray
			| undefined,
	) {
		const v = new Instance(Type);
		v.Name = Name;
		v.Parent = Parent;
		if (value !== undefined) {
			v.Value = value;
		}

		return v;
	}

	protected ModuleFolder(Parent: Instance, ModuleFolderName: string) {
		if (this.IsServer()) {
			let folder = Parent.FindFirstChild(ModuleFolderName);
			if (!folder) {
				folder = new Instance("Folder");
				folder.Parent = Parent;
			}
			return folder;
		} else {
			return Parent.WaitForChild(ModuleFolderName);
		}
	}

	/**
	 * The module name. The name is used for configuring and firing the methods provided by the ModuleBase.
	 */
	abstract GetModuleName(): string;

	/**
	 * Called when the system fires up for the first time, both server and client
	 */
	abstract Initialize(): void;
	/**
	 * Registers any keys, this method is only fired on the **client**
	 * @param bindManager The binding manager, passed by the internal system
	 */
	abstract RegisterKeys(bindManager: IIBindingManager): boolean;

	// == Vehicle related == //
	/**
	 * Called when a vehicle is first constructed, this method is only fired on the **server**
	 * @param Vehicle The vehicle being constructed
	 */
	VehicleConstructing(Vehicle: Vehicle, ModuleConfiguration: ModuleConfiguration): void {}
	/**
	 * Called when a vehicle is first constructed, this method is only fired on the **server**
	 * @param Vehicle The vehicle being deconstructed
	 */
	VehicleDeconstructing(Vehicle: Vehicle, ModuleConfiguration: ModuleConfiguration): void {}

	/**
	 * Called when a player enters a vehicle, this method is only fired on the **server**
	 * @param Vehicle The vehicle that has been entered
	 * @param Player The player that has entered the vehicle
	 */
	VehicleEnter(Vehicle: Vehicle, Player: Player): void {}
	/**
	 * Called when a player leaves a vehicle, this method is only fired on the **server**
	 * @param Vehicle The vehicle that has been entered
	 * @param Player The player that has left the vehicle
	 */
	VehicleLeave(Vehicle: Vehicle, Player: Player): void {}
}

export { ModuleBase, BindingManager };
