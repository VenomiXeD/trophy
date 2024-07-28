import { BindingManager, ModuleBase } from "common/modulebase";
import { $print } from "rbxts-transform-debug";

class TurretModule extends ModuleBase {
	Initialize(): void {
		$print("IT WORKS: INITIALIZE");
	}
	RegisterKeys(bindManager: BindingManager): boolean {
		$print("IT WORKS: REGISTERKEYS");
		return true;
	}
}

export = new TurretModule();
