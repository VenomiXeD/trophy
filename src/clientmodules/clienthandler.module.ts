import type { Trophy } from "core/trophy.module";
import { HandlerProxy } from "core/handlerproxy.module";
import { ClientUpdateManager, Tickable } from "core/updatemanager.module";
import { TrophyReferences } from "core/references.module";
import { DummyTable } from "types/tables";
import { $env, $NODE_ENV } from "rbxts-transform-env";
import { $keysof, $package, $print } from "rbxts-transform-debug";
import { ModuleBase } from "commonmodules/modulebase";
import { IIBindingManager } from "types/system";

const CAS = game.GetService("ContextActionService");
const UIS = game.GetService("UserInputService");

/**
 * Class responsible for handling keybind interactions.
 */
class BindingManager implements IIBindingManager {
	private keysheldmap: Map<Enum.KeyCode, boolean> = new Map();
	private keysheld: Enum.KeyCode[] = [];

	private handleKeyPress(input: InputObject, gameProcessed: boolean) {
		if (gameProcessed) return;

		this.keysheldmap.set(input.KeyCode, true);

		// Update all held keys
		this.keysheld.clear();
		const keys: Enum.KeyCode[] = [];
		for (const k of pairs(this.keysheldmap)) {
			keys.push(k[0]);
		}
		return keys;
	}

	private handleKeyRelease(input: InputObject, gameProcessed: boolean) {
		if (gameProcessed) return;

		this.keysheldmap.set(input.KeyCode, false);
	}

	constructor() {
		UIS.InputBegan.Connect((input, gpe) => this.handleKeyPress(input, gpe));
		UIS.InputEnded.Connect((input, gpe) => this.handleKeyRelease(input, gpe));
	}

	public GetHeldKeys(): Enum.KeyCode[] {
		return this.keysheld;
	}

	public GetIfHeldKeysArePressed(keys: Enum.KeyCode[]): boolean {
		return keys.every((x) => this.keysheldmap.has(x));
	}
}

class ClientHandler extends HandlerProxy {
	keybindManager: IIBindingManager;

	constructor() {
		super();
		this.keybindManager = new BindingManager();
	}

	override InitializeModule(module: ModuleBase): void {
		super.InitializeModule(module);
		module.Initialize();
		module.RegisterKeys(this.keybindManager);
	}

	override Initialize(trophyInstance: Trophy): void {
		$print(TrophyReferences.TrophyLogInfo + ": Registering Client Update Manager");
		trophyInstance.UpdateScheduler = new ClientUpdateManager(trophyInstance);

		this.GetModulesInstances()
			.map((x) => require(x as ModuleScript) as DummyTable)
			.filter((x) => x instanceof ModuleBase)
			.map((x) => x as unknown as ModuleBase)
			.forEach((x) => {
				this.InitializeModule(x);
				x.Initialize();
			});
	}
}

export { ClientHandler, BindingManager };
