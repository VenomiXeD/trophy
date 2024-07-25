import { HandlerProxy } from "common/common.module";

class ServerHandler implements HandlerProxy {
    Initialize(): void {
        print("Called on server!");
    }
}

export { ServerHandler }