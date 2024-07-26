interface BindingManager {}

abstract class ModuleBase {
    abstract Initialize(): void;
    /**
     * Registers any keys, **only** called on the **client**
     * @param bindManager The binding manager, passed by the internal system
     */
    abstract RegisterKeys(bindManager: BindingManager): boolean;
}

export { ModuleBase }