import { HandlerProxy } from "common/common.module";

class ClientHandler implements HandlerProxy {
    Initialize(): void {
        print("Called on client!");
    }
}

export { ClientHandler }