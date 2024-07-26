// Copy the client script to client
const starterclientScript: LocalScript = script.Parent?.FindFirstChild("starterclient")?.Clone() as LocalScript;
starterclientScript.Parent = game.GetService("StarterPlayer").FindFirstChild("StarterPlayerScripts");

// Start on the server
const serverTrophy: unknown = require(game.GetService("ReplicatedStorage").FindFirstChild("Trophy")?.FindFirstChild("core")?.FindFirstChild("trophy.module") as ModuleScript);
((serverTrophy as any).Trophy.Start as Callback)();