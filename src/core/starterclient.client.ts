import { DummyTable } from "types/tables";

// Start on the client
const serverTrophy: DummyTable = require(
	game
		.GetService("ReplicatedStorage")
		.FindFirstChild("Trophy")
		?.FindFirstChild("core")
		?.FindFirstChild("trophy.module") as ModuleScript,
) as DummyTable;
((serverTrophy["Trophy"] as DummyTable)["Start"] as Callback)();
