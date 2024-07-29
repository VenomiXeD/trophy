import type { BindingManager } from "clientmodules/clienthandler.module";
import { IIBindingManager } from "types/system";

abstract class ModuleBase {
	public GetModuleName(): string {
		return tostring(this);
	}

	abstract Initialize(): void;
	/**
	 * Registers any keys, **only** called on the **client**
	 * @param bindManager The binding manager, passed by the internal system
	 */
	abstract RegisterKeys(bindManager: IIBindingManager): boolean;
}

export { ModuleBase, BindingManager };
