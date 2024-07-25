import { ClientHandler } from "clientmodules/client.module";
import { ServerHandler } from "modules/server.module";
import { HandlerProxy  } from "common/common.module";

/**
 * Responsible for initializing the Trophy System
 */
class Initializer {
    CoreHandler: HandlerProxy;
    
    constructor() {
        const isServer = game.GetService("RunService");
        if(isServer) 
        {
            // We pass it off to the server
            this.CoreHandler = new ServerHandler();
        }
        else 
        {
            // We pass it off to the client
            this.CoreHandler = new ClientHandler();
        }
    }
    
    public Initialize(): boolean {
        this.CoreHandler.Initialize();

        return true;
    }
}

export {
    Initializer
}