interface DummyTable {
    [key: string]: any; // Index signature
}

class Configuration {
    constructor(cfgInstance: ModuleScript) {
        this.configInstance = cfgInstance;
        this.configTable = require(cfgInstance) as DummyTable;
    }

    configInstance: ModuleScript|undefined = undefined;
    configTable: DummyTable;
   /**
    * ReadValue
    */
   public ReadValue(name: string): any {
    if(typeOf(this.configTable[name]) === "function") {
        const f: Callback = this.configTable[name];
        f();
    }
    else {
        return this.configTable[name];
    }
   }
}

export { Configuration }