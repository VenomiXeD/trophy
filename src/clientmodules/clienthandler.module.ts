import type { Trophy } from "core/trophy.module";
import { HandlerProxy } from "core/handlerproxy.module";
import { ClientUpdateManager, Tickable } from "core/updatemanager.module";
import { TrophyReferences } from "core/references";
import { DummyTable } from "types/dummytable";

class ClientHandler extends HandlerProxy {
    override Initialize(trophyInstance: Trophy): void {
        print(TrophyReferences.TrophyLogInfo + ": Registering Client Update Manager");
        trophyInstance.UpdateScheduler = new ClientUpdateManager(trophyInstance)

        let a = require(script as ModuleScript) as DummyTable;
    }
}

export { ClientHandler }