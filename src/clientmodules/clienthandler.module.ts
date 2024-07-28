import type { Trophy } from "core/trophy.module";
import { HandlerProxy } from "core/handlerproxy.module";
import { ClientUpdateManager, Tickable } from "core/updatemanager.module";
import { TrophyReferences } from "core/references";
import { DummyTable } from "types/tables";
import { $env, $NODE_ENV } from "rbxts-transform-env";
import { $keysof, $package, $print } from "rbxts-transform-debug";
import { ModuleBase } from "common/modulebase";

const CAS = game.GetService("ContextActionService");
const UIS = game.GetService("UserInputService");

/**
 * Class responsible for handling keybind interactions.
 */
class BindingManager {
	/**
	 * Gets all held down keys
	 * @returns All keys currently held down
	 */
	public GetHeldKeys(): Enum.KeyCode[] {
		return UIS.GetKeysPressed()
			.filter((x) => x.UserInputType === Enum.UserInputType.Keyboard)
			.map((x) => x.KeyCode);
	}

	/**
	 *
	 * @param keys Array of keys that needs to be held down
	 * @returns True if all the keys of the array are held down, false otherwise
	 */
	public GetIfHeldKeysArePressed(keys: Enum.KeyCode[]): boolean {
		let keysHeld = 0;
		const heldKeys = this.GetHeldKeys();
		keys.forEach((x) => (keysHeld += heldKeys.includes(x) ? 1 : 0));

		return keysHeld === keys.size();
	}
}

class ClientHandler extends HandlerProxy {
	keybindManager: BindingManager;

	constructor() {
		super();
		this.keybindManager = new BindingManager();
	}

	override Initialize(trophyInstance: Trophy): void {
		$print(TrophyReferences.TrophyLogInfo + ": Registering Client Update Manager");
		trophyInstance.UpdateScheduler = new ClientUpdateManager(trophyInstance);

		this.GetModulesInstances()
			.map((x) => require(x as ModuleScript) as DummyTable)
			.filter((x) => x instanceof ModuleBase)
			.map((x) => x as ModuleBase)
			.forEach((x) => {});
	}
}

export { ClientHandler, BindingManager };
