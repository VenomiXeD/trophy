import type { BindingManager } from "clientmodules/clienthandler.module";

abstract class ModuleBase {
	public GetModuleName(): string {
		return tostring(this);
	}

	abstract Initialize(): void;
	/**
	 * Registers any keys, **only** called on the **client**
	 * @param bindManager The binding manager, passed by the internal system
	 */
	abstract RegisterKeys(bindManager: BindingManager): boolean;
}

export { ModuleBase, BindingManager };
