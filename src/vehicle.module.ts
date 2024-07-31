import { Trophy } from "core/trophy.module";
import { DummyTable } from "types/tables";
import { ModuleConfiguration } from "types/vehicleconfig";

class ModuleConfigurationCollection {
	private modules: ModuleConfiguration[];
	constructor(InstalledModules: ModuleConfiguration[]) {
		this.modules = InstalledModules.sort((a, b) => (a.Priority ?? 0) > (b.Priority ?? 0));
	}

	public GetInstalledModulesByName(name: string): ModuleConfiguration[] {
		return this.modules.filter((x) => x.ModuleName === name);
	}
	public GetInstalledModuleByName(name: string): ModuleConfiguration | undefined {
		return this.modules.find((x) => x.ModuleName === name);
	}
}

class Vehicle {
	VehicleConfigurationModule: ModuleScript;
	VehicleModel: Instance;
	Modules: ModuleConfigurationCollection;

	constructor(vehicleConfigurationModule: ModuleScript) {
		const vehicleConfig = require(vehicleConfigurationModule) as DummyTable;

		this.VehicleConfigurationModule = vehicleConfigurationModule;
		this.VehicleModel = vehicleConfig["Model"] as Instance;
		this.Modules = new ModuleConfigurationCollection(vehicleConfig["InstalledModules"] as ModuleConfiguration[]);
	}
}

/**
 * Stores all loaded vehicles
 */
const loadedVehicles = setmetatable({}, { __mode: "kv" }) as Map<Instance, Vehicle>;

function UnLoadVehicleConfiguration(vehicleConfigurationModule: ModuleScript) {
	if (loadedVehicles.has(vehicleConfigurationModule)) {
		loadedVehicles.delete(vehicleConfigurationModule);
	}
}

function LoadVehicleConfiguration(vehicleConfigurationModule: ModuleScript): Vehicle {
	if (loadedVehicles.has(vehicleConfigurationModule)) {
		return loadedVehicles.get(vehicleConfigurationModule) as Vehicle;
	} else {
		// We need to load the vehicle
		const newVehicle = new Vehicle(vehicleConfigurationModule);

		// Make sure if the vehicle is destroying, we need to unload it
		newVehicle.VehicleModel?.Destroying.Connect(() => UnLoadVehicleConfiguration(vehicleConfigurationModule));

		// Fire it off to the Trophy vehicle to instruct setup for the vehicle
		Trophy.Instance.CoreHandler.GetModules().forEach((module) => {
			// Modules are present for this vehicle, pass it to the vehicle construct event of the modules
			if (newVehicle.Modules.GetInstalledModulesByName(module.GetModuleName()).size() > 0) {
				module.VehicleConstructing(newVehicle);
			}
		});

		loadedVehicles.set(vehicleConfigurationModule, newVehicle);

		return newVehicle;
	}
}

export { Vehicle, ModuleConfigurationCollection, LoadVehicleConfiguration, UnLoadVehicleConfiguration };
