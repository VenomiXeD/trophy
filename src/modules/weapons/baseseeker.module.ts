/**
 *  Represents any base seeker for a missile
 */
abstract class BaseSeeker {
   /**
    * Scan
    */
   public Scan(): string {return "";}
}

/**
 * Infrared homing seeker
 */
class IRSeeker extends BaseSeeker {
    public override Scan(): string {
        return "IR seeker scanned!";
    }
}

/**
 * Active Radar Homing Seeker
 */
class ARHSeeker extends BaseSeeker {
    public override Scan(): string {
        return "IR seeker scanned!";
    }
}

export { BaseSeeker, ARHSeeker, IRSeeker }