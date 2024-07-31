import { DummyTable } from "./tables";

interface VehicleConfiguration {
	InstalledModules: Array<ModuleConfiguration>;
}

interface ModuleConfiguration extends DummyTable {
	ModuleName: string;
	Priority: number | undefined;
}

export { VehicleConfiguration, ModuleConfiguration };
