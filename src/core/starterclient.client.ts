// Start on the client
const serverTrophy: unknown = require(game.GetService("ReplicatedStorage").FindFirstChild("Trophy")?.FindFirstChild("core")?.FindFirstChild("trophy.module") as ModuleScript);
((serverTrophy as any).Trophy.Start as Callback)();