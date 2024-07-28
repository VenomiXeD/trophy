import { DummyTable } from "types/tables";

class Configuration {
	constructor(cfgInstance: ModuleScript) {
		this.configInstance = cfgInstance;
		this.configTable = require(cfgInstance) as DummyTable;
	}

	configInstance: ModuleScript | undefined = undefined;
	configTable: DummyTable;
	/**
	 * ReadValue will read a value from the modulescript table and either return the static value or the callback function return value
	 * @param name Name of key
	 * @returns Value if present, undefined if no key exists
	 */
	public ReadValue(name: string): unknown | undefined {
		if (typeOf(this.configTable[name]) === "function") {
			const configurationValueCallback: Callback = this.configTable[name] as Callback;
			configurationValueCallback();
		} else {
			return this.configTable[name];
		}
	}
}

export { Configuration };
