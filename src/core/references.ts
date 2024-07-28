import { $package } from "rbxts-transform-debug";

export class TrophyReferences {
	// public static TrophyInstance: Trophy = new Trophy();
	public static TrophyBaseInstanceName = "TROPHYSYS";
	public static TrophyVersion: string = $package.version;
	public static TrophyLogInfo: string = "[TROPHY INFO]";
	public static TrophyLogWarn: string = "[TROPHY WARN]";
	public static TrophyLogError: string = "[TROPHY ERRO]";

	private static GetOrCreateFolder(parentInstance: Instance, Name: string): Folder {
		if (game.GetService("RunService").IsClient()) {
			return parentInstance.WaitForChild(Name) as Folder;
		} else {
			let result: Instance | undefined = parentInstance.FindFirstChild(Name);
			if (result) {
				return result as Folder;
			} else {
				result = new Instance("Folder") as Folder;
				result.Parent = parentInstance;
				result.Name = Name;

				return result as Folder;
			}
		}
	}

	public static GetTrophyRoot(): Instance {
		return TrophyReferences.GetOrCreateFolder(
			game.GetService("ReplicatedStorage"),
			TrophyReferences.TrophyBaseInstanceName,
		);
	}

	public static GetTrophyScriptsRoot(): Instance {
		return script.Parent as Instance;
	}

	public static GetNetworkingFolder(): Folder {
		return TrophyReferences.GetOrCreateFolder(TrophyReferences.GetTrophyRoot(), "NET");
	}
}
