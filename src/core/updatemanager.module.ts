import type { Trophy } from "./trophy.module";

abstract class UpdateManager {
	protected Trophy: Trophy;
	protected rService: RunService = game.GetService("RunService");
	protected tickables: Array<Tickable> = new Array<Tickable>();

	public abstract GetSpeedModifier(): number;

	constructor(trophyInstance: Trophy) {
		this.Trophy = trophyInstance;
	}

	private AddTickableInstanceToCollection(arrayInstance: Array<Tickable>, tickableInstance: Tickable): number {
		if (arrayInstance.find((x) => x.Key === tickableInstance.Key)) {
			//warn(string.format("%s %s %s", TrophyReferences.TrophyLogWarn, "An attempt was made trying to add an already existing tickable: ", tickable.Key));
			//warn(debug.traceback());
			return -1;
		}

		if (arrayInstance.size() > 0) {
			for (let index = 0; index < arrayInstance.size(); index++) {
				if (arrayInstance[index].Priority <= tickableInstance.Priority) {
					arrayInstance.insert(index, tickableInstance);
					return index;
				}
			}
		} else {
			return arrayInstance.push(tickableInstance);
		}
		return -1;
	}

	public AddTickable(tickable: Tickable): number {
		return this.AddTickableInstanceToCollection(this.tickables, tickable);
	}
}

class ClientUpdateManager extends UpdateManager {
	protected rendertickables: Array<Tickable> = new Array<Tickable>();

	constructor(trophyInstance: Trophy) {
		super(trophyInstance);

		this.rService.Heartbeat.Connect((dt) => {
			this.tickables.forEach((t) => t.ExecuteTick(dt));
		});

		this.rService.BindToRenderStep("TROPHYRENDER", math.huge, (dt) => {
			this.rendertickables.forEach((t) => t.ExecuteTick(dt));
		});
	}

	public override GetSpeedModifier(): number {
		return 1;
	}
}

class ServerUpdateManager extends UpdateManager {
	public override GetSpeedModifier(): number {
		return 1;
	}

	constructor(trophyInstance: Trophy) {
		super(trophyInstance);

		this.rService.Heartbeat.Connect((dt) => {
			this.tickables.forEach((t) => t.ExecuteTick(dt));
		});
	}
}

type TickCallback = (deltaT: number) => boolean;
class Tickable {
	Key: string;
	Tick: TickCallback;

	Priority: number;

	constructor(key: string, ontick: Callback, priority: number = 0) {
		this.Key = key;
		this.Tick = ontick;
		this.Priority = priority;
	}

	/**
	 * Executes a single step tick
	 * @param dt Delta-time
	 * @returns True if successful, false otherwise
	 */
	public ExecuteTick(dt: number): boolean {
		const tickAttempt = pcall(() => {
			this.Tick(dt);
		});
		// Tick failed
		if (!tickAttempt[0]) {
			warn("Tick error");
		}

		return tickAttempt[0];
	}
}

export { UpdateManager, ClientUpdateManager, Tickable };
