import { ModuleBase } from "commonmodules/modulebase";
import { HandlerProxy } from "core/handlerproxy.module";
import { TrophyReferences } from "core/references.module";
import { Trophy } from "core/trophy.module";
import { $print } from "rbxts-transform-debug";
import { DummyTable } from "types/tables";

class ServerHandler extends HandlerProxy {
	override Initialize(trophyInstance: Trophy): void {
		$print(TrophyReferences.TrophyLogInfo + ": Registering Client Update Manager");
		//trophyInstance.UpdateScheduler = new (trophyInstance);

		this.GetModulesInstances()
			.map((x) => require(x as ModuleScript) as DummyTable)
			.filter((x) => x instanceof ModuleBase)
			.map((x) => x as unknown as ModuleBase)
			.forEach((x) => {
				$print("Initializing module: [%s]".format(x.GetModuleName()));
				this.InitializeModule(x);
				x.Initialize();
			});
	}
}

export { ServerHandler };
