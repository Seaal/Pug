import { IPugPhase } from "../pug-phase";
import { PugPhaseType } from "../pug-phase-type";

export interface PickPlayerPugPhase extends IPugPhase {
    type: PugPhaseType.PickPlayer;
    teamIndex: number;
}
