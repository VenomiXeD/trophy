import { ClientHandler } from "clientmodules/clienthandler.module";
import { ModuleBase } from "common/modulebase";
import { Trophy } from "core/trophy.module";

abstract class HandlerProxy {
	private static RunService: RunService = game.GetService("RunService");

	public LoadedModules: Map<string, ModuleBase> = new Map();

	public IsServer(): boolean {
		return HandlerProxy.RunService.IsServer();
	}
	public IsClient(): boolean {
		return HandlerProxy.RunService.IsClient();
	}

	public GetModulesInstances(): readonly Instance[] {
		if (this.IsServer()) {
			return (script?.Parent?.Parent?.WaitForChild("servermodules") as Instance)
				.GetDescendants()
				.filter((x) => x.IsA("ModuleScript"));
		} else {
			return (script?.Parent?.Parent?.WaitForChild("clientmodules") as Instance)
				.GetDescendants()
				.filter((x) => x.IsA("ModuleScript"));
		}
	}

	public GetModules(): readonly ModuleBase[] {
		const result = new Array<ModuleBase>(this.LoadedModules.size());
		for (const module of pairs(this.LoadedModules)) {
			result.push(module[1]);
		}

		return result;
	}

	public InitializeModule(module: ModuleBase) {
		if (!this.LoadedModules.has(module.GetModuleName())) {
			this.LoadedModules.set(module.GetModuleName(), module);
		}
	}
	/**
	 * Initialize
	 */
	abstract Initialize(trophyInstance: Trophy): void;
}

export { HandlerProxy };
