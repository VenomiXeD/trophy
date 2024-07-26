import type { HandlerProxy  } from "core/handlerproxy.module";
import type { UpdateManager } from "./updatemanager.module";
import { ClientHandler } from "clientmodules/clienthandler.module";
import { ServerHandler } from "modules/serverhandler.module";
import { TrophyReferences } from "./references";
import { $error, $print } from "rbxts-transform-debug";

/**
 * Responsible for initializing the Trophy System
 */
let GlobalTrophyInstance!: Trophy;
class Trophy {
    public static Instance: Trophy;
    public CoreHandler!: HandlerProxy;
    public UpdateScheduler!: UpdateManager;
    public References: TrophyReferences = new TrophyReferences();
    
    constructor() {
        const isServer = game.GetService("RunService").IsServer();
        print(TrophyReferences.TrophyLogInfo + "Starting Trophy on side: " + (isServer ? "Server" : "Client"));
        if(isServer) 
        {
            // We pass it off to the server
            this.CoreHandler = new ServerHandler();
        }
        else 
        {
            // We pass it off to the client
            this.CoreHandler = new ClientHandler();
            //this.UpdateScheduler = new ClientUpdateManager();
        }
    }
    
    public Initialize(): boolean {
        this.CoreHandler.Initialize(this);

        return true;
    }

    public static Start() {
        $print(TrophyReferences.TrophyBaseInstanceName + ": Starting Trophy");
        $print("Version: " + TrophyReferences.TrophyVersion)
        if (!GlobalTrophyInstance) {
            GlobalTrophyInstance = new Trophy();
            Trophy.Instance = GlobalTrophyInstance
            Trophy.Instance.Initialize();

            (shared as any).TrophyFramework = GlobalTrophyInstance;
            $print(TrophyReferences.TrophyBaseInstanceName + "; Version: " + TrophyReferences.TrophyVersion + "; Loaded successfully");
        }
        else {
            $error("Cannot start another instance of Trophy framework");
        }
    }
}

export { Trophy, GlobalTrophyInstance }