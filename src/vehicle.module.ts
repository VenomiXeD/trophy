import { ModuleBase } from "commonmodules/modulebase";
import { TrophyReferences } from "core/references.module";
import { Trophy } from "core/trophy.module";
import { $warn } from "rbxts-transform-debug";
import { DummyTable } from "types/tables";
import { ModuleConfiguration, VehicleConfiguration } from "types/vehicleconfig";

class ModuleConfigurationCollection {
	private modules: ModuleConfiguration[];
	constructor(InstalledModules: ModuleConfiguration[]) {
		this.modules = InstalledModules.sort((a, b) => (a.Priority ?? 0) > (b.Priority ?? 0));
	}

	public GetIntalledModules(): readonly ModuleConfiguration[] {
		return this.modules;
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
	VehicleModulesFolderInstance: Folder;
	VehicleSeats: Map<string, Seat>;
	Modules: ModuleConfigurationCollection;
	ModuleObjects: Array<ModuleBase> = [];

	constructor(vehicleConfigurationModule: ModuleScript) {
		const vehicleConfig = require(vehicleConfigurationModule) as VehicleConfiguration;

		this.VehicleConfigurationModule = vehicleConfigurationModule;
		this.VehicleModel = vehicleConfig.Model;
		this.VehicleSeats = vehicleConfig.Seats;
		this.Modules = new ModuleConfigurationCollection(vehicleConfig.InstalledModules);

		this.VehicleModulesFolderInstance = new Instance("Folder");
		this.VehicleModulesFolderInstance.Name = TrophyReferences.TrophyBaseInstanceName;
		this.VehicleModulesFolderInstance.Parent = this.VehicleModel;

		this.Initialize();
	}

	/**
	 * Internal use only
	 * Initializes internal variables and eventhandlers
	 */
	private Initialize() {
		// Loads modules as ModuleBase, in order
		//this.Modules.GetIntalledModules().forEach((moduleConfig) => {
		//	const module = Trophy.Instance.CoreHandler.LoadedModules.get(moduleConfig.ModuleName);
		//	if (module) {
		//		module.VehicleConstructing(this, moduleConfig);
		//	} else {
		//		$warn(
		//			"Vehicle [%s] attempted to load module: [%s] which does not exist.".format(
		//				this.VehicleConfigurationModule.GetFullName(),
		//				moduleConfig.ModuleName,
		//			),
		//		);
		//	}
		//});
		//// Initialize seat eventhandlers
	}

	/**
	 * For internal use only
	 * Fires off any related events to modules
	 */
	public Construct() {
		// Fire it off to the Trophy vehicle to instruct setup for the vehicle
		this.Modules.GetIntalledModules().forEach((moduleConfig) => {
			const module = Trophy.Instance.CoreHandler.LoadedModules.get(moduleConfig.ModuleName);
			if (module) {
				module.VehicleConstructing(this, moduleConfig);
			} else {
				$warn(
					"Vehicle [%s] attempted to install module: [%s] which does not exist.".format(
						this.VehicleConfigurationModule.GetFullName(),
						moduleConfig.ModuleName,
					),
				);
			}
		});
	}

	/**
	 * For internal use only
	 * Fires off any related events to modules
	 */
	public Deconstruct() {}
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
	if (Trophy.Instance.GetState() !== "READY") {
		// Wait until the system is ready
		task.wait(1);
		return LoadVehicleConfiguration(vehicleConfigurationModule);
	}
	if (loadedVehicles.has(vehicleConfigurationModule)) {
		return loadedVehicles.get(vehicleConfigurationModule) as Vehicle;
	} else {
		// We need to load the vehicle
		const newVehicle = new Vehicle(vehicleConfigurationModule);

		// Make sure if the vehicle is destroying, we need to unload it
		newVehicle.VehicleModel?.Destroying.Connect(() => UnLoadVehicleConfiguration(vehicleConfigurationModule));

		// Construct the vehicle and fire off any modules
		newVehicle.Construct();

		loadedVehicles.set(vehicleConfigurationModule, newVehicle);

		return newVehicle;
	}
}

export { Vehicle, ModuleConfigurationCollection, LoadVehicleConfiguration, UnLoadVehicleConfiguration };
