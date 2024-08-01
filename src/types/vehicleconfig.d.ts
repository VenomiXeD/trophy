import { DummyTable } from "./tables";

interface VehicleConfiguration {
	Model: Instance;
	InstalledModules: Array<ModuleConfiguration>;
	Seats: Map<string, Seat>;
}

interface ModuleConfiguration extends DummyTable {
	/**
	 * The name of the module to be loaded, case-sensitive. @see ModuleBase and its derivatives for available modules.
	 */
	ModuleName: string;
	/**
	 * How early a module should be loaded. Lower number is higher priority.
	 */
	Priority: number | undefined;
}

export { VehicleConfiguration, ModuleConfiguration };
