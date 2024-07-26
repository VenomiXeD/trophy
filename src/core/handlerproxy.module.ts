import { Trophy } from "core/trophy.module";

abstract class HandlerProxy  {
    /**
     * Initialize
     */
    abstract Initialize(trophyInstance: Trophy): void;
}

export { HandlerProxy }