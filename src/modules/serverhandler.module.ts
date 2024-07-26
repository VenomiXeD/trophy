import { HandlerProxy } from "core/handlerproxy.module";

class ServerHandler extends HandlerProxy {
    override Initialize(): void {
        print("Called on server!");
        print(debug.traceback());
    }
}

export { ServerHandler }