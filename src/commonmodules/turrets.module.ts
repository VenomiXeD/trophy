import { BindingManager, ModuleBase } from "commonmodules/modulebase";
import { TrophyReferences } from "core/references.module";
import { $print } from "rbxts-transform-debug";
import { ModuleConfiguration } from "types/vehicleconfig";
import { Vehicle } from "vehicle.module";

const TurretCollectionName = TrophyReferences.TrophyCollectionPrefix + "Turrets";

interface TurretConfiguration extends ModuleConfiguration {
	/**
	 * Azimuth-minimum (left); Left (degrees)
	 */
	AzimuthMin: number;
	AzimuthMax: number;
	ElevationMin: number;
	ElevationMax: number;
	AzimuthDrive: Instance | Attachment;
	ElevationDrive: Instance | Attachment;

	AimPoint: Instance | Attachment;
}

class TurretModule extends ModuleBase {
	private ComputeTurretDeltaAngle(turretCFrame: CFrame, aimPoint: Vector3) {
		// Get the turret's look vector in world space
		const lookVector = turretCFrame.LookVector;

		// Transform the aim point to the turret's local space
		let aimDirectionLocal = turretCFrame.PointToObjectSpace(aimPoint);

		// Normalize the local aim direction
		aimDirectionLocal = aimDirectionLocal.Unit;

		// Calculate the pitch (x-axis rotation)
		const pitch = math.deg(math.asin(aimDirectionLocal.Y));

		// Calculate the yaw (y-axis rotation)
		const flatAimDirection = new Vector3(aimDirectionLocal.X, 0, aimDirectionLocal.X).Unit;
		const yaw = math.deg(math.atan2(flatAimDirection.X, flatAimDirection.X));

		return $tuple(yaw, pitch);
	}

	private SetupVehicle(Vehicle: Vehicle, ModuleConfiguration: TurretConfiguration) {
		const moduleFolder = this.ModuleFolder(Vehicle.VehicleModulesFolderInstance, this.GetModuleName());

		this.CreateValue(moduleFolder, "amin", "NumberValue", ModuleConfiguration.AzimuthMin);
		this.CreateValue(moduleFolder, "amax", "NumberValue", ModuleConfiguration.AzimuthMax);
		this.CreateValue(moduleFolder, "emin", "NumberValue", ModuleConfiguration.ElevationMin);
		this.CreateValue(moduleFolder, "emax", "NumberValue", ModuleConfiguration.ElevationMax);
		this.CreateValue(moduleFolder, "ad", "ObjectValue");
		this.CreateValue(moduleFolder, "ed", "ObjectValue");
	}

	GetModuleName(): string {
		return "TurretModule";
	}

	Initialize(): void {}
	RegisterKeys(bindManager: BindingManager): boolean {
		return true;
	}

	override VehicleConstructing(Vehicle: Vehicle, ModuleConfiguration: ModuleConfiguration): void {
		const TurretConfig = ModuleConfiguration as TurretConfiguration;

		this.SetupVehicle(Vehicle, TurretConfig);
	}
}

export = new TurretModule();
